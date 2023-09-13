import React, { FC } from 'react';

import styles from '../styles/dealership.module.css';


import { useSelector } from 'react-redux';
import { DealerHeader, Sidebar } from '../../components';
import { withAuth } from '../../hocs';
import { userSelector } from '../../features/authSlice';
import { UserSidebar } from '../../components/UserSidebar/userSidebar';
import { UserDashboard } from '../../components/UserDashboard/userDashboard';


const UserPage: FC = () => {
const user = useSelector(userSelector)
console.log(user)
  return (
    <div className={styles.wrapper}>
           
      <UserSidebar />
    <UserDashboard/>
    </div>
  );
};
export default withAuth(UserPage) ;
