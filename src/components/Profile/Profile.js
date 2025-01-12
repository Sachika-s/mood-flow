// src/components/Profile.js
import React from 'react';
import './Profile.css';

const Profile = () => {

  return (
    <div classname="profile-page">
      <h1 className="profile-title">Your journal profile!</h1>
      <p></p>

      <div className="profile-container">
        {/* Profile Info Box */}
        <div className="profile-info-box">
          <h2 className="profile-info-title">Your Info</h2>
          <div className="profile-info">
            <div className="name-container">
              <div><strong>First Name:</strong></div>
              <div className="name-bubble">John</div>
            </div>

            <div className="name-container">
              <div><strong>Last Name:</strong></div>
              <div className="name-bubble">Something</div>
            </div>

            <div className="name-container">
              <div><strong>Username:</strong></div>
              <div className="name-bubble">johnsworld</div>
            </div>

            <div className="name-container">
              <div><strong>Email:</strong></div>
              <div className="name-bubble">example@example.com</div>
            </div>
          </div>
        </div>

        {/* Profile Details Box */}
        <div className="profile-details-box">
          <h2 className="profile-stats-title">Your Stats</h2>
          <div className="profile-details">
            <div className="profile-detail-item">
              <strong>Date Joined:</strong> <span>Jan 1, 2023</span>
            </div>
            <div className="profile-detail-item">
              <strong>Journal Streak:</strong> <span>45 days</span>
            </div>
            <div className="profile-detail-item">
              <strong>Total Entries:</strong> <span>150</span>
            </div>
          </div>
        </div>

        {/* Profile Photo Box */}
        <div className="profile-photo-box">
          <h2 className="your-photo">Your photo!</h2>
          <div className="profile-image">
            <img
              src="https://www.freeiconspng.com/thumbs/account-icon/account-icon-33.png"
              alt="Profile Icon"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Profile;