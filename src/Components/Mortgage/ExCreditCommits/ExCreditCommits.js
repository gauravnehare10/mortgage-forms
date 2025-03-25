import { useState, useEffect } from 'react';
import '../PersonalDetails/PersonalDetails.css';
import { useNavigate } from 'react-router-dom';
import useFormStore from '../store';

const ExCreditCommits = () => {
  const navigate = useNavigate();
  const { formData, fetchFormData, updateFormData } = useFormStore();
  const [hasExCreditCommit, setHasExCreditCommit] = useState('');
  const [creditCommitments, setCreditCommitments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData('creditCommitmentsData', { hasExCreditCommit, creditCommitments });
  };

  const handleCreditCommitChange = (value) => {
    setHasExCreditCommit(value);
    if (value === 'Yes' && creditCommitments.length === 0) {
      addCreditCommitment();
    }
    if (value === 'No') {
      setCreditCommitments([]);
    }
  };

  useEffect(() => {
    fetchFormData("creditCommitmentsData");
  }, [fetchFormData]);

  useEffect(() => {
    if (formData.creditCommitmentsData) {
      setHasExCreditCommit(formData.creditCommitmentsData.hasExCreditCommit || "")
      setCreditCommitments(formData.creditCommitmentsData.creditCommitments || []);
    }
  }, [formData.creditCommitmentsData]);

  const addCreditCommitment = () => {
    setCreditCommitments((prev) => [
      ...prev,
      {
        creditType: '',
        lenderName: '',
        amountOutstanding: '',
        monthlyRepayment: '',
        monthsOutstanding: '',
        consideringConsolidation: '',
        repayBeforeMortgage: '',
      },
    ]);
  };

  const deleteCreditCommitment = (index) => {
    setCreditCommitments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreditCommitmentChange = (index, field, value) => {
    setCreditCommitments((prev) =>
      prev.map((commitment, i) => {
        if (i === index) {
          if (field === 'consideringConsolidation' && value === 'Yes') {
            return {
              ...commitment,
              [field]: value,
              repayBeforeMortgage: 'No',
            };
          }
          return {
            ...commitment,
            [field]: value,
          };
        }
        return commitment;
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-buttons">
        <div className="form-buttons-card">
          <button className="back-button" type="button" onClick={() => {navigate(-1);}}>Back</button>
        </div>
        <div className="form-buttons-card">
          <button className="form-submit" type="submit">Save</button>
          <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/existing-mortgage')}>Next</button>
        </div>
      </div>

      <h3>Liabilities - Credit Commitments</h3>

      <div className="form-group">
        <label>Do you have any existing credit commitments?</label>
        <div>
          <label>
            <input
              type="radio"
              name="hasExCreditCommit"
              value="Yes"
              checked={hasExCreditCommit === 'Yes'}
              onChange={(e) => handleCreditCommitChange(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasExCreditCommit"
              value="No"
              checked={hasExCreditCommit === 'No'}
              onChange={(e) => handleCreditCommitChange(e.target.value)}
            />
            No
          </label>
        </div>
      </div>

      {hasExCreditCommit === 'Yes' && (
        <>
          {creditCommitments?.map((commitment, index) => (
            <div key={index} className="credit-commitment-card">
              <h4>Credit Commitment {index + 1}</h4>

              <div className="form-group">
                <label>Type of Credit:</label>
                <select
                  value={commitment.creditType}
                  onChange={(e) =>
                    handleCreditCommitmentChange(index, 'creditType', e.target.value)
                  }
                >
                  <option value="">Select Type</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Car Loan">Car Loan</option>
                  <option value="Hire Purchase">Hire Purchase</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Name of Lender:</label>
                <input
                  type="text"
                  value={commitment.lenderName}
                  onChange={(e) =>
                    handleCreditCommitmentChange(index, 'lenderName', e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Amount Outstanding or Redemption/Settlement Figure:</label>
                <input
                  type="number"
                  value={commitment.amountOutstanding}
                  onChange={(e) =>
                    handleCreditCommitmentChange(index, 'amountOutstanding', e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Regular Monthly Repayment Amount:</label>
                <input
                  type="number"
                  value={commitment.monthlyRepayment}
                  onChange={(e) =>
                    handleCreditCommitmentChange(index, 'monthlyRepayment', e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Number of Months Outstanding or End Date (Fixed Term):</label>
                <input
                  type="text"
                  value={commitment.monthsOutstanding}
                  onChange={(e) =>
                    handleCreditCommitmentChange(index, 'monthsOutstanding', e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Considering Consolidation:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`consideringConsolidation-${index}`}
                      value="Yes"
                      checked={commitment.consideringConsolidation === 'Yes'}
                      onChange={(e) =>
                        handleCreditCommitmentChange(index, 'consideringConsolidation', e.target.value)
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`consideringConsolidation-${index}`}
                      value="No"
                      checked={commitment.consideringConsolidation === 'No'}
                      onChange={(e) =>
                        handleCreditCommitmentChange(index, 'consideringConsolidation', e.target.value)
                      }
                    />
                    No
                  </label>
                </div>
              </div>
              { commitment.consideringConsolidation === "No" &&
              <div className="form-group">
                <label>Are you looking to repay this liability prior to your new mortgage borrowing?</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`repayBeforeMortgage-${index}`}
                      value="Yes"
                      checked={commitment.repayBeforeMortgage === 'Yes'}
                      onChange={(e) =>
                        handleCreditCommitmentChange(index, 'repayBeforeMortgage', e.target.value)
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`repayBeforeMortgage-${index}`}
                      value="No"
                      checked={commitment.repayBeforeMortgage === 'No'}
                      onChange={(e) =>
                        handleCreditCommitmentChange(index, 'repayBeforeMortgage', e.target.value)
                      }
                    />
                    No
                  </label>
                </div>
              </div>
              }
                <div className="form-group">
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => deleteCreditCommitment(index)}
                  >
                    Delete Credit Commitment
                  </button>
                </div>
            </div>
          ))}
          <div className="form-group">
            <button type="button" className="calc-button" onClick={addCreditCommitment}>
              Add Another Credit Commitment
            </button>
          </div>
          
          <div className="form-buttons">
            <div className="form-buttons-card">
              <button className="back-button" type="button" onClick={() => {navigate(-1);}}>Back</button>
            </div>
            <div className="form-buttons-card">
              <button className="form-submit" type="submit">Save</button>
              <button className="next-button" type="button" onClick={() => navigate('/mortgage/add-details/existing-mortgage')}>Next</button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default ExCreditCommits;