// import React, { FC, useEffect, useState } from 'react';
// import { useField, useFormikContext } from 'formik';
// // import { StyleType } from '@rnw-community/shared';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';


// interface GenericPropsInterface {
//   name: string;
//   className: string;
//   calenderIcon? :string
  
// }

// export const DatePickerField: FC<GenericPropsInterface> = ({
//   name,
//   className ,
  
// }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field] = useField(name);
//  const initDate = field.value
//   const [value, onChange] = useState(initDate)

//   useEffect(()=>{
//     console.log('changing value')
//     setFieldValue(field.name, value);
//   },[value])

//   console.log(value)

//   return (
//     // <input type="date"/>
//     <DatePicker
//       // selected={field.value}
//       calendarClassName={className }
//       format="MM-dd-y"
//       minDate={new Date(1990)}
//       value={value}
//       onChange={onChange}
//       // showYearDropdown
      
//       // onChange={(val) => {
//       //   onChange
//       //   // setFieldValue(field.name, val);
        
//       // }}
//     />
//   );
// };
import React, { FC } from 'react';
import { useField, useFormikContext } from 'formik';
import { StyleType } from '@rnw-community/shared';
import DatePicker from 'react-datepicker';

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