import React, { FC, useEffect, useState } from 'react';
import styles from './PaymentsTable.module.css';
import {UserPaymentsInterface} from '../../../contracts/user-payments'
import {
  adminDashboardSelector,
 
} from '../../../features/adminDashboardSlice';
import { useSelector } from 'react-redux';
import moment from 'moment';




export const PaymentsTable: FC = () => {
const {
  pending,
  contractsTypes,
  documentTypes,
  states,
  payments,
  userPayments,
  approvedApplications,
  userActiveAccount
} = useSelector(adminDashboardSelector);

const {DateAdded} = userPayments

const formatedDate = moment(DateAdded).format('MM/DD/YYYY')
console.log(formatedDate)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Account #</th>
          <th>Confirmation #</th>
          <th>Date </th>
          <th>Via</th>
          <th>Amount</th>
          <th>Status </th>
        </tr>
      </thead>
      <tbody>


        {userPayments.length && userPayments.map(payment => (<tr>
          <td>{payment.AccountNumber}</td>
          <td>{payment.ConfirmationNumber}</td>
          <td>{formatedDate}</td> 
          <td>{payment.PaymentMethod}</td>
          <td>${payment.Amount}</td>
          <td>{payment.Status}</td>
        </tr>))}
     
      </tbody>
    </table>
  );
};
