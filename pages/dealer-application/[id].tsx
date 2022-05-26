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

const DealerApplication: FC = () => {
  const dispatch = useDispatch();

  const { applicationItem } = useSelector(dealerDashboardSelector);

  const router = useRouter();

  const { id } = router.query;

  useEffect(
    () => void (isString(id) && dispatch(loadApplicationItem(id as string))),
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
