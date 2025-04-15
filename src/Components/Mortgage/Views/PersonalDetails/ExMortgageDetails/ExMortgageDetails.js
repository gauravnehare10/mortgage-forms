import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../store';
import '../../../Views/DataDisplay.css';

export default function ExMortgageDetails() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("existingMortgageData");
  }, [fetchFormData]);

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '£0';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(amount));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatAddress = (addressArray) => {
    if (!addressArray || !Array.isArray(addressArray)) return 'Not specified';
    const filteredAddress = addressArray.filter(part => part && part.trim() !== '');
    return filteredAddress.join(', ') || 'Not specified';
  };

  const shouldDisplay = () => {
    const applicant = formData?.existingMortgageData?.applicant;
    const partner = formData?.existingMortgageData?.partner;
    
    return (
      (applicant?.hasMortgage === 'Yes' && applicant?.mortgages?.length > 0) ||
      (partner?.hasMortgage === 'Yes' && partner?.mortgages?.length > 0)
    );
  };

  const renderMortgage = (mortgage, index) => {
    return (
      <div key={`mortgage-${index}`} className="mortgage-card">
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Mortgage Type:</span>
            <span className="detail-value">{mortgage.mortgageType || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Lender:</span>
            <span className="detail-value">{mortgage.lenderName || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Account Number:</span>
            <span className="detail-value">{mortgage.accountNumber || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Property Value:</span>
            <span className="detail-value">{formatCurrency(mortgage.currentValue)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Current Balance:</span>
            <span className="detail-value">{formatCurrency(mortgage.currentBalance)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Monthly Payment:</span>
            <span className="detail-value">{formatCurrency(mortgage.monthlyRepayment)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Remaining Term:</span>
            <span className="detail-value">{mortgage.remainingTerm || '0'} months</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Repayment Type:</span>
            <span className="detail-value">{mortgage.repaymentType || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Interest Rate Type:</span>
            <span className="detail-value">{mortgage.interestRateType || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Current Rate:</span>
            <span className="detail-value">{mortgage.currentInterestRate || '0'}%</span>
          </div>
          
          {mortgage.rateEndDate && (
            <div className="detail-item">
              <span className="detail-label">Rate End Date:</span>
              <span className="detail-value">{formatDate(mortgage.rateEndDate)}</span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-label">Revert Rate:</span>
            <span className="detail-value">{mortgage.revertRate || '0'}%</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Early Repayment Charges:</span>
            <span className="detail-value">{mortgage.hasEarlyRepaymentCharges || 'No'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Portable:</span>
            <span className="detail-value">{mortgage.isPortable || 'No'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Will Redeem Now:</span>
            <span className="detail-value">{mortgage.willRedeemNow || 'No'}</span>
          </div>
          
          <div className="detail-item full-width">
            <span className="detail-label">Property Address:</span>
            <span className="detail-value">
              {formatAddress(mortgage.propertyAddress)}
              {mortgage.postcode && `, ${mortgage.postcode.toUpperCase()}`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderMortgagesSection = (data, title) => {
    if (!data || data.hasMortgage !== 'Yes' || !data.mortgages?.length) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        {data.mortgages.map((mortgage, index) => (
          renderMortgage(mortgage, index)
        ))}
      </div>
    );
  };

  if (!shouldDisplay()) {
    return null;
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
        {formData?.existingMortgageData?.applicant && 
          renderMortgagesSection(formData.existingMortgageData.applicant, 'Applicant Existing Mortgages')}
        
        {formData?.existingMortgageData?.partner && 
          renderMortgagesSection(formData.existingMortgageData.partner, 'Partner Existing Mortgages')}
      </div>
    </div>
  );
}