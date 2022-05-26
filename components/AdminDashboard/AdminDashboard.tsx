import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
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

interface Props {
  stats: StatsInterface;
  dashboardApplications: DashboardApplicationInterface[];
  notifications: NotificationInterface[];
}
export const AdminDashboard: FC<Props> = (props) => {
  const { stats, notifications, dashboardApplications } = props;
  const router = useRouter();

  console.log(dashboardApplications);
  const incompleteApplications = [];
  const awaitingApproveApplications = [];
  // const incompleteApplications = dashboardApplications.filter(
  //   (item) => item.StatusID === 5
  // );
  // const awaitingApproveApplications = dashboardApplications.filter(
  //   (item) => item.StatusID === 1
  // );

  const handleNavigate = (route: string) => () => void router.push(route);
  const handleEdit = (id: number) => () =>
    router.push(`/admin/application/${id}`);
  const handleIncompleteClick = (): void =>
    void router.push('/admin/incomplete');
  const handleApprovedClick = (): void => void router.push('/admin/approved');
  const handleAwaitingClick = (): void => void router.push('/admin/pending');
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.dashboardWrapper}>
        <div className={styles.dashboardHeader}>
          <h2>
            <FontAwesomeIcon icon={faInfoCircle as IconProp} />
          </h2>
          <h2 className={styles.dashboardTitle}>Dashboard</h2>
        </div>
        <div className={styles.responsive}>
          <div className={styles.leftSide}>
            <div className={styles.boxWrapper}>
              <DashboardBox
                onClick={handleAwaitingClick}
                icon={faCheck as IconProp}
                count={stats['Awaiting Approval Applications']}
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
            </div>
            <DashboardBar
              onEdit={handleEdit}
              onNavigate={handleNavigate('/admin/pending')}
              icon={faEdit as IconProp}
              applications={awaitingApproveApplications}
              text="Awaiting review"
              description={`${
                awaitingApproveApplications.length < 1
                  ? 'No New Applications Last 7 Days'
                  : `${awaitingApproveApplications.length} Applications`
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
              notifications={notifications}
            />
            <DashboardBar
              onEdit={handleEdit}
              applications={incompleteApplications}
              onNavigate={handleNavigate('/admin/incomplete')}
              icon={faMinusCircle as IconProp}
              text="New Incomplete Application"
              description={`${
                incompleteApplications.length < 1
                  ? 'No New Applications Last 7 Days'
                  : `${incompleteApplications.length} Applications`
              }  `}
              type={DashboardBoxEnum.Failed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
