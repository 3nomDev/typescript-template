import React, { FC } from 'react';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikValues,
  useField,
  useFormikContext,
} from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { cs, isDefined, StyleType } from '@rnw-community/shared';
import cx from 'classnames';
import styles from './ApplicationForm.module.css';

interface DatePickerProps {
  name: string;
  className: StyleType;
}

const hasErrors = (
  isTouched: boolean,
  hasError: keyof FormikErrors<FormikValues>
): boolean => isDefined(isTouched && hasError);

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  middleName: Yup.string().trim(),
  ssn: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  dob: Yup.date().max(new Date(2004, 1, 1)).required(),
  monthlyIncome: Yup.number().required('Monthly income is required'),
  monthlyExpenses: Yup.number().required('Monthly expenses is required'),
  email: Yup.string().trim().required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});

const DatePickerField: FC<DatePickerProps> = ({ name, className }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      className={className}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export const ApplicationForm: FC = () => {
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
          validateOnChange
          initialValues={{
            firstName: '',
            middleName: '',
            lastName: '',
            ssn: '',
            dob: new Date(2004, 1, 1),
            monthlyIncome: 0,
            monthlyExpenses: 0,
            email: '',
            phoneNumber: '',
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ submitForm, errors, touched, initialValues, values }) => {
            const firstNameHasErrors = hasErrors(
              touched.firstName,
              errors.firstName
            );
            const lastNameHasErrors = hasErrors(
              touched.lastName,
              errors.lastName
            );
            const ssnHasErrors = hasErrors(touched.ssn, errors.ssn);
            const dobHasErrors = hasErrors(touched.dob, errors.dob);
            const monthlyIncomeHasErrors = hasErrors(
              touched.monthlyIncome,
              errors.monthlyIncome
            );
            const monthlyExpensesHasErrors = hasErrors(
              touched.monthlyExpenses,
              errors.monthlyExpenses
            );
            const emailHasErrors = hasErrors(touched.email, errors.email);
            const phoneNumberHasErrors = hasErrors(
              touched.phoneNumber,
              errors.phoneNumber
            );

            const inputErrorStyle = (hasError: boolean): StyleType =>
              cs(hasError, cx(styles.errorInput, styles.input), styles.input);

            return (
              <Form className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="firstName">First name</label>
                    <Field
                      placeholder="First name"
                      name="firstName"
                      type="text"
                      className={inputErrorStyle(firstNameHasErrors)}
                    />
                    {firstNameHasErrors && (
                      <div className={styles.error}>{errors.firstName}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="middleName">Middle name</label>
                    <Field
                      placeholder="Middle name"
                      name="middleName"
                      type="text"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <label htmlFor="lastName">Last name</label>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      className={inputErrorStyle(lastNameHasErrors)}
                    />
                    {lastNameHasErrors && (
                      <div className={styles.error}>{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label htmlFor="ssn">SSN#*</label>
                    <Field
                      placeholder="SSN"
                      name="ssn"
                      type="number"
                      className={inputErrorStyle(ssnHasErrors)}
                    />
                    {ssnHasErrors && (
                      <div className={styles.error}>{errors.ssn}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="dob">DOB</label>
                    <DatePickerField
                      name="dob"
                      className={inputErrorStyle(dobHasErrors)}
                    />
                    {dobHasErrors && (
                      <div className={styles.error}>{errors.dob}</div>
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
                    <label htmlFor="monthlyIncome">Monthly income</label>
                    <Field
                      placeholder="Monthly income"
                      name="monthlyIncome"
                      type="number"
                      className={inputErrorStyle(monthlyIncomeHasErrors)}
                    />
                    {monthlyIncomeHasErrors && (
                      <div className={styles.error}>{errors.monthlyIncome}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="monthlyExpenses">Monthly expenses</label>
                    <Field
                      placeholder="Monthly expenses"
                      name="monthlyExpenses"
                      type="number"
                      className={inputErrorStyle(monthlyExpensesHasErrors)}
                    />
                    {monthlyExpensesHasErrors && (
                      <div className={styles.error}>
                        {errors.monthlyExpenses}
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
                    <label htmlFor="email">Email</label>
                    <Field
                      placeholder="Email"
                      name="email"
                      type="text"
                      className={inputErrorStyle(emailHasErrors)}
                    />
                    {emailHasErrors && (
                      <div className={styles.error}>{errors.email}</div>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <label htmlFor="phoneNumber">Phone number</label>
                    <Field
                      placeholder="Phone number"
                      name="phoneNumber"
                      type="number"
                      className={inputErrorStyle(phoneNumberHasErrors)}
                    />
                    {phoneNumberHasErrors && (
                      <div className={styles.error}>{errors.phoneNumber}</div>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
