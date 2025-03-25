import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PersonalDetails/PersonalDetails.css';
import useFormStore from '../store';

const initialExpenditure = {
  mortgage: 0,
  rentBoard: 0,
  childCare: 0,
  schoolFees: 0,
  councilTax: 0,
  water: 0,
  electricity: 0,
  gas: 0,
  homePhone: 0,
  mobilePhone: 0,
  tvLicence: 0,
  loans: 0,
  creditCards: 0,
  hirePurchase: 0,
  bankFees: 0,
  protectionPolicies: 0,
  carInsurance: 0,
  buildingInsurance: 0,
  petInsurance: 0,
  otherInsurance: 0,
  food: 0,
  cigarettes: 0,
  alcohol: 0,
  clothes: 0,
  householdMaintenance: 0,
  travelCosts: 0,
  commuting: 0,
  savingsPlans: 0,
  pensionPlans: 0,
  entertainment: 0,
  holidays: 0,
  membershipFees: 0,
  otherItems: 0,
  totalExpenditure: 0
};

const expenditureCategories = {
  committedExpend: [
    { label: 'Mortgage', key: 'mortgage' },
    { label: 'Rent/Board', key: 'rentBoard' },
    { label: 'Child Care/Maintenance Payments', key: 'childCare' },
    { label: 'School Fees/Education Costs', key: 'schoolFees' },
  ],
  utilities: [
    { label: 'Council Tax', key: 'councilTax' },
    { label: 'Water', key: 'water' },
    { label: 'Electricity', key: 'electricity' },
    { label: 'Gas', key: 'gas' },
    { label: 'Home Phone/Broadband', key: 'homePhone' },
    { label: 'Mobile Phone', key: 'mobilePhone' },
    { label: 'TV Licence', key: 'tvLicence'}
  ],
  creditCommits: [
    { label: "Loans", key: 'loans'}, 
    { label: "Credit Cards/Store Cards", key: 'creditCards'},
    { label: "Hire Purchase/Lease/Car Finance", key: 'hirePurchase'},
    { label: "Bank Changes/Monthly Fees", key: 'bankFees'}
  ],
  insurances: [
    { label: 'Existing Protection Policies (Life, CIC, income Protection, ASU, Endowments)', key: 'protectionPolicies'},
    { label: 'Car insurance', key: 'carInsurance'}, 
    { label: 'Building only/Buildings & Contents insurance', key: 'buildingInsurance'}, 
    { label: 'Pet insurance', key: 'petInsurance'}, 
    { label: 'Other Insurance Contracts mobile phone/boiler cover/specialist i.e. jeweliery/bikes', key: 'otherInsurance'}
  ],
  genLivingCosts: [
    { label: "Food & Non-alcoholic Drinks", key: 'food',}, 
    { label: "Cigarettes", key: 'cigarettes',}, 
    { label: "Alcohol", key: 'alcohol',}, 
    { label: "Cloths", key: 'clothes',}, 
    { label: "General Household Maintenance i.e. window cleaner, cleaner, gardner", key: 'householdMaintenance',}, 
    { label: "Travel Costs e.g. Petrol", key: 'travelCosts',}, 
    { label: "Commuting", key: 'commuting',},
  ],
  savingInvest: [
    {label: "Savings Plans", key: 'savingsPlans'}, 
    {label: "Pension Plans", key: 'pensionPlans'}
  ],
  nonCommitExpend: [
    { label: 'Entertainment/Social', key: 'entertainment'}, 
    { label: 'Holidays', key: 'holidays'}, 
    { label: 'Professional Membership Fees/Subsciptions', key: 'membershipFees'}, 
    { label: 'Other Items', key: 'otherItems'}
  ]
};

const MonthlyExpenditure = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [hasPartner, setHasPartner] = useState(false);
  const [expenditureData, setExpenditureData] = useState({
    applicant: { ...initialExpenditure },
    partner: { ...initialExpenditure }
  });

  const handleChange = (field, value, person = 'applicant') => {
    setExpenditureData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value
      }
    }));
  };

  useEffect(() => {
    fetchFormData("mainDetails");
    fetchFormData("expenditureData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.mainDetails) {
      setHasPartner(formData.mainDetails.partners?.length > 0);
    }
    
    if (formData.expenditureData) {
      setExpenditureData({
        applicant: {
          ...initialExpenditure,
          ...(formData.expenditureData.applicant || {})
        },
        partner: {
          ...initialExpenditure,
          ...(formData.expenditureData.partner || {})
        }
      });
    }
  }, [formData.expenditureData, formData.mainDetails]);

  const calculateTotal = (person = 'applicant') => {
    const { totalExpenditure, ...fields } = expenditureData[person];
    const total = Object.values(fields).reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
    handleChange('totalExpenditure', total.toFixed(2), person);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('expenditureData', expenditureData);
  };

  const renderExpenditureForm = (person, title) => {
    const personData = expenditureData[person] || { ...initialExpenditure };
    
    return (
      <>
        <h4>{title}</h4>
        
        <h5>Committed Expenditure</h5>
        {expenditureCategories.committedExpend.map(({ label, key }) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <h5>Utilities</h5>
        {expenditureCategories.utilities.map(({ label, key }) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <h5>Credit Commitments</h5>
        {expenditureCategories.creditCommits.map(({ label, key }) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <h5>Insurances</h5>
        {expenditureCategories.insurances.map(({ label, key }) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <h5>General Living Costs</h5>
        {expenditureCategories.genLivingCosts.map(({label, key}) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <h5>Savings and Investments</h5>
        {expenditureCategories.savingInvest.map(({label, key}) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <h5>Non-Committed Expenditure</h5>
        {expenditureCategories.nonCommitExpend.map(({label, key}) => (
          <div className="form-group" key={key}>
            <label>{label}:</label>
            <input
              type="number"
              value={personData[key]}
              onChange={(e) => handleChange(key, e.target.value, person)}
            />
          </div>
        ))}

        <div className="form-group">
          <label>Total Monthly Expenditure:</label>
          <input type="number" value={personData.totalExpenditure} readOnly />
        </div>
        <div className="form-group">
          <button 
            className="calc-button" 
            type="button" 
            onClick={() => calculateTotal(person)}
          >
            Calculate for {title}
          </button>
        </div>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-buttons">
        <div className="form-buttons-card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="form-buttons-card">
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/emergency-fund')}>Next</button>
        </div>
      </div>

      <h3>Monthly Expenditure Details</h3>

      {renderExpenditureForm('applicant', 'Your Expenditure')}

      {hasPartner && renderExpenditureForm('partner', "Partner's Expenditure")}

      <div className="form-buttons">
        <div className="form-buttons-card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="form-buttons-card">
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/emergency-fund')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default MonthlyExpenditure;