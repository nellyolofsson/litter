import React from 'react';
import './HomePage.css';
import LoginButton from '../components/profile/LoginButton'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Litter Platform!</h1>
      <img className="kitty-image" src="/kitty.png" alt="kitty" />
      <LoginButton /> {/* Använd LoginButton här */}
    </div>
  );
};

export default Home;
