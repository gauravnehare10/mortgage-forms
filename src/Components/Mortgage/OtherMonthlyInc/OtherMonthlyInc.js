import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PersonalDetails/PersonalDetails.css';
import useFormStore from '../store';

const OtherMonthlyInc = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();

  const [incomeData, setIncomeData] = useState(formData.otherMonthlyIncome || {
    occupationalPension: 0,
    personalPension: 0,
    statePension: 0,
    investments: 0,
    maintenance: 0,
    rentalIncome: 0,
    receivesStateBenefits: '',
    totalOtherIncome: 0,
    stateBenefits: {
      childBenefit: 0,
      childTaxCredits: 0,
      workingTaxCredits: 0,
      disabilityLivingAllowance: 0,
      attendanceAllowance: 0,
      housingBenefit: 0,
      employmentSupportAllowance: 0,
      other: 0,
    },
  });

  const handleChange = (field, value) => {
    setIncomeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStateBenefitsChange = (field, value) => {
    setIncomeData((prev) => ({
      ...prev,
      stateBenefits: {
        ...prev.stateBenefits,
        [field]: value,
      },
    }));
  };

  const calculateTotalIncome = () => {
    const total = [
      incomeData.occupationalPension,
      incomeData.personalPension,
      incomeData.statePension,
      incomeData.investments,
      incomeData.maintenance,
      incomeData.rentalIncome,
      ...(incomeData.receivesStateBenefits === 'Yes'
        ? Object.values(incomeData.stateBenefits)
        : []),
    ].reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    handleChange('totalOtherIncome', total.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (incomeData.receivesStateBenefits === "No") {
      setIncomeData((prev) => ({
        ...prev,
        stateBenefits: {
          childBenefit: 0,
          childTaxCredits: 0,
          workingTaxCredits: 0,
          disabilityLivingAllowance: 0,
          attendanceAllowance: 0,
          housingBenefit: 0,
          employmentSupportAllowance: 0,
          other: 0,
        },
      }));
    }
    updateFormData('otherMonthlyIncome', incomeData);
  };

  useEffect(() => {
    fetchFormData("otherMonthlyIncome");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.otherMonthlyIncome) {
      setIncomeData(formData.otherMonthlyIncome);
    }
  }, [formData.otherMonthlyIncome]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-buttons">
        <div className="form-buttons-card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="form-buttons-card">
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/other-income-source')}>Next</button>
        </div>
      </div>

      <h3>Other Monthly Income Details</h3>

      {[
        'occupationalPension',
        'personalPension',
        'statePension',
        'investments',
        'maintenance',
        'rentalIncome',
      ].map((field, idx) => (
        <div key={idx} className="form-group">
          <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</label>
          <input
            type="number"
            value={incomeData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </div>
      ))}

      <div className="form-group">
        <label>Do you receive any State Benefits?</label>
        <div>
          <label>
            <input
              type="radio"
              name="stateBenefits"
              value="Yes"
              checked={incomeData.receivesStateBenefits === 'Yes'}
              onChange={(e) => handleChange('receivesStateBenefits', e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="stateBenefits"
              value="No"
              checked={incomeData.receivesStateBenefits === 'No'}
              onChange={(e) => handleChange('receivesStateBenefits', e.target.value)}
            />
            No
          </label>
        </div>
      </div>

      {incomeData.receivesStateBenefits === 'Yes' && (
      <>
        <h4>State Benefits Details</h4>
        {[
          'childBenefit',
          'childTaxCredits',
          'workingTaxCredits',
          'disabilityLivingAllowance',
          'attendanceAllowance',
          'housingBenefit',
          'employmentSupportAllowance',
          'other',
        ].map((field, idx) => (
          <div key={idx} className="form-group">
            <label>
              {field
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}:
            </label>
            <input
              type="number"
              value={incomeData.stateBenefits?.[field] || 0} // Fallback to 0 if undefined
              onChange={(e) => handleStateBenefitsChange(field, e.target.value)}
            />
          </div>
        ))}
      </>
    )}

      <button className="calc-button" type="button" onClick={calculateTotalIncome}>
        Calculate Total Income
      </button>

      <div className="form-group">
        <label>Total of Other Monthly Income:</label>
        <input type="number" value={incomeData.totalOtherIncome} readOnly />
      </div>

      <div className="form-buttons">
        <div className="form-buttons-card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="form-buttons-card">
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/other-income-source')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default OtherMonthlyInc;