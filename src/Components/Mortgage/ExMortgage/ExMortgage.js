import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../PersonalDetails/PersonalDetails.css';
import useFormStore from '../store';

const ExMortgage = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [hasMortgage, setHasMortgage] = useState('');
  const [mortgages, setMortgages] = useState([]);

  const handleMortgageChange = (value) => {
    setHasMortgage(value);
    if (value === 'Yes' && mortgages.length === 0) {
      addMortgage();
    } else if (value === 'No') {
      setMortgages([]);
    }
  };

  const addMortgage = () => {
    setMortgages((prev) => [
      ...prev,
      {
        mortgageType: '',
        currentValue: '',
        lenderName: '',
        accountNumber: '',
        currentBalance: '',
        remainingTerm: '',
        monthlyRepayment: '',
        repaymentType: '',
        interestRateType: '',
        currentInterestRate: '',
        rateEndDate: '',
        revertRate: '',
        hasEarlyRepaymentCharges: '',
        isPortable: '',
        willRedeemNow: '',
        propertyAddress: ['', '', '', '', ''],
        postcode: ''
      },
    ]);
  };

  const deleteMortgage = (index) => {
    setMortgages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedMortgages = [...mortgages];
    updatedMortgages[index][field] = value;
    setMortgages(updatedMortgages);
  };

  useEffect(() => {
    fetchFormData("existingMortgageData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.existingMortgageData) {
      setHasMortgage(formData.existingMortgageData.hasMortgage || "")
      setMortgages(formData.existingMortgageData.mortgages || []);
    }
  }, [formData.existingMortgageData]);

  const handleAddressChange = async (index) => {
    const postcode = mortgages[index].postcode;
    if (!postcode.trim()) {
      alert('Please enter a postcode.');
      return;
    }

    try {
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const { admin_district, admin_ward } = response.data.result || {};
      handleChange(index, 'propertyAddress', [ '', admin_ward || '', admin_district || '', '', 'United Kingdom']);
    } catch (error) {
      alert('Error fetching address. Please check the postcode.');
      console.error('Address lookup error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('existingMortgageData', { hasMortgage, mortgages });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-buttons">
        <div className="form-buttons-card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="form-buttons-card">
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/monthly-expenditure')}>Next</button>
        </div>
      </div>

      <h3>Existing Mortgage Details</h3>

      <div className="form-group">
        <label>Do you have any existing mortgage?</label>
        <div>
            <label>
            <input
                type="radio"
                value="Yes"
                checked={hasMortgage === 'Yes'}
                onChange={() => handleMortgageChange('Yes')}
            />
            Yes
            </label>
            <label>
            <input
                type="radio"
                value="No"
                checked={hasMortgage === 'No'}
                onChange={() => handleMortgageChange('No')}
            />
            No
            </label>
        </div>
      </div>

      {mortgages.map((mortgage, index) => (
        <div key={index} className="mortgage-section">
          <div className="form-group">
            <label>Type of Mortgage:</label>
            <select value={mortgage.mortgageType} onChange={(e) => handleChange(index, 'mortgageType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="Fixed">Fixed</option>
              <option value="Tracker">Tracker</option>
              <option value="Variable">Variable</option>
            </select>
          </div>

          <div className="form-group">
          <label>Current Value:</label>
          <input
              type="text"
              value={mortgage.currentValue}
              onChange={(e) => handleChange(index, 'currentValue', e.target.value)}
          />
          </div>
 
          <div className="form-group">
          <label>Name of Lender:</label>
          <input
              type="text"
              value={mortgage.lenderName}
              onChange={(e) => handleChange(index, 'lenderName', e.target.value)}
          />
          </div>

          <div className="form-group">
          <label>Account Number:</label>
          <input
              type="number"
              value={mortgage.accountNumber}
              onChange={(e) => handleChange(index, 'accountNumber', e.target.value)}
          />
          </div>
 
          <div className="form-group">
          <label>Current Balance:</label>
          <input
              type="number"
              value={mortgage.currentBalance}
              onChange={(e) => handleChange(index, 'currentBalance', e.target.value)}
          />
          </div>

          <div className="form-group">
          <label>Remaining Term:</label>
          <input
              type="number"
              value={mortgage.remainingTerm}
              onChange={(e) => handleChange(index, 'remainingTerm', e.target.value)}
          />
          </div>

          <div className="form-group">
          <label>Monthly Repayment Amount:</label>
          <input
              type="number"
              value={mortgage.monthlyRepayment}
              onChange={(e) => handleChange(index, 'monthlyRepayment', e.target.value)}
          />
          </div>

          <div className="form-group">
            <label>Repayment Type:</label>
            <select value={mortgage.repaymentType} onChange={(e) => handleChange(index, 'repaymentType', e.target.value)}>
              <option value="">Select Repayment Type</option>
              <option value="Repayment">Repayment</option>
              <option value="Interest Only">Interest Only</option>
            </select>
          </div>

          <div className="form-group">
            <label>Type of Interest Rate (require if mortgage to be redeemed or altered):</label>
            <select value={mortgage.interestRateType} onChange={(e) => handleChange(index, 'interestRateType', e.target.value)}>
              <option value="">Select Interest Rate Type</option>
              <option value="Fixed">Fixed</option>
              <option value="Variable">Variable</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current Interest Rate (require if mortgage to be redeemed or altered):</label>
            <input type="number" value={mortgage.currentInterestRate} onChange={(e) => handleChange(index, 'currentInterestRate', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Date existing rate ends (N/A if SVR or lifetime Tracker)(require to be redeemed or altered):</label>
            <input type="date" value={mortgage.rateEndDate} onChange={(e) => handleChange(index, 'rateEndDate', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Revert Rate (required if mortgage to be redeemed or altered):</label>
            <input type="number" value={mortgage.revertRate} onChange={(e) => handleChange(index, 'revertRate', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Are there any early repayment charges which apply? (required if mortgage to be redeemed or altered)</label>
            <div>
                <label><input type="radio" value="Yes" checked={mortgage.hasEarlyRepaymentCharges === 'Yes'} onChange={(e) => handleChange(index, 'hasEarlyRepaymentCharges', e.target.value)} /> Yes</label>
                <label><input type="radio" value="No" checked={mortgage.hasEarlyRepaymentCharges === 'No'} onChange={(e) => handleChange(index, 'hasEarlyRepaymentCharges', e.target.value)} /> No</label>
            </div>
          </div>

          <div className="form-group">
            <label>Is the existing mortgage portable to the new property? (required if mortgage to be redeemed or altered)</label>
            <div>
                <label><input type="radio" value="Yes" checked={mortgage.isPortable === 'Yes'} onChange={(e) => handleChange(index, 'isPortable', e.target.value)} /> Yes</label>
                <label><input type="radio" value="No" checked={mortgage.isPortable === 'No'} onChange={(e) => handleChange(index, 'isPortable', e.target.value)} /> No</label>
                <label><input type="radio" value="N/A" checked={mortgage.isPortable === 'N/A'} onChange={(e) => handleChange(index, 'isPortable', e.target.value)} /> N/A</label>
            </div>
          </div>

          <div className="form-group">
            <label>Will the mortgage be redeemed now?</label>
            <div>
                <label><input type="radio" value="Yes" checked={mortgage.willRedeemNow === 'Yes'} onChange={(e) => handleChange(index, 'willRedeemNow', e.target.value)} /> Yes</label>
                <label><input type="radio" value="No" checked={mortgage.willRedeemNow === 'No'} onChange={(e) => handleChange(index, 'willRedeemNow', e.target.value)} /> No</label>
            </div>
          </div>
          <strong>Address Search</strong>
          <div className="form-group">
            <label>Postcode:</label>
            <input
              type="text"
              value={mortgage.postcode}
              onChange={(e) => handleChange(index, 'postcode', e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="address-button" type="button" onClick={() => handleAddressChange(index)}>Find Address</button>
          </div>
          {[1, 2, 3, 4, 5].map((num) => (
            <div className="form-group" key={num}>
              <label>Address {num}:</label>
              <input
                type="text"
                value={mortgage.propertyAddress[num - 1] || ''}
                onChange={(e) => {
                  const updatedAddress = [...mortgage.propertyAddress];
                  updatedAddress[num - 1] = e.target.value;
                  handleChange(index, 'propertyAddress', updatedAddress);
                }}
              />
            </div>
          ))}
          <div className='form-group'>
            <button className="delete-button" type="button" onClick={() => deleteMortgage(index)}>Delete Mortgage</button>
          </div>
        </div>
      ))}

      {hasMortgage === 'Yes' && (
        <>
        <div className='form-group'>
            <button className="calc-button" type="button" onClick={addMortgage}>Add Another Existing Mortgage</button>
        </div>
        <div className="form-buttons">
          <div className="form-buttons-card">
            <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
          <div className="form-buttons-card">
            <button className="form-submit" type="submit">Save</button>
            <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/monthly-expenditure')}>Next</button>
          </div>
        </div>
      </>
      )}
    </form>
  );
};

export default ExMortgage;