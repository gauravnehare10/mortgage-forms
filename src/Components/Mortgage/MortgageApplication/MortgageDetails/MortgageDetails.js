import { useState, useEffect } from 'react';
import '../../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFormStore from '../../store';

const MortgageDetails = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [mortgageDetails, setMortgageDetails] = useState({
    foundProperty: '',
    addressPostcode: '',
    address: ['', '', '', '', ''],
    purchasePrice: '',
    depositAmount: '',
    depositSource: '',
    totalLoanAmount: '',
    loanToValue: '',
    preferredTermYears: '',
    preferredTermMonths: '',
    mortgageFreeAge: '',
    termReason: '',
    propertyAddress: '',
    useDisposableIncome: '',
    plannedRetirementAge: '',
    dateOfBirth: '',
    termBeyondRetirement: '',
    newBuild: '',
    builderIncentives: '',
    governmentScheme: '',
    payFeesUpfront: false,
    increaseLoanAmount: false,
    payFeesPartly: false,
    confirmFeesInterest: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    if (name === 'foundProperty' && value === 'No') {
      setMortgageDetails((prev) => ({
        ...prev,
        foundProperty: value,
        addressPostcode: '',
        address: ['', '', '', '', ''],
        propertyAddress: '',
      }));
    } else if (name.startsWith('address') && name !== 'addressPostcode') {
      const index = parseInt(name.replace('address', ''), 10) - 1;
      setMortgageDetails((prev) => {
        const updatedAddress = [...prev.address];
        updatedAddress[index] = value;
        return { ...prev, address: updatedAddress };
      });
    } else {
      setMortgageDetails((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? !prev[name] : value,
      }));
    }
  };

  useEffect(() => {
    fetchFormData("mortgageDetails");
    fetchFormData("residentialHistory")
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.mortgageDetails) {
      setMortgageDetails(formData.mortgageDetails)
    }
  }, [formData.mortgageDetails]);

  const calculateLoanDetails = () => {
    const loanAmount = mortgageDetails.purchasePrice - mortgageDetails.depositAmount;
    const ltv = ((loanAmount / mortgageDetails.purchasePrice) * 100).toFixed(2);
    setMortgageDetails((prev) => ({
      ...prev,
      totalLoanAmount: loanAmount,
      loanToValue: ltv,
    }));
  };

  const findAddress = async () => {
    const postcode = mortgageDetails.addressPostcode.trim();
    if (!postcode) {
      alert('Please enter a postcode.');
      return;
    }

    try {
      const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
      const { admin_district, admin_ward } = response.data.result || {};

      const updatedAddress = ['', admin_district || '', admin_ward || '', '', 'United Kingdom'];

      setMortgageDetails((prev) => ({
        ...prev,
        address: updatedAddress,
      }));
    } catch (error) {
      alert('Error fetching address. Please check the postcode and try again.');
      console.error('Address lookup error:', error);
    }
  };

  const useResidentialAddress = () => {
    const residentialAddress = formData.residentialHistory[0].address
    setMortgageDetails((prev) => ({ ...prev, address: residentialAddress }));
    setMortgageDetails((prev) => ({ ...prev, addressPostcode: formData.residentialHistory[0].postcode}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('mortgageDetails', mortgageDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/repaying-mortgage')}>Next</button>
        </div>
      </div>

      <h2>Mortgage/Remortgage Details</h2>

      <div className="form-group">
        <label>Have you found a property?</label>
        <div>
          <label>
            <input
              type="radio"
              name="foundProperty"
              value="Yes"
              checked={mortgageDetails.foundProperty === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="foundProperty"
              value="No"
              checked={mortgageDetails.foundProperty === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {mortgageDetails.foundProperty === 'Yes' && (
        <>
          <div className="form-group">
            <label>Address of the property being Mortgaged/Re-mortgaged</label>
            <input
              type="text"
              name="propertyAddress"
              value={mortgageDetails.propertyAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address from mortgage policies</label>
            <button className="address-button" type="button">Use Above Policy Address</button>
          </div>
          <div className="form-group">
            <label>Address Search</label>
          </div>
          <div className="form-group">
            <label>Postcode</label>
            <input
              type="text"
              name="addressPostcode"
              placeholder="Address Postcode"
              value={mortgageDetails.addressPostcode}
              onChange={ handleChange }
            />
          </div>
          <div className='form-group'>
            <button className="address-button" type="button" onClick={ findAddress }>Find Address</button>
          </div>
          {mortgageDetails?.address?.map((addr, index) => (
            <div className="form-group" key={index}>
              <label>Address {index + 1}</label>
              <input
                type="text"
                name={`address${index + 1}`}
                value={addr}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="form-group">
            <button className="address-button" type="button" onClick={ useResidentialAddress }>Use Residential Address</button>
          </div>
        </>
      )}

      <div className="form-group">
        <label>What is the purchase price or estimated value?</label>
        <input
          type="number"
          name="purchasePrice"
          value={mortgageDetails.purchasePrice}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Amount of deposit for the new property or equity within existing property?</label>
        <input
          type="number"
          name="depositAmount"
          value={mortgageDetails.depositAmount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Source of deposit</label>
        <select name="depositSource" value={mortgageDetails.depositSource} onChange={handleChange}>
          <option value="">Select Source</option>
          <option value="Savings">Savings</option>
          <option value="Gift">Gift</option>
          <option value="Builder">Builder</option>
          <option value="Equity">Equity</option>
        </select>
      </div>
      <div className="form-group">
        <button className="calc-button" type="button" onClick={calculateLoanDetails}>Calculate</button>
      </div>
      <div className="form-group">
        <label>Total amount of loan required</label>
        <input
          type="number"
          name="totalLoanAmount"
          value={mortgageDetails.totalLoanAmount}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Loan to Value (%)</label>
        <input
          type="number"
          name="loanToValue"
          value={mortgageDetails.loanToValue}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>What would be your preferred term? (Years)</label>
        <input
          type="number"
          name="preferredTermYears"
          value={mortgageDetails.preferredTermYears}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>What would be your preferred term? (Months)</label>
        <input
          type="number"
          name="preferredTermMonths"
          value={mortgageDetails.preferredTermMonths}
          onChange={handleChange}
          min="0"
          max="11"
        />
      </div>

      <div className="form-group">
        <label>What age would you like to have repaid your mortgage/be mortgage free?</label>
        <input
          type="number"
          name="mortgageFreeAge"
          value={mortgageDetails.mortgageFreeAge}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Please explain the reasons for your preferred term</label>
        <textarea
          name="termReason"
          value={mortgageDetails.termReason}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>What are your thoughts on using more of your disposable income to reduce the mortgage term?</label>
        <textarea
          name="useDisposableIncome"
          value={mortgageDetails.useDisposableIncome}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Planned Retirement Age</label>
        <input
          type="number"
          name="plannedRetirementAge"
          value={mortgageDetails.plannedRetirementAge}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Age/Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={mortgageDetails.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Does the term extend past the Planned Retirement Age?</label>
        <div>
          <label><input type="radio" name="termBeyondRetirement" value="Yes" checked={mortgageDetails.termBeyondRetirement === "Yes"} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="termBeyondRetirement" value="No" checked={mortgageDetails.termBeyondRetirement === "No"} onChange={handleChange} /> No</label>
        </div>
      </div>

      <div className="form-group">
        <label>Is this a new build?</label>
        <div>
          <label><input type="radio" name="newBuild" value="Yes" checked={mortgageDetails.newBuild === "Yes"} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="newBuild" value="No" checked={mortgageDetails.newBuild === "No"} onChange={handleChange} /> No</label>
        </div>
      </div>

      <div className="form-group">
        <label>Are there any builder incentives?</label>
        <div>
          <label><input type="radio" name="builderIncentives" value="Yes" checked={mortgageDetails.builderIncentives === "Yes"} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="builderIncentives" value="No" checked={mortgageDetails.builderIncentives === "No"} onChange={handleChange} /> No</label>
        </div>
      </div>

      <div className="form-group">
        <label>Is this a Government funded scheme?</label>
        <div>
          <label><input type="radio" name="governmentScheme" value="Yes" checked={ mortgageDetails.governmentScheme === "Yes" } onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="governmentScheme" value="No" checked={ mortgageDetails.governmentScheme === "No" } onChange={handleChange} /> No</label>
        </div>
      </div>

      <h3>Your Preference</h3>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="payFeesUpfront"
            checked={mortgageDetails.payFeesUpfront}
            onChange={handleChange}
          />
          You can pay any fees or charges up front
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="increaseLoanAmount"
            checked={mortgageDetails.increaseLoanAmount}
            onChange={handleChange}
          />
          You can increase the amount you borrow by adding fees or charges to the loan (subject to lender's agreement)
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="payFeesPartly"
            checked={mortgageDetails.payFeesPartly}
            onChange={handleChange}
          />
          You can pay part of any fees or charges up front and add part to the loan
        </label>
      </div>

      {mortgageDetails.increaseLoanAmount && (
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="confirmFeesInterest"
              checked={mortgageDetails.confirmFeesInterest}
              onChange={handleChange}
            />
            Please confirm that the customer is aware that by adding fees to the loan, interest will be paid over the mortgage term
          </label>
        </div>
      )}
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/repaying-mortgage')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default MortgageDetails;
