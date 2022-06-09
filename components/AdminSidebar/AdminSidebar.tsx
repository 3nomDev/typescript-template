import React, { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCar,
  faCheck,
  faCrosshairs,
  faEdit,
  faFileAlt,
  faInfoCircle,
  faMinusCircle,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../Sidebar/sidebar.module.css';

export const AdminSidebar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.labelDesktop}>TLC Financing</h3>
      <h3 className={styles.labelMobile}>TLC</h3>
      <Link href="/admin">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faInfoCircle as IconProp}
            color="white"
            className={styles.icon1}
          />
          <p className={styles.text}>Dashboard</p>
        </div>
      </Link>
      <Link href="/admin/approved">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faCheck as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Approved</p>
        </div>
      </Link>

      <Link href="/admin/pending">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faEdit as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Pending</p>
        </div>
      </Link>

      <Link href="/admin/incomplete">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faMinusCircle as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Incomplete</p>
        </div>
      </Link>

      <Link href="/admin/customer-list">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faMinusCircle as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Customer List</p>
        </div>
      </Link>

      <Link href="/admin/dealers">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faCar as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Dealers</p>
        </div>
      </Link>

      <Link href="/admin/notifications">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faBell as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Notifications</p>
        </div>
      </Link>
    </div>
  );
};
