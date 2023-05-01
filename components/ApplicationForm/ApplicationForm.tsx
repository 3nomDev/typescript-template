import React, { FC, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { cs, OnEventFn, StyleType } from '@rnw-community/shared';
import cx from 'classnames';
import styles from './ApplicationForm.module.css';
import { hasErrors } from '../../utils/hasErrors';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { MaskedInput } from '../MaskedInput/MaskedInput';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { stateSelector, loadStates } from '../../features/adminDashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  MiddleName: Yup.string().trim(),
  SSN: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  DOB: Yup.date().max(new Date(2004, 1, 1)).required(),
  MonthlyIncome: Yup.number().required('Monthly income is required'),
  MonthlyExpense: Yup.number().required('Monthly expenses is required'),
  EmailAddress: Yup.string().trim().required('Email Address is required'),
  CellPhone: Yup.string().trim().required('Phone number is required'),
  Address: Yup.string().required('Address is required'),
  Address2: Yup.string(),
  City: Yup.string().required('City is required'),
  State: Yup.string().required('State is required'),
  PostalCode: Yup.number().required('Postal code is required'),
});

interface Props {
  onSubmit: OnEventFn;
}

export const ApplicationForm: FC<Props> = ({ onSubmit }) => {
  const dispatch = useDispatch();

  let states = useSelector(stateSelector);


  useEffect(() => void dispatch(loadStates()), []);


  return (
    <div className={styles.wrapper}>
      <div className={styles.widget}>
        <div className={styles.widgetLeft}>
          <ul>
            <li>Eligibility Check</li>
            <li>Dealers</li>
          </ul>
          {/* <div className={styles.tab}>Eligibility check</div>
          <div className={styles.tab}>Dealers</div> */}
          <div className={styles.widgetDiv}>
            <span>Need assistance call</span>
            <br></br>
           <a href="tel:718-506-9367">(718)-506-9367</a> 
          </div>
        </div>
      </div>
      <div className={styles.formWrapper}>
        <span className={styles.formLabel}> Eligibility check</span> <br />
        <h1>
          Get <strong>pre-approved</strong> for an auto loan
        </h1>
        <span className={styles.legalName}>
          Provide your legal name as it appears on your driver’s license.
        </span>
        <Formik
          validationSchema={validationSchema}
          validateOnBlur
          initialValues={{
            FirstName: '',
            MiddleName: '',
            LastName: '',
            SSN: '',
            DOB: '',
            MonthlyIncome: 0,
            MonthlyExpense: 0,
            EmailAddress: '',
            CellPhone: '',
            Ip: '',
            Address: '',
            Address2: '',
            City: '',
            State: '',
            PostalCode: '',
          }}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ errors, touched, initialValues, values }) => {

            const firstNameHasErrors = hasErrors(
              touched.FirstName,
              errors.FirstName
            );
            const LastNameHasErrors = hasErrors(
              touched.LastName,
              errors.LastName
            );
            const ssnHasErrors = hasErrors(touched.SSN, errors.SSN);
            const addressHasErrors = hasErrors(touched.Address, errors.Address);
            const cityHasErrors = hasErrors(touched.City, errors.City);
            const stateHasErrors = hasErrors(touched.State, errors.State);
            const postalCodeHasErrors = hasErrors(touched.PostalCode, errors.PostalCode);
            // @ts-ignore
            const DOBHasErrors = hasErrors(touched.DOB, errors.DOB);
            const MonthlyIncomeHasErrors = hasErrors(
              touched.MonthlyIncome,
              errors.MonthlyIncome
            );
            const MonthlyExpenseHasErrors = hasErrors(
              touched.MonthlyExpense,
              errors.MonthlyExpense
            );
            const EmailAddressHasErrors = hasErrors(
              touched.EmailAddress,
              errors.EmailAddress
            );
            const phoneHasErrors = hasErrors(
              touched.CellPhone,
              errors.CellPhone
            );

            const inputErrorStyle = (hasError: boolean): StyleType =>
              cs(
                hasError,
                cx(styles.errorInput, styles.input) as StyleType,
                styles.input as StyleType
              );

            return (
              <Form className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="FirstName">First name</label>
                    <Field
                      placeholder="First name"
                      name="FirstName"
                      type="text"
                      className={inputErrorStyle(firstNameHasErrors)}
                    />
                    {firstNameHasErrors && (
                      <div className={styles.error}>{errors.FirstName}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="MiddleName">Middle name</label>
                    <Field
                      placeholder="Middle name"
                      name="MiddleName"
                      type="text"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <label htmlFor="LastName">Last name</label>
                    <Field
                      name="LastName"
                      type="text"
                      placeholder="Last name"
                      className={inputErrorStyle(LastNameHasErrors)}
                    />
                    {LastNameHasErrors && (
                      <div className={styles.error}>{errors.LastName}</div>
                    )}
                  </div>
                </div>
                <div className={styles.row} id={styles.addressSection}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="Address">Address </label>
                    <Field
                      placeholder="Address"
                      name="Address"
                      type="text"
                      className={inputErrorStyle(addressHasErrors)}
                    />
                    {addressHasErrors && (
                      <div className={styles.error}>{errors.Address}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="Address2">Address 2</label>
                    <Field
                      placeholder="Address 2"
                      name="Address2"
                      type="text"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <label htmlFor="City">City</label>
                    <Field
                      name="City"
                      type="text"
                      placeholder="City"
                      className={inputErrorStyle(cityHasErrors)}
                    />
                    {cityHasErrors && (
                      <div className={styles.error}>{errors.City}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="State">State</label>
                    <Field name="State" as="select"  className={inputErrorStyle(stateHasErrors)}>
                      {states.map((item) => (
                        <option value={item.Short}>{item.State}</option>
                      ))}
                    </Field>
                    {stateHasErrors && (
                      <div className={styles.error}>{errors.State}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="PostalCode">Postal Code</label>
                    <Field
                      name="PostalCode"
                      type="text"
                      placeholder="Posal Code"
                      className={inputErrorStyle(postalCodeHasErrors)}
                    />
                    {postalCodeHasErrors && (
                      <div className={styles.error}>{errors.City}</div>
                    )}
                  </div>
                </div>
                <div className={styles.row}>
                  
                  <div className={styles.inputContainer}>
                    <label htmlFor="SSN">SSN#*</label>
                    <Field
                      placeholder="SSN"
                      name="SSN"
                      type="number"
                      className={inputErrorStyle(ssnHasErrors)}
                    />
                    {ssnHasErrors && (
                      <div className={styles.error}>{errors.SSN}</div>
                    )}
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputContainer}>
                      <label htmlFor="DOB">DOB</label>
                      <DatePickerField name="DOB" />
                      {DOBHasErrors && (
                        <div className={styles.error}>{errors.DOB}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <h1>Your monthly income and expenses</h1>
                    <span>
                      Please enter your monthly income and total expenses below.
                    </span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="MonthlyIncome">Monthly income</label>
                    <Field
                      placeholder="Monthly income"
                      name="MonthlyIncome"
                      type="number"
                      className={inputErrorStyle(MonthlyIncomeHasErrors)}
                    />
                    {MonthlyIncomeHasErrors && (
                      <div className={styles.error}>{errors.MonthlyIncome}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="MonthlyExpense">Total Monthly expenses</label>
                    <Field
                      placeholder="Monthly expenses"
                      name="MonthlyExpense"
                      type="number"
                      className={inputErrorStyle(MonthlyExpenseHasErrors)}
                    />
                    {MonthlyExpenseHasErrors && (
                      <div className={styles.error}>
                        {errors.MonthlyExpense}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <h1>Contact information</h1>
                    <span>Please enter your contact information below.</span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="EmailAddress">Email Address</label>
                    <Field
                      placeholder="EmailAddress"
                      name="EmailAddress"
                      type="text"
                      className={inputErrorStyle(EmailAddressHasErrors)}
                    />
                    {EmailAddressHasErrors && (
                      <div className={styles.error}>{errors.EmailAddress}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="CellPhone">Phone number</label>
                    <MaskedInput
                      name="CellPhone"
                      placeholder="Phone number"
                      className={inputErrorStyle(phoneHasErrors)}
                    />
                    {phoneHasErrors && (
                      <div className={styles.error}>{errors.CellPhone}</div>
                    )}
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button type="button">Cancel</button>
                  <button type="submit" className={styles.approvalBtn}>
                    Get Pre-approved{' '}
                    <FontAwesomeIcon
                      icon={faArrowRight as IconProp}
                      style={{ fontSize: '20px' }}
                    />{' '}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
