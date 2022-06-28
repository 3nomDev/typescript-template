import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import { StyleType } from '@rnw-community/shared';
import {DatePicker} from "react-datepicker";

interface GenericPropsInterface {
  name: string;
  className: StyleType;
}

export const DatePickerField: FC<GenericPropsInterface> = ({
  name,
  className,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <DatePicker
      selected={field.value}
      className={className}
      dateFormatCalendar="MMM yyyy"
      minDate={new Date(1990)}
      showYearDropdown
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
