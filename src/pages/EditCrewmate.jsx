import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './EditCrewmate.css';

const EditCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: ''
  });
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
      setFormData({
        name: data.name,
        speed: data.speed.toString(),
        color: data.color
      });
    } catch (error) {
      console.error('Error fetching crewmate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({
          name: formData.name,
          speed: parseInt(formData.speed),
          color: formData.color
        })
        .eq('id', id);
      
      if (error) throw error;
      alert('Crewmate updated successfully!');
      navigate(`/crewmate/${id}`);
    } catch (error) {
      console.error('Error updating crewmate:', error);
      alert('Error updating crewmate!');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this crewmate?')) {
      try {
        const { error } = await supabase
          .from('crewmates')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        alert('Crewmate deleted successfully!');
        navigate('/gallery');
      } catch (error) {
        console.error('Error deleting crewmate:', error);
        alert('Error deleting crewmate!');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-container">
      <Link to={`/crewmate/${id}`} className="back-link">Back to Details</Link>
      
      <div className="edit-content">
        <h1>Edit Crewmate</h1>
        
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Speed (1-100):</label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.speed}
              onChange={(e) => setFormData({...formData, speed: e.target.value})}
              required
            />
            <div className="speed-indicator">
              {formData.speed && (
                <div className="speed-bar-container">
                  <div 
                    className="speed-bar" 
                    style={{width: `${formData.speed}%`}}
                  ></div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Color:</label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              required
            >
              <option value="">Select a color</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Indigo">Indigo</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Gray">Gray</option>
              <option value="Rainbow">Rainbow</option>
            </select>
            {formData.color && (
              <div className="color-preview">
                <span className="color-label">Selected: </span>
                <span 
                  className="color-swatch" 
                  style={{backgroundColor: formData.color.toLowerCase()}}
                ></span>
                <span className="color-name">{formData.color}</span>
              </div>
            )}
          </div>

          <button type="submit" className="update-btn">
            Update Crewmate
          </button>
          
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Crewmate
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCrewmate;