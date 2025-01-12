import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';  // Custom CSS for styling
import db from '../databasePositive';  // Import Dexie database

// Define colors for each mood
const moodColors = {
  Happy: 'green',
  Sad: 'blue',
  Neutral: 'yellow',
  Tired: 'purple',
  Angry: 'red',
  Relaxed: 'turquoise',
};

function SimpleCalendar({ selectedMood, savedEntries }) {
  const [date, setDate] = useState(new Date());
  const [moodDates, setMoodDates] = useState({});  // Store selected mood for each date

  // Fetch the saved moods from the Dexie database for each date
  useEffect(() => {
    const fetchMoodDates = async () => {
      const entries = await db.entries.toArray();
      const moodMap = {};
      entries.forEach(entry => {
        moodMap[entry.date] = entry.mood;  // Map date to mood
      });
      setMoodDates(moodMap);  // Update moodDates state
    };
    fetchMoodDates();
  }, [savedEntries]);

  // Function to handle day clicks
  const handleDateClick = (value) => {
    const dateString = value.toDateString();
    setMoodDates((prevMoodDates) => ({
      ...prevMoodDates,
      [dateString]: selectedMood,  // Store the selected mood for this day
    }));

    // Save the selected mood to Dexie database for the clicked date
    db.entries.put({
      date: dateString,
      mood: selectedMood,
      response: '', // Can be left empty or add logic to store response
    });
  };

  // Function to get the class name for each tile
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      return 'calendar-tile';  // Apply custom class to each tile
    }
  };

  // Function to add content (circle) to each tile
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
     
      // Check if this date has a mood color assigned
      const moodForDay = moodDates[dateString];
     
      return (
        <div
          style={{
            backgroundColor: moodForDay ? moodColors[moodForDay] : 'transparent',
            borderRadius: '50%',
            height: '20px',
            width: '20px',
            margin: 'auto',
          }}
        />
      );
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={handleDateClick}  // Handle the date click
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </div>
  );
}

export default SimpleCalendar;






/*import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Custom CSS for styling
import MoodScale from './MoodScale'; // Import MoodScale component
import db from '../database'; // Import the Dexie database

// Define colors for each mood
const moodColors = {
  Happy: 'green',
  Sad: 'blue',
  Neutral: 'yellow',
  Tired: 'purple',
  Angry: 'red',
  Relaxed: 'turquoise',
};

function SimpleCalendar() {
  const [date, setDate] = useState(new Date()); // Currently selected date
  const [moodDates, setMoodDates] = useState({}); // Store selected mood for each date
  const [selectedMood, setSelectedMood] = useState(null); // Store the selected mood

  // Load moods from the database when the app starts
  useEffect(() => {
    const fetchMoods = async () => {
      const moods = await db.moods.toArray(); // Fetch all moods from the database
      const moodsMap = moods.reduce((acc, { date, mood }) => {
        acc[date] = mood;
        return acc;
      }, {});
      setMoodDates(moodsMap); // Update state with the loaded moods
    };

    fetchMoods();
  }, []);

  // Function to handle mood selection
  const handleMoodSelect = async (mood) => {
    const dateString = date.toDateString(); // Get the selected date as a string

    // Save the mood to the database
    await db.moods.put({ date: dateString, mood });

    // Update the mood for the current date in state
    setMoodDates((prev) => ({ ...prev, [dateString]: mood }));
    setSelectedMood(mood); // Update selected mood
  };

  // Function to add a CSS class to calendar tiles based on the mood
  const tileClassName = ({ date }) => {
    const dateString = date.toDateString();
    if (moodDates[dateString]) {
      return `tile-${moodDates[dateString].toLowerCase()}`; // Add a class based on the mood
    }
    return null;
  };

  // Function to display content inside calendar tiles
  const tileContent = ({ date }) => {
    const dateString = date.toDateString();
    const mood = moodDates[dateString];
    if (mood) {
      return (
        <div
          style={{
            fontSize: '10px',
            color: '#fff',
            backgroundColor: moodColors[mood],
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto',
          }}
        >
          {mood[0]} {/* Display the first letter of the mood *//*}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>My Mood Calendar</h1>
      <h3>Selected Date: {date.toDateString()}</h3>
      <MoodScale onMoodSelect={handleMoodSelect} /> {/* Mood selection component *//*}
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </div>
  );
}

export default SimpleCalendar;*/