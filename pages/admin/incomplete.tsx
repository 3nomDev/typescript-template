import React, { FC, useEffect } from 'react';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { AdminSidebar, ApplicationsTable } from '../../components';
import styles from '../styles/dealership.module.css';
import { userSelector } from '../../features/authSlice';
import {
  incompleteApplicationsSelector,
  loadIncompleteApplications,
} from '../../features/adminDashboardSlice';
import { withAuth } from '../../hocs';
import { DashboardBoxEnum } from '../../contracts';
import {faMonitorHeartRate, faFileSignature, faFileCheck, faFileExclamation} from '@fortawesome/pro-regular-svg-icons'


const Incomplete: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const incompleteApplications = useSelector(incompleteApplicationsSelector);

  useEffect(() => void dispatch(loadIncompleteApplications(user?.ID)), []);
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <ApplicationsTable
        type={DashboardBoxEnum.Failed}
        icon={faFileExclamation as IconProp}
        applications={incompleteApplications}
        title="Applications Incomplete"
      />
    </div>
  );
};

export default withAuth(Incomplete);
