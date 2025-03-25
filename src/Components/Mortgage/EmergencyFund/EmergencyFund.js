import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../store';

const EmergencyFund = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [emergencyFund, setEmergencyFund] = useState({
    emergencyCapital: '0.00',
    medicalIssues: 'No',
    smokerStatus: '',
    hasWill: 'No',
    referForWill: 'No',
    powerOfAttorney: 'No',
  });

  const handleChange = (field, value) => {
    setEmergencyFund((prev) => {
      const updatedData = { ...prev, [field]: value };
      if (field === 'hasWill' && value === 'Yes') {
        updatedData.referForWill = 'No';
      }
  
      return updatedData;
    });
  };

  useEffect(() => {
    fetchFormData("emergenyFundData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.emergenyFundData) {
      setEmergencyFund(formData.emergenyFundData);
    }
  }, [formData.emergenyFundData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('emergenyFundData', emergencyFund);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-buttons">
          <div className="form-buttons-card">
            <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
          <div className="form-buttons-card">
            <button className="form-submit" type="submit">Save</button>
            <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/application-type')}>Next</button>
          </div>
        </div>
        
        <h3>Emergency Fund</h3>
      
        <div className="form-group">
          <label>How much capital would you need to provide for potential emergencies?</label>
          <input
            type="number"
            value={emergencyFund.emergencyCapital}
            onChange={(e) => handleChange('emergencyCapital', e.target.value)}
          />
        </div>

        <h3>Health Details</h3>
        <div className="form-group">
          <label>Have you ever experienced any medical health issues?</label>
          <div>
            <label>
                <input
                type="radio"
                value="Yes"
                checked={emergencyFund.medicalIssues === 'Yes'}
                onChange={() => handleChange('medicalIssues', 'Yes')}
                />
                Yes
            </label>
            <label>
                <input
                type="radio"
                value="No"
                checked={emergencyFund.medicalIssues === 'No'}
                onChange={() => handleChange('medicalIssues', 'No')}
                />
                No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Are you or have you ever been a smoker?</label>
          <select value={emergencyFund.smokerStatus} onChange={(e) => handleChange('smokerStatus', e.target.value)}>
            <option value="">Select an option</option>
            <option value="Current Smoker">Current Smoker</option>
            <option value="Former Smoker">Former Smoker</option>
            <option value="Never Smoked">Never Smoked</option>
          </select>
        </div>

        <h3>Will Details</h3>
        <div className="form-group">
          <label>Do you have a will?</label>
          <div>
            <label>
                <input
                type="radio"
                value="Yes"
                checked={emergencyFund.hasWill === 'Yes'}
                onChange={() => handleChange('hasWill', 'Yes')}
                />
                Yes
            </label>
            <label>
                <input
                type="radio"
                value="No"
                checked={emergencyFund.hasWill === 'No'}
                onChange={() => handleChange('hasWill', 'No')}
                />
                No
            </label>
          </div>
        </div>

        {emergencyFund.hasWill === 'No' && (
          <div className="form-group">
            <label>If No, would you like to be referred?</label>
            <div>
                <label>
                <input
                    type="radio"
                    value="Yes"
                    checked={emergencyFund.referForWill === 'Yes'}
                    onChange={() => handleChange('referForWill', 'Yes')}
                />
                Yes
                </label>
                <label>
                <input
                    type="radio"
                    value="No"
                    checked={emergencyFund.referForWill === 'No'}
                    onChange={() => handleChange('referForWill', 'No')}
                />
                No
                </label>
              </div>
          </div>
        )}

        <div className="form-group">
          <label>Have you granted Power Of Attorney?</label>
          <div>
            <label>
                <input
                type="radio"
                value="Yes"
                checked={emergencyFund.powerOfAttorney === 'Yes'}
                onChange={() => handleChange('powerOfAttorney', 'Yes')}
                />
                Yes
            </label>
            <label>
                <input
                type="radio"
                value="No"
                checked={emergencyFund.powerOfAttorney === 'No'}
                onChange={() => handleChange('powerOfAttorney', 'No')}
                />
                No
            </label>
          </div>
        </div>
        <div className="form-buttons">
          <div className="form-buttons-card">
            <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
          <div className="form-buttons-card">
            <button className="form-submit" type="submit">Save</button>
            <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/application-type')}>Next</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmergencyFund;