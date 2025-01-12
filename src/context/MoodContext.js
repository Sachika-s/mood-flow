import React, { createContext, useState, useEffect } from 'react';
import db from './db'; // Import the Dexie database

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
    const [selectedMood, setSelectedMood] = useState(null);

    // Load the mood from Dexie when the app starts
    useEffect(() => {
        const fetchMood = async () => {
            const moodEntry = await db.moods.get(1); // Look for mood with ID 1
            if (moodEntry) {
                setSelectedMood(moodEntry.mood); // Set the saved mood in state
            }
        };
        fetchMood();
    }, []);

    // Save mood to Dexie whenever it changes
    const saveMood = async (mood) => {
        setSelectedMood(mood);
        await db.moods.put({ id: 1, mood }); // Save or update the mood with ID 1
    };

    return (
        <MoodContext.Provider value={{ selectedMood, setSelectedMood: saveMood }}>
            {children}
        </MoodContext.Provider>
    );
};
