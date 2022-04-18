import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/fontawesome-free-solid';
import styles from './PaymentTab.module.css';

interface Props {
  icon: IconProp;
  text: string;
  value: string;
}

export const PaymentTab: FC<Props> = ({ icon, text, value }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.body}>
        <span>{text}</span>
        <h1>{value}</h1>
      </div>
    </div>
  );
};
