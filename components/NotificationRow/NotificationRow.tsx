import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../NotificationTable/NotificationTable.module.css';
import { NotificationInterface } from '../../contracts';
import moment from 'moment'

type Props = Partial<NotificationInterface>;

export const NotificationRow: FC<Props> = ({
  FirstName,
  LastName,
  Description,
  DateAdded,
  isShown,
}) => {
  if (!isShown) return null;
  return (
    <tr className={styles.tableRow}>
      <td className={styles.bell}>
        <FontAwesomeIcon icon={faBell as IconProp} color="lightgreen" />
      </td>
      <td>{FirstName.concat(` ${LastName}`)}</td>
      <td>{Description}</td>
      <td>{moment(DateAdded).format('MM/DD/YYYY')}</td>
    </tr>
  );
};
