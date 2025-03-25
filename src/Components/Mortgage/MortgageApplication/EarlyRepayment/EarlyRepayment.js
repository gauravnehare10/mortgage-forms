import { useState, useEffect } from 'react';
import '../../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';

const EarlyRepayment = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [earlyRepayment, setEarlyRepayment] = useState({
    repayPlans: '',
    moveHome: '',
    ercExplanation: '',
    preferredReason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEarlyRepayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchFormData("earlyRepaymentData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.earlyRepaymentData) {
      setEarlyRepayment(formData.earlyRepaymentData)
    }
  }, [formData.earlyRepaymentData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('earlyRepaymentData', earlyRepayment);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/prioritise-your-needs')}>Next</button>
        </div>
      </div>

      <h3>Early Replacement and Moving Home</h3>

      {/* Question 1 */}
      <div className="form-group">
        <label>Do you have any plans to repay part or all of the mortgage in the foreseeable future?</label>
        <div>
          <label>
            <input
              type="radio"
              name="repayPlans"
              value="Yes"
              checked={earlyRepayment.repayPlans === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="repayPlans"
              value="No"
              checked={earlyRepayment.repayPlans === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {/* Question 2 */}
      <div className="form-group">
        <label>Are you likely to move home within the foreseeable future (other than this transaction)?</label>
        <div>
          <label>
            <input
              type="radio"
              name="moveHome"
              value="Yes"
              checked={earlyRepayment.moveHome === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="moveHome"
              value="No"
              checked={earlyRepayment.moveHome === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {/* Question 3 */}
      <div className="form-group">
        <label>Please explain to your customer what an ERC is and in the Customer's Own Words, record the customer's attitude in terms of preferences and trade-offs between improved rate and potential ERC</label>
        <textarea
          name="ercExplanation"
          value={earlyRepayment.ercExplanation}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <h3>Product Types</h3>

      {/* Question 4 */}
      <label>Please tell me:</label>
      <div className="form-group">
        <label>
            <ul>
            <li>
                What is your preference?
            </li>
            <li>
                Why? Please note the reason for this preference.
            </li>
            <li>
                Having explained the available terms and taking into account your future anticipated plans, what term would you prefer to be tied in for and why?
            </li>
            </ul>
        </label>
        <textarea
            name="preferredReason"
            value={earlyRepayment.preferredReason}
            onChange={handleChange}
            rows="3"
        />
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/prioritise-your-needs')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default EarlyRepayment;
