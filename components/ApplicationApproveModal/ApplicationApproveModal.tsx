import React, { FC, useState } from 'react';
import { OnEventFn } from '@rnw-community/shared';
import styles from './ApplicationApproveModal.module.css';
import { ChangeApplicationStatusArgs } from '../../contracts';

interface Props {
  closeModal: OnEventFn<void | any>;
  onSave: (payload: Partial<ChangeApplicationStatusArgs>) => () => void;
}

export const ApplicationApproveModal: FC<Props> = ({ closeModal, onSave }) => {
  const [userApproved, setUserApproved] = useState(true);
  const [leaseApproved, setLeaseApproved] = useState(true);

  const [userNotes, setUserNotes] = useState('');
  const [leaseNotes, setLeaseNotes] = useState('');

  const handlePersonalInfoCheckbox = (): void => setUserApproved(!userApproved);
  const handleVehicleInfoCheckbox = (): void =>
    setLeaseApproved(!leaseApproved);
  const handleUserNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setUserNotes(e.target.value);
  const handleLeaseNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setLeaseNotes(e.target.value);

  const handleSave = (payload: Partial<ChangeApplicationStatusArgs>) => () => {
    closeModal(null);
    onSave(payload)();
  };

  return (
  <div className={styles.popUpBackground}>
      <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Approve application</h1>
        {/* <span onClick={closeModal}>X</span> */}
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.circle}>1</div>
          <input
            type="checkbox"
            checked={userApproved}
            onClick={handlePersonalInfoCheckbox}
            className={styles.checkbox}
          />
          <p>Personal Information Approved</p>
        </div>
        {!userApproved && (
          <div className={styles.textArea}>
            <p>Personal Information Notes ( Required )</p>
            <textarea value={userNotes} onChange={handleUserNotesChange} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.circle}>2</div>
          <input
            type="checkbox"
            checked={leaseApproved}
            onClick={handleVehicleInfoCheckbox}
            className={styles.checkbox}
          />
          <p>Vehicle Information Approved</p>
        </div>
        {!leaseApproved && (
          <div className={styles.textArea}>
            <p>Vehicle Information Notes ( Required )</p>
            <textarea value={leaseNotes} onChange={handleLeaseNotesChange} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </div>
        <div
          className={styles.saveBtn}
          onClick={handleSave({
            userNotes,
            userApproved,
            leaseNotes,
            leaseApproved,
          })}
        >
          Save
        </div>
      </div>
    </div>
  </div>
  
  );
};
