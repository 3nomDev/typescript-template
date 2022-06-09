import React, { FC, useEffect, useState } from 'react';
import styles from '../styles/customer-list.module.css'
import { AdminSidebar, CustomerList, DealerHeader, PaymentContents } from '../../components';
import { useRouter } from 'next/router';
import { withAuth } from '../../hocs';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../features/authSlice';
import {
    approvedApplicationsSelector,
    activeAccountsSelector,
    loadActiveAccounts,
    loadApprovedApplications,
  } from '../../features/adminDashboardSlice';

 

const Customerlist: FC = () => {

    const [activeAccountList, setActiveAccountList] = useState("");
    
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
//   const activeAccounts = useSelector(activeAccountsSelector);
  

  
    return (
        <div className={styles.wrapper}>
            <AdminSidebar />
            <CustomerList  />
        </div>
    );
};
export default withAuth(Customerlist);