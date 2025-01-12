import React from 'react';

const About = () => {
  return (
    <div className="h-min-screen bg-cover text-xl bg-center flex items-start justify-start" style={{ backgroundImage: 'url("/home-background.jpg")' }}>
      <div className="min-h-screen ml-52 mr-52 mt-16">
        {/* About Section */}
        <div className=" bg-white opacity-85 p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl text-[#17475a] font-bold text-center mb-6">About Us</h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to our mood tracking app! Our goal is to help you track and
            manage your moods so you can better understand your emotions, improve
            your mental well-being, and take control of your daily life.
          </p>
          <p className="text-lg text-gray-700">
            We believe that understanding your moods can lead to greater self-awareness,
            and we’re here to make that journey easier and more insightful for you.
          </p>
        </div>

        {/* Team Members Section */}
        <div className="mt-12 bg-white opacity-85 p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-5xl font-bold text-center text-[#17475a] pb-4 mb-7">Meet the Team</h2>
          <div className="grid grid-cols-4 gap-8">
            {/* Member 1 */}
            <div className="text-center">
              <img
                src="/senuni-profile.jpeg"
                alt="Team Member 1"
                className="aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Senuni Kavisinghe</h3>
              <p className="text-gray-500">Software Developer</p>
            </div>

            {/* Member 2 */}
            <div className="text-center">
              <img
                src="/sachika-profile.jpg"
                alt="Team Member 2"
                className="aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Sachika Saxena</h3>
              <p className="text-gray-500">Software Developer</p>
            </div>

            {/* Member 3 */}
            <div className="text-center">
              <img
                src="/stella-profile.jpg"
                alt="Team Member 3"
                className="aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Stella Liu</h3>
              <p className="text-gray-500">Software Developer</p>
            </div>
            
            {/* Member 4 */}
            <div className="text-center">
              <img
                src="/sachika-profile.jpg"
                alt="Team Member 2"
                className="aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Swetha Krishnan</h3>
              <p className="text-gray-500">Software Developer</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
