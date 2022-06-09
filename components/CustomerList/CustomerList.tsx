import React, { FC, useEffect, useState } from 'react';
import styles from './CustomerList.module.css';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ApplicationInterface, DashboardBoxEnum } from '../../contracts';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid';

import { AdminSidebar, DealerHeader, PaymentContents } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Router, { useRouter } from 'next/router';
import { DealerRow } from '../DealerRow/DealerRow';
import { CustomerRow } from '../CustomerRow/CustomerRow';
import { useDispatch, useSelector } from 'react-redux';
import { activeAccountsSelector, loadActiveAccounts } from '../../features/adminDashboardSlice';


// interface Props {
//   data;

// }

export const CustomerList: FC = ()  => {
  const router = useRouter();
  const activeAccounts = useSelector(activeAccountsSelector);
  const dispatch = useDispatch();
  console.log(activeAccounts)
  const handleRowEdit = (id: string) => () =>
  
  void router.push(`payments/${id}`);
 useEffect(() => void dispatch(loadActiveAccounts()), []);
  // const handleNavigate = (): void => Router.push('/admin/payments');

  return  (
    <div className={styles.wrapper}>
    <DealerHeader title="Admin" />
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <h2 className={styles.title}>
          {/* <FontAwesomeIcon icon={icon} />  */}
          Clients
        </h2>
        <span>Showing 2 results</span>
      </div>
      {/* <SearchBar onChange={handleInputChange} inputValue={searchParam} /> */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Name</th>
              <th>Approval code</th>
              <th>Phone</th>
             
              <th>Status</th>
              <th />
            </tr>
          </thead>
         
          <tbody className={styles.tableBody}>
            {activeAccounts.map((item) => (
              <CustomerRow
                key={item.ID}
                {...item}
                onEditClick={handleRowEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
   );
} 
  


  


    

    
    
    
    
