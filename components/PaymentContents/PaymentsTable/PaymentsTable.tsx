import React, { FC } from 'react';
import styles from './PaymentsTable.module.css';

export const PaymentsTable: FC = () => {
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
        <tr>
          <td>23769 46934 43</td>
          <td>785487657456 </td>
          <td>9/13/2021</td>
          <td>Online paypal </td>
          <td>$250</td>
          <td>Processing</td>
        </tr>
        <tr>
          <td>23769 46934 43</td>
          <td>785487657456 </td>
          <td>9/13/2021</td>
          <td>Online paypal </td>
          <td>$250</td>
          <td>Processing</td>
        </tr>
      </tbody>
    </table>
  );
};
