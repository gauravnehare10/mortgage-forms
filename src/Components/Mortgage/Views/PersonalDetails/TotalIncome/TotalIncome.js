import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../store';
import '../../../Views/DataDisplay.css';

export default function TotalIncome() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("totalIncomeData");
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

  const calculateCombinedTotal = () => {
    const applicant = formData?.totalIncomeData?.applicant;
    const partner = formData?.totalIncomeData?.partner;
    
    const combinedAnnual = (Number(applicant?.totalAnnualIncome || 0) + 
                          Number(partner?.totalAnnualIncome || 0)).toFixed(2);
    const combinedMonthly = (Number(applicant?.totalNetMonthlyIncome || 0) + 
                           Number(partner?.totalNetMonthlyIncome || 0)).toFixed(2);
    
    return {
      annual: combinedAnnual,
      monthly: combinedMonthly
    };
  };

  const renderIncomeSection = (incomeData, title) => {
    if (!incomeData) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Annual Gross Income:</span>
            <span className="detail-value">{formatCurrency(incomeData.annualGrossMainIncome)}</span>
          </div>
          
          {incomeData.netProfitBeforeTax && (
            <div className="detail-item">
              <span className="detail-label">Net Profit Before Tax:</span>
              <span className="detail-value">{formatCurrency(incomeData.netProfitBeforeTax)}</span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-label">Annual Other Income:</span>
            <span className="detail-value">{formatCurrency(incomeData.annualOtherIncome)}</span>
          </div>
          
          <div className="detail-item highlight">
            <span className="detail-label">Total Annual Income:</span>
            <span className="detail-value">{formatCurrency(incomeData.totalAnnualIncome)}</span>
          </div>
          
          <div className="detail-item highlight">
            <span className="detail-label">Total Net Monthly Income:</span>
            <span className="detail-value">{formatCurrency(incomeData.totalNetMonthlyIncome)}</span>
          </div>
        </div>
      </div>
    );
  };

  const combined = calculateCombinedTotal();

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
        {formData?.totalIncomeData?.applicant && 
          renderIncomeSection(formData.totalIncomeData.applicant, 'Applicant Total Income')}
        
        {formData?.totalIncomeData?.partner && 
          renderIncomeSection(formData.totalIncomeData.partner, 'Partner Total Income')}
        
        {(formData?.totalIncomeData?.applicant || formData?.totalIncomeData?.partner) && (
          <div className="details-card combined-card">
            <h2>Combined Household Income</h2>
            <div className="details-grid">
              <div className="detail-item highlight">
                <span className="detail-label">Total Annual Household Income:</span>
                <span className="detail-value">{formatCurrency(combined.annual)}</span>
              </div>
              <div className="detail-item highlight">
                <span className="detail-label">Total Net Monthly Household Income:</span>
                <span className="detail-value">{formatCurrency(combined.monthly)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}