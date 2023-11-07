import React, { FC, useState } from 'react';
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
  faHeartbeat,
  faList
} from '@fortawesome/fontawesome-free-solid';

import {faMonitorHeartRate, faFileSignature, faFileCheck, faFileExclamation, faFileXmark, faFileCircleQuestion, faPerson} from '@fortawesome/pro-regular-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from '../Sidebar/sidebar.module.css';

export const AdminSidebar: FC = () => {


  const [active, setActive] = useState(false)
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.labelDesktop}>TLC Financing</h3>
      <h3 className={styles.labelMobile}>TLC</h3>
      <Link href="/admin" onClick={() => setActive(true)} >
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faMonitorHeartRate as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Dashboard</p>
        </div>
      </Link>
      <Link href="/admin/approved">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileCheck as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Approved</p>
        </div>
      </Link>

      <Link href="/admin/pending">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileSignature as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Awaiting Approval</p>
        </div>
      </Link>

      <Link href="/admin/incomplete">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileCircleQuestion as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Incomplete</p>
        </div>
      </Link>
      <Link href="/admin/declined">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileXmark as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Declined Applications</p>
        </div>
      </Link>
      <Link href="/admin/conditional">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faFileExclamation as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Conditional Applications</p>
        </div>
      </Link>

      <Link href="/admin/customer-list">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faList as IconProp}
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

      <Link href="/admin/addNewUser">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faPerson as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Create New Dealer/Admin</p>
        </div>
      </Link>

      <Link href="/admin/editUser">
        <div className={styles.link}>
          <FontAwesomeIcon
            icon={faPerson as IconProp}
            color="white"
            className={styles.icon}
          />
          <p className={styles.text}>Edit Profile</p>
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
