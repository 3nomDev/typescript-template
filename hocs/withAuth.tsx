import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { isDefined } from '@rnw-community/shared';
import { logoutAction, userSelector } from '../features/authSlice';
import { addNotification } from '../features/notifications/notificationSlice';

const parseJwt = (token: string): { exp: number; iss: string; aud: string } => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const withAuth =
  (Component: FC) =>
  ({ ...props }) => {
    const dispatch = useDispatch();

    const user = useSelector(userSelector);

    const router = useRouter();

    useEffect(() => {
      if (!isDefined(user) && !isDefined(localStorage.getItem('user'))) {
        router.push('/login');
          console.log('logout stuff ')
        dispatch(
          addNotification({
            type: 'error',
            message: 'You are not authorized',
            autoHideDuration: 6000,
          })
        );
      }
    }, [user]);

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (isDefined(token)) {
        const parsedJwt = parseJwt(token);
        if (parsedJwt.exp * 1000 < Date.now()) {
        
          dispatch(logoutAction());
        }
      } else {
        router.push('/login');
      }
    }, []);

    useEffect(() => {


      if (
        isDefined(user) &&
        router.pathname.includes('user') &&
        user?.ProfileTypeID !== '3' 
      ) {
        router.push('/');
        dispatch(
          addNotification({
            type: 'error',
            autoHideDuration: 6000,
            message: 'You are not an user',
          })
        );
      }
      if (
        isDefined(user) &&
        router.pathname.includes('admin') &&
        user?.ProfileTypeID !== '1'
      ) {
        router.push('/');
        dispatch(
          addNotification({
            type: 'error',
            autoHideDuration: 6000,
            message: 'You are not an admin',
          })
        );
      }


      if (
        isDefined(user) &&
        !router.pathname.includes('admin') && !router.pathname.includes('user') &&
        user?.ProfileTypeID !== '2'
      ) {
        router.push('/');
        dispatch(
          addNotification({
            type: 'error',
            autoHideDuration: 6000,
            message: 'You are not a dealer',
          })
        );
      }
    }, []);

    return <Component {...props} />;
  };
