import { useState, useEffect } from 'react';
import '../../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';

const EstablishBudget = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [establishBudget, setEstablishBudget] = useState({
    netDisposableIncome: 0,
    monthlyMortgageAllocation: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstablishBudget((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchFormData("establishBudgetData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.establishBudgetData) {
      setEstablishBudget(formData.establishBudgetData)
    }
  }, [formData.establishBudgetData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('establishBudgetData', establishBudget);
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

      {/* NET Disposable Income */}
      <div className="form-group">
        <label>Available NET Disposable Income</label>
        <input
          type="number"
          name="netDisposableIncome"
          value={establishBudget.netDisposableIncome}
          onChange={handleChange}
        />
      </div>

      {/* Monthly Mortgage Allocation */}
      <div className="form-group">
        <label>How much do you believe you can allocate towards your monthly mortgage payments?</label>
        <input
          type="number"
          name="monthlyMortgageAllocation"
          value={establishBudget.monthlyMortgageAllocation}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default EstablishBudget;
