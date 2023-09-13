import React, { FC, useEffect, useState } from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { cs, StyleType } from '@rnw-community/shared';
import { useDispatch, useSelector } from 'react-redux';
import { hasErrors } from '../../utils/hasErrors';
import styles from './application.module.css';
import { ApplicationInterface, DocumentTypeInterface } from '../../contracts';
import { DealerHeader } from '../../components/DealerHeader/DealerHeader';
import {
  updateApplication,
  uploadDocument,
  getDocuments,
  documentTypesSelector,
  loadDocumentTypes,
  ipAddressSelector,
  getIpAddress,
  loadRejectionNotes,
  applicationsSelector,
  singleApplicationSelector,
  notesSelector,
  AddNote,
  pendingSelector,
  documentSelector,
  getVehicleInfoByVin,
  vehicleInfoSelector,
  loadApplicationByGuid,
  dealerDashboardSelector,
} from '../../features/dealerDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { DatePickerField } from '../../components/DatePicker/DatePickerField';
import { MaskedInput } from '../../components/MaskedInput/MaskedInput';
import Select from 'react-select';
import { useRouter } from 'next/router';
import {
  loadStates,
  loadUserActiveAccount,
  stateSelector,
} from '../../features/adminDashboardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import AdminNotes from '../../components/AdminNotes/AdminNotes';
// import AddNotePopup from '../AddNote/AddNote';
import { Oval } from 'react-loader-spinner';
import Document from '../../components/DocumentCard/Document';
import { addNotification } from '../../features/notifications/notificationSlice';
import moment from 'moment';
import Link from 'next/link';
import { UserSidebar } from '../../components/UserSidebar/userSidebar';
import { EditDealerApplication } from '../../components';
import UserApplication from '../../components/UserApplication/UserApplication';

// import AutoSave from '../Autosave';


 const UserApplicationContent = () => {
const dispatch = useDispatch()
  const user = useSelector(userSelector)

  const [loadedValues, setLoadedValues] = useState()
const guidToSend = user?.ProfileGUID
const { applicationItem } = useSelector(dealerDashboardSelector);
useEffect(() =>{
dispatch(loadApplicationByGuid(guidToSend))
},[user])


useEffect(() =>{
  setLoadedValues(applicationItem)
},[applicationItem])
console.log(applicationItem)
  return (
    <div className={styles.wrapper}>
   
 <UserSidebar/>
<UserApplication initialValues={applicationItem} loadedValues={loadedValues} setLoadedValues={setLoadedValues}/>
    </div>
  );
};


export default UserApplicationContent