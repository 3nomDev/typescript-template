import React, { FC } from 'react';
import styles from '../styles/dealership.module.css';
import { AdminSidebar, DealerHeader, PaymentContents } from '../../components';

const Payments: FC = () => {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <PaymentContents />
    </div>
  );
};

export default Payments;
