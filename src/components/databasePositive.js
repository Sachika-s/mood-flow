import Dexie from 'dexie';

const db = new Dexie('JournalDB');

// Define a table for storing journal entries
db.version(1).stores({
  entries: '++id, date, mood, response', // Auto-incrementing id, date, mood, and the journal response
});

export default db;