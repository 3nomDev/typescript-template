import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown,} from '@fortawesome/fontawesome-free-solid';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { divide } from 'lodash';
import { useRouter } from 'next/router';
import { NextRouter } from 'next/dist/client/router';
import styles from './DealerHeader.module.css';
import { logoutAction, userSelector } from '../../features/authSlice';
import { NotificationBar } from '../NotificationBar/NotificationBar';
import {faMonitorHeartRate, faRightFromBracket} from '@fortawesome/pro-regular-svg-icons'

import {
  loadNotifications,
  notificationsSelector,
} from '../../features/dealerDashboardSlice';

interface Props {
  title?: string;
}

export const DealerHeader: FC<Props> = ({ title = 'Dealer' }) => {
  const [isLogoutPanelExpanded, setIsLogoutPanelExpanded] =
    useState<boolean>(false);
  const [isNotificationPanelExpanded, setIsNotificationPanelExpanded] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const notifications = useSelector(notificationsSelector);
  const user = useSelector(userSelector);

  useEffect(() => void dispatch(loadNotifications(user?.ID)), [user]);

  const toggleSignoutPanel = (): void =>
    setIsLogoutPanelExpanded(!isLogoutPanelExpanded);
  const toggleNotificationPanel = (): void =>
    setIsNotificationPanelExpanded(!isNotificationPanelExpanded);
  const handleLogout = (): void => void dispatch(logoutAction());
  const handleNotificationsNavigate = (): Promise<boolean> =>
    router.pathname.includes('admin')
      ? router.push('/admin/notifications')
      : router.push('/dealer-notification');

      console.log(user)

      const logoutLogic = () =>{
        if(user.ProfileTypeID === '3'){
          handleLogout(); 

          router.push('/user/login')
        }
        else {
          handleLogout(); 
          router.push('/login')
        }
      }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.pageTitle}>{title}</h3>
      <div className={styles.profileContainer}>
        <FontAwesomeIcon
          onClick={toggleNotificationPanel}
          icon={faBell as IconProp}
          className={styles.icon}
          color="green"
        />
        <div className={styles.profileIcon}>
          {user?.FirstName[0].concat(user?.LastName[0])}
        </div>
        <h5 className={styles.username}>
          {user?.FirstName.concat(' ', user?.LastName)}
        </h5>
        <FontAwesomeIcon
          onClick={toggleSignoutPanel}
          icon={faChevronDown as IconProp}
          className={styles.chevronIcon}
          color="green"
        />
      </div>
      {isLogoutPanelExpanded && (
        <div onClick={logoutLogic} className={styles.logoutPanel}>
          <FontAwesomeIcon icon={faRightFromBracket as IconProp} className={styles.logOutIcon}/>Logout
        </div>
      )}
      {isNotificationPanelExpanded && (
        <div className={styles.notificationPanel}>
          <p>{notifications.length} Notifications</p>
          <div className={styles.panel}>
            {notifications.map((item) => (
              <NotificationBar key={item.ID} {...item} />
            ))}
          </div>
          <div onClick={handleNotificationsNavigate}>
            <p
              onClick={toggleNotificationPanel}
              className={styles.showMessages}
            >
              Show all messages
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
