import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileBeam, faSadCry, faAngry, faTired, faMeh, faBath } from '@fortawesome/free-solid-svg-icons';

function MoodScale({ onMoodSelect }) {
  const moods = [
    { label: 'Happy', icon: faSmileBeam },
    { label: 'Sad', icon: faSadCry },
    { label: 'Neutral', icon: faMeh },
    { label: 'Tired', icon: faTired },
    { label: 'Angry', icon: faAngry },
    { label: 'Relaxed', icon: faBath },
  ];

  const handleMoodSelect = (mood) => {
    onMoodSelect(mood);
  };

  return (
    <div>
      <div className="flex flex-col text-[#17475a] font-bold text-2xl items-center justify-center w-full p-4 mt-1">
        How are you feeling today?
      </div>
      <div className="flex justify-center pb-5 flex-wrap">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            className="m-2 p-4 cursor-pointer text-base flex flex-col items-center bg-white opacity-85 border border-gray-300 rounded-lg w-24 h-30 transition-transform duration-200 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={mood.icon} className="text-4xl text-blue-400" />
            <span className="mt-2 font-bold text-gray-800">{mood.label}</span>
          </button>
  ))}
</div>

    </div>
  );
}

export default MoodScale;