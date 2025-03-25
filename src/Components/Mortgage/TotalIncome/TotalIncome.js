import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PersonalDetails/PersonalDetails.css';
import useFormStore from '../store';

const TotalIncome = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const navigate = useNavigate();
  const [incomeData, setIncomeData] = useState({
    annualGrossMainIncome: 0,
    netProfitBeforeTax: 0,
    annualOtherIncome: 0,
    totalAnnualIncome: 0,
    totalNetMonthlyIncome: 0,
  });

  const handleChange = (field, value) => {
    setIncomeData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchFormData("totalIncomeData");
    fetchFormData("occupationData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.totalIncomeData) {
      setIncomeData(formData.totalIncomeData);
    }
  }, [formData.totalIncomeData]);

  const calculateTotalIncome = () => {
    const grossMainIncome = parseFloat(incomeData.annualGrossMainIncome) || 0;
    const otherIncome = parseFloat(incomeData.annualOtherIncome) || 0;
    const profitBeforeTax = parseFloat(incomeData.netProfitBeforeTax) || 0;

    const totalAnnualIncome = grossMainIncome + otherIncome + profitBeforeTax;
    
    const taxRate = 0.2;
    const totalTax = totalAnnualIncome * taxRate;
    const netAnnualIncome = totalAnnualIncome - totalTax;
    const netMonthlyIncome = netAnnualIncome / 12;

    handleChange('totalAnnualIncome', totalAnnualIncome.toFixed(2));
    handleChange('totalNetMonthlyIncome', netMonthlyIncome.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('totalIncomeData', incomeData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/existing-credit-commits')}>Next</button>
        </div>
      </div>

      <h3>Total Income Details</h3>

      <div className="form-group">
        <label>Total Annual Gross Main Employed Income:</label>
        <input
          type="number"
          value={incomeData.annualGrossMainIncome}
          onChange={(e) => handleChange('annualGrossMainIncome', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Net Profit before Tax</label>
        <input
          type="number"
          value={incomeData.netProfitBeforeTax}
          onChange={(e) => handleChange('netProfitBeforeTax', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Total Annual Other Income (Including Non-Working):</label>
        <input
          type="number"
          value={incomeData.annualOtherIncome}
          onChange={(e) => handleChange('annualOtherIncome', e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="calc-button" type="button" onClick={calculateTotalIncome}>Calculate</button>
      </div>

      <div className="form-group">
        <label>Total Annual Income:</label>
        <input type="number" value={incomeData.totalAnnualIncome} readOnly />
      </div>

      <div className="form-group">
        <label>Total Net Monthly Income:</label>
        <input type="number" value={incomeData.totalNetMonthlyIncome} readOnly />
      </div>
    </form>
  );
};

export default TotalIncome;