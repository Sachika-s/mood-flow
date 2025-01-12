import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';  // Custom CSS for styling
import MoodScale from './MoodScale';  // Import MoodScale component

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
  const [date, setDate] = useState(new Date());
  const [moodDates, setMoodDates] = useState({});  // Store selected mood for each date
  const [selectedMood, setSelectedMood] = useState(null); // Store the selected mood

  // Function to handle day clicks
  const handleDateClick = (value) => {
    if (selectedMood) {
      const dateString = value.toDateString();

      // Set the mood for this day
      setMoodDates((prevMoodDates) => ({
        ...prevMoodDates,
        [dateString]: selectedMood,  // Store the selected mood for this day
      }));
    }
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
      {/* Mood selection component */}
      <MoodScale onMoodSelect={setSelectedMood} />

      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={handleDateClick}  // Set the selected date on click
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </div>
  );
}

export default SimpleCalendar;