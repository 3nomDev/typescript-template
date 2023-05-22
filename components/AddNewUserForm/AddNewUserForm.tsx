import React, { useEffect, useState } from 'react';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './AddNewUserForm.module.css';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { InputBar } from '../InputBar/InputBar';
import { useDispatch, useSelector } from 'react-redux';
import { loadStates, stateSelector } from '../../features/adminDashboardSlice';
import { withAuth } from '../../hocs';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { addUserLogin } from '../../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const AddNewUserForm = () => {
  const validationSchema = Yup.object({
    Active: Yup.string().trim().required('Active is required'),
    Address: Yup.string().trim().required('Address is required'),
    Address2: Yup.string().trim(),
    CellPhone: Yup.string().trim('Phone number is required'),
    City: Yup.string().trim().required('City is required'),
    Country: Yup.string().trim().required('Country is required'),
    // DateAdded: Yup.string().trim().required('Please select a date'),
    DLNumber: Yup.string()
      .trim()
      .required('Drivers Licence number is required'),
    DLState: Yup.string().trim().required('State is required'),
    DOB: Yup.string().trim().required('Date of birth is required'),
    FirstName: Yup.string().trim().required('First name is required'),
    MiddleName: Yup.string().trim(),
    EmailAddress:Yup.string().trim().required('Email address is required'),
    LastName: Yup.string().trim().required('Last name is required'),
    Password: Yup.string().trim().required('Please choose a password'),
    Password2: Yup.string()
      .trim()
      .oneOf([Yup.ref('Password')], 'Passwords must match')
      .required('Please re-enter the password'),
    PostalCode: Yup.string().trim().required('Zip code is required'),
    // ProfileGUID: Yup.string().trim().required('Please fill this field out'),
    ProfileTypeID: Yup.string()
      .trim()
      .required('Please choose an account type'),
    // TAXID: Yup.string().required('Tax ID is required'),
    State: Yup.string().trim().required('State is required'),
  });

  const initialValues = {
    Active: '',
    Address: '',
    Address2: '',
    CellPhone: '',
    City: '',
    Country: '',
    // DateAdded: '',
    DLNumber: '',
    DLState: '',
    DOB: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Password: '',
    Password2: '',
    PostalCode: '',
    // ProfileGUID: '',
    ProfileTypeID: '',
    TAXID: '',
    State: '',
    EmailAddress:''
  };
  const dispatch = useDispatch();

  useEffect(() => void dispatch(loadStates()), []);
  const states = useSelector(stateSelector);

  const onSubmit = (values) => {
    console.log(values);
    delete values.Password2;
    dispatch(addUserLogin(values));
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />

      <div className={styles.dealerForm}>
        <Formik
          validateOnChange={false}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {({ submitForm, touched, errors, values }) => {
            console.log(errors);
            return (
              <div className={styles.dealerForm}>
                <h1
                  style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    margin: '20px',
                  }}
                >
                  Add New User
                </h1>
                <Form className={styles.form}>
                  <div
                    style={{
                      display: 'flex',

                      width: '100%',
                    }}
                  >
                    <div>
                      {' '}
                      <p>First Name</p>
                      <Field
                        className={styles.input}
                        name="FirstName"
                        style={{ marginRight: '10px' }}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.FirstName}</p>
                    </div>
                    <div>
                      {' '}
                      <p>Middle Name</p>
                      <Field
                        className={styles.input}
                        name="MiddleName"
                        style={{ marginRight: '10px' }}
                      ></Field>
                    </div>
                    <div>
                      {' '}
                      <p>Last Name</p>
                      <Field className={styles.input} name="LastName"></Field>
                      <p style={{ color: 'red' }}>{errors.LastName}</p>
                    </div>
                  </div>
                  <p>Email Address</p>
                  <Field   className={styles.input} name="EmailAddress"></Field>
                  <div
                    style={{
                      display: 'flex',

                      width: '100%',
                    }}
                  >
                    <div>
                      <p>Active</p>
                      <Field
                        as="select"
                        name="Active"
                        className={styles.input}
                        style={{ marginRight: '10px' }}
                      >
                        <option value="">Select an option</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Field>
                      <p style={{ color: 'red' }}>{errors.Active}</p>
                    </div>
                    <div>
                      <p>Address</p>
                      <Field
                        className={styles.input}
                        name="Address"
                        style={{ marginRight: '10px' }}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.Address}</p>
                    </div>
                    <div>
                      <p>Address2</p>
                      <Field className={styles.input} name="Address2"></Field>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',

                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%', marginRight: '15px' }}>
                      <p>City</p>
                      <Field
                        className={styles.input}
                        name="City"
                        style={{ width: '100%' }}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.City}</p>
                    </div>
                    <div style={{ width: '50%' }}>
                      <p>State</p>
                      <Field
                        as="select"
                        name="State"
                        className={styles.input}
                        style={{ width: '100%' }}
                      >
                        {states.map((item) => (
                          <option
                            key={item.State}
                            label={item.State}
                            value={item.Short}
                          />
                        ))}
                      </Field>
                      <p style={{ color: 'red' }}>{errors.State}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',

                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%', marginRight: '15px' }}>
                      {' '}
                      <p>Postal Code</p>
                      <Field
                        className={styles.input}
                        name="PostalCode"
                        style={{ width: '100%' }}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.PostalCode}</p>
                    </div>
                    <div style={{ width: '50%', marginRight: '15px' }}>
                      {' '}
                      <p>Phone</p>
                      <Field
                        className={styles.input}
                        name="CellPhone"
                        style={{ width: '100%' }}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.CellPhone}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',

                      width: '100%',
                    }}
                  >
                    <div>
                      <p>Country</p>
                      <Field
                        className={styles.input}
                        name="Country"
                        style={{ marginRight: '10px' }}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.Country}</p>
                    </div>
                    {/* <div>
                      {' '}
                      <p>Date Added</p>
                      <Field
                        className={styles.input}
                        name="Address2"
                        style={{ marginRight: '10px' }}
                      ></Field>
                    </div> */}
                    <div>
                      {' '}
                      <p>Drivers Licence Number</p>
                      <Field className={styles.input} name="DLNumber"></Field>
                      <p style={{ color: 'red' }}>{errors.DLNumber}</p>
                    </div>
                  </div>
                  <div>
                    {' '}
                    <p>Drivers Licence State</p>
                    <Field
                      as="select"
                      name="DLState"
                      className={styles.input}
                      style={{ width: '100%' }}
                    >
                      {states.map((item) => (
                        <option
                          key={item.State}
                          label={item.State}
                          value={item.Short}
                        />
                      ))}
                    </Field>
                    <p style={{ color: 'red' }}>{errors.DLState}</p>
                  </div>
                  <p>Date of birth</p>

                  <DatePickerField className={styles.input} name="DOB" />
                  <p style={{ color: 'red' }}> {errors.DOB}</p>
                  <div
                    style={{
                      display: 'flex',

                      width: '100%',
                    }}
                  >
                    <div>
                      {' '}
                      <p>Password  <FontAwesomeIcon icon={faEye as IconProp} color="gray" onClick={ () => setShowPassword(!showPassword)}/></p>
                      <Field
                        className={styles.input}
                        name="Password"
                        style={{ marginRight: '10px' }}
                        type={showPassword ? 'text' : 'password'}
                      ></Field>{' '}
                     
                      <p style={{ color: 'red' }}> {errors.Password}</p>{' '}
                    </div>

                    <div>
                      {' '}
                      <p>Re-Password</p>
                      <Field
                        className={styles.input}
                        name="Password2"
                        style={{ marginRight: '10px' }}
                        type={showPassword ? 'text' : 'password'}
                      ></Field>
                      <p style={{ color: 'red' }}>{errors.Password2}</p>
                    </div>
                    <div>
                      <p>Account Type</p>
                      <Field
                        as="select"
                        name="ProfileTypeID"
                        className={styles.input}
                        style={{ marginRight: '10px' }}
                      >
                        <option value="">Select an option</option>
                        <option value="1">Admin</option>
                        <option value="2">Dealer</option>
                      </Field>
                      <p style={{ color: 'red' }}>{errors.ProfileTypeID}</p>
                    </div>
                  </div>

                  <button
                    className={styles.saveButton}
                    type="submit"
                    // onClick={() => onSubmit(values)}
                  >
                    Submit
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default withAuth(AddNewUserForm);
