import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../store';
import '../../../Views/DataDisplay.css';

export default function ResidentialDetails() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();
  console.log(formData);

  useEffect(() => {
    fetchFormData("residentialData");
  }, [fetchFormData]);

  const formatAddress = (addressArray) => {
    if (!addressArray || !Array.isArray(addressArray)) return 'Not provided';
    const filteredAddress = addressArray.filter(part => part && part.trim() !== '');
    return filteredAddress.join(', ') || 'Not provided';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderResidentialSection = (residences, title) => {
    if (!residences || residences.length === 0) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="residences-list">
          {residences.map((residence, index) => (
            <div key={`residence-${index}`} className="residence-item">
              <div className="details-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">Address-{index+1} :</span>
                  <span className="detail-value">{formatAddress(residence.address)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Postcode:</span>
                  <span className="detail-value">{residence.postcode || 'Not provided'}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{residence.status || 'Not provided'}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Date Moved In:</span>
                  <span className="detail-value">{formatDate(residence.dateMovedIn)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="data-display-page">
      <div className="form-buttons">
        <div className="form-buttons-card">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="back-button"
            aria-label="Go back to previous page"
          >
            Back
          </button>
        </div>
      </div>

      <div className="data-container">
        {formData?.residentialData?.client && 
          renderResidentialSection(formData.residentialData.client, 'Client Residential History')}
        
        {formData?.residentialData?.partner && 
          renderResidentialSection(formData.residentialData.partner, 'Partner Residential History')}
      </div>
    </div>
  );
}