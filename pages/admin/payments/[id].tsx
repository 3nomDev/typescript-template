import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isString } from '@rnw-community/shared';
import styles from '../../styles/dealership.module.css';
import {
  AdminSidebar,
  EditDealerContent,
  PaymentContents,
} from '../../../components';
import { withAuth } from '../../../hocs';
import { Oval } from 'react-loader-spinner';

import {
  adminDashboardSelector,
  changeApplicationStatus,
  generatePdf,
  loadApplication,
  loadContractTypes,
  loadDocumentTypes,
  loadStates,
  schedulePayment,
  updateApplication,
  userPaymentsSelector,
  loadPayments,
  loadApprovedApplications,
  loadPaymentsByAppId,
  loadUserActiveAccount,
} from '../../../features/adminDashboardSlice';
import {
  ApplicationInterface,
  ChangeApplicationStatusArgs,
  SchedulePaymentPayloadInterface,
} from '../../../contracts';
import { authSelector, userSelector } from '../../../features/authSlice';
import { number } from 'yup';

const EditDealerPage: FC = () => {
  const router = useRouter();

  const {
    pending,
    contractsTypes,
    documentTypes,
    states,
    payments,
    userPayments,
    approvedApplications,
    userActiveAccount,
  } = useSelector(adminDashboardSelector);
  // const payments = useSelector(PaymentsSelector);

  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const { AmountFinanced } = userActiveAccount;


  const userId = user?.ID;
  let id = router.query.id;

  // const fakePayments = [
  //   {
  //     Amount: 1000,
  //     Status: 'Complete',
  //   },
  //   {
  //     Amount: 300,
  //     Status: 'Pending',
  //   },
  //   {
  //     Amount: 300,
  //     Status: 'Complete',
  //   },
  //   {
  //     Amount: 200,
  //     Status: 'Complete',
  //   },
  //   {
  //     Amount: 1000,
  //     Status: 'Pending',
  //   },
  // ];

  useEffect(
    () => (id ? void dispatch(loadPaymentsByAppId(id.toString())) : () => {}),
    [router]
  );
  // useEffect(() => void dispatch(loadApprovedApplications(userId)), []);
  useEffect(
    () => (id ? void dispatch(loadUserActiveAccount(id.toString())) : () => {}),
    [router]
  );
  useEffect(() => filterPaymentsByStatus(), [userPayments]);

  // const [pendingPayments, setPendingPayments] = useState([]);
  const [amountRemaining, setAmountRemaining] = useState(0)
  const [paymentsRemaining, setPaymentsRemaining] = useState(0)

  const filterPaymentsByStatus = () => {
    let newArray = [];
    newArray = userPayments
      .filter((payment) => payment.Status.toLowerCase() === 'pending')
      .map((item) => item.Amount);
      setAmountRemaining(newArray.reduce((a, b) => a + b, 0));
  };


useEffect(() =>{
setPaymentsRemaining(userPayments.filter(payment => payment.Status.toLowerCase() === 'pending').length)
},[userPayments])


  const loaded = (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <PaymentContents amountRemaining={amountRemaining} paymentsRemaining={paymentsRemaining}/>
    </div>
  );

  const notLoaded = (
    <div className={styles.loaderWrapper}>
      <Oval
        secondaryColor="black"
        wrapperClass={styles.loader}
        width={80}
        height={80}
        color="black"
      />
    </div>
  );

  return <div>{!pending ? loaded : notLoaded}</div>;
};

export default withAuth(EditDealerPage);
