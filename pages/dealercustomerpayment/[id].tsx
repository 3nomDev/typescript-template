import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sidebar } from '../../components';
import { PaymentContents } from '../../components';
import { loadActiveAccounts, loadPaymentsByAppId, loadUserActiveAccount } from '../../features/adminDashboardSlice';
import styles from '../styles/dealercustomerpayment.module.css';

const DealerCustomerPayment = () => {
  const [amountRemaining, setAmountRemaining] = useState(0);
  const [paymentsRemaining, setPaymentsRemaining] = useState(0);
  const [userPayments, setUserPayments] = useState([]);

  // useEffect(
  //   () => (id ? void dispatch(loadPaymentsByAppId(id.toString())) : () => {}),
  //   [router]
  // );
  const dispatch = useDispatch();
  const router = useRouter();

  const appId = router.query.id;


  const getPayments = async () => {
    try {
      let result = await dispatch(loadPaymentsByAppId(appId));
   
      if (result.meta.requestStatus === 'fulfilled') {
        setUserPayments(result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getPayments();

  }, [appId]);

  useEffect(() => {
    setPaymentsRemaining(
      userPayments.filter(
        (payment) => payment.Status.toLowerCase() === 'pending'
      ).length
    );
  }, [userPayments]);

  useEffect(() => filterPaymentsByStatus(), [userPayments]);

  const filterPaymentsByStatus = () => {
    let newArray = [];
    newArray = userPayments
      .filter((payment) => payment.Status.toLowerCase() === 'pending')
      .map((item) => item.Amount);
    setAmountRemaining(newArray.reduce((a, b) => a + b, 0));
  };



  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <PaymentContents
        amountRemaining={amountRemaining}
        paymentsRemaining={paymentsRemaining}
      />
    </div>
  );
};

export default DealerCustomerPayment;
