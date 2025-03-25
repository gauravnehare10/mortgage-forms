import { useState, useEffect } from 'react';
import '../../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';

const ApplicationType = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData} = useFormStore(); 
  const [applicationType, setApplicationTypeData] = useState({
    loanPurpose: [],
    loanType: '',
  });

  const loanPurposes = [
    'Buying First Home', 'Business Purpose', 'Moving House', 'Other Property Purchase',
    'Looking for new mortgage deal', 'Financing home improvements', 'Financing car purchase',
    'Debt Consolidation', 'Divorce Settlement', 'School Fees', 'Tax Bill', 'Other'
  ];

  const loanTypes = [
    'Bridging Loan', 'BTL Further Advance', 'BTL Product Transfer', 'BTL Purchase',
    'BTL Remortgage', 'BTL Secured Loan', 'First Time Buyer', 'Further Advance',
    'Holiday Home', 'Holiday Let', 'Let To Buy', 'Mover', 'Product Transfer',
    'Remortgage', 'Right To Buy', 'Right To Buy Remortgage', 'Second Charge Mortgage',
    'Second Home', 'Self Build', 'Self Build Remortgage', 'Shared Ownership', 'Shared Ownership Remortgage'
  ];

  useEffect(() => {
    fetchFormData("applicationTypeData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.applicationTypeData) {
      setApplicationTypeData({
        loanPurpose: formData.applicationTypeData.loanPurpose || [],
        loanType: formData.applicationTypeData.loanType || '',
      })
    }
  }, [formData.applicationTypeData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setApplicationTypeData((prev) => ({
        ...prev,
        loanPurpose: checked
          ? [...prev.loanPurpose, value]
          : prev.loanPurpose.filter((item) => item !== value),
      }));
    } else {
      setApplicationTypeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('applicationTypeData', applicationType);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/early-repayment')}>Next</button>
        </div>
      </div>

      <h3>Application Type Details</h3>

      {/* Loan Purpose (Checkboxes) */}
      <div className="form-group">
        <label>What is the purpose of the loan? (Select all that apply)</label>
        <div className='employer-check-box'>
          {loanPurposes?.map((purpose) => (
            <label key={purpose}>
              <input
                type="checkbox"
                name="loanPurpose"
                value={purpose}
                checked={applicationType?.loanPurpose?.includes(purpose)}
                onChange={handleChange}
              />
              {purpose}
            </label>
          ))}
        </div>
      </div>

      {/* Loan Type (Dropdown) */}
      <div className="form-group">
        <label>Type of Loan?</label>
        <select
          name="loanType"
          value={applicationType.loanType}
          onChange={handleChange}
          required
        >
          <option value="">Select Loan Type</option>
          {loanTypes?.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/early-repayment')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default ApplicationType;
