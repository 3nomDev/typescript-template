import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Field, Form, Formik } from 'formik';
import { cs } from '@rnw-community/shared';
import * as Yup from 'yup';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CreateAppForm.module.css';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { emptyApplication, StateInterface } from '../../contracts';

interface Props {
  states: StateInterface[];
}

const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  EmailAddress: Yup.string().email().required('Email is required'),
  CellPhone: Yup.string().trim().required('Phone is required'),
  WorkPhone: Yup.string().trim().required('Phone is required'),
  SSN: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  DOB: Yup.date().required('Date of birth is required'),
  VIN: Yup.string().min(17).max(17).required('VIN is required'),
  CompanyName: Yup.string().required('Company name is required'),
  Position: Yup.string().required('Position is required'),
  TAXID: Yup.string(),
  DLNumber: Yup.string().required('Driver license is required'),
  DLState: Yup.string(),
  Address: Yup.string().required('Address is required'),
  City: Yup.string().required('City is required'),
  PostalCode: Yup.string().required('Postal code is required'),
  PurchasePrice: Yup.number().positive().required('Purchase price is required'),
  State: Yup.string(),
  AmountFinanced: Yup.number(),
  DepositFloat: Yup.number(),
  EmployerName: Yup.string().required('Company name is required'),
  VehicleMake: Yup.string().required('Vehicle make is required'),
  VehicleModel: Yup.string().required('Vehicle model is required'),
  HousingStatus: Yup.string(),
  HowLong: Yup.string().required('Need to specify time'),
  MiddleName: Yup.string(),
});

export const CreateAppForm: FC<Props> = ({ states }) => {
  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.title}>
        <FontAwesomeIcon
          icon={faUserPlus as IconProp}
          color="#154F85"
          className={styles.icon}
        />
        <h3>Create Account</h3>
      </div>
      <Formik
        initialValues={{ ...emptyApplication, approvalCode: '', color: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ submitForm, errors, touched }) => {
          const firstNameHasError = errors.FirstName && touched.FirstName;
          const lastNameHasError = errors.LastName && touched.LastName;
          const cellPhoneHasErrors = errors.CellPhone && touched.CellPhone;
          const workPhoneHasErrors = errors.WorkPhone && touched.WorkPhone;
          const emailHasErrors = errors.EmailAddress && touched.EmailAddress;
          const ssnHasErrors = errors.SSN && touched.SSN;
          const dlHasErrors = errors.DLNumber && touched.DLNumber;
          const addressHasErrors = errors.Address && touched.Address;
          const cityHasErrors = errors.City && touched.City;
          const stateHasErrors = errors.State && touched.State;
          const postalCodeHasErrors = errors.PostalCode && touched.PostalCode;
          const companyNameHasErrors =
            errors.EmployerName && touched.EmployerName;
          const howLongHasErrors = errors.HowLong && touched.HowLong;
          const positionHasErrors = errors.Position && touched.Position;
          const yearsAtCompanyHasErrors =
            errors.YearsAtCurrentJob && touched.YearsAtCurrentJob;
          const monthlyIncomeHasErrors =
            errors.MonthlyIncome && touched.MonthlyIncome;
          const vinHasErrors = errors.VIN && touched.VIN;
          const vehicleYearHasErrors =
            errors.VehicleYear && touched.VehicleYear;
          const vehicleMakeHasErrors =
            errors.VehicleMake && touched.VehicleMake;
          const vehicleModelHasErrors =
            errors.VehicleModel && touched.VehicleModel;
          const depositFloatHasError =
            errors.DepositFloat && touched.DepositFloat;

          return (
            <Form className={styles.form}>
              <h4 className={styles.label}>Approval code</h4>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>Your approval code</p>
                  <Field name="approvalCode" placeholder="Your approval code" />
                </div>
              </div>
              <h4 className={styles.label}>Personal details</h4>

              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    First name <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="FirstName"
                    className={cs(
                      firstNameHasError,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="First name"
                  />
                  {firstNameHasError && (
                    <div className={styles.error}>{errors.FirstName}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>Middle name</p>
                  <Field
                    name="MiddleName"
                    className={styles.formInput}
                    placeholder="Middle name"
                  />
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Last name <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="LastName"
                    className={cs(
                      lastNameHasError,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Last name"
                  />
                  {lastNameHasError && (
                    <div className={styles.error}>{errors.LastName}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Phone Number <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="CellPhone"
                    className={cs(
                      cellPhoneHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Phone Number"
                  />
                  {cellPhoneHasErrors && (
                    <div className={styles.error}>{errors.CellPhone}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Email <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      emailHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Email"
                    name="EmailAddress"
                  />
                  {emailHasErrors && (
                    <div className={styles.error}>{errors.EmailAddress}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Social security# <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      ssnHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="SSN"
                    name="SSN"
                  />
                  {ssnHasErrors && (
                    <div className={styles.error}>{errors.SSN}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Driver License <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      dlHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Driver's license Number"
                    name="DLNumber"
                  />
                  {dlHasErrors && (
                    <div className={styles.error}>{errors.DLNumber}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>DOB</p>
                  <DatePickerField name="DOB" className={styles.formInput} />
                </div>
              </div>
              <h4 className={styles.label}>Residence details</h4>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Primary address <span className={styles.required}>*</span>
                  </p>
                  <Field
                    placeholder="Address"
                    className={cs(
                      addressHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    name="Address"
                  />
                  {addressHasErrors && (
                    <div className={styles.error}>{errors.Address}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    City <span className={styles.required}>*</span>
                  </p>
                  <Field
                    placeholder="City"
                    className={cs(
                      cityHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    name="City"
                  />
                  {cityHasErrors && (
                    <div className={styles.error}>{errors.City}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    State <span className={styles.required}>*</span>
                  </p>

                  <Field as="select" className={styles.select} name="State">
                    {states.map((item) => (
                      <option value={item.Short}>{item.State}</option>
                    ))}
                  </Field>
                  {stateHasErrors && <div>{errors.State}</div>}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    ZIP code <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="PostalCode"
                    className={cs(
                      postalCodeHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Postal code"
                  />
                  {postalCodeHasErrors && (
                    <div className={styles.error}>{errors.PostalCode}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>Housing status</p>
                  <Field
                    as="select"
                    className={styles.select}
                    name="HousingStatus"
                  >
                    <option>Rent</option>
                    <option>Own</option>
                    <option>Live in parent's basement</option>
                  </Field>
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Time at this address
                    <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="HowLong"
                    type="number"
                    placeholder="Time at this address"
                    className={cs(
                      howLongHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                  />
                  {howLongHasErrors && (
                    <div className={styles.error}>{errors.HowLong}</div>
                  )}
                </div>
              </div>
              <h4 className={styles.label}>Employment details</h4>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Company name <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="EmployerName"
                    placeholder="Company name"
                    className={cs(
                      companyNameHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                  />
                  {companyNameHasErrors && (
                    <div className={styles.error}>{errors.EmployerName}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Work phone <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="WorkPhone"
                    placeholder="Work phone"
                    className={cs(
                      workPhoneHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                  />
                  {workPhoneHasErrors && (
                    <div className={styles.error}>{errors.WorkPhone}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Position <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      positionHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Position"
                    name="Position"
                  />
                  {positionHasErrors && (
                    <div className={styles.error}>{errors.Position}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Employment status <span className={styles.required}>*</span>
                  </p>
                  <Field className={styles.select} as="select">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                  </Field>
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Years at company <span className={styles.required}>*</span>
                  </p>
                  <Field
                    type="number"
                    name="YearsAtCurrentJob"
                    className={cs(
                      yearsAtCompanyHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Years at company"
                  />
                  {yearsAtCompanyHasErrors && (
                    <div className={styles.error}>
                      {errors.YearsAtCurrentJob}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Monthly income <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={styles.formInput}
                    placeholder="$"
                    name="MonthlyIncome"
                  />
                  {monthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <h4 className={styles.label}>Vehicle details</h4>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    17 Digits VIN
                    <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      vinHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    name="VIN"
                    placeholder="VIN"
                  />
                  {vinHasErrors && (
                    <div className={styles.error}>{errors.VIN}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Year <span className={styles.required}>*</span>
                  </p>
                  <Field
                    type="number"
                    className={cs(
                      vehicleYearHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    name="VehicleYear"
                    placeholder="Year"
                  />
                  {vehicleYearHasErrors && (
                    <div className={styles.error}>{errors.VehicleYear}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Make <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      vehicleMakeHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    placeholder="Make"
                    name="VehicleMake"
                  />
                  {vehicleMakeHasErrors && (
                    <div className={styles.error}>{errors.VehicleMake}</div>
                  )}
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Model <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={cs(
                      vehicleModelHasErrors,
                      styles.errorInput,
                      styles.formInput
                    )}
                    name="VehicleModel"
                    placeholder="Vehicle Model"
                  />
                  {vehicleModelHasErrors && (
                    <div className={styles.error}>{errors.VehicleModel}</div>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Transmission <span className={styles.required}>*</span>
                  </p>
                  <Field
                    as="select"
                    className={styles.formInput}
                    placeholder="Model"
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </Field>
                </div>

                <div className={styles.inputBox}>
                  <p>Color</p>
                  <Field
                    className={styles.formInput}
                    placeholder="Color"
                    name="color"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <p>
                    Purchase price <span className={styles.required}>*</span>
                  </p>
                  <Field
                    name="PurchasePrice"
                    className={styles.formInput}
                    placeholder="Purchase price"
                  />
                </div>
                <div className={styles.inputBox}>
                  <p>
                    Deposit <span className={styles.required}>*</span>
                  </p>
                  <Field
                    className={styles.formInput}
                    placeholder="Deposit"
                    name="DepositFloat"
                  />
                  {depositFloatHasError && <div>{errors.DepositFloat}</div>}
                </div>
              </div>
              <div className={styles.formFooter}>
                <div>Save</div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
