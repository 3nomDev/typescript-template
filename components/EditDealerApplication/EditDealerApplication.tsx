import React, { FC, useEffect, useState } from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { cs, StyleType } from '@rnw-community/shared';
import { useDispatch, useSelector } from 'react-redux';
import { hasErrors } from '../../utils/hasErrors';
import styles from './EditDealerApplication.module.css';
import { ApplicationInterface, DocumentTypeInterface } from '../../contracts';
import { DealerHeader } from '../DealerHeader/DealerHeader';
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
} from '../../features/dealerDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { MaskedInput } from '../MaskedInput/MaskedInput';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { loadStates, stateSelector } from '../../features/adminDashboardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AdminNotes from '../AdminNotes/AdminNotes';
import AddNotePopup from '../AddNote/AddNote';
import { Oval } from 'react-loader-spinner';
import Document from '../DocumentCard/Document';
import { addNotification } from '../../features/notifications/notificationSlice';
import moment from 'moment';

const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  MiddleName: Yup.string().trim(),
  SSN: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  DOB: Yup.string()
    .required('Date of birth is required')
    .test('DOB', 'Please choose a valid date of birth', (value) => {
      return moment().diff(moment(value), 'years') >= 18;
    }),
  MonthlyIncome: Yup.number().required('Monthly income is required'),
  DLNumber: Yup.string().required('Driver license number is required'),
  EmailAddress: Yup.string().trim().required('Email Address is required'),
  CellPhone: Yup.string().trim().required('Phone number is required'),
  Address: Yup.string().trim().required('Address is required'),
  City: Yup.string().trim().required('City is required'),
  State: Yup.string().trim().required('State is required'),
  PostalCode: Yup.string().trim().required('Zip code is required'),
  HousingStatus: Yup.string().trim().required('Housing status is required'),
  HowLong: Yup.number().required('Time at this address is required'),
  EmployerName: Yup.string().trim().required('Company name is required'),
  WorkPhone: Yup.string().trim().required('Work phone is required'),
  Position: Yup.string().trim().required('Position is required'),
  PositionType: Yup.string().trim().required('Employment status is required'),
  YearsAtCurrentJob: Yup.number().required('Years at company is required'),
  MonthlyHousingPayment: Yup.number().required(
    'Monthly housing payment is required'
  ),
  VIN: Yup.string().trim().required('VIN is required'),
  VehicleYear: Yup.number().required('Year is required'),
  VehicleMake: Yup.string().trim().required('Make is required'),
  VehicleModel: Yup.string().trim().required('Model is required'),
  VehicleMileage: Yup.number().required('Mileage is required'),
  VehicleEngine: Yup.string().required('Engine is required'),
  VehicleTransmission: Yup.string().required('Transmission is required'),
  VehicleColor: Yup.string().trim().required('Color is required'),
  PurchasePrice: Yup.number().required('Purchase price is required'),
  DepositFloat: Yup.number().required('Deposit is required'),
  AmountFinanced: Yup.number().required('Amount financed is required'),
});

interface Props {
  initialValues: ApplicationInterface;
}

export const EditDealerApplication: FC<Props> = ({ initialValues }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let approvalCode = router.query.id;
  const [showNotes, setShowNotes] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState('');
  const [noteOptions, setNoteOptions] = useState('');
  
  const states = useSelector(stateSelector);
  const application = useSelector(singleApplicationSelector);
  const notes = useSelector(notesSelector);
  let loggeduser = useSelector(userSelector);
  const user = useSelector(userSelector);
  const documents = useSelector(documentSelector);
 
  const userId = user?.ID;
  const statusStyle = {
    'Awaiting Approval': styles.orange,
    'Conditional Approval':styles.orange,
    Approved: styles.green,
    Declined: styles.red,
    Incomplete: styles.red,
  }[application?.Status];
  
  const pending = useSelector(pendingSelector);
  useEffect(() => void dispatch(loadStates()), []);
  
const [documentToSend, setDocumentToSend] = useState<any>({ userID: userId });

  console.log(initialValues);
  let noteData = {};
  // useEffect(() => {
  //   if (application !== null && id !== undefined && application !== undefined) {
  //     noteData = {
  //       id: application.ApplicationID,
  //       status: application.StatusID,
  //     };
  //     dispatch(loadRejectionNotes(noteData));
  //   }
  // }, [application]);

  const calcFinanced = (num1, num2) =>{
    return num1- num2;
  }

  const handleSubmit = (values: Partial<ApplicationInterface>): void => {
    console.log(values);
    dispatch(
      updateApplication({
        Address: values.Address,
        AmountFinanced: values.AmountFinanced,
        ApplicationID: values.ApplicationID,
        CellPhone: values.CellPhone,
        City: values.City,
        DLNumber: values.DLNumber,
        DOB: values.DOB,
        DepositFloat: values.DepositFloat,
        EmailAddress: values.EmailAddress,
        EmployerName: values.EmployerName,
        FirstName: values.FirstName,
        HousingStatus: values.HousingStatus,
        HowLong: values.HowLong,
        LastName: values.LastName,
        MiddleName: values.MiddleName,
        MonthlyHousingPayment: values.MonthlyHousingPayment,
        MonthlyIncome: values.MonthlyIncome,
        Position: values.Position,
        PositionType: values.PositionType,
        PostalCode: values.PostalCode,
        PurchasePrice: values.PurchasePrice,
        State: values.State,
        SSN: values.SSN,
        VIN: values.VIN,
        VehicleColor: values.VehicleColor,
        VehicleEngine: values.VehicleEngine,
        VehicleHorsePower: values.VehicleHorsePower,
        VehicleMake: values.VehicleMake,
        VehicleMileage: values.VehicleMileage,
        VehicleModel: values.VehicleModel,
        VehicleTransmission: values.VehicleTransmission,
        VehicleYear: values.VehicleYear,
        WorkPhone: values.WorkPhone,
        YearsAtCurrentJob: values.YearsAtCurrentJob,
        userId: Number(user.ID),
      })
    );
  };

  const documentTypes = useSelector(documentTypesSelector);

  const options =
    documentTypes &&
    documentTypes.map((item) => ({
      label: item.Name,
      value: item.ID,
    }));

  const uploadFile = (document) => {
    dispatch(uploadDocument(documentToSend));
  };

  let id;
  if (loggeduser) {
    id = loggeduser.ID;
  }

  useEffect(() => {
    // const data = { userid: userId, ApplicationID: application?.ApplicationID };
    // if (application && userId) dispatch(getDocuments(data));
    dispatch(loadDocumentTypes());
  }, []);

  const decryptFile = (event) => {
    let fileBlob = event.target.result;

    let extension = fileBlob.substring(5, fileBlob.indexOf(','));

    setDocumentToSend({
      ...documentToSend,
      Content: fileBlob,
      ApplicationID: application.ApplicationID,
      Extension: extension,
      DocumentName: name,
    });
  };
  let name;
  const readFile = (event) => {
    name = event.target.files[0].name;

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', decryptFile);
      reader.readAsDataURL(file);
    }
  };

  const handleSelectOptionChange = (e) => {
    setDocumentToSend({
      ...documentToSend,

      DocumentTypeID: e.value,
    });
  };

  const handleNoteOptions = (e: any) => {
   
    if (e.target.checked) {
      setNoteOptions(e.target.value);
    }
  };

  let mostRecent = notes[notes.length - 1];

  const saveNote = () => {
    const approved = application.StatusID === 3 ? true : false;
    noteData = { id: application.ApplicationID, status: application.StatusID };
    if (!noteOptions) {
      dispatch(
        addNotification({
          type: 'error',
          message: 'Please pick what type of message this is',
          autoHideDuration: 6000,
        })
      );
      return;
    }

if (note !== '' && !mostRecent ){
  let date = new Date().toISOString();
  let data = {
    ApplicationID: application.ApplicationID,
    DateAdded: date,
    Deleted: false,
    LastUpdated: date,
    LeaseApproved: null,
    LeaseNotes: '',
    StatusID: application.StatusID,
    UpdatedBy: user.ID,
    UserNotes: note,
    UserApproved: null,
  };

  dispatch(AddNote(data));
  setNote('');
  setAddNote(false);
}
    
   else if (note !== '' && noteOptions !== 'Lease') {
      let date = new Date().toISOString();
      let data = {
        ApplicationID: application.ApplicationID,
        DateAdded: date,
        Deleted: false,
        LastUpdated: date,
        LeaseApproved: approved,
        LeaseNotes: '',
        StatusID: application.StatusID,
        UpdatedBy: user.ID,
        UserNotes: note,
        UserApproved: approved,
      };

      dispatch(AddNote(data));
      setNote('');
      setAddNote(false);
    } else if (note !== '' && noteOptions === 'Lease') {
      let date = new Date().toISOString();
      let data = {
        ApplicationID: application.ApplicationID,
        DateAdded: date,
        Deleted: false,
        LastUpdated: date,
        LeaseApproved: mostRecent.LeaseApproved,
        LeaseNotes: note,
        StatusID: application.StatusID,
        UpdatedBy: user.ID,
        UserNotes: '',
        UserApproved: mostRecent.UserApproved,
      };

      dispatch(AddNote(data));
      setNote('');
      setAddNote(false);
    } else {
      return;
    }
  };

  console.log('*******************', pending);
  return (
    <div className={styles.wrapper}>
      {showNotes && notes.length && (
        <AdminNotes notes={notes} setShowNotes={setShowNotes} />
      )}

      <DealerHeader />
      {pending && (
        <div className={styles.loaderWrapper}>
          <Oval
            secondaryColor="black"
            wrapperClass={styles.loader}
            width={80}
            height={80}
            color="black"
          />
        </div>
      )}
      {!pending && (
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.titleContent}>
              <h1>
                <FontAwesomeIcon
                  icon={faUserPlus as IconProp}
                  className={styles.icon}
                />
                Update Account (Profile # {application?.ApplicationID})
                <p className={statusStyle}>{application?.Status}</p>
                <p>
                  {application?.FirstName} {application?.LastName}
                </p>
                
              </h1>

              <div>
                <button
                  className={styles.notesButton}
                  onClick={() => setShowNotes(true)}
                >
                  Notes
                </button>
                <button
                  className={styles.addNoteButton}
                  onClick={() => setAddNote(true)}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>

          <Formik<ApplicationInterface>
            validationSchema={validationSchema}
            validateOnBlur
            onSubmit={handleSubmit}
            enableReinitialize
           
            initialValues={{
              ...initialValues,
              DOB: new Date(initialValues?.DOB ?? '2004-04-04T00:00:00'),
              SSN:"***-**-" + initialValues?.SSN,
              // AmountFinanced : calcFinanced(initialValues?.PurchasePrice, initialValues?.DepositFloat)

            }}
          >
            {({ errors, values, touched, submitForm, initialValues, setFieldValue, validateOnChange }) => {

              useEffect(()=>{
                
               setFieldValue("AmountFinanced", calcFinanced(values?.PurchasePrice, values?.DepositFloat)) 
              

              },[values.DepositFloat, touched.DepositFloat, setFieldValue])
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

              const EmailAddressHasErrors = hasErrors(
                touched.EmailAddress,
                errors.EmailAddress
              );
              const CellPhoneHasErrors = hasErrors(
                touched.CellPhone,
                errors.CellPhone
              );
              const driverLicenseHasErrors = hasErrors(
                touched.DLNumber,
                errors.DLNumber
              );

              const CityHasErrors = hasErrors(touched.City, errors.City);
              const StateHasErrors = hasErrors(touched.State, errors.State);
              const PostalCodeHasErrors = hasErrors(
                touched.PostalCode,
                errors.PostalCode
              );
              const HousingStatusHasErrors = hasErrors(
                touched.HousingStatus,
                errors.HousingStatus
              );
              const TimeAtAddressHasErrors = hasErrors(
                touched.HowLong,
                errors.HowLong
              );
              const MonthlyPaymentHasErrors = hasErrors(
                touched.MonthlyHousingPayment,
                errors.MonthlyHousingPayment
              );
              const CompanyNameHasErrors = hasErrors(
                touched.EmployerName,
                errors.EmployerName
              );
              const WorkPhoneHasErrors = hasErrors(
                touched.WorkPhone,
                errors.WorkPhone
              );
              const PositionHasErrors = hasErrors(
                touched.Position,
                errors.Position
              );
              const PositionTypeHasErrors = hasErrors(
                touched.PositionType,
                errors.PositionType
              );
              const YearsAtCurrentJobHasErrors = hasErrors(
                touched.YearsAtCurrentJob,
                errors.YearsAtCurrentJob
              );

              const VINHasErrors = hasErrors(touched.VIN, errors.VIN);
              const YearHasErrors = hasErrors(
                touched.VehicleYear,
                errors.VehicleYear
              );
              const MakeHasErrors = hasErrors(
                touched.VehicleMake,
                errors.VehicleMake
              );
              const ModelHasErrors = hasErrors(
                touched.VehicleModel,
                errors.VehicleModel
              );

              const MileageHasErrors = hasErrors(
                touched.VehicleMileage,
                errors.VehicleMileage
              );
              const EngineHasErrors = hasErrors(
                touched.VehicleEngine,
                errors.VehicleEngine
              );
              const TransmissionHasErrors = hasErrors(
                touched.VehicleTransmission,
                errors.VehicleTransmission
              );
              const ColorHasErrors = hasErrors(
                touched.VehicleColor,
                errors.VehicleColor
              );
              const PurchasePriceHasErrors = hasErrors(
                touched.PurchasePrice,
                errors.PurchasePrice
              );
              const DepositHasErrors = hasErrors(
                touched.DepositFloat,
                errors.DepositFloat
              );
              const AmountFinancedHasErrors = hasErrors(
                touched.AmountFinanced,
                errors.AmountFinanced
              );
              const phoneHasErrors = hasErrors(
                touched.CellPhone,
                errors.CellPhone
              );
              const primaryAddressHasErrors = hasErrors(
                touched.Address,
                errors.Address
              );
              const inputErrorStyle = (hasError: boolean): StyleType =>
                cs(
                  hasError,
                  cx(styles.errorInput, styles.input) as StyleType,
                  styles.input as StyleType
                );
              console.log(errors);
              return (
                <div className={styles.formWrapper}>
                  {addNote && (
                    <AddNotePopup
                      setAddNote={setAddNote}
                      setNote={setNote}
                      saveNote={saveNote}
                      handleNoteOptions={handleNoteOptions}
                    />
                  )}
                  <Form className={styles.form}>
                    <div className={styles.personalDetails}>
                      <div className={styles.headerRight}>
                        <h1>Personal details</h1>
                        <p>01</p>
                      </div>
                      <div className={styles.headerLeft}>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>
                              First name
                              <span className={styles.required}>*</span>
                            </p>
                            <Field
                              className={cs(
                                firstNameHasErrors,
                                styles.errorInput,
                                styles.input
                              )}
                              name="FirstName"
                              placeholder="First Name"
                            />
                            {firstNameHasErrors && (
                              <div className={styles.error}>
                                {errors.FirstName}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Middle name</p>
                            <Field
                              className={styles.input}
                              name="MiddleName"
                              placeholder="Middle Name"
                            />
                          </div>
                          <div className={styles.inputBox}>
                            <p>
                              Last name{' '}
                              <span className={styles.required}>*</span>
                            </p>
                            <Field
                              className={cs(
                                LastNameHasErrors,
                                styles.errorInput,
                                styles.input
                              )}
                              name="LastName"
                              placeholder="Last Name"
                            />
                            {LastNameHasErrors && (
                              <div className={styles.error}>
                                {errors.LastName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Phone number</p>
                            <Field
                              className={styles.input}
                              name="CellPhone"
                              placeholder="Phone number"
                            />
                            {phoneHasErrors && (
                              <div className={styles.error}>
                                {errors.CellPhone}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>
                              Email <span className={styles.required}>*</span>
                            </p>
                            <Field
                              className={cs(
                                EmailAddressHasErrors,
                                styles.errorInput,
                                styles.input
                              )}
                              name="EmailAddress"
                              placeholder="Email Address"
                            />
                            {EmailAddressHasErrors && (
                              <div className={styles.error}>
                                {errors.EmailAddress}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Driver license</p>
                            <Field
                              className={styles.input}
                              name="DLNumber"
                              placeholder="Driver license"
                            />
                            {driverLicenseHasErrors && (
                              <div className={styles.error}>
                                {errors.DLNumber}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>SSN</p>
                            <Field
                              className={styles.input}
                              name="SSN"
                              placeholder="Social Security Number"
                            />
                            {ssnHasErrors && (
                              <div className={styles.error}>{errors.SSN}</div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Date of birth</p>
                            <DatePickerField
                              className={styles.input}
                              name="DOB"
                            />
                            {DOBHasErrors && (
                              <div className={styles.error}>{errors.DOB}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {documents.length && (
                      <div className={styles.personalDetails}>
                        <div className={styles.headerRight}>
                          <h1 className={styles.rowTitle}>Documents</h1>
                          <p>02</p>
                        </div>
                        <div className={styles.headerLeft}>
                          {documents.length &&
                            documents.map((item) => (
                              <Document
                                item={item}
                                id={approvalCode}
                                profileType={'dealer'}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.personalDetails}>
                      <div className={styles.headerRight}>
                        <h1 className={styles.rowTitle}>Upload documents</h1>
                        <p>03</p>
                      </div>
                      <div className={styles.headerLeft}>
                        {' '}
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Document type</p>
                            <Select
                              options={options}
                              onChange={handleSelectOptionChange}
                              className={styles.documentSelector}
                            />

                            <p>Select document</p>
                            <input
                              type="file"
                              className="customUploadBtn"
                              onChange={() => readFile(event)}
                              style={{ width: '100%' }}
                            />
                            <br></br>
                            <div className={styles.uploadBtnHolder}>
                              <button
                                disabled={
                                  Object.keys(documentToSend).length < 6
                                }
                                className={styles.uploadBtn}
                                onClick={uploadFile}
                              >
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <div className={styles.formRow}>
                  <div className={styles.inputBox}>
                   
                  
                  </div>
                </div> */}
                      </div>
                    </div>
                    <div className={styles.personalDetails}>
                      <div className={styles.headerRight}>
                        <h1 className={styles.rowTitle}>Residence details</h1>
                        <p>04</p>
                      </div>
                      <div className={styles.headerLeft}>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Primary address</p>
                            <Field
                              name="Address"
                              placeholder="Primary address"
                              className={styles.input}
                            />
                            {primaryAddressHasErrors && (
                              <div className={styles.error}>
                                {errors.Address}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>City</p>
                            <Field
                              name="City"
                              placeholder="City"
                              className={styles.input}
                            />
                            {CityHasErrors && (
                              <div className={styles.error}>{errors.City}</div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>State</p>
                            <Field
                              name="State"
                              as="select"
                              className={styles.select}
                            >
                              {states.map((item) => (
                                <option value={item.Short}>{item.State}</option>
                              ))}
                            </Field>
                            {StateHasErrors && (
                              <div className={styles.error}>{errors.State}</div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>ZIP Code</p>
                            <Field
                              name="PostalCode"
                              placeholder="Zip Code"
                              className={styles.input}
                            />
                            {PostalCodeHasErrors && (
                              <div className={styles.error}>
                                {errors.PostalCode}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Housing status</p>
                            <Field
                              name="HousingStatus"
                              as="select"
                              placeholder="Zip Code"
                              className={styles.select}
                            >
                              <option value="">Choose an option</option>
                              <option value="Rent">Rent</option>
                              <option value="Own">Own</option>
                              <option value="ParentsBasement">
                                Live in parents basement
                              </option>
                            </Field>
                            {HousingStatusHasErrors && (
                              <div className={styles.error}>
                                {errors.HousingStatus}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Time at this address</p>
                            <Field
                              type="number"
                              name="HowLong"
                              min="0"
                              placeholder="Time at this address"
                              className={styles.input}
                            />
                            {TimeAtAddressHasErrors && (
                              <div className={styles.error}>
                                {errors.HowLong}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Monthly Payment</p>
                            <Field
                              type="number"
                              min="0"

                              name="MonthlyHousingPayment"
                              placeholder="Monthly Housing Payment"
                              className={styles.input}
                            />
                            {MonthlyPaymentHasErrors && (
                              <div className={styles.error}>
                                {errors.MonthlyHousingPayment}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.personalDetails}>
                      <div className={styles.headerRight}>
                        {' '}
                        <h1 className={styles.rowTitle}>
                          Employment details
                        </h1>{' '}
                        <p>05</p>
                      </div>
                      <div className={styles.headerLeft}>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Company name</p>
                            <Field
                              name="EmployerName"
                              className={styles.input}
                              placeholder="Company Name"
                            />
                            {CompanyNameHasErrors && (
                              <div className={styles.error}>
                                {errors.EmployerName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Work phone</p>
                            <Field
                              name="WorkPhone"
                              className={styles.input}
                              placeholder="Work Phone"
                            />
                            {WorkPhoneHasErrors && (
                              <div className={styles.error}>
                                {errors.WorkPhone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Position</p>
                            <Field
                              name="Position"
                              className={styles.input}
                              placeholder="Position"
                            />
                            {PositionHasErrors && (
                              <div className={styles.error}>
                                {errors.Position}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Employment status</p>
                            <Field
                              className={styles.select}
                              as="select"
                              name="PositionType"
                            >
                              <option value="">Choose an option</option>
                              <option value="full-time">Full-time</option>
                              <option value="part-time">Part Time</option>
                            </Field>
                            {PositionTypeHasErrors && (
                              <div className={styles.error}>
                                {errors.PositionType}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Years at company</p>
                            <Field
                              type="number"
                              name="YearsAtCurrentJob"
                              className={styles.input}
                              min="0"

                            />
                            {YearsAtCurrentJobHasErrors && (
                              <div className={styles.error}>
                                {errors.YearsAtCurrentJob}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Monthly Income</p>
                            <Field
                              type="number"
                              name="MonthlyIncome"
                              placeholder="Monthly Income"
                              className={styles.input}
                            />
                            {MonthlyIncomeHasErrors && (
                              <div className={styles.error}>
                                {errors.MonthlyIncome}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.personalDetails}>
                      <div className={styles.headerRight}>
                        <h1 className={styles.rowTitle}>Vehicle details</h1>
                        <p>06</p>
                      </div>
                      <div className={styles.headerLeft}>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>
                              17 Digits VIN
                              <span className={styles.required}>*</span>
                            </p>
                            <Field
                              type="number"
                              name="VIN"
                              className={styles.input}
                            />
                            {VINHasErrors && (
                              <div className={styles.error}>{errors.VIN}</div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Year</p>
                            <Field
                              type="number"
                              name="VehicleYear"
                              placeholder="Vehicle Year"
                              className={styles.input}
                            />
                            {YearHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleYear}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Make</p>
                            <Field
                              placeholder="Vehicle Make"
                              type="text"
                              name="VehicleMake"
                              className={styles.input}
                            />
                            {MakeHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleMake}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Model</p>
                            <Field
                              placeholder="Vehicle Model"
                              className={styles.input}
                              name="VehicleModel"
                            />
                            {ModelHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleModel}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Mileage</p>
                            <Field
                              name="VehicleMileage"
                              className={styles.input}
                              placeholder="Vehicle mileage"
                            />
                            {MileageHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleMileage}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Engine</p>
                            <Field
                              name="VehicleEngine"
                              className={styles.input}
                              placeholder="Engine"
                            />
                            {EngineHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleEngine}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Transmission</p>
                            <Field
                              name="VehicleTransmission"
                              className={styles.input}
                              as="select"
                              placeholder="Vehicle transmission"
                            >
                              <option value="automatic">Automatic</option>
                              <option value="manual">Manual</option>
                            </Field>
                            {TransmissionHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleTransmission}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Color</p>
                            <Field
                              name="VehicleColor"
                              className={cs(
                                ColorHasErrors,
                                styles.errorInput,
                                styles.input
                              )}
                              placeholder="Color"
                            />
                            {ColorHasErrors && (
                              <div className={styles.error}>
                                {errors.VehicleColor}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Purchase price</p>
                            <Field
                              name="PurchasePrice"
                              className={styles.input}
                              placeholder="Purchase price"
                            />
                            {PurchasePriceHasErrors && (
                              <div className={styles.error}>
                                {errors.PurchasePrice}
                              </div>
                            )}
                          </div>
                          <div className={styles.inputBox}>
                            <p>Deposit</p>
                            <Field
                              name="DepositFloat"
                              className={styles.input}
                              placeholder="Deposit"
                              validateOnBlur
                             
                            />
                            {DepositHasErrors && (
                              <div className={styles.error}>
                                {errors.DepositFloat}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.inputBox}>
                            <p>Amount financed</p>
                            <Field
                              name="AmountFinanced"
                              className={styles.input}
                              placeholder="Amount financed"
                            
                              
                            />
                            {AmountFinancedHasErrors && (
                              <div className={styles.error}>
                                {errors.AmountFinanced}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className={styles.notesButton} type="submit">
                      SAVE
                    </button>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};
