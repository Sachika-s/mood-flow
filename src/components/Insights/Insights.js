import React, { useState, useEffect } from 'react';
import db from '../databasePositive'; // Dexie database
import axios from 'axios';

const Insights = () => {
  const [latestEntry, setLatestEntry] = useState(null); // Latest journal entry
  const [aiAdvice, setAiAdvice] = useState(''); // AI-generated advice
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch the latest journal entry from Dexie
  useEffect(() => {
    const fetchLatestEntry = async () => {
      try {
        const allEntries = await db.entries.toArray();
        if (allEntries.length > 0) {
          setLatestEntry(allEntries[allEntries.length - 1]); // Get the last saved entry
        }
      } catch (err) {
        console.error('Error fetching journal entries:', err);
        setError('Failed to fetch journal entries.');
      }
    };

    fetchLatestEntry();
  }, []);

  // Fetch AI advice from the backend
  const fetchAIAdvice = async () => {
    if (!latestEntry) {
      setError('No journal entry found to generate advice.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5001/generate-advice', {
        entry: latestEntry.response,
      });
      setAiAdvice(response.data.advice || 'No advice generated.');
    } catch (err) {
      console.error('Error fetching AI advice:', err);
      setError('Failed to fetch AI advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-min-screen bg-cover bg-center flex items-start justify-start" style={{ backgroundImage: 'url("/insights-background.jpg")' }}>
      <div className="flex flex-col items-center justify-center w-full p-6 mt-5">
        <div className="text-[#17475a] text-5xl font-bold pl-5 text-center">
          AI Insights
        </div>

        <div className="bg-white opacity-85 rounded-xl p-5 mt-6 text-gray-700 max-w-5xl text-left">
          {latestEntry ? (
            <>
              <h3 className="text-xl font-bold text-[#17475a] mb-3">Your Latest Journal Entry:</h3>
              <p>{latestEntry.response}</p>
            </>
          ) : (
            <p>No journal entries found. Write your thoughts on the Home page first!</p>
          )}
        </div>

        <button
          onClick={fetchAIAdvice}
          disabled={loading || !latestEntry}
          className="bg-[#87CEEB] text-white font-bold p-4 rounded-xl hover:bg-[#3884a2] w-full mt-6"
        >
          {loading ? 'Generating Advice...' : 'Get AI Insights'}
        </button>

        {aiAdvice && (
          <div className="bg-white opacity-85 rounded-xl p-5 mt-6 text-gray-700 max-w-5xl text-left">
            <h3 className="text-xl font-bold text-[#17475a] mb-3">AI's Advice:</h3>
            <p>{aiAdvice}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 rounded-xl p-5 mt-6 max-w-5xl text-left">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;