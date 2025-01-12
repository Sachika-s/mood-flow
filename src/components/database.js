import Dexie from 'dexie';

// Create a new Dexie database
const db = new Dexie('MoodCalendarDB');

// Define a "moods" table with "date" as the primary key
db.version(1).stores({
  moods: 'date, mood' // Index the "mood" field too
});

export default db;