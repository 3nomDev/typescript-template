import React, { FC, useEffect } from 'react';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { AdminSidebar, ApplicationsTable } from '../../components';
import styles from '../styles/dealership.module.css';
import {
  loadPendingApplications,
  pendingApplicationsSelector,
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { withAuth } from '../../hocs';
import { DashboardBoxEnum } from '../../contracts';
import {faMonitorHeartRate, faFileSignature, faFileCheck, faFileExclamation,} from '@fortawesome/pro-regular-svg-icons'


const Pending: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const pendingApplications = useSelector(pendingApplicationsSelector);

  useEffect(() => void dispatch(loadPendingApplications(user?.ID)), []);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <ApplicationsTable
        type={DashboardBoxEnum.Pending}
        icon={faFileSignature as IconProp}
        applications={pendingApplications}
        title="Applications Awaiting Approval"
      />
    </div>
  );
};

export default withAuth(Pending);
