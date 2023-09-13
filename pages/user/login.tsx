import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/images/logo.png';
import car from '../../assets/images/img.png';
import styles from './login.module.css'
// import { LoginPayloadInterface } from '../contracts';
import { hasErrors } from '../../utils/hasErrors';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
    username: Yup.string().trim().required('Username is required'),
    password: Yup.string().trim().required('Password is required'),
  });
 
const Login = () => {
const [error, setError] = useState(false)
    const router = useRouter();
  
    const handleLogin =(values) => {

    }
   
  

  return (
    <div className={styles.wrapper}>
      <Image src={Logo} />
      <div className={styles.formContainer}>
        <div className={styles.left}>
          <h3>Login</h3>
          <p>
            Welcome to TLC financing. Please login to continue.
          </p>
          <Formik
            validationSchema={validationSchema}
            validateOnChange
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={(values) => handleLogin(values)}
          >
            {({ submitForm, errors, touched, initialValues, values }) => {
              const usernameHasErrors = hasErrors(
                touched.username,
                errors.username
              );
              const passwordHasErrors = hasErrors(
                touched.password,
                errors.password
              );
            //   const inputErrorStyle = (hasError: boolean): StyleType =>
            //     cs(
            //       hasError,
            //       cx(styles.errorInput, styles.input) as StyleType,
            //       styles.input as StyleType
            //     );
              return (
                <Form className={styles.form}>
                  <label>Username</label>
                  <Field
                    name="username"
                    placeholder="username"
                    // className={inputErrorStyle(usernameHasErrors)}
                  />
                  {usernameHasErrors && (
                    <div className={styles.error}>{errors.username}</div>
                  )}
                  <label>Password</label>
                  <Field
                  type="password"
                    placeholder="password"
                    name="password"
                    // className={inputErrorStyle(passwordHasErrors)}
                  />
                  {passwordHasErrors && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                
                    <button type="submit">LOGIN</button>
                 
                  {error &&  (
                    <div className={styles.errorCred}>Please fill out all fields</div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
        {/* <div className={styles.right}>
          <Image src={car} />
        </div> */}
        <div />
      </div>
    </div>
  )
}

export default Login