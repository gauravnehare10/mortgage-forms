import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../PersonalDetails/PersonalDetails.css";
import { useNavigate } from 'react-router-dom';
import useFormStore from '../../store';
import SelfEmployedFields from './SelfEmployedForm/SelfEmployedForm';

const SelfEmployedDetails = () => {
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [forms, setForms] = useState({
    client: null,
    partner: null
  });
  
  const navigate = useNavigate();

  // Initialize form data structure
  const getInitialFormData = () => ({
    businessName: '',
    businessAddress: ['', '', '', '', ''],
    businessPostcode: '',
    positionInBusiness: '',
    startDate: '',
    yearsOfAccounts: '',
    accountantDetails: '',
  });

  useEffect(() => {
    fetchFormData("selfEmployedData");
    fetchFormData("residentialData");
    fetchFormData("occupationData");
  }, [fetchFormData]);

  useEffect(() => {
    // Initialize forms based on occupation status
    const updatedForms = {
      client: formData.occupationData?.client?.status === "Self-Employed"
        ? formData.selfEmployedData?.client || getInitialFormData()
        : null,
      partner: formData.occupationData?.partner?.status === "Self-Employed"
        ? formData.selfEmployedData?.partner || getInitialFormData()
        : null
    };
    
    setForms(updatedForms);
  }, [formData.occupationData, formData.selfEmployedData]);

  const handleChange = (person, field, value) => {
    setForms(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value
      }
    }));
  };

  const handleAddressChange = (person, index, value) => {
    if (!forms[person]) return;
    
    const updatedAddress = [...forms[person].businessAddress];
    updatedAddress[index] = value;
    setForms(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        businessAddress: updatedAddress
      }
    }));
  };

  const findAddress = async (person, postcode) => {
    if (!forms[person] || !postcode || typeof postcode !== 'string') {
      alert('Please enter a valid postcode.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode.trim()}`
      );
      const { admin_district, admin_ward } = response.data.result || {};
      const updatedAddress = [
        '',
        admin_district || '',
        admin_ward || '',
        '',
        'United Kingdom',
      ];
      setForms(prev => ({
        ...prev,
        [person]: {
          ...prev[person],
          businessAddress: updatedAddress
        }
      }));
    } catch (error) {
      alert('Error fetching address. Please check the postcode.');
      console.error('Address lookup error:', error);
    }
  };

  const handleUseResidentialAddress = (person) => {
    if (!forms[person]) return;
    
    const residentialData = formData?.residentialData?.[person]?.[0];
    if (residentialData) {
      setForms(prev => ({
        ...prev,
        [person]: {
          ...prev[person],
          businessAddress: residentialData.address || ['', '', '', '', ''],
          businessPostcode: residentialData.postcode || ''
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      client: forms.client || null,
      partner: forms.partner || null
    };
    updateFormData('selfEmployedData', dataToSave);
    navigate('/mortgage/add-details/self-employed-income-details')
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

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/self-employed-income-details')}>Next</button>
        </div>
      </div>
      
      <h3>Self Employed or Director/Shareholder Details</h3>
      
      {showClientForm && forms.client && (
        <div className="self-employed-form-section">
          <h4>Client Details</h4>
          <SelfEmployedFields 
            selfEmployedData={forms.client}
            handleChange={(field, value) => handleChange('client', field, value)}
            handleAddressChange={(index, value) => handleAddressChange('client', index, value)}
            findAddress={(postcode) => findAddress('client', postcode)}
            useResidentialAddress={() => handleUseResidentialAddress('client')}
            formData={formData}
          />
        </div>
      )}

      {showPartnerForm && forms.partner && (
        <div className="self-employed-form-section">
          <h4>Partner Details</h4>
          <SelfEmployedFields 
            selfEmployedData={forms.partner}
            handleChange={(field, value) => handleChange('partner', field, value)}
            handleAddressChange={(index, value) => handleAddressChange('partner', index, value)}
            findAddress={(postcode) => findAddress('partner', postcode)}
            useResidentialAddress={() => handleUseResidentialAddress('partner')}
            formData={formData}
          />
        </div>
      )}

      <div className='form-buttons'>
        <div className='form-buttons-card'>
          <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className='form-buttons-card'>
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/self-employed-income-details')}>Next</button>
        </div>
      </div>
    </form>
  );
};

export default SelfEmployedDetails;