import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faPlus } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './DealerContent.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import {
  dealersSelector,
  loadDealers,
  setDealersAction,
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { AdminDealerRow } from '../AdminDealerRow/AdminDealerRow';

export const DealerContent: FC = () => {
  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState<string>('');
 

  const user = useSelector(userSelector);
  const dealers = useSelector(dealersSelector);


  const router = useRouter();

  useEffect(() => void dispatch(loadDealers(user?.ID)), []);
  useEffect(() => {
    const result = dealers?.map((item) => {
      if (
        item.ID.toString().toLowerCase().includes(searchParam.toLowerCase()) ||
        item.Name.toLowerCase().includes(searchParam.toLowerCase())
      ) {
        return { ...item, isShown: true };
      }
      return { ...item, isShown: false };
    });
    dispatch(setDealersAction(result));
  }, [searchParam]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setSearchParam(e.target.value);
  const handleAddDealer = (): void => void router.push('/admin/add-dealer');
  const handleEditPress = (id: number) => () => {
    router.push(`/admin/edit-dealer/${id}`);
  };
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h2>
            <FontAwesomeIcon icon={faCar as IconProp} className={styles.icon} />
            Dealership
          </h2>
          <div className={styles.addButton} onClick={handleAddDealer}>
            <FontAwesomeIcon
              icon={faPlus as IconProp}
              className={styles.plusIcon}
            />
            Add new
          </div>
          <span>Showing {dealers?.length} results</span>
        </div>

        <SearchBar onChange={handleInputChange} inputValue={searchParam} />
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Position</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dealers?.length && dealers.map((item) => (
                <AdminDealerRow
                  key={item.ID}
                  {...item}
                  onEditPress={handleEditPress}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
