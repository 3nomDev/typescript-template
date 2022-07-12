import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCar } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { OnEventFn } from '@rnw-community/shared';
import styles from './DealerFormTitleBar.module.css';
import { Oval } from 'react-loader-spinner';


interface Props {
  onBack: OnEventFn;
  name:string
}



export const DealerFormTitleBar: FC<Props> = ({ onBack, name }) => {


  
  return ( 
    <div className={styles.titleBar}>
      <button className={styles.backButton} onClick={onBack}>
        <FontAwesomeIcon
          icon={faArrowLeft as IconProp}
          className={styles.icon}
        />
        Back
      </button>
      <h1 className={styles.header}>
         {name && name}
        </h1>
    </div>
  );
};
