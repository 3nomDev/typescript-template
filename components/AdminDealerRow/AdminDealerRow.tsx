import React, { FC } from 'react';
import { isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEdit } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './AdminDealerRow.module.css';
import { DealerInterface } from '../../contracts';

interface Props extends Partial<DealerInterface> {
  onEditPress: (id: number) => () => void;
}

export const AdminDealerRow: FC<Props> = ({
  ID,
  Name,
  ContactFirstName,
  ContactLastName,
  ContactPosition,
  WorkPhone,
  EmailAddress,
  Address,
  isShown,
  onEditPress,
}) => {
  if (!isShown) return null;

  return (
    <tr className={styles.row}>
      <td>{ID}</td>
      <td>{isNotEmptyString(Name) ? Name : 'No data'}</td>
      <td>
        {isNotEmptyString(ContactFirstName)
          ? ContactFirstName.concat(` ${ContactLastName}`)
          : 'No data'}
      </td>
      <td>{isNotEmptyString(ContactPosition) ? ContactPosition : 'No data'}</td>
      <td>{isNotEmptyString(WorkPhone) ? WorkPhone : 'No data'}</td>
      <td>{isNotEmptyString(EmailAddress) ? EmailAddress : 'No data'}</td>
      <td>{isNotEmptyString(Address) ? Address : 'No data'}</td>
      <td className={styles.editRow} onClick={onEditPress(ID)}>
        <FontAwesomeIcon icon={faArrowRight as IconProp} />
      </td>
    </tr>
  );
};
