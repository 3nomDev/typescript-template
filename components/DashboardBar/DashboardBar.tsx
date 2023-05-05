import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCalendarAlt,
} from '@fortawesome/fontawesome-free-solid';
import { isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import styles from './DashboardBar.module.css';
import {
  DashboardApplicationInterface,
  DashboardBoxEnum,
  NotificationInterface,
} from '../../contracts';
import { getTextStyle } from '../DashboardBox/DashboardBox';
import { NotificationBar } from '../NotificationBar/NotificationBar';
import moment from 'moment';

interface Props {
  icon: IconProp;
  text: string;
  description?: string;
  type: DashboardBoxEnum;
  onNavigate: OnEventFn;
  onEdit: (id: number) => () => void;
  applications?: DashboardApplicationInterface[];
  notifications?: NotificationInterface[];
}

export const DashboardBar: FC<Props> = ({
  type,
  icon,
  text,
  description,
  onNavigate,
  onEdit,
  notifications,
  applications,
}) => {

  console.log(applications)
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.content}>
          <span className={getTextStyle(type)}>
            <FontAwesomeIcon className={styles.icon} icon={icon} />
            <span className={styles.label}>{text}</span>
          </span>
          <span className={styles.calendarText}>
            <FontAwesomeIcon icon={faCalendarAlt as IconProp} />
            <span className={styles.calendarTextLabel}>Last 7 days</span>
          </span>
          {isNotEmptyString(description) && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
        <div className={styles.button} onClick={onNavigate}>
          View more
        </div>
      </div>
      {Boolean(notifications?.length) && (
        <div className={styles.notifications}>
          {notifications.map((item) => (
            <NotificationBar key={item.ID} {...item} />
          ))}
        </div>
      )}

      {Boolean(applications?.length) && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Application #</th>
              <th>Name</th>
              <th>Dealership</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {applications.map((item) => (
              <tr onClick={onEdit(item.ID)} style={{cursor:"pointer", color:"#6c757d"}}>
                <td>{item.ID}</td>
                <td>{item.Name}</td>
                <td>{item.Dealer}</td>
                <td>{moment(item.LastUpdated).format('MM/DD/YYYY')}</td>
                <td className={styles.rowButton} onClick={onEdit(item.ID)}>
                  <FontAwesomeIcon icon={faArrowRight as IconProp} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
