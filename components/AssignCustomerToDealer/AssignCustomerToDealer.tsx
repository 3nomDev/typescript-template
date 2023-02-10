import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../features/authSlice';
import { AssignToDealer } from '../../features/dealerDashboardSlice';
import styles from './AssignCustomerToDealer.module.css';

interface Props {
  setAssignCustomer: any;
}

const AssignCustomerToDealer: FC<Props> = ({ setAssignCustomer }) => {
  const [approvalCode, setApprovalCode] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);


  const addCustomer = () => {
    if (approvalCode) {

      const data = {
        DealerID: user.DealerID,
        ApprovalCode: approvalCode,
        LastUpdatedBy: user.ID,
      };
      dispatch(AssignToDealer(data));
      setAssignCustomer(false);
    }
  };

  return (
    <div className={styles.popUpBackground}>
      <div className={styles.popUpWrapper}>
        <div className={styles.popup}>
          <h2 className={styles.popupHeader}>Register Customer</h2>

          <input
            onChange={(e) => setApprovalCode(e.target.value)}
            type="text"
            placeholder="Appoval Code"
          />
          <div className={styles.popupBtnContainer}>
            <button onClick={() => addCustomer()} className={styles.saveBtn}>
              Submit
            </button>
            <button
              onClick={() => setAssignCustomer(false)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignCustomerToDealer;
