import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../../store';
import '../../../Views/DataDisplay.css';

export default function OtherMonthlyIncome() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();
  console.log(formData);

  useEffect(() => {
    fetchFormData("otherMonthlyIncome");
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

  const shouldDisplay = () => {
    const applicant = formData?.otherMonthlyIncome?.applicant;
    const partner = formData?.otherMonthlyIncome?.partner;
    
    return (
      (applicant && Number(applicant.totalOtherIncome) > 0) ||
      (partner && Number(partner.totalOtherIncome) > 0) ||
      (applicant?.receivesStateBenefits === 'Yes') ||
      (partner?.receivesStateBenefits === 'Yes')
    );
  };

  const renderIncomeSection = (incomeData, title) => {
    if (!incomeData) return null;

    const hasIncome = Number(incomeData.totalOtherIncome) > 0;
    const hasBenefits = incomeData.receivesStateBenefits === 'Yes';

    if (!hasIncome && !hasBenefits) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        {hasIncome && (
          <>
            <div className="section-divider">
              <h3>Monthly Income</h3>
            </div>
            
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Occupational Pension:</span>
                <span className="detail-value">{formatCurrency(incomeData.occupationalPension)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Personal Pension:</span>
                <span className="detail-value">{formatCurrency(incomeData.personalPension)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">State Pension:</span>
                <span className="detail-value">{formatCurrency(incomeData.statePension)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Investments:</span>
                <span className="detail-value">{formatCurrency(incomeData.investments)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Maintenance:</span>
                <span className="detail-value">{formatCurrency(incomeData.maintenance)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Rental Income:</span>
                <span className="detail-value">{formatCurrency(incomeData.rentalIncome)}</span>
              </div>
              
              <div className="detail-item highlight">
                <span className="detail-label">Total Other Income:</span>
                <span className="detail-value">{formatCurrency(incomeData.totalOtherIncome)}</span>
              </div>
            </div>
          </>
        )}
        
        {hasBenefits && (
          <>
            <div className="section-divider">
              <h3>State Benefits</h3>
            </div>
            
            <div className="details-grid">
              {incomeData.stateBenefits.childBenefit && (
                <div className="detail-item">
                  <span className="detail-label">Child Benefit:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.childBenefit)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.childTaxCredits && (
                <div className="detail-item">
                  <span className="detail-label">Child Tax Credits:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.childTaxCredits)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.workingTaxCredits && (
                <div className="detail-item">
                  <span className="detail-label">Working Tax Credits:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.workingTaxCredits)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.disabilityLivingAllowance && (
                <div className="detail-item">
                  <span className="detail-label">Disability Living Allowance:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.disabilityLivingAllowance)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.attendanceAllowance && (
                <div className="detail-item">
                  <span className="detail-label">Attendance Allowance:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.attendanceAllowance)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.housingBenefit && (
                <div className="detail-item">
                  <span className="detail-label">Housing Benefit:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.housingBenefit)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.employmentSupportAllowance && (
                <div className="detail-item">
                  <span className="detail-label">Employment Support Allowance:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.employmentSupportAllowance)}</span>
                </div>
              )}
              
              {incomeData.stateBenefits.other && (
                <div className="detail-item">
                  <span className="detail-label">Other Benefits:</span>
                  <span className="detail-value">{formatCurrency(incomeData.stateBenefits.other)}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  if (!shouldDisplay()) {
    return null; // Don't render if no relevant income data exists
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
        {formData?.otherMonthlyIncome?.applicant && 
          renderIncomeSection(formData.otherMonthlyIncome.applicant, 'Applicant Other Income')}
        
        {formData?.otherMonthlyIncome?.partner && 
          renderIncomeSection(formData.otherMonthlyIncome.partner, 'Partner Other Income')}
      </div>
    </div>
  );
}