import React, { FC } from 'react';
import styles from '../styles/dealership.module.css';
import { AdminSidebar, DealerHeader, PaymentContents } from '../../components';

const Payments: FC = () => {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <PaymentContents amountRemaining={undefined} paymentsRemaining={undefined} />
    </div>
  );
};

export default Payments;
