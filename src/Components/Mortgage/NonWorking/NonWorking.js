import { useState, useEffect } from 'react';
import '../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../store';

const NonWorking = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const navigate = useNavigate();
  const [nonWorkingData, setNonWorkingData] = useState({
    recOtherIncome: '',
    monthlyAmount: '',
    moneyOriginatedFrom: '',
  });

  useEffect(() => {
    fetchFormData("nonWorkingData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.nonWorkingData) {
      setNonWorkingData(formData.nonWorkingData);
    }
  }, [formData.nonWorkingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNonWorkingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nonWorkingData.recOtherIncome === "No") {
      nonWorkingData.monthlyAmount = ''
      nonWorkingData.moneyOriginatedFrom = ''
    }
    updateFormData('nonWorkingData', nonWorkingData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={()=> {navigate(-1)}}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/total-income')}>Next</button>
        </div>
      </div>

      <h3>Non-Working - Other Income Source</h3>

      <div className="form-group">
        <label>Do you receive other income / does someone else cover your expenses?</label>
        <div>
          <label>
            <input
              type="radio"
              name="recOtherIncome"
              value="Yes"
              checked={nonWorkingData.recOtherIncome === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="recOtherIncome"
              value="No"
              checked={nonWorkingData.recOtherIncome === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

        { nonWorkingData.recOtherIncome === "Yes" && (
          <>
          <div className="form-group">
            <label>Monthly Amount Received:</label>
            <input
              name='monthlyAmount'
              type="number"
              value={nonWorkingData.monthlyAmount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <label>Please provide details i.e. where the money originated from /or who pays?</label>
          <input
            name='moneyOriginatedFrom'
            type="textarea"
            value={nonWorkingData.moneyOriginatedFrom}
            onChange={handleChange}
          />
          </div>
          </>
        )}
    </form>
  );
};

export default NonWorking;

