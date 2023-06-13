import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import styles from './NotificationTable.module.css';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { NotificationRow } from '../NotificationRow/NotificationRow';
import { setNotificationsAction } from '../../features/dealerDashboardSlice';
import { NotificationInterface } from '../../contracts';

interface Props {
  notifications: NotificationInterface[];
}

export const NotificationTable: FC<Props> = ({ notifications }) => {
  const [searchParam, setSearchParam] = useState<string>('');

  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchParam(e.target.value.toLowerCase());

  useEffect(() => {
    const result = notifications?.map((item) => {
      if (
        item.FirstName.toLowerCase().includes(searchParam) ||
        item.LastName.toLowerCase().includes(searchParam) ||
        item.Description.toLowerCase().includes(searchParam) ||
        item.DateAdded.toLowerCase().includes(searchParam)
      ) {
        return { ...item, isShown: true };
      }
      return { ...item, isShown: false };
    });
    dispatch(setNotificationsAction(result));
  }, [searchParam]);

  return (
    <div className={styles.wrapper}>
      <DealerHeader />

      <div className={styles.title}>
        <div className={styles.titleLeft}>
          <FontAwesomeIcon
            icon={faBell as IconProp}
            color="#154F85"
            className={styles.icon}
          />
          <h3>Notifications</h3>
        </div>

        <h5 className={styles.applicants}>
          Showing {notifications?.length} notifications
        </h5>
      </div>
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchbar}
          placeholder="Search..."
          value={searchParam}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.overflow}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th />
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications?.map((item) => (
              <NotificationRow key={item.ID} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
