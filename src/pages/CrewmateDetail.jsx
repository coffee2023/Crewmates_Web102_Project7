import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './CrewmateDetail.css';

const CrewmateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setCrewmate(data);
    } catch (error) {
      console.error('Error fetching crewmate:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!crewmate) {
    return <div className="loading">Crewmate not found</div>;
  }

  return (
    <div className="detail-container">
      <Link to="/gallery" className="back-link">Back to Gallery</Link>
      
      <div className="detail-content">
        <h1>{crewmate.name}</h1>
        
        <div className="detail-info">
          <div className="info-row">
            <span className="label">Speed:</span>
            <span className="value">{crewmate.speed}</span>
          </div>
          <div className="info-row">
            <span className="label">Color:</span>
            <span className="value">{crewmate.color}</span>
          </div>
          <div className="info-row">
            <span className="label">Created:</span>
            <span className="value">
              {new Date(crewmate.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Link to={`/edit/${crewmate.id}`} className="edit-btn">
          Edit Crewmate
        </Link>
      </div>
    </div>
  );
};

export default CrewmateDetail;