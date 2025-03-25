import { useState, useEffect } from 'react';
import '../../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';

const PrioritiseNeeds = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const navigate = useNavigate();
  const [prioritiseNeeds, setPrioritiseNeeds] = useState({
    importantFeatures: '',
    importanceReason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrioritiseNeeds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchFormData("prioritiseNeedsData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.prioritiseNeedsData) {
      setPrioritiseNeeds(formData.prioritiseNeedsData)
    }
  }, [formData.prioritiseNeedsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('prioritiseNeedsData', prioritiseNeeds);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/establish-budget')}>Next</button>
        </div>
      </div>

      <h3>Prioritise Your Needs</h3>

      {/* Question 1 */}
      <div className="form-group">
        <label>Which of the following features are important to you and why?</label>
        <textarea
            name="importantFeatures"
            value={prioritiseNeeds.importantFeatures}
            onChange={handleChange}
            rows="4"
            />
      </div>
      <div className='form-group'>
        <label>
            <ul>
            <li>No up-front costs (Free Legal, Free Lender Fees and Free Valuation)</li>
            <li>Cashback</li>
            <li>Portable</li>
            <li>Guarantor Acceptable</li>
            <li>Offset Mortgage</li>
            <li>Ability to make overpayments</li>
            <li>Ability to make Repayment Holidays</li>
            <li>No Higher Lending Charges</li>
            <li>No Early Repayment Charges</li>
            <li>No Early Repayment Charges on Partial Repayments</li>
            <li>No Early Repayment Charges payable at the end of the incentive period</li>
            <li>Speed of Completion</li>
            <li>The ability to add fees to your mortgage (extra interest will be payable)</li>
            <li>To minimise any lender arrangement costs (No Booking Fees and No Arrangement Fees)</li>
            </ul>
        </label>
      </div>
      {/* Question 2 */}
      <div className="form-group">
        <label>Please tell me why they are important to you?</label>
        <textarea
          name="importanceReason"
          value={prioritiseNeeds.importanceReason}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/establish-budget')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default PrioritiseNeeds;
