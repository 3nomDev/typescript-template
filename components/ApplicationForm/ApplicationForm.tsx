import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { cs, OnEventFn, StyleType } from '@rnw-community/shared';
import cx from 'classnames';
import styles from './ApplicationForm.module.css';
import { hasErrors } from '../../utils/hasErrors';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { MaskedInput } from '../MaskedInput/MaskedInput';

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
  EmailAddress: Yup.string().trim().required('EmailAddress is required'),
  CellPhone: Yup.string().trim().required('Phone number is required'),
});

interface Props {
  onSubmit: OnEventFn;
}

export const ApplicationForm: FC<Props> = ({ onSubmit }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <div className={styles.tab}>Eligibility check</div>
          <div className={styles.tab}>Dealers</div>
        </div>
      </div>
      <div className={styles.formWrapper}>
        <span className={styles.formLabel}> Eligibility check</span> <br />
        <p>Get pre-approved for an auto loan</p>
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
            DOB: new Date(),
            MonthlyIncome: 0,
            MonthlyExpense: 0,
            EmailAddress: '',
            CellPhone: '',
            Ip: '',
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
                  <div className={styles.inputContainer}>
                    <label htmlFor="DOB">DOB</label>
                    <DatePickerField
                      name="DOB"
                      className={inputErrorStyle(DOBHasErrors)}
                    />
                    {DOBHasErrors && (
                      <div className={styles.error}>{errors.DOB}</div>
                    )}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <p>Your monthly income and expenses</p>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
                    <label htmlFor="MonthlyExpense">Monthly expenses</label>
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
                    <p>Contact information</p>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="EmailAddress">EmailAddress</label>
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
                  <button type="submit">Get Pre-approved</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
