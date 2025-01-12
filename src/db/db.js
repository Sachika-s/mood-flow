import Dexie from 'dexie';

// Initialize the database
const db = new Dexie('MoodTracker');

// Define the schema for the database
db.version(1).stores({
    moods: 'id, mood', // 'id' is the primary key, 'mood' is the stored mood
});

export default db;
