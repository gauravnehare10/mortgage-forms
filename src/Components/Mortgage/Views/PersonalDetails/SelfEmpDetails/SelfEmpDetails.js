import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../store';
import '../../../Views/DataDisplay.css';

export default function SelfEmpDetails() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();
  console.log(formData);

  useEffect(() => {
    fetchFormData("selfEmployedData");
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

  const shouldDisplay = () => {
    // Check if either client or partner has self-employed data
    return (
      (formData?.selfEmployedData?.client && Object.keys(formData.selfEmployedData.client).length > 0) ||
      (formData?.selfEmployedData?.partner && Object.keys(formData.selfEmployedData.partner).length > 0)
    );
  };

  const renderSelfEmpSection = (selfEmpData, title) => {
    if (!selfEmpData || Object.keys(selfEmpData).length === 0) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Business Name:</span>
            <span className="detail-value">{selfEmpData.businessName || 'Not provided'}</span>
          </div>
          
          <div className="detail-item full-width">
            <span className="detail-label">Business Address:</span>
            <span className="detail-value">
              {formatAddress(selfEmpData.businessAddress)}
              {selfEmpData.businessPostcode && `, ${selfEmpData.businessPostcode}`}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Position in Business:</span>
            <span className="detail-value">{selfEmpData.positionInBusiness || 'Not provided'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Start Date:</span>
            <span className="detail-value">{formatDate(selfEmpData.startDate)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Years of Accounts:</span>
            <span className="detail-value">{selfEmpData.yearsOfAccounts || 'Not provided'}</span>
          </div>
          
          {selfEmpData.accountantDetails && (
            <div className="detail-item full-width">
              <span className="detail-label">Accountant Details:</span>
              <span className="detail-value">{selfEmpData.accountantDetails}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!shouldDisplay()) {
    return null; // Don't render the component if no self-employed data exists
  }

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
        {formData?.selfEmployedData?.client && 
          renderSelfEmpSection(formData.selfEmployedData.client, 'Client Self-Employment Details')}
        
        {formData?.selfEmployedData?.partner && 
          renderSelfEmpSection(formData.selfEmployedData.partner, 'Partner Self-Employment Details')}
      </div>
    </div>
  );
}