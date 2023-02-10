import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useState } from 'react';
import NoteCheckbox from '../NoteCheckbox';
import styles from './AddNote.module.css';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/authSlice';
import Select from 'react-select';

interface Props {
  handleNoteOptions: any;
  setAddNote;
  setNote;
  saveNote;
  paymentProposal;
  setPaymentProposal;
  isProposal;
  setIsProposal;
  inputIsChecked;
  setInputIsChecked;
  noteOptions;
}

const AddNotePopup: FC<Props> = ({
  setAddNote,
  setNote,
  saveNote,
  handleNoteOptions,
  paymentProposal,
  setPaymentProposal,
  isProposal,
  setIsProposal,
  noteOptions,
}) => {
  const user = useSelector(userSelector);

  const handleformchange = (e) => {
 
    if (e.target.checked) {
      setIsProposal(true);
    } else {
      setIsProposal(false);
    }
  };
  let names;
  if (user.DealerID !== '') {
    names = ['Vehicle', 'Personal'];
  } else {
    names = ['Vehicle', 'Personal', 'Propose Terms'];
  }

  const frequencyOptions = ['Choose Option', 'Weekly', 'BI-Weekly', 'Monthly'];
  const days = 30;
  const dayOfWeek = [
    'Choose Option',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  let dayOptions = ['Choose Option'];
  for (let i = 1; i <= days; i++) {
    dayOptions.push(i.toString());
  }

  return (
    <div className={styles.popUpBackground}>
      <div className={styles.popUpWrapper}>
        <div className={styles.popup}>
          <h2 className={styles.popupHeader}>Add A Note</h2>
          <div className={styles.popUpTextArea}>
            {!isProposal && (
              <>
                {' '}
                <label>Message</label>{' '}
                <textarea
                  className={styles.input}
                  onChange={(e) => setNote(e.target.value)}
                />
              </>
            )}
            {isProposal && (
              <div onBlur={() => setNote(paymentProposal)}>
                <div>
                  <label>Amount:</label>{' '}
                  <input
                    type="text"
                    className={styles.input}
                    autoFocus
                    onChange={(e) =>
                      setPaymentProposal({
                        ...paymentProposal,
                        Amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Frequency:</label>
                  <select
                    className={styles.input}
                    onChange={(e) =>
                      setPaymentProposal({
                        ...paymentProposal,
                        Frequency: e.target.value,
                      })
                    }
                  >
                    {frequencyOptions.map((option) => (
                      <option
                        value={option}
                        onChange={() => console.log(option)}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {paymentProposal.Frequency !== 'BI-Weekly' ? (
                    <label>Payment Day:</label>
                  ) : (
                    <label>First Payment Day:</label>
                  )}
                  <select
                    className={styles.input}
                    onChange={(e) =>
                      setPaymentProposal({
                        ...paymentProposal,
                        PaymentDay: e.target.value,
                      })
                    }
                  >
                    {paymentProposal.Frequency === 'Weekly'
                      ? dayOfWeek.map((option) => (
                          <option
                            value={option}
                            onChange={() => console.log(option)}
                          >
                            {option}
                          </option>
                        ))
                      : dayOptions.map((option) => (
                          <option
                            value={option}
                            onChange={() => console.log(option)}
                          >
                            {option}
                          </option>
                        ))}
                  </select>
                </div>

                {paymentProposal.Frequency === 'BI-Weekly' && (
                  <div>
                    <label>Second Payment Day:</label>
                    <select
                      className={styles.input}
                      onChange={(e) =>
                        setPaymentProposal({
                          ...paymentProposal,
                          SecondPaymentDay: e.target.value,
                        })
                      }
                    >
                      {paymentProposal.Frequency === 'Weekly'
                        ? dayOfWeek.map((option) => (
                            <option
                              value={option}
                              onChange={() => console.log(option)}
                            >
                              {option}
                            </option>
                          ))
                        : dayOptions.map((option) => (
                            <option
                              value={option}
                              onChange={() => console.log(option)}
                            >
                              {option}
                            </option>
                          ))}
                    </select>
                  </div>
                )}
                <div>
                  {' '}
                  <label>Number of Payments:</label>
                  <input
                    type="text"
                    className={styles.input}
                    onChange={(e) =>
                      setPaymentProposal({
                        ...paymentProposal,
                        NumberOfPayments: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
            {names.length &&
              names.map((item, index) => (
                <NoteCheckbox
                  handleNoteOptions={handleNoteOptions}
                  name={item}
                  index={index}
                  handleformchange={handleformchange}
                />
              ))}
          </div>

          <div className={styles.popupBtnContainer}>
            <button
              onClick={() => {
                setAddNote(false);
             {isProposal && setIsProposal(false);}
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>

            <button onClick={saveNote} className={styles.saveBtn}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNotePopup;
