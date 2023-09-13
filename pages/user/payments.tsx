import React, { FC, useEffect, useState } from 'react';
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
import styles from './payments.module.css';

import { useAppDispatch } from '../../app/hooks';
import {
  adminDashboardSelector,
  loadPayments,
} from '../../features/adminDashboardSlice';
import { UserPaymentsInterface } from '../../contracts/user-payments';
import { useSelector } from 'react-redux';
import * as CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import { userSelector } from '../../features/authSlice';
import { DealerHeader, PaymentContents } from '../../components';
import { PaymentsTable } from '../../components/PaymentContents/PaymentsTable/PaymentsTable';
import { PaymentTab } from '../../components/PaymentContents';
import { UserSidebar } from '../../components/UserSidebar/userSidebar';

interface Props {
  amountRemaining: any;
  paymentsRemaining: any;
}

const UserPayments: FC<Props> = ({ amountRemaining, paymentsRemaining }) => {
  const { userActiveAccount, userPayments } = useSelector(
    adminDashboardSelector
  );

  let startPayment;
  let lastPayment;
  let total;
  let salesTax;
  let weekly;
  if (userPayments.length) {
    startPayment = userPayments && userPayments[0].ScheduledDate;
    lastPayment = userPayments && userPayments.slice(-1)[0].ScheduledDate;
    weekly = userPayments?.map((payment) => payment.Amount)[0];
  }

  const user = useSelector(userSelector);
  console.log(user);
  const {
    FirstName,
    LastName,
    VehicleMake,
    VehicleModel,
    VehicleYear,
    AmountFinanced,
    VehicleTransmission,
    VehicleMileage,
    PurchasePrice,
    HowLong,
    VehicleColor,
    VehicleEngine,
    TLCTrackerFee,
    SalesTax,
    ApplicationID,
    VIN,
  } = userActiveAccount;

  console.log(userActiveAccount);

  let accountNumber = 0;
  if (userPayments.length && userPayments[0].AccountNumber) {
    accountNumber = userPayments[0].AccountNumber;
  }

  if (SalesTax === null) {
    salesTax = 0;
    total = 0 + PurchasePrice;
  } else {
    total = SalesTax + PurchasePrice;
  }

  const dispatch = useAppDispatch();

  const router = useRouter();
  let handleBack;

  if (user && user.ProfileTypeID === '2') {
    handleBack = (): void => void router.push('/dealership');
  } else {
    handleBack = (): void => void router.back();
  }

  return (
    <div className={styles.wrapper}>
      <UserSidebar />
      <PaymentContents title="User" />
    </div>
  );
};

export default UserPayments;
