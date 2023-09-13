import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import {
  faBell,
  faFileAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './usersidebar.module.css';

export const UserSidebar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.labelDesktop}>TLC Financing</h3>
      <h3 className={styles.labelMobile}>TLC</h3>
     
      <Link href="/user">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileAlt as IconProp}
            color="white"
           
            className={styles.icon1}
          />
          <p className={styles.text}>Dashboard</p>
        </div>
      </Link>
      <Link href="/user/application">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileAlt as IconProp}
            color="white"
           
            className={styles.icon1}
          />
          <p className={styles.text}>Application</p>
        </div>
      </Link>
      <Link href="/user/payments">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileAlt as IconProp}
            color="white"
           
            className={styles.icon1}
          />
          <p className={styles.text}>Payments</p>
        </div>
      </Link>

      {/* <Link href="/dealer-notification">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faBell as IconProp}
            color="white"
            className={styles.icon1}
          />
          <p className={styles.text}>Notifications</p>
        </div>
      </Link> */}
    </div>
  );
};
