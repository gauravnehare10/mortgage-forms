import { useEffect, useState } from 'react';
import "../../PersonalDetails/PersonalDetails.css";
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';

const SelfEmpIncomeDetails = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [forms, setForms] = useState({
    client: null,
    partner: null
  });
  
  const navigate = useNavigate();

  // Initialize form data structure
  const getInitialIncomeData = () => ({
    isDirector: '',
    shareholdingPercentage: '',
    annualNetProfitLastYear: '',
    annualNetProfit2YearsAgo: '',
    annualNetProfit3YearsAgo: '',
    dividendsLastYear: '',
    dividends2YearsAgo: '',
    dividends3YearsAgo: '',
    payeSalaryLastYear: '',
    payeSalary2YearsAgo: '',
    payeSalary3YearsAgo: '',
    currentNetMonthlyIncome: '',
  });

  useEffect(() => {
    fetchFormData("selfEmployedIncomeData");
    fetchFormData("occupationData");
  }, [fetchFormData]);

  useEffect(() => {
    // Initialize forms based on occupation status
    const updatedForms = {
      client: formData.occupationData?.client?.status === "Self-Employed"
        ? formData.selfEmployedIncomeData?.client || getInitialIncomeData()
        : null,
      partner: formData.occupationData?.partner?.status === "Self-Employed"
        ? formData.selfEmployedIncomeData?.partner || getInitialIncomeData()
        : null
    };
    
    setForms(updatedForms);
  }, [formData.occupationData, formData.selfEmployedIncomeData]);

  const handleChange = (person, field, value) => {
    setForms(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out null forms before saving
    const dataToSave = {
      client: forms.client || null,
      partner: forms.partner || null
    };
    updateFormData("selfEmployedIncomeData", dataToSave);
    navigate('/mortgage/add-details/secondary-occupation');
  };

  // Check if we should show any forms
  const showClientForm = formData.occupationData?.client?.status === "Self-Employed";
  const showPartnerForm = formData.occupationData?.partner?.status === "Self-Employed";

  if (!showClientForm && !showPartnerForm) {
    return (
      <div className="form-container">
        <p>No self-employed individuals in this application.</p>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  const renderIncomeForm = (person, data) => (
    <div className="self-employed-income-form-section">
      <h4>{person === 'client' ? 'Client' : 'Partner'} Income Details</h4>
      
      {/* Are you a limited company director? */}
      <div className="form-group">
        <label>Are you a limited company director?</label>
        <div>
          <label>
            <input
              type="radio"
              name={`${person}-isDirector`}
              value="Yes"
              checked={data.isDirector === 'Yes'}
              onChange={(e) => handleChange(person, 'isDirector', e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name={`${person}-isDirector`}
              value="No"
              checked={data.isDirector === 'No'}
              onChange={(e) => handleChange(person, 'isDirector', e.target.value)}
            />
            No
          </label>
        </div>
      </div>

      {/* Conditional Fields for Directors */}
      {data.isDirector === 'Yes' && (
        <>
          <div className="form-group">
            <label>What percentage of shareholding do you have?</label>
            <input
              type="number"
              value={data.shareholdingPercentage}
              onChange={(e) => handleChange(person, 'shareholdingPercentage', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Annual Net Profit Last Year:</label>
            <input
              type="number"
              value={data.annualNetProfitLastYear}
              onChange={(e) => handleChange(person, 'annualNetProfitLastYear', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Annual Net Profit 2 Years Ago:</label>
            <input
              type="number"
              value={data.annualNetProfit2YearsAgo}
              onChange={(e) => handleChange(person, 'annualNetProfit2YearsAgo', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Annual Net Profit 3 Years Ago:</label>
            <input
              type="number"
              value={data.annualNetProfit3YearsAgo}
              onChange={(e) => handleChange(person, 'annualNetProfit3YearsAgo', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Dividends Last Year:</label>
            <input
              type="number"
              value={data.dividendsLastYear}
              onChange={(e) => handleChange(person, 'dividendsLastYear', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Dividends 2 Years Ago:</label>
            <input
              type="number"
              value={data.dividends2YearsAgo}
              onChange={(e) => handleChange(person, 'dividends2YearsAgo', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Dividends 3 Years Ago:</label>
            <input
              type="number"
              value={data.dividends3YearsAgo}
              onChange={(e) => handleChange(person, 'dividends3YearsAgo', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>PAYE Salary Last Year:</label>
            <input
              type="number"
              value={data.payeSalaryLastYear}
              onChange={(e) => handleChange(person, 'payeSalaryLastYear', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>PAYE Salary 2 Years Ago:</label>
            <input
              type="number"
              value={data.payeSalary2YearsAgo}
              onChange={(e) => handleChange(person, 'payeSalary2YearsAgo', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>PAYE Salary 3 Years Ago:</label>
            <input
              type="number"
              value={data.payeSalary3YearsAgo}
              onChange={(e) => handleChange(person, 'payeSalary3YearsAgo', e.target.value)}
            />
          </div>
        </>
      )}

      {/* Fields for Non-Directors */}
      {data.isDirector === 'No' && (
        <>
          <div className="form-group">
            <label>Annual Net Profit Last Year:</label>
            <input
              type="number"
              value={data.annualNetProfitLastYear}
              onChange={(e) => handleChange(person, 'annualNetProfitLastYear', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Annual Net Profit 2 Years Ago:</label>
            <input
              type="number"
              value={data.annualNetProfit2YearsAgo}
              onChange={(e) => handleChange(person, 'annualNetProfit2YearsAgo', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Annual Net Profit 3 Years Ago:</label>
            <input
              type="number"
              value={data.annualNetProfit3YearsAgo}
              onChange={(e) => handleChange(person, 'annualNetProfit3YearsAgo', e.target.value)}
            />
          </div>
        </>
      )}

      {/* Common Field for All */}
      <div className="form-group">
        <label>Current Net Monthly Income:</label>
        <input
          type="number"
          value={data.currentNetMonthlyIncome}
          onChange={(e) => handleChange(person, 'currentNetMonthlyIncome', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/secondary-occupation')}>Next</button>
        </div>
      </div>
      
      <h3>Self Employed or Director/Shareholder Income Details</h3>
      
      {showClientForm && forms.client && renderIncomeForm('client', forms.client)}
      {showPartnerForm && forms.partner && renderIncomeForm('partner', forms.partner)}

      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/secondary-occupation')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default SelfEmpIncomeDetails;