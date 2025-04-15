import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';
import '../../Views/DataDisplay.css';

export default function MainDetails() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("mainDetails");
  }, [fetchFormData]);

  const formatAddress = (person) => {
    return [
      person.addressLine1,
      person.addressLine2,
      person.city,
      person.county,
      person.postcode,
      person.country
    ].filter(Boolean).join(', ');
  };

  const renderDetailsCard = (person, isPartner = false) => {
    if (!person) return null;

    return (
      <div className={`details-card ${isPartner ? 'partner-card' : ''}`}>
        <h2>{isPartner ? 'Partner Details' : 'Client Details'}</h2>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">
              {[person.title, person.forename, person.middleName, person.surname].filter(Boolean).join(' ')}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Date of Birth:</span>
            <span className="detail-value">
              {person.dateOfBirth} {person.age && `(Age ${person.age})`}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">
              {person.identifiesAs || person.genderAtBirth || 'Not provided'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Nationality:</span>
            <span className="detail-value">{person.nationality || 'Not provided'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">NI Number:</span>
            <span className="detail-value">{person.niNumber || 'Not provided'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Occupation:</span>
            <span className="detail-value">{person.clientOccupation || 'Not provided'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Employment Status:</span>
            <span className="detail-value">{person.occupationStatus || 'Not provided'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Annual Salary:</span>
            <span className="detail-value">
              {person.basicAnnualSalary ? `£${person.basicAnnualSalary}` : 'Not provided'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Smoker:</span>
            <span className="detail-value">{person.smoker || 'Not provided'}</span>
          </div>
          
          <div className="detail-item full-width">
            <span className="detail-label">Address:</span>
            <span className="detail-value">
              {formatAddress(person) || 'Not provided'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Contact Number:</span>
            <span className="detail-value">
              {person.mobilePhone || person.daytimePhone || person.eveningPhone || 'Not provided'}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">
              {person.email || (person.emails?.[0]?.email) || 'Not provided'}
            </span>
          </div>
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
        {formData?.mainDetails?.mainDetails && 
          renderDetailsCard(formData.mainDetails.mainDetails)}
        
        {formData?.mainDetails?.partners?.length > 0 && (
          <>
            {formData.mainDetails.partners.map((partner, index) => (
              <div key={`partner-${index}`} className="partner-section">
                {renderDetailsCard(partner, true)}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}