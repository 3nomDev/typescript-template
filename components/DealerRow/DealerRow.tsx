import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './DealerRow.module.css';
import { ApplicationInterface } from '../../contracts';

interface Props extends Partial<ApplicationInterface> {
  onEditClick: (id: string) => () => void;
}

export const DealerRow: FC<Props> = ({
  FirstName,
  LastName,
  ApplicationID,
  CellPhone,
  VehicleModel,
  VehicleMake,
  VehicleYear,
  ID,
  PurchasePrice,
  VIN,
  Status,
  onEditClick,
  isShown,
  ApprovalCode
}) => {
  if (!isShown) return null;

  const statusStyle = {
    Declined: styles.red,
    Incomplete: styles.blue,
    Approved: styles.green,
    'Conditional Approval': styles.orange,
  }[Status];

  return (
    <tr className={styles.tableRow}>
      <td>{FirstName?.concat(` ${LastName}`)}</td>
   {ApprovalCode &&    <td>{ApprovalCode}</td>}
      <td>{ApplicationID}</td>
      <td>{CellPhone}</td>
      <td>
        {VehicleMake}{" "}
        {VehicleModel}{" "}
        {VehicleYear}
      </td>
      <td>{PurchasePrice}</td>
      <td>{VIN}</td>
      <td className={statusStyle}>{Status}</td>
      <td
        className={styles.rowButton}
        onClick={onEditClick(ApplicationID.toString())}
      >
        <FontAwesomeIcon icon={faArrowRight as IconProp} color="darkgrey" />
      </td>
    </tr>
  );
};
