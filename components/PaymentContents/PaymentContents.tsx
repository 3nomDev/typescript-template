import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCheck,
  faCreditCard,
  faDollarSign,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cx from 'classnames';
import { useRouter } from 'next/router';
import styles from './PaymentContents.module.css';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { PaymentTab } from './PaymentTab/PaymentTab';
import { PaymentsTable } from './PaymentsTable/PaymentsTable';
import { useAppDispatch } from '../../app/hooks';
import { loadPayments } from '../../features/adminDashboardSlice';

export const PaymentContents: FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => void dispatch(loadPayments()), []);

  const handleBack = (): void => void router.back();

  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.contentWrapper}>
        <div className={styles.contentHeader}>
          <div className={styles.contentTitle}>
            <FontAwesomeIcon
              icon={faCheck as IconProp}
              className={styles.titleIcon}
            />
            <h2>5757 46347 3738</h2>
          </div>
        </div>
        <div className={styles.dashboardBar}>
          <div className={styles.dashboardActions}>
            <div className={styles.backButton} onClick={handleBack}>
              <FontAwesomeIcon
                icon={faArrowLeft as IconProp}
                className={styles.backIcon}
              />
              Back
            </div>
            <h4>Andrea Daniella</h4>
          </div>
        </div>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <button>Payments</button>
          </li>
          <li className={cx(styles.navItem, styles.navItemInactive)}>
            <button>Client details</button>
          </li>
        </ul>
        <div className={styles.paymentDetailsWrapper}>
          <div className={styles.tabsRow}>
            <PaymentTab
              icon={faDollarSign as IconProp}
              text="Amount Financed"
              value="$32,099"
            />
            <PaymentTab
              icon={faDollarSign as IconProp}
              text="Total remaining"
              value="$29,340"
            />
            <PaymentTab
              icon={faCreditCard as IconProp}
              text="Weekly term"
              value="$278"
            />
            <PaymentTab
              icon={faCreditCard as IconProp}
              text="Payments remained"
              value="98/wks"
            />
          </div>
          <div className={styles.carDetails}>
            <div className={styles.carDetailsHeader}>
              <h5>2021 Toyota Camry SE</h5>
              <p>
                <strong>VIN:</strong> 1GYS3NKL7MR437140
              </p>
            </div>
            <div className={styles.carDetailsBody}>
              <div>
                <div className={styles.carDetailsPerks}>
                  <p>Engine:</p>
                  <span>2.5L</span>
                </div>
                <div className={styles.carDetailsPerks}>
                  <p>Current Odometer:</p>
                  <span>00000</span>
                </div>
              </div>

              <div>
                <div className={styles.carDetailsPerks}>
                  <p>Exterior Color:</p>
                  <span>Midnight Black Metallic</span>
                </div>
                <div className={styles.carDetailsPerks}>
                  <p>Interior Color:</p>
                  <span>Black</span>
                </div>
              </div>

              <div>
                <div className={styles.carDetailsPerks}>
                  <p>Drivetrain:</p>
                  <span>Front Wheel drive</span>
                </div>
                <div className={styles.carDetailsPerks}>
                  <p>Transmission:</p>
                  <span>7 speed automatic </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoHistory}>
            <div className={styles.info}>
              <h4>Information</h4>
              <div className={styles.tableInfo}>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
                <div className={styles.infoBar}>
                  <p>Car cost</p>
                  <span>$32.548</span>
                </div>
              </div>
            </div>
            <div className={styles.paymentTable}>
              <h4>Payment history</h4>
              <PaymentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
