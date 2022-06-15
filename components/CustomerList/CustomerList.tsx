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
import { activeAccountsSelector, loadActiveAccounts, userPaymentsSelector,adminDashboardSelector } from '../../features/adminDashboardSlice';
import { Oval } from 'react-loader-spinner';




export const CustomerList: FC = ()  => {
  const router = useRouter();
  const activeAccounts = useSelector(activeAccountsSelector);
  const payments = useSelector(userPaymentsSelector);
  const dispatch = useDispatch();
  const {
    pending,
 
  } = useSelector(adminDashboardSelector);
  console.log(pending)
  


  const handleRowEdit = (id: string) => () =>
  
  void router.push(`payments/${id}`);
 useEffect(() => void dispatch(loadActiveAccounts()), []);
  // const handleNavigate = (): void => Router.push('/admin/payments');


  const loaded = (<div className={styles.wrapper}>
    <DealerHeader title="Admin" />
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <h2 className={styles.title}>
          {/* <FontAwesomeIcon icon={icon} />  */}
          Clients
        </h2>
        <span>Showing {activeAccounts.length} results</span>
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
  </div>)

  const notLoaded = (<div className={styles.loaderWrapper}>
    <Oval
      secondaryColor="black"
      wrapperClass={styles.loader}
      width={80}
      height={80}
      color="black"
    />
  </div>)

  return  (
    <>
    {!pending ? loaded : notLoaded}
    </>
   );
} 
  


  


    

    
    
    
    
