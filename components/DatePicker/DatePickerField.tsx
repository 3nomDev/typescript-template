import React, { FC, useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
// import { StyleType } from '@rnw-community/shared';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { adminDashboardSelector } from '../../features/adminDashboardSlice';
import { useSelector } from 'react-redux';

interface GenericPropsInterface {
  name: string;
  className?: any;
}

export const DatePickerField: FC<GenericPropsInterface> = ({
  name,
  className,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const initDate = field.value;

  const [value, onChange] = useState(initDate);

  useEffect(() => {
    setFieldValue(field.name, value);
  }, [value]);

  return (
    <DatePicker
      calendarClassName={className}
      format="MM/dd/y"
      minDate={new Date(1990)}
      value={field.value}
      onChange={onChange}
      clearIcon
    />
  );
};
