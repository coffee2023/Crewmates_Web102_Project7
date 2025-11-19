import React from 'react';
import { Link } from 'react-router-dom';
import './CrewmateCard.css';

const CrewmateCard = ({ crewmate }) => {
  return (
    <Link to={`/crewmate/${crewmate.id}`} className="crewmate-card">
      <h3>{crewmate.name}</h3>
      <div className="card-details">
        <p>⚡ Speed: <strong>{crewmate.speed}</strong></p>
        <p>🎨 Color: <strong>{crewmate.color}</strong></p>
      </div>
    </Link>
  );
};

export default CrewmateCard;