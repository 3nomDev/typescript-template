import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAppForm, Sidebar } from '../components';
import { withAuth } from '../hocs';
import styles from './styles/create-application.module.css';
import { loadStates, stateSelector } from '../features/adminDashboardSlice';

const CreateApplication: FC = () => {
  const dispatch = useDispatch();

  const states = useSelector(stateSelector);
const [loadedValues, setLoadedValues] = useState([])
  useEffect(() => void dispatch(loadStates()), []);

  console.log(loadedValues)

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <CreateAppForm states={states} loadedValues={loadedValues} setLoadedValues={setLoadedValues}/>
    </div>
  );
};

export default withAuth(CreateApplication);
