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
      <div className="flex flex-col font-bold items-center justify-center w-full p-4 -mt-2">
        How are you feeling today?
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleMoodSelect(mood.label)}
            style={{
              margin: '10px',
              padding: '15px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fffff',
              opacity: '0.85',
              border: '1px solid #ddd',
              borderRadius: '8px',
              width: '100px', // Ensures all buttons are the same width
              height: '120px', // Ensures all buttons are the same height
              transition: 'transform 0.2s', // Adds a hover effect
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <FontAwesomeIcon icon={mood.icon} style={{ fontSize: '40px', color: '#a1a7ee' }} />
            <span style={{ marginTop: '10px', fontWeight: 'bold', color: '#333' }}>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodScale;