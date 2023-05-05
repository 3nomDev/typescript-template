import React, { FC, useEffect, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './ApplicationsTable.module.css';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { DealerRow } from '../DealerRow/DealerRow';
import { ApplicationInterface, DashboardBoxEnum } from '../../contracts';
import { setApplicationsAction } from '../../features/dealerDashboardSlice';
import {
  setApprovedApplicationsAction,
  setIncompleteApplicationsAction,
  setPendingApplicationsAction,
  setDeclinedApplicationsAction,
  setConditionalApplicationsAction
} from '../../features/adminDashboardSlice';
import { SearchBar } from '../SearchBar/SearchBar';

interface Props {
  icon: IconProp;
  applications: ApplicationInterface[];
  title: string;
  type: DashboardBoxEnum;
}

export const ApplicationsTable: FC<Props> = ({
  icon,
  applications,
  type,
  title,
}) => {
  const [searchParam, setSearchParam] = useState<string>('');

  const router = useRouter();

  const dispatch = useDispatch();

console.log(applications)

  useEffect(() => {
    if(applications.length > 0) {const result = applications.map((item) => {
      if (
        item.ApplicationID.toString().includes(searchParam) ||
        item.FirstName.toLowerCase().includes(searchParam) ||
        item.LastName.toLowerCase().includes(searchParam) ||
        item.CellPhone.toLowerCase().includes(searchParam) ||
        item.VehicleMake.toLowerCase().includes(searchParam) ||
        item.VehicleModel.toLowerCase().includes(searchParam) ||
        String(item.VehicleYear).toLowerCase().includes(searchParam) ||
        item.VIN.toLowerCase().includes(searchParam) ||
        item.Status.toLowerCase().includes(searchParam)
        // item.ApprovalCode.toLowerCase().includes(searchParam)
      ) {
        return { ...item, isShown: true };
      }
      return { ...item, isShown: false };
    });

  
    switch (type) {
      case DashboardBoxEnum.Success:
        dispatch(setApprovedApplicationsAction(result));
        break;

      case DashboardBoxEnum.Failed:
        dispatch(setIncompleteApplicationsAction(result));
        break;

      case DashboardBoxEnum.Pending:
        dispatch(setPendingApplicationsAction(result));
        break;
      case DashboardBoxEnum.Conditional:
        dispatch(setConditionalApplicationsAction(result));
        break;
      case DashboardBoxEnum.Declined:
        dispatch(setDeclinedApplicationsAction(result));
        break;

      default:
        break;
    }
    dispatch(setApplicationsAction(result));}
    
  }, [searchParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchParam(e.target.value.toLocaleLowerCase());
  const handleRowEdit = (id: string) => () =>
    void router.push(`application/${id}`);

  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h2 className={styles.title}>
            <FontAwesomeIcon icon={icon} /> {title}
          </h2>
          <span>Showing {applications.length} results</span>
        </div>
        <SearchBar onChange={handleInputChange} inputValue={searchParam} />
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Name</th>
            {applications[0]?.ApprovalCode &&  <th>Approval Code</th>}
                <th>App ID</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Amount</th>
                <th>VIN</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th/>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {applications.length > 0 && applications?.map((item) => (
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
    </div>
  );
};
