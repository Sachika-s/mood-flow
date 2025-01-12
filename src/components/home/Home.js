import React from 'react';

const Home = () => {
    return (
        <div 
            className="h-screen bg-cover bg-center flex items-start justify-start"
            style={{ 
                backgroundImage: "url('/home-background.jpg')" 
            }}
        >
            <div className="flex flex-col items-center justify-center w-full p-6 mt-5">
                <div className="text-[#17475a] text-5xl font-bold pl-5 text-center">
                    Hello, Senuni Kavisinghe!
                </div>
                <div className="bg-gray-700 opacity-75 rounded-xl p-5 mt-6 text-[#F8EDEB] max-w-5xl text-left flex-wrap">
                    🌸 Welcome to your cozy space of self-care and reflection. Take a moment to check in with yourself—how are you feeling today? Simply tap on your mood to begin. 🌿 <br /> <br />
                    Once you choose your mood, a gentle ten-minute timer will start, giving you the perfect window to pause, reflect, and journal about your day. Let the soft pastel hues guide you into a calm, nurturing flow—mindful journaling, soothing thoughts, and a chance to reconnect with your heart.  <br /> <br />
                    Take a deep breath, embrace the present moment, and let your creativity flow. 💫
                </div>
                
                <div className="text-gray-800 text-2xl mt-4 p-5 font-bold mb-4">Insert mood checker</div>
                
                <textarea 
                    className="max-w-5xl w-full p-3 rounded-lg text-gray-700 text-lg focus:ring-blue-400" 
                    rows="6" 
                    placeholder="Write your thoughts here..." 
                ></textarea>
                
                <div className="bg-gray-700 opacity-75 italic rounded-xl p-3 mt-6 text-[#F8EDEB] max-w-5xl text-left flex-wrap">
                    Suggested prompts:What’s been the highlight of your day so far?

                </div>
            </div>
        </div>
    );
};

export default Home;
