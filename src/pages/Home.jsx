import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">🚀 Welcome to the Crewmate Creator!</h1>
        <p className="home-subtitle">Here is where you can create your very own set of crewmates before sending them off into space!</p>
        
        <div className="home-cards">
          <Link to="/create" className="home-card">
            <div className="card-icon">➕</div>
            <h2>Create Crewmate</h2>
            <p>Add a new member to your crew</p>
          </Link>
          
          <Link to="/gallery" className="home-card">
            <div className="card-icon">👥</div>
            <h2>Crew Gallery</h2>
            <p>View all your crewmates</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;