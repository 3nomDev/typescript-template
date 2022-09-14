import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isString } from '@rnw-community/shared';
import styles from '../styles/dealership.module.css';
import { EditDealerApplication, Sidebar } from '../../components';
import {
  dealerDashboardSelector,
  loadApplicationItem,
  
} from '../../features/dealerDashboardSlice';
import { withAuth } from '../../hocs';
import { userSelector } from '../../features/authSlice';

const DealerApplication: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { applicationItem } = useSelector(dealerDashboardSelector);
const userid = user?.ID
const statusId= applicationItem?.StatusID
console.log(statusId)

  const router = useRouter();
  console.log(applicationItem)

  const { id } = router.query;
  const data = {appId: id, userId:userid}

  useEffect(
    () => void (isString(id) && dispatch(loadApplicationItem(data))),
    [id]
  );
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <EditDealerApplication initialValues={applicationItem} />
    </div>
  );
};

export default withAuth(DealerApplication);
