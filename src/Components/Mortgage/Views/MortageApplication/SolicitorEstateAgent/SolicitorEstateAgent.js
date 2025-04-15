import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../store';
import '../../../Views/DataDisplay.css';

export default function SolicitorEstateAgent() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("solicitorAndAgentData");
  }, [fetchFormData]);

  const formatAddress = (addressArray) => {
    if (!addressArray || !Array.isArray(addressArray)) return 'Not specified';
    const filteredAddress = addressArray.filter(part => part && part.trim() !== '');
    return filteredAddress.join(', ') || 'Not specified';
  };

  const formatPhoneNumber = (number) => {
    if (!number) return 'Not specified';
    // Format as 01234 567890 if it's a UK number
    return number.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
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
        {formData?.solicitorAndAgentData && (
          <>
            {/* Solicitor Section */}
            <div className="details-card">
              <h2>Solicitor Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Firm Name:</span>
                  <span className="detail-value">
                    {formData.solicitorAndAgentData.solicitorFirmName || 'Not specified'}
                  </span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">
                    {formatAddress(formData.solicitorAndAgentData.solicitorAddresses)}
                    {formData.solicitorAndAgentData.solicitorPostcode && 
                     `, ${formData.solicitorAndAgentData.solicitorPostcode.toUpperCase()}`}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Contact Name:</span>
                  <span className="detail-value">
                    {formData.solicitorAndAgentData.solicitorContactName || 'Not specified'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Contact Number:</span>
                  <span className="detail-value">
                    {formatPhoneNumber(formData.solicitorAndAgentData.solicitorContactNumber)}
                  </span>
                </div>
              </div>
            </div>

            {/* Estate Agent Section */}
            <div className="details-card">
              <h2>Estate Agent Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Agent Name:</span>
                  <span className="detail-value">
                    {formData.solicitorAndAgentData.estateAgentName || 'Not specified'}
                  </span>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">
                    {formatAddress(formData.solicitorAndAgentData.estateAgentAddresses)}
                    {formData.solicitorAndAgentData.estateAgentPostcode && 
                     `, ${formData.solicitorAndAgentData.estateAgentPostcode.toUpperCase()}`}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Contact Name:</span>
                  <span className="detail-value">
                    {formData.solicitorAndAgentData.estateAgentContactName || 'Not specified'}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Contact Number:</span>
                  <span className="detail-value">
                    {formatPhoneNumber(formData.solicitorAndAgentData.estateAgentContactNumber)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}