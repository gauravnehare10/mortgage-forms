import { useState, useEffect } from 'react';
import '../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFormStore from '../store';
import SecondaryOccupationFields from './SecOccupationForm/SecOccupationForm';
import FormButtons from '../inc/FormButtons/FormButton';

const SecOccupation = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  
  // State for both client and partner (if exists)
  const [secondaryOccupationData, setSecondaryOccupationData] = useState({
    client: {
      hasAddEarnedIncome: '',
      secondaryEmploymentStatus: '',
      selfEmployedType: '',
      occupationStatus: '',
      secondaryOccupationTitle: '',
      hoursOfWork: '',
      secondaryEmployerName: '',
      secondaryEmployerPostcode: '',
      secondaryEmployerAddress: ['', '', '', '', ''],
    },
    partner: {
      hasAddEarnedIncome: '',
      secondaryEmploymentStatus: '',
      selfEmployedType: '',
      occupationStatus: '',
      secondaryOccupationTitle: '',
      hoursOfWork: '',
      secondaryEmployerName: '',
      secondaryEmployerPostcode: '',
      secondaryEmployerAddress: ['', '', '', '', ''],
    },
  });

  // Check if there's a partner
  const hasPartner = formData.mainDetails?.partners?.length > 0;

  useEffect(() => {
    fetchFormData("secondaryOccupationData");
    fetchFormData("mainDetails");
  }, [fetchFormData]);
  
  useEffect(() => {
    if (formData.secondaryOccupationData) {
      setSecondaryOccupationData(formData.secondaryOccupationData);
    }
  }, [formData.secondaryOccupationData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData("secondaryOccupationData", secondaryOccupationData);
  };

  const handleAddressChange = (index, value, isPartner = false) => {
    setSecondaryOccupationData((prev) => ({
      ...prev,
      [isPartner ? 'partner' : 'client']: {
        ...prev[isPartner ? 'partner' : 'client'],
        secondaryEmployerAddress: [
          ...prev[isPartner ? 'partner' : 'client'].secondaryEmployerAddress.slice(0, index),
          value,
          ...prev[isPartner ? 'partner' : 'client'].secondaryEmployerAddress.slice(index + 1),
        ],
      },
    }));
  };

  const findAddress = async (postcode, isPartner = false) => {
    if (!postcode || typeof postcode !== 'string') {
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

      setSecondaryOccupationData((prev) => ({
        ...prev,
        [isPartner ? 'partner' : 'client']: {
          ...prev[isPartner ? 'partner' : 'client'],
          secondaryEmployerAddress: updatedAddress,
        },
      }));
    } catch (error) {
      alert('Error fetching address. Please check the postcode.');
      console.error('Address lookup error:', error);
    }
  };

  // Logic for client
  const shouldAskClientQuestions =
    secondaryOccupationData.client.hasAddEarnedIncome === 'Yes' &&
    (secondaryOccupationData.client.secondaryEmploymentStatus === 'Employed' ||
      (secondaryOccupationData.client.secondaryEmploymentStatus === 'Self-Employed' &&
        secondaryOccupationData.client.selfEmployedType === 'Director (less than 20% shareholding)') ||
      secondaryOccupationData.client.secondaryEmploymentStatus === 'Temporary');

  // Logic for partner (if exists)
  const shouldAskPartnerQuestions =
    hasPartner &&
    secondaryOccupationData.partner.hasAddEarnedIncome === 'Yes' &&
    (secondaryOccupationData.partner.secondaryEmploymentStatus === 'Employed' ||
      (secondaryOccupationData.partner.secondaryEmploymentStatus === 'Self-Employed' &&
        secondaryOccupationData.partner.selfEmployedType === 'Director (less than 20% shareholding)') ||
      secondaryOccupationData.partner.secondaryEmploymentStatus === 'Temporary');

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <FormButtons
        onBack={() => navigate(-1)}
        onNext={() => navigate('/mortgage/add-details/other-monthly-income')}
      />

      <h3>Secondary Occupation Details</h3>

      {/* Client's secondary occupation */}
      <h4>Client 1 (Your) Secondary Occupation</h4>
      <SecondaryOccupationFields
        secondaryOccupationData={secondaryOccupationData.client}
        setSecondaryOccupationData={(data) =>
          setSecondaryOccupationData((prev) => ({ ...prev, client: data }))
        }
        handleAddressChange={(index, value) => handleAddressChange(index, value, false)}
        findAddress={(postcode) => findAddress(postcode, false)}
        shouldAskQuestions={shouldAskClientQuestions}
      />

      {/* Partner's secondary occupation (if partner exists) */}
      {hasPartner && (
        <>
          <h4>Client 2 (Partner) Secondary Occupation</h4>
          <SecondaryOccupationFields
            secondaryOccupationData={secondaryOccupationData.partner}
            setSecondaryOccupationData={(data) =>
              setSecondaryOccupationData((prev) => ({ ...prev, partner: data }))
            }
            handleAddressChange={(index, value) => handleAddressChange(index, value, true)}
            findAddress={(postcode) => findAddress(postcode, true)}
            shouldAskQuestions={shouldAskPartnerQuestions}
          />
        </>
      )}
    </form>
  );
};

export default SecOccupation;