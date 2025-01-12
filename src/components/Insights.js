import React, { useState, useEffect } from 'react';
import openai from 'openai';  // Import OpenAI SDK
import db from './databasePositive';  // Import your Dexie database

// Replace with your OpenAI Personal API Key (from the dashboard)
openai.apiKey = 'sk-...YOURAPIKEY...';

function Insights() {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await db.entries.toArray();  // Fetch actual journal entries from Dexie
        setJournalEntries(entries);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const fetchAIFeedback = async (journalText) => {
    try {
      const response = await openai.Completion.create({
        engine: 'davinci-codex',  // Or use gpt-3.5-turbo if available
        prompt: `Based on this journal entry: "${journalText}", provide positive and helpful feedback:`,
        max_tokens: 100,
        temperature: 0.7,
      });

      if (response && response.choices && response.choices.length > 0) {
        return response.choices[0].text.trim();  // Extracting the text from the response
      } else {
        throw new Error('No valid response generated.');
      }
    } catch (error) {
      console.error('Error fetching AI feedback:', error);
      return 'Sorry, I could not generate feedback at this moment. Please try again later.';
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Insights</h1>
      <div className="flex flex-col space-y-6">
        {journalEntries.map((entry, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Date: {entry.date}</h2>
            <p className="mb-2"><strong>Mood:</strong> {entry.mood}</p>
            <p className="mb-4"><strong>Journal:</strong> {entry.response}</p>
            
            <div className="mt-4">
              <button
                onClick={async () => {
                  const aiResponse = await fetchAIFeedback(entry.response);
                  if (aiResponse) {
                    alert(aiResponse);  // Display the AI feedback
                  } else {
                    alert('Sorry, I could not generate feedback at this moment.');
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Get AI Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insights;
