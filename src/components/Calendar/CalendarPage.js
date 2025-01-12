import React, { useState, useEffect } from 'react';
import SimpleCalendar from './SimpleCalendar'; // Import SimpleCalendar (or your existing calendar)
import db from '../databasePositive'; // Dexie database

const CalendarPage = () => {
  const [savedEntries, setSavedEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await db.entries.toArray();
      setSavedEntries(entries); // Fetch saved journal entries
    };
    fetchEntries();
  }, []);

  return (
    <div className="calendar-page">
      <h2>Your Calendar</h2>
      <SimpleCalendar savedEntries={savedEntries} /> {/* Pass saved entries */}
    </div>
  );
};

export default CalendarPage;