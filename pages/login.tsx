import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { cs, StyleType } from '@rnw-community/shared';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import styles from './styles/dealer-login.module.css';
import Logo from '../assets/images/logo.png';
import car from '../assets/images/img.png';
import { hasErrors } from '../utils/hasErrors';
import { LoginPayloadInterface } from '../contracts';
import bcrypt from 'bcryptjs';
import {
  authSelector,
  isAuthorizedSelector,
  sendLoginRequest,
  userSelector,
  getUserByEmail,
} from '../features/authSlice';

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
});

// @ts-ignore
const DealerLogin: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const isAuthorized = useSelector(isAuthorizedSelector);
  const saltRounds = 10;
  const { pending, error, errorMessage } = useSelector(authSelector);
  const router = useRouter();


  function isBcryptHash(hash) {
    // A regular expression to match bcrypt-style hashes
    const bcryptRegex = /^\$2[aby]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;

    return bcryptRegex.test(hash);
  }

  const handleLogin = async (userData: LoginPayloadInterface) => {
    try {
      const result = await dispatch(getUserByEmail(userData.username));

      // check if its bcrypt has or not

      if (result.payload.Password) {
        const userHash = result.payload.Password;
        let isBrypt = isBcryptHash(result.payload.Password);

        let isSame = bcrypt.compareSync(userData.password, userHash);

        if (isSame && isBrypt) {
          dispatch(sendLoginRequest({ ...userData, password: userHash }));
        } else {
          dispatch(sendLoginRequest(userData));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.ProfileTypeID === '2') router.replace('/dealership');
    if (user?.ProfileTypeID === '1') router.replace('/admin');
    if (user?.ProfileTypeID === '3') router.replace('/user');
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <Image src={Logo} />
      <div className={styles.formContainer}>
        <div className={styles.left}>
          <h3>Login</h3>
          <p>Welcome to TLC financing. Please login to continue.</p>
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
              const inputErrorStyle = (hasError: boolean): StyleType =>
                cs(
                  hasError,
                  cx(styles.errorInput, styles.input) as StyleType,
                  styles.input as StyleType
                );
              return (
                <Form className={styles.form}>
                  <label>Username</label>
                  <Field
                    name="username"
                    placeholder="username"
                    className={inputErrorStyle(usernameHasErrors)}
                  />
                  {usernameHasErrors && (
                    <div className={styles.error}>{errors.username}</div>
                  )}
                  <label>Password</label>
                  <Field
                    type="password"
                    placeholder="password"
                    name="password"
                    className={inputErrorStyle(passwordHasErrors)}
                  />
                  {passwordHasErrors && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                  {pending ? (
                    <div className={styles.loaderWrapper}>
                      <Oval
                        secondaryColor="black"
                        wrapperClass={styles.loader}
                        width={80}
                        height={80}
                        color="black"
                      />
                    </div>
                  ) : (
                    <button type="submit">LOGIN</button>
                  )}
                  {error && !pending && (
                    <div className={styles.errorCred}>{errorMessage}</div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className={styles.right}>
          <Image src={car} />
        </div>
        <div />
      </div>
    </div>
  );
};

export default DealerLogin;
