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
        { label: 'Relaxed', icon: faBath }
      ];
    
    const handleMoodSelect = (mood) => {
        onMoodSelect(mood);
    };

    return (
        <div>
            <h3>How are you feeling today?</h3>
            <div  style={{ display: 'flex', justifyContent: 'center' }}>
                {moods.map((mood, index) => (
                    <button
                        key={index}
                        onClick={() => handleMoodSelect(mood.label)}
                        style={{
                        margin: '5px',
                        padding: '10px',
                        cursor: 'pointer',
                        fontSize: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                        }}
                    >
                        <FontAwesomeIcon icon={mood.icon} style={{ fontSize: '30px' }} />
                        <span>{mood.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MoodScale;