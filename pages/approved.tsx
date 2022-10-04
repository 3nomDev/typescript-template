import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DealerCard, Layout } from '../components';
import styles from './styles/approved.module.css';
import {
  applicationDealersSelector,
  approvalCodeSelector,
  loadApplicationDealers,
} from '../features/authSlice';

const Approved: FC = () => {
  const dispatch = useDispatch();

  const approvalCode = useSelector(approvalCodeSelector);

  console.log(approvalCode)
  const applicationDealers = useSelector(applicationDealersSelector);

  useEffect(() => void dispatch(loadApplicationDealers()), []);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.tabContainer}>
          <div className={styles.tabs}>
            <div>Eligibility check</div>
            <div>Dealers</div>
          </div>
          <div className={styles.phoneBar}>
            <span>Need assistance call </span>
            <p>
              <a href="tel:(718)-506-9367">(718)-506-9367</a>
            </p>
          </div>
        </div>
        <div className={styles.dealersContainer}>
          <div className={styles.dealerHeader}>
            <h1>Dealers</h1>
            <p>List of partner and affiliates.</p>
            <span>
             *** Please save this approval code and bring to one of the dealers in the list below to get started. ***
            </span>
            <div className={styles.greyBar}>
              Your approval code:
             <p>{approvalCode}</p>
            </div>
          </div>
          <div className={styles.dealerContent}>
            <div className={styles.dealerContentHeader}>
              All Dealers 1-10 of 32 Results
            </div>
            <div className={styles.dealerCardsBody}>
              {applicationDealers.map((item, idx) => (
                <DealerCard key={item.ID} {...item} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Approved;
