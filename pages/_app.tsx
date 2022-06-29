import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { store } from '../app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './styles/global.css';
import './index.css';
import { Notifications } from '../features/notifications/components/Notifications';
import  '../pages/styles/datepicker.css'
import '../pages/styles/calendar.css'

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <Notifications />
    </Provider>
  );
}

export default MyApp;
