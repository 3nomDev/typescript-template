import React, { FC } from 'react';
import { DealerAppTable, Sidebar } from '../components';
import styles from './styles/dealership.module.css';
import { withAuth } from '../hocs';
import { userSelector } from '../features/authSlice';
import { useSelector } from 'react-redux';


const DealerPage: FC = () => {
const user = useSelector(userSelector)

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <DealerAppTable />
    </div>
  );
};
export default withAuth(DealerPage);
