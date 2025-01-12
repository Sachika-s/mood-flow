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