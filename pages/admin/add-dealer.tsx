import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from '../styles/dealership.module.css';
import { AddDealerForm, AdminSidebar } from '../../components';
import { withAuth } from '../../hocs';
import { DealerInterface } from '../../contracts';
import {
  adminDashboardSelector,
  loadStates,
  stateSelector,
  updateDealers,
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';

export const initialDealerFormValues = {
  Name: '',
  Address: '',
  City: '',
  State: '',
  License: '',
  Website: '',
  WorkPhone: '',
  EXT: '',
  ContactFirstName: '',
  ContactLastName: '',
  ContactPosition: '',
  EmailAddress: '',
  PostalCode: '',
};

const AddDealer: FC = () => {
  const dispatch = useDispatch();

  const { pending } = useSelector(adminDashboardSelector);
  const user = useSelector(userSelector);
  const states = useSelector(stateSelector);

  const router = useRouter();

  useEffect(() => void dispatch(loadStates()), []);

  const handleSubmit = (values: Partial<DealerInterface>): void => {
    dispatch(
      updateDealers({
        payload: { ...values, userid: Number(user?.ID), dealerid: 0 },
        router,
      })
    );
  };
  const handleBack = (): void => void router.push('/admin/dealers');

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <AddDealerForm
        pending={pending}
        initialValues={initialDealerFormValues}
        onSubmit={handleSubmit}
        states={states}
        onBack={handleBack}
      />
    </div>
  );
};

export default withAuth(AddDealer);
