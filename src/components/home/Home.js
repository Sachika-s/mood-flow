import React, { useState, useEffect } from 'react';
import db from '../databasePositive';
import MoodScale from '../MoodScale';
import axios from 'axios';

const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [response, setResponse] = useState('');
  const [date, setDate] = useState(new Date());
  const [aiAdvice, setAiAdvice] = useState(null); // To store AI advice for Insights

  const handleMoodSelect = (mood) => setSelectedMood(mood);

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
      date: date.toDateString(),
      mood: selectedMood,
      response,
    };

    await db.entries.add(newEntry);

    // Fetch AI advice
    try {
      const res = await axios.post('http://localhost:5001/generate-advice', {
        entry: response,
      });
      console.log('AI Advice:', res.data);
      setAiAdvice(res.data.advice || 'No advice generated.');
    } catch (err) {
      console.error('Failed to fetch AI advice:', err);
    }

    setResponse('');
    setSelectedMood(null);
  };

  return (
    <div className="h-min-screen bg-cover bg-center flex items-start justify-start" style={{ backgroundImage: 'url("/home-background.jpg")' }}>
      <div className="flex flex-col items-center justify-center w-full p-6 mt-5">
        <div className="text-[#17475a] text-5xl font-bold pl-5 text-center">
          Hello! Welcome to your homepage~
        </div>
        <div className="bg-white opacity-85 rounded-xl p-5 mt-6 text-gray-700 max-w-5xl text-left flex-wrap">
          🌸 Take a moment to check in with yourself. Tap on your mood and journal your thoughts.
        </div>

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
