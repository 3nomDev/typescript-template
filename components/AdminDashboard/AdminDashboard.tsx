import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import {
  faBell,
  faCheck,
  faEdit,
  faInfoCircle,
  faMinusCircle,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import { number } from 'yup';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './AdminDashboard.module.css';
import { DashboardBox } from '../DashboardBox/DashboardBox';
import {
  DashboardApplicationInterface,
  DashboardBoxEnum,
  NotificationInterface,
  StatsInterface,
} from '../../contracts';
import { DashboardBar } from '../DashboardBar/DashboardBar';
import {faMonitorHeartRate} from '@fortawesome/pro-regular-svg-icons'

interface Props {
  stats: StatsInterface;
  dashboardApplications: DashboardApplicationInterface[];
  notifications: NotificationInterface[];
}
export const AdminDashboard: FC<Props> = (props) => {
  const { stats, notifications, dashboardApplications } = props;
  const [recentNotifications, setRecentNotifications] = useState([])
  const [recentIncompleteApps, setRecentIncompleteApps] = useState([])
  const [recentAwaitingApps, setRecentAwaitingeApps] = useState([])
  const router = useRouter();

  let incompleteApplications = [];
  let awaitingApproveApplications = [];

  if(dashboardApplications.length){
     incompleteApplications = dashboardApplications.filter(
    (item) => item.StatusID === 5
  );
  awaitingApproveApplications = dashboardApplications.filter(
    (item) => item.StatusID === 1
  );
  }

console.log(notifications)
  console.log(incompleteApplications)
  console.log(awaitingApproveApplications)
  
  function filterRecentNotications(notifications) {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    return notifications.filter(obj => {
      const objDate = new Date(obj.DateAdded);
   
      return objDate >= cutoffDate && objDate <= now;
    });

  }
  function filterRecentIncompleteApps(incompleteApplications) {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    return incompleteApplications.filter(obj => {
      const objDate = new Date(obj.LastUpdated);
   
      return objDate >= cutoffDate && objDate <= now;
    });

  }
  function filterRecentAwaitingeApps(awaitingApproveApplications) {
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    return awaitingApproveApplications.filter(obj => {
      const objDate = new Date(obj.LastUpdated);
   
      return objDate >= cutoffDate && objDate <= now;
    });

  }



  useEffect(() =>{
const filteredNotificcations = filterRecentNotications(notifications)
setRecentNotifications(filteredNotificcations)
  },[notifications])

  useEffect(() => {
    const filteredIncompleteApps = filterRecentIncompleteApps(incompleteApplications)
    setRecentIncompleteApps(filteredIncompleteApps)
  },[incompleteApplications.length])

  useEffect(() => {
    const filteredAwaitingApps = filterRecentAwaitingeApps(awaitingApproveApplications)
    setRecentAwaitingeApps(filteredAwaitingApps)
  },[awaitingApproveApplications.length])
  


  const handleNavigate = (route: string) => () => void router.push(route);
  const handleEdit = (id: number) => () =>
    router.push(`/admin/application/${id}`);
  const handleIncompleteClick = (): void =>
    void router.push('/admin/incomplete');
  const handleApprovedClick = (): void => void router.push('/admin/approved');
  const handleAwaitingClick = (): void => void router.push('/admin/pending');
  const handleConditionalClick = (): void => void router.push('/admin/conditional');
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.dashboardWrapper}>
        <div className={styles.dashboardHeader}>
          <h2>
            <FontAwesomeIcon icon={faMonitorHeartRate as IconProp} color="#154F85" />
          </h2>
          <h2 className={styles.dashboardTitle}>Dashboard</h2>
        </div>
        <div className={styles.responsive}>
          <div className={styles.leftSide}>
            <div className={styles.boxWrapper}>
              <DashboardBox
                onClick={handleAwaitingClick}
                icon={faCheck as IconProp}
                count={stats['Pending Applications']}
                text="Awaiting Review"
                type={DashboardBoxEnum.Pending}
              />
              <DashboardBox
                onClick={handleApprovedClick}
                icon={faEdit as IconProp}
                count={stats['Approved Applications']}
                text="Approved applications"
                type={DashboardBoxEnum.Success}
              />
              <DashboardBox
                onClick={handleIncompleteClick}
                icon={faMinusCircle as IconProp}
                count={stats['Incomplete Applications']}
                text="Incomplete Applications"
                type={DashboardBoxEnum.Failed}
              />
              <DashboardBox
                onClick={handleConditionalClick}
                icon={faMinusCircle as IconProp}
                count={stats['Conditional Approval']}
                text="Conditional Approval"
                type={DashboardBoxEnum.Failed}
              />
            </div>
            <DashboardBar
              onEdit={handleEdit}
              onNavigate={handleNavigate('/admin/pending')}
              icon={faEdit as IconProp}
              applications={recentAwaitingApps}
              text="Awaiting review"
              description={`${
                awaitingApproveApplications.length < 1
                  ? 'No New Applications Last 7 Days'
                  : `${awaitingApproveApplications.length }${awaitingApproveApplications.length === 1 ? 'Application' : 'Applications'}`
              }  `}
              type={DashboardBoxEnum.Pending}
            />
          </div>
          <div className={styles.barWrapper}>
            <DashboardBar
              onEdit={handleEdit}
              onNavigate={handleNavigate('/admin/notifications')}
              icon={faBell as IconProp}
              text="Notifications"
              type={DashboardBoxEnum.Notification}
              notifications={recentNotifications}
            />
            <DashboardBar
              onEdit={handleEdit}
              applications={recentIncompleteApps}
              onNavigate={handleNavigate('/admin/incomplete')}
              icon={faMinusCircle as IconProp}
              text="New Incomplete Application"
              description={`${
                incompleteApplications.length < 1
                  ? 'No New Applications Last 7 Days'
                  : `${incompleteApplications.length} ${incompleteApplications.length === 1 ?  'Application' : 'Applications'}`
              }  `}
              type={DashboardBoxEnum.Failed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
