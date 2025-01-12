import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import db from '../databasePositive';

const moodColors = {
  Happy: 'bg-green-400',
  Sad: 'bg-blue-400',
  Neutral: 'bg-yellow-300',
  Tired: 'bg-purple-500',
  Angry: 'bg-red-400',
  Relaxed: 'bg-teal-400',
};

function SimpleCalendar() {
  const [date, setDate] = useState(new Date());
  const [moodDates, setMoodDates] = useState({});
  const [entriesForSelectedDate, setEntriesForSelectedDate] = useState([]);

  useEffect(() => {
    const fetchMoodDates = async () => {
      const entries = await db.entries.toArray();
      const moodMap = {};
      entries.forEach(entry => {
        moodMap[entry.date] = entry.mood;
      });
      setMoodDates(moodMap);
    };
    fetchMoodDates();
  }, []);

  const fetchEntriesForDate = async (dateString) => {
    const entries = await db.entries.where('date').equals(dateString).toArray();
    setEntriesForSelectedDate(entries);
  };

  const handleDateClick = (value) => {
    const dateString = value.toDateString();
    setDate(value);
    fetchEntriesForDate(dateString);
  };

  const handleDelete = async (entryId) => {
    await db.entries.delete(entryId);
    setEntriesForSelectedDate(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const moodForDay = moodDates[dateString];

      return (
        <div
          className={`w-2 h-2 mt-3 rounded-full mx-auto ${moodForDay ? moodColors[moodForDay] : 'bg-transparent'}`}
        />
      );
    }
  };

  return (
    <div className="h-min-screen bg-cover text-xl bg-center flex items-start justify-start" style={{ backgroundImage: 'url("/home-background.jpg")' }}>
      <div className="w-full">
        <div className="text-[#17475a] text-5xl font-bold -mb-7 mt-10 text-center">
          Your Mood at a Glance...
        </div>
        <div className=" pl-52 pr-52 pt-16 pb-4 rounded-lg">
          <Calendar
              onChange={setDate}
              value={date}
              onClickDay={handleDateClick}
              tileContent={tileContent}
              tileClassName="react-calendar__tile aspect-square text-xl"
              className="w-full rounded-xl"
            />
        </div>

        <div className="ml-52 mt-6 mr-52 text-gray-800">
          <h3 className="text-2xl font-semibold mb-4">Journal Entries for {date.toDateString()}</h3>
          {entriesForSelectedDate.length === 0 ? (
            <p className="text-lg text-gray-500 pb-9">No journal entries for this day.</p>
          ) : (
            <ul className="space-y-4 pb-7">
              {entriesForSelectedDate.map((entry, index) => (
                <li key={index} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                  <div className="font-semibold text-lg text-gray-900">{entry.mood}</div>
                  <p className="mt-2 text-gray-700">{entry.response}</p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="mt-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete Entry
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleCalendar;
