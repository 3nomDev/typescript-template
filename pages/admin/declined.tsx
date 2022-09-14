import React, { FC, useEffect } from 'react';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { AdminSidebar, ApplicationsTable } from '../../components';
import styles from '../styles/dealership.module.css';
import { withAuth } from '../../hocs';
import { userSelector } from '../../features/authSlice';
import {
  approvedApplicationsSelector,
  declinedApplicationsSelector,
  loadApprovedApplications,
  loadDeclinedApplications,
} from '../../features/adminDashboardSlice';
import { DashboardBoxEnum } from '../../contracts';
import {faMonitorHeartRate, faFileSignature, faFileCheck, faFileExclamation,faFileXmark} from '@fortawesome/pro-regular-svg-icons'


const Declined: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const declinedApplications = useSelector(declinedApplicationsSelector);
 

  useEffect(() => void dispatch(loadDeclinedApplications(user?.ID)), []); 
  // console.log(declinedApplications)
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <ApplicationsTable
        type={DashboardBoxEnum.Declined}
        title="Declined Applications"
        applications={declinedApplications}
        icon={faFileXmark as IconProp}
      />
    </div>
  );
};

export default withAuth(Declined);
