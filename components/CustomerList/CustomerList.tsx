import React, { FC, useEffect, useState } from 'react';
import styles from './CustomerList.module.css';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ApplicationInterface, DashboardBoxEnum } from '../../contracts';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid';

import { AdminSidebar, DealerHeader, PaymentContents } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faList } from '@fortawesome/pro-regular-svg-icons';
import Router, { useRouter } from 'next/router';
import { DealerRow } from '../DealerRow/DealerRow';
import { CustomerRow } from '../CustomerRow/CustomerRow';
import { useDispatch, useSelector } from 'react-redux';
import {
  activeAccountsSelector,
  loadActiveAccounts,
  userPaymentsSelector,
  adminDashboardSelector,
  setActiveCustomersAction,
} from '../../features/adminDashboardSlice';
import { Oval } from 'react-loader-spinner';
import { SearchBar } from '../../components';

interface Props {
  type: DashboardBoxEnum;
}

export const CustomerList: FC<Props> = ({ type }) => {
  const router = useRouter();
  const activeAccounts = useSelector(activeAccountsSelector);
  const payments = useSelector(userPaymentsSelector);
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useState<string>('');

  const { pending } = useSelector(adminDashboardSelector);

  useEffect(() => {
  
    const result = activeAccounts.map((item) => {
      if (
        item.ApplicationID.toString().includes(searchParam) ||
        item.FirstName.toLowerCase().includes(searchParam) ||
        item.LastName.toLowerCase().includes(searchParam) ||
        item.CellPhone.toLowerCase().includes(searchParam)
      ) {
        return { ...item, isShown: true };
      }
      return { ...item, isShown: false };
    });

    dispatch(setActiveCustomersAction(result));
  }, [searchParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchParam(e.target.value.toLocaleLowerCase());

  const handleRowEdit = (id: string) => () =>
    void router.push(`payments/${id}`);
  useEffect(() => void dispatch(loadActiveAccounts()), []);
  // const handleNavigate = (): void => Router.push('/admin/payments');

  const loaded = (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h2 className={styles.title}>
            <FontAwesomeIcon icon={faList} style={{ marginRight: '10px' }} />
            Clients
          </h2>
          <span>Showing {activeAccounts.length} results</span>
        </div>
        <SearchBar onChange={handleInputChange} inputValue={searchParam} />
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Name</th>
                <th>Application ID</th>
                <th>Phone</th>

                <th>Status</th>
                {/* <th /> */}
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

  const notLoaded = (
    <div className={styles.loaderWrapper}>
      <Oval
        secondaryColor="black"
        wrapperClass={styles.loader}
        width={80}
        height={80}
        color="black"
      />
    </div>
  );

  return <>{loaded}</>;
};
