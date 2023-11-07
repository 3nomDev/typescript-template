import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import {
  faBell,
  faFileAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './sidebar.module.css';
import { faPerson } from '@fortawesome/pro-regular-svg-icons';

export const Sidebar: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.labelDesktop}>TLC Financing</h3>
      <h3 className={styles.labelMobile}>TLC</h3>
      <Link href="/create-application">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faUserPlus as IconProp}
            color="white"
            className={styles.icon1}
          />
          <p className={styles.text}>Create Application</p>
        </div>
      </Link>
      <Link href="/dealership">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileAlt as IconProp}
            color="white"
           
            className={styles.icon1}
          />
          <p className={styles.text}>Application Status</p>
        </div>
      </Link>

      <Link href="/dealer-notification">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faBell as IconProp}
            color="white"
            className={styles.icon1}
          />
          <p className={styles.text}>Notifications</p>
        </div>
      </Link>
      <Link href="/editDealerProfile">
        <div className={styles.link}>
        <FontAwesomeIcon
            icon={faPerson as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Edit Profile</p>
        </div>
      </Link>
    </div>
  );
};
