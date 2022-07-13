import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './CustomerRow.module.css';
import { ActiveAccountsInterface } from '../../contracts';

interface Props extends Partial<ActiveAccountsInterface> {
    onEditClick: (id: string) => () => void;
}

export const CustomerRow: FC<Props>  = ({

  FirstName,
  LastName,
  ApplicationID,
  Active,
  Address,
  onEditClick,
  ID,
  CellPhone,
  EmailAddress,
  isShown
}) => {


  if (!isShown) return null;

    return (
        <tr className={styles.tableRow} >
          <td>{FirstName.concat(` ${LastName}`)}</td>
          <td>{ApplicationID}</td>
          <td>{CellPhone}</td>
          <td
            className={styles.rowButton}
            onClick={onEditClick(ApplicationID.toString())}
          >
            <FontAwesomeIcon icon={faArrowRight as IconProp} color="darkgrey" cursor="pointer"/>
          </td>
        </tr>
      );
}