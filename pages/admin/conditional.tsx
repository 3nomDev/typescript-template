import React, { FC, useEffect } from 'react';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { AdminSidebar, ApplicationsTable } from '../../components';
import styles from '../styles/dealership.module.css';
import {
  conditionalApplicationSelector,
  loadConditionalApplications,
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { withAuth } from '../../hocs';
import { DashboardBoxEnum } from '../../contracts';
import {
  faMonitorHeartRate,
  faFileSignature,
  faFileCheck,
  faFileExclamation,
} from '@fortawesome/pro-regular-svg-icons';

const Conditional: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const conditionalApplications = useSelector(conditionalApplicationSelector);

  useEffect(() => void dispatch(loadConditionalApplications(user?.ID)), []);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <ApplicationsTable
        type={DashboardBoxEnum.Conditional}
        icon={faFileSignature as IconProp}
        applications={conditionalApplications}
        title="Applications Awaiting A Condition"
      />
    </div>
  );
};

export default withAuth(Conditional);
