import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import './CreateCrewmate.css';

const CreateCrewmate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speed: '',
    color: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.speed || !formData.color) {
      alert('Please fill in all fields!');
      return;
    }

    const { data, error } = await supabase
      .from('crewmates')
      .insert([{
        name: formData.name,
        speed: parseInt(formData.speed),
        color: formData.color
      }])
      .select();
    
    if (error) {
        console.error("SUPABASE ERROR:", error.message, error.details, error.hint);
        alert("Error creating crewmate! Check console.");
        return;
    }

    else {
      alert('Crewmate created successfully!');
      navigate('/gallery');
    }
  };

  return (
    <div className="create-container">
      <Link to="/" className="back-link">Back to Home</Link>
      
      <div className="create-content">
        <h1>Create a New Crewmate</h1>
        
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter crewmate name"
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
              placeholder="Enter speed value"
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
            
          </div>

          <button type="submit" className="submit-btn">
            Create Crewmate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCrewmate;