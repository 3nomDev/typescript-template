import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFile } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { isArray } from 'util';
import { useRouter } from 'next/router';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './userDashboard.module.css';
import { DealerRow } from '../DealerRow/DealerRow';
import {
  applicationsSelector,
  dealerDashboardSelector,
  loadApplicationByGuid,
  loadApplications,
  setApplicationsAction,
} from '../../features/dealerDashboardSlice';
import { editUserInfo, userSelector } from '../../features/authSlice';
import AssignCustomerToDealer from '../AssignCustomerToDealer/AssignCustomerToDealer';
import { addNotification } from '../../features/notifications/notificationSlice';
import bcrypt from 'bcryptjs';

export const UserDashboard: FC = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [firstLogin] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(userSelector);
  const saltRounds = 10;
  const { applicationItem } = useSelector(dealerDashboardSelector);

  const getStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Awaiting Approval';
      case 2:
        return 'Pending';
      case 3:
        return 'Approved';
      case 4:
        return 'Declined';
      case 5:
        'Incomplete';
      default:
        break;
    }
  };

  const statusStyle = (statusId) => {
    switch (statusId) {
      case 1:
        return styles.orange;
      case 2:
        return styles.orange;
      case 3:
        return styles.green;
      case 4:
        return styles.red;
      case 5:
        return styles.red;
      default:
        styles.black;
    }
    // 'Awaiting Approval': styles.orange,
    // 'Conditional Approval': styles.orange,
    // Approved: styles.green,
    // Declined: styles.red,
    // Incomplete: styles.red,
    // Funded: styles.cyan,
  };

  const guidToSend = user?.ProfileGUID;
  const handleSubmit = () => {
    if (!newPassword) {
      dispatch(
        addNotification({
          type: 'error',
          message: 'Password cannot be empty',
          autoHideDuration: 6000,
        })
      );
    } else {
      // hashing the password to be stored
      const hashedPass = bcrypt.hashSync(newPassword, saltRounds);
      const userData = { ...user, Password: hashedPass };

      dispatch(editUserInfo(userData));
      setShowEditForm(false);
    }
  };

  useEffect(() => {
    dispatch(loadApplicationByGuid(guidToSend));
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <DealerHeader title="User" />
      <div className={styles.title}>
        <div className={styles.titleLeft}>
          <FontAwesomeIcon
            icon={faFile as IconProp}
            color="#154F85"
            className={styles.icon}
          />
          <h3>Dashboard</h3>
        </div>
      </div>
      <h1>
        Current Loan Status :
        <span className={statusStyle(applicationItem?.StatusID)}>
          {getStatus(applicationItem?.StatusID)}{' '}
        </span>{' '}
      </h1>
      <div className={styles.contents}>
        {showEditForm && (
          <div className={styles.passwordForm}>
            <h3>Please choose a new password</h3>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.passInput}
            />
            <button onClick={handleSubmit} className={styles.saveBtn}>
              Save
            </button>
            <button
              onClick={() => setShowEditForm(!showEditForm)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        )}
        {firstLogin && (
          <div className={styles.newPasswordPopup}>
            <h1>
              Welcome to your dashboard. Please use the form below to create a
              unique password.
            </h1>
            <div className={styles.passwordForm}>
              <h3>Please choose a new password</h3>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.passInput}
              />
              <button onClick={handleSubmit} className={styles.saveBtn}>
                Save
              </button>
            </div>
          </div>
        )}
        <div className={styles.userInfoBox}>
          <div className={styles.infoContent}>
            {' '}
            <h1 style={{ fontWeight: 'bolder', marginBottom: '15px' }}>
              Profile Information
            </h1>
            <p>Fullname : {user?.FirstName + ' ' + user?.LastName}</p>
            <p>Email : {user?.EmailAddress} </p>
            <p>Phone : {user?.CellPhone}</p>
            <p>Address: {user?.Address + user?.Address2}</p>
            <p>City : {user?.City}</p>
            <p>State: {user?.State}</p>
            <p>Postal Code : {user?.PostalCode}</p>
            <p style={{ fontWeight: 'bolder' }}>
              Need to make a change to any of this info? Click the button below.
            </p>
            <div className={styles.btnHolder}>
              <button className={styles.editBtn}>Edit Profile Info</button>
              <button
                className={styles.editBtn}
                onClick={() => setShowEditForm(!showEditForm)}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
