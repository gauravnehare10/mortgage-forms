// ClientForm.jsx
import React from 'react';

const ClientForm = ({ clientData, handleChange, clientName }) => {
  return (
    <div className="client-form">
      <h3>{clientName}</h3>
      <div className="form-group">
        <label>How much capital would you need to provide for potential emergencies?</label>
        <input
          type="number"
          value={clientData.emergencyCapital}
          onChange={(e) => handleChange('emergencyCapital', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Have you ever experienced any medical health issues?</label>
        <div>
          <label>
            <input
              type="radio"
              value="Yes"
              checked={clientData.medicalIssues === 'Yes'}
              onChange={() => handleChange('medicalIssues', 'Yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={clientData.medicalIssues === 'No'}
              onChange={() => handleChange('medicalIssues', 'No')}
            />
            No
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Are you or have you ever been a smoker?</label>
        <select
          value={clientData.smokerStatus}
          onChange={(e) => handleChange('smokerStatus', e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Current Smoker">Current Smoker</option>
          <option value="Former Smoker">Former Smoker</option>
          <option value="Never Smoked">Never Smoked</option>
        </select>
      </div>

      <div className="form-group">
        <label>Do you have a will?</label>
        <div>
          <label>
            <input
              type="radio"
              value="Yes"
              checked={clientData.hasWill === 'Yes'}
              onChange={() => handleChange('hasWill', 'Yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={clientData.hasWill === 'No'}
              onChange={() => handleChange('hasWill', 'No')}
            />
            No
          </label>
        </div>
      </div>

      {clientData.hasWill === 'No' && (
        <div className="form-group">
          <label>If No, would you like to be referred?</label>
          <div>
            <label>
              <input
                type="radio"
                value="Yes"
                checked={clientData.referForWill === 'Yes'}
                onChange={() => handleChange('referForWill', 'Yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={clientData.referForWill === 'No'}
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
              checked={clientData.powerOfAttorney === 'Yes'}
              onChange={() => handleChange('powerOfAttorney', 'Yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={clientData.powerOfAttorney === 'No'}
              onChange={() => handleChange('powerOfAttorney', 'No')}
            />
            No
          </label>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;