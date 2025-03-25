import { useState, useEffect } from 'react';
import '../../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';

const initialBudgetData = {
  netDisposableIncome: 0,
  monthlyMortgageAllocation: 0,
};

const EstablishBudget = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [hasPartner, setHasPartner] = useState(false);
  const [budgetData, setBudgetData] = useState({
    applicant: { ...initialBudgetData },
    partner: { ...initialBudgetData }
  });

  const handleChange = (e, person = 'applicant') => {
    const { name, value } = e.target;
    setBudgetData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [name]: value,
      }
    }));
  };

  useEffect(() => {
    fetchFormData("mainDetails");
    fetchFormData("establishBudgetData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.mainDetails) {
      setHasPartner(formData.mainDetails.partners?.length > 0);
    }
    
    if (formData.establishBudgetData) {
      setBudgetData({
        applicant: {
          ...initialBudgetData,
          ...(formData.establishBudgetData.applicant || {})
        },
        partner: {
          ...initialBudgetData,
          ...(formData.establishBudgetData.partner || {})
        }
      });
    }
  }, [formData.establishBudgetData, formData.mainDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('establishBudgetData', budgetData);
  };

  const renderBudgetForm = (person, title) => {
    const personData = budgetData[person] || { ...initialBudgetData };
    
    return (
      <>
        <h4>{title}</h4>
        
        {/* NET Disposable Income */}
        <div className="form-group">
          <label>Available NET Disposable Income</label>
          <input
            type="number"
            name="netDisposableIncome"
            value={personData.netDisposableIncome}
            onChange={(e) => handleChange(e, person)}
          />
        </div>

        {/* Monthly Mortgage Allocation */}
        <div className="form-group">
          <label>How much do you believe you can allocate towards your monthly mortgage payments?</label>
          <input
            type="number"
            name="monthlyMortgageAllocation"
            value={personData.monthlyMortgageAllocation}
            onChange={(e) => handleChange(e, person)}
          />
        </div>
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
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/mortgage-details')}>Next</button>
        </div>
      </div>

      <h3>Establishing a Budget</h3>

      {renderBudgetForm('applicant', 'Your Budget')}

      {hasPartner && renderBudgetForm('partner', "Partner's Budget")}

      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/mortgage-details')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default EstablishBudget;