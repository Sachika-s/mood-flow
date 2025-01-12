import React, { useState, useEffect } from 'react';
import db from '../databasePositive';  // Import Dexie database
import MoodScale from '../MoodScale';  // Import MoodScale component

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [response, setResponse] = useState('');
  const [date, setDate] = useState(new Date()); // Set default to current date
  const [advice, setAdvice] = useState(''); // State to store AI-generated advice
  const [loadingAdvice, setLoadingAdvice] = useState(false); // State to handle loading

  // Function to handle the mood selection from the MoodScale
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);  // Set the selected mood
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

    // Clear input fields after submission
    setResponse('');
    setSelectedMood(null);
  };

<<<<<<< HEAD
  // Function to handle deleting journal entries
  const handleDelete = async (dateString) => {
    await db.entries.where('date').equals(dateString).delete();
    setSavedEntries((prevEntries) => prevEntries.filter((entry) => entry.date !== dateString));
  };

  // Function to get AI-generated advice using Cohere
  const handleGetAdvice = async () => {
    if (!response.trim()) {
      alert('Please write something to get advice.');
      return;
    }

    setLoadingAdvice(true); // Start loading
    setAdvice(''); // Clear previous advice

    try {
      const res = await fetch('http://localhost:5000/generate-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entry: response }),
      });

      if (!res.ok) {
        throw new Error('Failed to get advice');
      }

      const data = await res.json();
      setAdvice(data.advice); // Set the received advice
    } catch (error) {
      console.error('Error fetching advice:', error);
      alert('Error fetching advice. Please try again.');
    } finally {
      setLoadingAdvice(false); // Stop loading
    }
  };

=======
>>>>>>> 04a616a55a8c885a4461f479e5699b4000d5cb44
  return (
    <div className="h-min-screen bg-cover bg-center flex items-start justify-start" style={{ backgroundImage: 'url("/home-background.jpg")' }}>
      <div className="flex flex-col items-center justify-center w-full p-6 mt-5">
        <div className="text-[#17475a] text-5xl font-bold pl-5 -mt-2 mb-1 text-center">
          Hello, Senuni Kavisinghe!
        </div>
        <div className="bg-white opacity-85 rounded-xl p-5 mt-6 text-gray-700 max-w-5xl text-left flex-wrap">
          🌸 Welcome to your cozy space of self-care and reflection. Take a moment to check in with yourself—how are you feeling today? Simply tap on your mood to begin. 🌿
        </div>

        {/* MoodScale Component */}
        <MoodScale onMoodSelect={handleMoodSelect} />

        <div className="grid max-w-5xl w-full grid-cols-12 gap-6">
          <div className="col-span-8">
            <textarea
              className="w-full p-3 opacity-85 rounded-lg text-gray-700 text-lg focus:ring-blue-400"
              rows="9"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="col-span-4 flex justify-center flex-col gap-6">
            <img src="/icon.png" alt="Cute pastel character" className="rounded-lg max-w-full h-auto" />
            <button
              onClick={handleSave}
              className="bg-[#87CEEB] text-white font-bold p-4 rounded-xl hover:bg-[#3884a2] w-full"
            >
              Submit
            </button>

            {/* Get Advice Button */}
            <button
              onClick={handleGetAdvice}
              className="bg-[#FFB6C1] text-white text-md font-bold p-4 pt-6 pb-6 rounded-xl hover:bg-[#c97a8d] w-full mt-4"
            >
              Get Advice
            </button>
          </div>
        </div>
<<<<<<< HEAD

        {/* Display AI Advice */}
        {loadingAdvice ? (
          <div className="mt-6 text-gray-700">Loading advice...</div>
        ) : advice ? (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">AI Advice:</h3>
            <p>{advice}</p>
          </div>
        ) : null}

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
=======
>>>>>>> 04a616a55a8c885a4461f479e5699b4000d5cb44
      </div>
    </div>
  );
};

export default Home;
