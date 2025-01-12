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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
