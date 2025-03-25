import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormButtons from '../../inc/FormButtons/FormButton';

const SecondaryOccupationFields = ({
  secondaryOccupationData,
  setSecondaryOccupationData,
  handleAddressChange,
  findAddress,
  shouldAskQuestions
}) => {
    const navigate = useNavigate();
  return (
    <>
      <div className="form-group">
        <label>Do you have any additional Earned income?</label>
        <div>
          <label>
            <input
              type="radio"
              name="hasAddEarnedIncome"
              value="Yes"
              checked={secondaryOccupationData.hasAddEarnedIncome === 'Yes'}
              onChange={(e) =>
                setSecondaryOccupationData((prev) => ({
                  ...prev,
                  hasAddEarnedIncome: e.target.value,
                }))
              }
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasAddEarnedIncome"
              value="No"
              checked={secondaryOccupationData.hasAddEarnedIncome === 'No'}
              onChange={(e) =>
                setSecondaryOccupationData((prev) => ({
                  ...prev,
                  hasAddEarnedIncome: e.target.value,
                }))
              }
            />
            No
          </label>
        </div>
      </div>

      {secondaryOccupationData.hasAddEarnedIncome === 'Yes' && (
        <>
          <div className="form-group">
            <label>Secondary Employment Status:</label>
            <select
              value={secondaryOccupationData.secondaryEmploymentStatus}
              onChange={(e) =>
                setSecondaryOccupationData((prev) => ({
                  ...prev,
                  secondaryEmploymentStatus: e.target.value,
                }))
              }
            >
              <option value="">Select Status</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          {secondaryOccupationData.secondaryEmploymentStatus === 'Self-Employed' && (
            <div className="form-group">
              <label>Self-Employed Type:</label>
              <select
                value={secondaryOccupationData.selfEmployedType}
                onChange={(e) =>
                  setSecondaryOccupationData((prev) => ({
                    ...prev,
                    selfEmployedType: e.target.value,
                  }))
                }
              >
                <option value="">Select Type</option>
                <option value="Director (20% shareholding +)">
                  Director (20% shareholding +)
                </option>
                <option value="Director (less than 20% shareholding)">
                  Director (less than 20% shareholding)
                </option>
                <option value="Sole Trader">Sole Trader</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
          )}

          {shouldAskQuestions && (
            <>
              <div className="form-group">
                <label>Occupation Status:</label>
                <select
                  value={secondaryOccupationData.occupationStatus}
                  onChange={(e) =>
                    setSecondaryOccupationData((prev) => ({
                      ...prev,
                      occupationStatus: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>

              <div className="form-group">
                <label>Secondary Occupation Title:</label>
                <input
                  type="text"
                  value={secondaryOccupationData.secondaryOccupationTitle}
                  onChange={(e) =>
                    setSecondaryOccupationData((prev) => ({
                      ...prev,
                      secondaryOccupationTitle: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Hours of Work:</label>
                <input
                  type="number"
                  value={secondaryOccupationData.hoursOfWork}
                  onChange={(e) =>
                    setSecondaryOccupationData((prev) => ({
                      ...prev,
                      hoursOfWork: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Name of Secondary Employer:</label>
                <input
                  type="text"
                  value={secondaryOccupationData.secondaryEmployerName}
                  onChange={(e) =>
                    setSecondaryOccupationData((prev) => ({
                      ...prev,
                      secondaryEmployerName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Address Search (Postcode):</label>
                <input
                  type="text"
                  value={secondaryOccupationData.secondaryEmployerPostcode}
                  onChange={(e) =>
                    setSecondaryOccupationData((prev) => ({
                      ...prev,
                      secondaryEmployerPostcode: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <button
                  type="button"
                  className='address-button'
                  onClick={() =>
                    findAddress(secondaryOccupationData.secondaryEmployerPostcode)
                  }
                >
                  Find Address
                </button>
              </div>
              
              {(secondaryOccupationData.secondaryEmployerAddress || ['', '', '', '', '']).map(
                (addr, addrIdx) => (
                  <div key={addrIdx} className="form-group">
                    <label>Address {addrIdx + 1}:</label>
                    <input
                      type="text"
                      value={addr}
                      onChange={(e) =>
                        handleAddressChange(addrIdx, e.target.value)
                      }
                    />
                  </div>
                )
              )}
            </>
          )}
          <FormButtons
            onBack={() => navigate(-1)}
            onNext={() => navigate('/mortgage/add-details/other-monthly-income')}
          />
        </>
      )}
    </>
  );
};

export default SecondaryOccupationFields;