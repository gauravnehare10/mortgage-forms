import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../PersonalDetails/PersonalDetails.css';
import useFormStore from '../../store';

const RepayingMortgage = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const navigate = useNavigate();
  const [repaymentMortgage, setRepaymentMortgage] = useState({
    mortgageRepaymentCertainty: '',
    repaymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepaymentMortgage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchFormData("repaymentMortgageData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.repaymentMortgageData) {
      setRepaymentMortgage(formData.repaymentMortgageData)
    }
  }, [formData.repaymentMortgageData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('repaymentMortgageData', repaymentMortgage);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/solicitor-estate-agent')}>Next</button>
        </div>
      </div>

      <h3>Repaying Mortgage Details</h3>

      <div className="form-group">
        <label>Is it important for you to be certain that your mortgage will be repaid at the end of term, provided you pay the required payments on time?</label>
        <div>
            <label>
            <input
                type="radio"
                name="mortgageRepaymentCertainty"
                value="Yes"
                checked={repaymentMortgage.mortgageRepaymentCertainty === 'Yes'}
                onChange={handleChange}
            />
            Yes
            </label>
            <label>
            <input
                type="radio"
                name="mortgageRepaymentCertainty"
                value="No"
                checked={repaymentMortgage.mortgageRepaymentCertainty === 'No'}
                onChange={handleChange}
            />
            No
            </label>
        </div>
      </div>

      <div className="form-group">
        <label>How do you intend to repay your mortgage?</label>
        <select name="repaymentMethod" value={repaymentMortgage.repaymentMethod} onChange={handleChange}>
          <option value="Capital Repayment">Capital Repayment</option>
          <option value="Interest Only">Interest Only</option>
          <option value="Part and Part">Part and Part</option>
        </select>
      </div>
    </form>
  );
};

export default RepayingMortgage;
