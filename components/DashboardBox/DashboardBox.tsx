import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { OnEventFn } from '@rnw-community/shared';
import styles from './DashboardBox.module.css';
import {
  DashboardApplicationInterface,
  DashboardBoxEnum,
} from '../../contracts';

interface Props {
  icon: IconProp;
  text: string;
  count: number;
  type: DashboardBoxEnum;
  onClick: OnEventFn;
}

export const getTextStyle = (type: DashboardBoxEnum): string => {
  switch (type) {
    case DashboardBoxEnum.Failed:
      return cx(styles.textFailed, styles.text);

    case DashboardBoxEnum.Pending:
      return cx(styles.textPending, styles.text);

    case DashboardBoxEnum.Success:
      return cx(styles.textSuccess, styles.text);

    case DashboardBoxEnum.Notification:
      return cx(styles.textNotification, styles.text);

    default:
      return '';
  }
};

const getIconStyle = (type: DashboardBoxEnum): string => {
  switch (type) {
    case DashboardBoxEnum.Failed:
      return cx(styles.iconFailed, styles.iconWrapper);

    case DashboardBoxEnum.Pending:
      return cx(styles.iconPending, styles.iconWrapper);

    case DashboardBoxEnum.Success:
      return cx(styles.iconSuccess, styles.iconWrapper);

    default:
      return '';
  }
};

export const DashboardBox: FC<Props> = ({
  icon,
  text,
  count,
  type,
  onClick,
}) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={getIconStyle(type)}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <p className={styles.paragraph}>{text}</p> <br />
        <h2 className={getTextStyle(type)}> {count} </h2>
      </div>
    </div>
  );
};
