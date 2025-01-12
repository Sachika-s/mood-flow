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
                <div className="bg-white opacity-75 rounded-xl p-5 mt-6 text-gray-700 max-w-5xl text-left flex-wrap">
                    🌸 Welcome to your cozy space of self-care and reflection. Take a moment to check in with yourself—how are you feeling today? Simply tap on your mood to begin. 🌿 <br /> <br />
                    Once you choose your mood, a gentle ten-minute timer will start, giving you the perfect window to pause, reflect, and journal about your day. Let the soft pastel hues guide you into a calm, nurturing flow—mindful journaling, soothing thoughts, and a chance to reconnect with your heart.  <br /> <br />
                    Take a deep breath, embrace the present moment, and let your creativity flow. 💫
                </div>
                
                <div className="text-gray-800 text-2xl mt-4 p-5 font-bold mb-4">Insert mood checker</div>
                
                <div className="grid max-w-5xl w-full grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <textarea 
                        className="w-full p-3 opacity-75 rounded-lg text-gray-700 text-lg focus:ring-blue-400" 
                        rows="9" 
                        placeholder="Write your thoughts here..." 
                    ></textarea>
                  </div>
                  
                  <div className="col-span-4 flex justify-center flex-col gap-6">
                    <img 
                        src="/icon.png" 
                        alt="Description of the image" 
                        className="rounded-lg max-w-full h-auto"
                    />
                    
                    <button 
                        className="bg-[#87CEEB] text-white text-md font-bold p-4 pt-6 pb-6 rounded-xl hover:bg-[#3884a2] w-full"
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
