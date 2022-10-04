import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFile } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { isArray } from 'util';
import { useRouter } from 'next/router';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './DealerAppTable.module.css';
import { DealerRow } from '../DealerRow/DealerRow';
import {
  applicationsSelector,
  loadApplications,
  setApplicationsAction,
} from '../../features/dealerDashboardSlice';
import { userSelector } from '../../features/authSlice';
import AssignCustomerToDealer from '../AssignCustomerToDealer/AssignCustomerToDealer';

export const DealerAppTable: FC = () => {
  const [searchParam, setSearchParam] = useState<string>('');
  const [assignCustomer, setAssignCustomer] = useState(false)

  const dispatch = useDispatch();

  const router = useRouter();

  const user = useSelector(userSelector);
  const applications = useSelector(applicationsSelector);

  useEffect(() => void dispatch(loadApplications(user?.ID)), []);
  useEffect(() => {
    const result = applications.map((item) => {
      if (
        item.FirstName.toLowerCase().includes(searchParam) ||
        item.LastName.toLowerCase().includes(searchParam) ||
        item.CellPhone.toLowerCase().includes(searchParam) ||
        item.VehicleMake.toLowerCase().includes(searchParam) ||
        item.VehicleModel.toLowerCase().includes(searchParam) ||
        String(item.VehicleYear).toLowerCase().includes(searchParam) ||
        item.VIN.toLowerCase().includes(searchParam) ||
        item.ApprovalCode.toLowerCase().includes(searchParam) ||
        item.Status.toLowerCase().includes(searchParam)
      ) {
        return { ...item, isShown: true };
      }
      return { ...item, isShown: false };
    });
    dispatch(setApplicationsAction(result));
  }, [searchParam]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchParam(e.target.value.toLowerCase());
  const handleRowEdit = (id: string) => (): Promise<boolean> =>
    router.push(`/dealer-application/${id}`);

  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.title}>
        <div className={styles.titleLeft}>
          <FontAwesomeIcon
            icon={faFile as IconProp}
            color="#154F85"
            className={styles.icon}
          />
          <h3>Applications</h3>
        </div>

        <h5 className={styles.applicants}>
          Showing {applications.length} Results
        </h5>
      </div>
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchbar}
          placeholder="Search..."
          value={searchParam}
          onChange={handleSearchChange}
        /> <div>
        <button onClick={() => setAssignCustomer(!assignCustomer)} className={styles.assignBtn}>Register Customer</button>
      </div>
      </div>
     
      <div className={styles.overflow}>
        {assignCustomer && <AssignCustomerToDealer setAssignCustomer = {setAssignCustomer}/>}
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Name</th>
              <th>Approval code</th>
              <th>App ID</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Amount</th>
              <th>VIN</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {isArray(applications) &&
              applications.map((item) => (
                <DealerRow
                  key={item.ID}
                  {...item}
                  onEditClick={handleRowEdit}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
