import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CrewmateCard from '../components/CrewmateCard';
import './Gallery.css';

const Gallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCrewmates(data || []);
    } catch (error) {
      console.error('Error fetching crewmates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="gallery-container">
      <Link to="/" className="back-link">Back to Home</Link>
      
      <h1>Your Crew Gallery</h1>
      
      {crewmates.length === 0 ? (
        <div className="empty-state">
          <p>No crewmates yet!</p>
          <Link to="/create" className="create-link">
            Create your first crewmate ➕
          </Link>
        </div>
      ) : (
        <div className="gallery-grid">
          {crewmates.map(crewmate => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;