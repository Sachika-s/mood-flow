import React, { useState, useEffect } from 'react';
import db from '../databasePositive';  // Import Dexie database
import MoodScale from '../Calendar/MoodScale';  // Import MoodScale component

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [response, setResponse] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);
  const [date, setDate] = useState(new Date()); // Set default to current date

  // Fetch saved journal entries on component load
  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await db.entries.toArray();
      setSavedEntries(entries);  // Store them in state
    };
    fetchEntries();
  }, []);

  // Function to handle the mood selection from the MoodScale
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);  // Set the selected mood
    // No need to create a journal entry here anymore
  };

  // Save the journal entry to Dexie database
  const handleSave = async () => {
    if (!response.trim()) {
      alert('Please write something before saving.');
      return;
    }
    if (!selectedMood) {
      alert('Please select a mood.');
      return;
    }

    const newEntry = {
      date: date.toDateString(),  // Convert selected date to string
      mood: selectedMood,         // Selected mood
      response: response,         // User's journal response
    };

    // Save to Dexie database
    await db.entries.add(newEntry);

    // Update the UI state
    setSavedEntries((prevEntries) => [newEntry, ...prevEntries]);

    // Clear input fields after submission
    setResponse('');
    setSelectedMood(null);
  };

  // Function to handle deleting journal entries
  const handleDelete = async (dateString) => {
    await db.entries.where('date').equals(dateString).delete();
    setSavedEntries((prevEntries) => prevEntries.filter((entry) => entry.date !== dateString));
  };

  return (
    <div className="h-screen bg-cover bg-center flex items-start justify-start" style={{ backgroundImage: 'url("/home-background.jpg")' }}>
      <div className="flex flex-col items-center justify-center w-full p-6 mt-5">
        <div className="text-[#17475a] text-5xl font-bold pl-5 text-center">
          Hello, Senuni Kavisinghe!
        </div>
        <div className="bg-white opacity-75 rounded-xl p-5 mt-6 text-gray-700 max-w-5xl text-left flex-wrap">
          🌸 Welcome to your cozy space of self-care and reflection. Take a moment to check in with yourself—how are you feeling today? Simply tap on your mood to begin. 🌿
          <br /> <br />
          Once you choose your mood, a gentle ten-minute timer will start, giving you the perfect window to pause, reflect, and journal about your day. Let the soft pastel hues guide you into a calm, nurturing flow—mindful journaling, soothing thoughts, and a chance to reconnect with your heart. <br /> <br />
          Take a deep breath, embrace the present moment, and let your creativity flow. 💫
        </div>

        {/* MoodScale Component */}
        <MoodScale onMoodSelect={handleMoodSelect} />

        <div className="grid max-w-5xl w-full grid-cols-12 gap-6">
          <div className="col-span-8">
            <textarea
              className="w-full p-3 opacity-75 rounded-lg text-gray-700 text-lg focus:ring-blue-400"
              rows="9"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="col-span-4 flex justify-center flex-col gap-6">
            <img src="/icon.png" alt="Description of the image" className="rounded-lg max-w-full h-auto" />
            <button
              onClick={handleSave}
              className="bg-[#87CEEB] text-white text-md font-bold p-4 pt-6 pb-6 rounded-xl hover:bg-[#3884a2] w-full"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Display Saved Journal Entries */}
        <div className="mt-8 w-full text-gray-800">
          <h3 className="text-2xl font-bold mb-4">Your Journal Entries</h3>
          {savedEntries.length === 0 ? (
            <p>No journal entries yet.</p>
          ) : (
            <ul className="space-y-4">
              {savedEntries.map((entry, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="font-bold text-lg">{entry.date}</div>
                  <div className="text-sm text-gray-500">{entry.mood}</div>
                  <p className="mt-2">{entry.response}</p>
                  <button
                    onClick={() => handleDelete(entry.date)}
                    className="text-red-500 hover:text-red-700 mt-4"
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
};

export default Home;
