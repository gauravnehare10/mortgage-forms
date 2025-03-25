import { useState, useEffect } from 'react';
import '../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../store';

const initialNonWorkingData = {
  recOtherIncome: '',
  monthlyAmount: '',
  moneyOriginatedFrom: '',
};

const NonWorking = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const navigate = useNavigate();
  const [hasPartner, setHasPartner] = useState(false);
  const [nonWorkingData, setNonWorkingData] = useState({
    applicant: { ...initialNonWorkingData },
    partner: { ...initialNonWorkingData }
  });

  useEffect(() => {
    fetchFormData("mainDetails");
    fetchFormData("nonWorkingData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.mainDetails) {
      setHasPartner(formData.mainDetails.partners?.length > 0);
    }
    
    if (formData.nonWorkingData) {
      setNonWorkingData({
        applicant: {
          ...initialNonWorkingData,
          ...(formData.nonWorkingData.applicant || {})
        },
        partner: {
          ...initialNonWorkingData,
          ...(formData.nonWorkingData.partner || {})
        }
      });
    }
  }, [formData]);

  const handleChange = (e, person = 'applicant') => {
    const { name, value } = e.target;
    setNonWorkingData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [name]: value,
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear fields if "No" is selected for either applicant or partner
    const updatedData = { ...nonWorkingData };
    
    ['applicant', 'partner'].forEach(person => {
      if (updatedData[person].recOtherIncome === "No") {
        updatedData[person] = {
          ...updatedData[person],
          monthlyAmount: '',
          moneyOriginatedFrom: ''
        };
      }
    });

    updateFormData('nonWorkingData', updatedData);
  };

  const renderNonWorkingForm = (person, title) => {
    const personData = nonWorkingData[person] || { ...initialNonWorkingData };
    
    return (
      <>
        <h4>{title}</h4>
        <div className="form-group">
          <label>Do you receive other income / does someone else cover your expenses?</label>
          <div>
            <label>
              <input
                type="radio"
                name="recOtherIncome"
                value="Yes"
                checked={personData.recOtherIncome === 'Yes'}
                onChange={(e) => handleChange(e, person)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recOtherIncome"
                value="No"
                checked={personData.recOtherIncome === 'No'}
                onChange={(e) => handleChange(e, person)}
              />
              No
            </label>
          </div>
        </div>

        {personData.recOtherIncome === "Yes" && (
          <>
            <div className="form-group">
              <label>Monthly Amount Received:</label>
              <input
                name='monthlyAmount'
                type="number"
                value={personData.monthlyAmount}
                onChange={(e) => handleChange(e, person)}
              />
            </div>

            <div className="form-group">
              <label>Please provide details i.e. where the money originated from /or who pays?</label>
              <input
                name='moneyOriginatedFrom'
                type="text"
                value={personData.moneyOriginatedFrom}
                onChange={(e) => handleChange(e, person)}
              />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/total-income')}>Next</button>
        </div>
      </div>

      <h3>Non-Working - Other Income Source</h3>

      {renderNonWorkingForm('applicant', 'Your Details')}

      {hasPartner && renderNonWorkingForm('partner', "Partner's Details")}

      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/total-income')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default NonWorking;