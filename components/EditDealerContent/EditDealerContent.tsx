import React, { FC, useState, Component, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';
import {
  faArrowLeft,
  faCar,
  faCheck,
  faCheckCircle,
  faDollarSign,
  faFile,
  faFilePdf,
  faTimes,
  faChevronDown,
  faCaretDown,
  faSearch,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Oval } from 'react-loader-spinner';
import { cs, OnEventFn } from '@rnw-community/shared';
import cx from 'classnames';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './EditDelaerContent.module.css';
import {
  ApplicationInterface,
  ChangeApplicationStatusArgs,
  ContractInterface,
  DocumentTypeInterface,
  StateInterface,
} from '../../contracts';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { hasErrors } from '../../utils/hasErrors';
import { ApplicationApproveModal } from '../ApplicationApproveModal/ApplicationApproveModal';
import { PaymentsModal } from '../PaymentsModal/PaymentsModal';
import { useDispatch } from 'react-redux';
import {
  uploadDocument,
  getDocuments,
  documentsSelector,
  loadRejectionNotes,
  rejectionsNotesSelector,
  pendingSelector,
  AddRejectionNote,
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { useSelector } from 'react-redux';
import { NavItem } from 'react-bootstrap';
import Document from '../DocumentCard/Document';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons';
import AdminNotes from '../AdminNotes/AdminNotes';
import AddNotePopup from '../AddNote/AddNote';
import { addNotification } from '../../features/notifications/notificationSlice';
import {
  getVehicleInfoByVin,
  vehicleInfoSelector,
} from '../../features/dealerDashboardSlice';

const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  EmailAddress: Yup.string().email().required('Email is required'),
  CellPhone: Yup.string().trim(),
  DOB: Yup.date().required('Date of birth is required'),
  VIN: Yup.string().required('VIN is required'),
  Position: Yup.string(),
  TAXID: Yup.string(),
  DLNumber: Yup.string(),
  DLState: Yup.string(),
  Address: Yup.string(),
  City: Yup.string(),
  State: Yup.string(),
  AmountFinanced: Yup.number(),
  DepositFloat: Yup.number(),
  EmployerName: Yup.string(),
  HousingStatus: Yup.string(),

  MiddleName: Yup.string(),
  VehicleColor: Yup.string().required('Color is required'),
  HowLong: Yup.string().required('Time at this address is required'),
  Term: Yup.string().required(("Please Select a Timeframe")),
  // SSN: Yup.string()
  //   .required()
  //   .matches(/^[0-9]+$/, 'Must be only digits')
  //   .min(9, 'Must be exactly 9 digits')
  //   .max(9, 'Must be exactly 9 digits'),
});

interface Props {
  application: ApplicationInterface;
  pending: boolean;
  onBackPress: OnEventFn;
  contractTypes: ContractInterface[];
  documentTypes: DocumentTypeInterface[];
  states: StateInterface[];
  onGeneratePdf: OnEventFn;
  onSubmit: OnEventFn;
  onChangeAppStatus: (id: number) => () => void;
  onApprove: (payload: Partial<ChangeApplicationStatusArgs>) => () => void;
  onSchedulePayments: OnEventFn;
}

interface CustomFileProps {
  name: string;
}

export const EditDealerContent: FC<Props> = ({
  application,
  onBackPress,
  onGeneratePdf,
  pending,
  contractTypes,
  documentTypes,
  states,
  onChangeAppStatus,
  onSubmit,
  onSchedulePayments,
  onApprove,
}) => {
  const user = useSelector(userSelector);
  const documents = useSelector(documentsSelector);
  const notes = useSelector(rejectionsNotesSelector);
  const loading = useSelector(pendingSelector);
  const ref = useRef();

  const userId = user?.ID;
  const isApproved = application?.Status === 'Approved';

  const [isApproveModalShown, setIsApproveModalShown] = useState(false);
  const [isPaymentsModalShown, setIsPaymentsModalShown] = useState(false);
  const [documentName, setdocumentName] = useState();
  const [documentToSend, setDocumentToSend] = useState<any>({ userID: userId });
  const [denialPopup, setDenialPopup] = useState(false);
  const [notePopup, setNotePopup] = useState(false);
  const [leaseDenialNote, setLeaseDenialNote] = useState('');
  const [userDenialNote, setUserDenialNote] = useState('');
  const [note, setNote] = useState('');
  const [noteOptions, setNoteOptions] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [leaseApproved, setLeaseApproved] = useState(false);
  const [userApproved, setUserApproved] = useState(false);
  const [showButtonDropdown, setShowButtonDropdown] = useState(false);
  const [paymentProposal, setPaymentProposal] = useState({
    Amount: '',
    Frequency: '',
    PaymentDay: '',
    SecondPaymentDay: '',
    NumberOfPayments: '',
  });
  const [inputIsChecked, setInputIsChecked] = useState(false);
  const vehicleDetails = useSelector(vehicleInfoSelector);

  const [initialProposal] = useState({
    Amount: '',
    Frequency: '',
    PaymentDay: '',
    NumberOfPayments: '',
  });

  const [isProposal, setIsProposal] = useState(false);

  const statusStyle = {
    'Awaiting Approval': styles.orange,
    Approved: styles.green,
    Declined: styles.red,
    Incomplete: styles.red,
  }[application?.Status];

  const toggleApproveModal = (): void =>
    void setIsApproveModalShown(!isApproveModalShown);
  const togglePaymentsModal = (): void =>
    void setIsPaymentsModalShown(!isPaymentsModalShown);
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const options = documentTypes.map((item) => ({
    label: item.Name,
    value: item.ID,
  }));

  const uploadFile = (document) => {
    dispatch(uploadDocument(documentToSend));
  };

  useEffect(() => {
    const data = { userid: userId, ApplicationID: id };
    if (id && userId) {
      dispatch(getDocuments(data));
    }
  }, [id]);

  useEffect(() => {
    let noteData = {};
    if (application !== null && id !== undefined && application !== undefined) {
      noteData = { id: Number(id), status: application.StatusID };
      dispatch(loadRejectionNotes(noteData));
    }
  }, [application]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showButtonDropdown &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setShowButtonDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showButtonDropdown]);

  const decryptFile = (event) => {
    let fileBlob = event.target.result;

    let extension = fileBlob.substring(5, fileBlob.indexOf(','));

    setDocumentToSend({
      ...documentToSend,
      Content: fileBlob,
      ApplicationID: id,
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

  const handleLeaseDenialNoteChange = (e) => {
    setLeaseDenialNote(e.target.value);
  };
  const handleUserDenialNoteChange = (e) => {
    setUserDenialNote(e.target.value);
  };

  const handleLeaseApproved = (e) => {
    if (e.target.checked) {
      setLeaseApproved(true);
    } else {
      setLeaseApproved(false);
    }
  };
  const handleUserApproved = (e) => {
    if (e.target.checked) {
      setUserApproved(true);
    } else {
      setUserApproved(false);
    }
  };

  const handleNoteOptions = (e: any, key) => {
    if (e.target.value !== 'Propose Terms') {
      setIsProposal(false);
    }
    setNoteOptions(e.target.value);
  };

  const saveDenialNote = () => {
    dispatch(onChangeAppStatus(4));
    if (leaseDenialNote !== '' || userDenialNote !== '') {
     
      let date = new Date().toISOString();
      let data = {
        ApplicationID: application.ApplicationID,
        DateAdded: date,
        Deleted: false,
        LastUpdated: date,
        LeaseApproved: leaseApproved,
        LeaseNotes: leaseDenialNote,
        StatusID: 4,
        UpdatedBy: user.ID,
        UserNotes: userDenialNote,
        UserApproved: userApproved,
      };

      dispatch(AddRejectionNote(data));
      setLeaseApproved(false);
      setUserApproved(false);
      setUserDenialNote('');
      setLeaseDenialNote('');
      setDenialPopup(false);
    } else {
      return;
    }
  };

  const saveNote = () => {
    const approved = application.StatusID === 3 ? true : false;
    console.log('happening here')
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
    if (note !== '' && noteOptions === 'Propose Terms') {
      if (
        paymentProposal.Frequency === '' ||
        paymentProposal.Frequency === 'Choose Option'
      ) {
        dispatch(
          addNotification({
            type: 'error',
            message: 'Please pick a frequency',
            autoHideDuration: 6000,
          })
        );
        return;
      } else {
        console.log("saving from first condition")
        let date = new Date().toISOString();
        let data = {
          ApplicationID: application.ApplicationID,
          DateAdded: date,
          Deleted: false,
          LastUpdated: date,
          LeaseApproved: approved,
          LeaseNotes: paymentProposal,
          StatusID: application.StatusID,
          UpdatedBy: user.ID,
          UserNotes: '',
          UserApproved: approved,
        };

        dispatch(AddRejectionNote(data));
        setNote('');
        setNotePopup(false);
        setIsProposal(false);
        setPaymentProposal(initialProposal);
      }
    } else if (note !== '' && noteOptions !== 'Vehicle') {
      console.log("saving from second condition")
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

      dispatch(AddRejectionNote(data));
      setNote('');
      setNotePopup(false);
    } else if (note !== '' && noteOptions === 'Vehicle') {
      console.log("saving from third condition")
      let date = new Date().toISOString();
      let data = {
        ApplicationID: application.ApplicationID,
        DateAdded: date,
        Deleted: false,
        LastUpdated: date,
        LeaseApproved: approved,
        LeaseNotes: note,
        StatusID: application.StatusID,
        UpdatedBy: user.ID,
        UserNotes: '',
        UserApproved: approved,
      };

      dispatch(AddRejectionNote(data));
      setNote('');
      setNotePopup(false);
    } else {
      return;
    }
  };

  const calcFinanced = (num1, num2) => {
    return num1 - num2;
  };

  const lookUpVehicle = (vin) => {
    dispatch(getVehicleInfoByVin(vin));
  };

  var howLongNUm = application?.HowLong.replace(/[^0-9]/g, '');
  var howLongTerm = application?.HowLong.replace(/[^\D]+/g, '');

  const denailNotePopup = (
    <div className={styles.popUpBackground}>
      <div className={styles.popUpWrapper}>
        <div className={styles.popup}>
          <h2 className={styles.popupHeader}>Reason For Denying</h2>
          <div className={styles.popUpTextArea}>
            <label>User Notes</label>{' '}
            <textarea onChange={handleUserDenialNoteChange} />
          </div>
          <div className={styles.popUpTextArea}>
            <label>Lease Notes</label>{' '}
            <textarea onChange={handleLeaseDenialNoteChange} />
          </div>
          <div className={styles.checkboxContainer}>
            <div>
              <input
                type="checkbox"
                name="Lease Approved"
                value="checked"
                onChange={(e) => handleLeaseApproved(e)}
              />
              <label>Lease Approved</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Lease Approved"
                value="checked"
                onChange={(e) => handleUserApproved(e)}
              />
              <label>User Approved</label>
            </div>
          </div>

          <div className={styles.popupBtnContainer}>
            <button
              onClick={() => setDenialPopup(false)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>

            <button
              onClick={saveDenialNote}
              className={styles.saveBtn}
              disabled={userDenialNote === '' && leaseDenialNote === ''}
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const buttonDropDown = (
    <ul ref={ref}>
      <li
        onClick={() => {
          setNotePopup(true);
          setShowButtonDropdown(false);
        }}
      >
        Add Note
      </li>
      <li
        onClick={() => {
          setDenialPopup(true);
          setShowButtonDropdown(false);
        }}
      >
        Deny with Note
      </li>
      <li
        onClick={() => {
          setShowNotes(true);
          setShowButtonDropdown(false);
        }}
      >
        View Notes
      </li>
    </ul>
  );

  console.log(howLongNUm);
  console.log(howLongTerm);

  return (
    <div className={styles.wrapper}>
      {showNotes && notes.length > 0 && (
        <AdminNotes notes={notes} setShowNotes={setShowNotes} />
      )}
      {isApproveModalShown && (
        <ApplicationApproveModal
          closeModal={toggleApproveModal}
          onSave={onApprove}
          application={application}
        />
      )}
      {isPaymentsModalShown && (
        <PaymentsModal
          onClose={togglePaymentsModal}
          onSubmit={onSchedulePayments}
          application={application}
        />
      )}
      <DealerHeader title="Admin" />
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
          <Formik<ApplicationInterface>
            onSubmit={(values) => onSubmit(values)}
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{
              ...application,
              DOB: new Date(application?.DOB ?? '2004-04-04T00:00:00'),
              SSN: '***-**-' + application?.SSN,
              VIN: vehicleDetails.VIN || application?.VIN,
              VehicleYear: vehicleDetails.ModelYear || application?.VehicleYear,
              VehicleMake: vehicleDetails.Make || application?.VehicleMake,
              VehicleModel: vehicleDetails.Model || application?.VehicleModel,
              VehicleEngine:
                vehicleDetails.DisplacementL || application?.VehicleEngine,
              VehicleTransmission:
                vehicleDetails.TransmissionStyle ||
                application?.VehicleTransmission,
              Term: howLongTerm ? howLongTerm : '',
              HowLong: howLongNUm ? howLongNUm : '',
              // MonthlyHousingPayment:null
            }}
          >
            {({ submitForm, touched, errors, values, setFieldValue }) => {
              useEffect(() => {
                setFieldValue(
                  'AmountFinanced',
                  calcFinanced(values?.PurchasePrice, values?.DepositFloat)
                );
              }, [values.DepositFloat, touched.DepositFloat, setFieldValue]);
              const vinHasErrors = hasErrors(touched.VIN, errors.VIN);
              const firstNameHasErrors = hasErrors(
                touched.FirstName,
                errors.FirstName
              );
              const lastNameHasErrors = hasErrors(
                touched.LastName,
                errors.LastName
              );
              const emailHasErrors = hasErrors(
                touched.EmailAddress,
                errors.EmailAddress
              );
              const colorHasErrors = hasErrors(
                touched.VehicleColor,
                errors.VehicleColor
              );
              const ssnHasErrors = hasErrors(touched.SSN, errors.SSN);
              const Term = hasErrors(
                touched.Term,
                errors.Term
              );
              const TimeAtAddressHasErrors = hasErrors(
                touched.HowLong,
                errors.HowLong
              );
              onSubmit;

              return (
                <>
                  <div className={styles.title}>
                    <div className={styles.titleContent}>
                      <FontAwesomeIcon
                        icon={faFileAlt as IconProp}
                        className={styles.faFile}
                      />
                      <span>{application?.ApplicationID}</span>
                      <span className={statusStyle}>{application?.Status}</span>
                      <span>{`${application?.FirstName} ${application?.LastName}`}</span>
                    </div>
                  </div>
                  {notePopup && (
                    <AddNotePopup
                      setAddNote={setNotePopup}
                      setNote={setNote}
                      saveNote={saveNote}
                      handleNoteOptions={handleNoteOptions}
                      paymentProposal={paymentProposal}
                      setPaymentProposal={setPaymentProposal}
                      isProposal={isProposal}
                      noteOptions={noteOptions}
                      setIsProposal={setIsProposal}
                      inputIsChecked={inputIsChecked}
                      setInputIsChecked={setInputIsChecked}
                    />
                  )}
                  {denialPopup && denailNotePopup}
                  {documentTypes && !loading && (
                    <div className={styles.dashboardBar}>
                      <div className={styles.backButton} onClick={onBackPress}>
                        <FontAwesomeIcon icon={faArrowLeft as IconProp} /> Back
                      </div>
                      <div className={styles.buttonContainer}>
                        <select className={styles.select}>
                          {contractTypes.map((item) => (
                            <option value={item.Name}>{item.Name}</option>
                          ))}
                        </select>
                        <div
                          className={cx(styles.generatePdf)}
                          onClick={onGeneratePdf}
                        >
                          <FontAwesomeIcon
                            icon={faFilePdf as IconProp}
                            className={styles.buttonIcon}
                          />{' '}
                          Generate pdf
                        </div>
                        <div
                          className={cx(styles.save, styles.button)}
                          onClick={submitForm}
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle as IconProp}
                            className={styles.buttonIcon}
                          />
                          Save
                        </div>
                        <div className={styles.dropdownBtnWrapper}>
                          <button
                            className={styles.dropdownBtn}
                            onClick={() =>
                              setShowButtonDropdown(!showButtonDropdown)
                            }
                          >
                            Note Options
                            <FontAwesomeIcon
                              icon={faCaretDown as IconProp}
                              className={styles.dropdownBtnIcon}
                            />
                          </button>

                          <div className={styles.dropdownPopup}>
                            {showButtonDropdown && (
                              <div className={styles.dropDownItems}>
                                {' '}
                                {buttonDropDown}
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={cx(styles.incomplete, styles.button)}
                          onClick={onChangeAppStatus(1)}
                        >
                          <FontAwesomeIcon
                            icon={faFile as IconProp}
                            className={styles.buttonIcon}
                          />{' '}
                          Incomplete
                        </div>
                        {!isApproved && (
                          <div
                            className={cx(styles.approved, styles.button)}
                            onClick={toggleApproveModal}
                          >
                            <FontAwesomeIcon icon={faCheck as IconProp} />{' '}
                            Approve
                          </div>
                        )}

                        {isApproved && (
                          <div
                            className={cx(styles.payments, styles.button)}
                            onClick={togglePaymentsModal}
                          >
                            <FontAwesomeIcon
                              icon={faDollarSign as IconProp}
                              className={styles.paymentIcon}
                            />
                            Payments
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className={styles.formWrapper}>
                    {/* <h1>Personal details</h1> */}
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
                                  lastNameHasErrors,
                                  styles.errorInput,
                                  styles.input
                                )}
                                name="LastName"
                                placeholder="Last Name"
                              />
                              {lastNameHasErrors && (
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
                            </div>
                            <div className={styles.inputBox}>
                              <p>
                                Email <span className={styles.required}>*</span>
                              </p>
                              <Field
                                className={cs(
                                  emailHasErrors,
                                  styles.errorInput,
                                  styles.input
                                )}
                                name="EmailAddress"
                                placeholder="Email Address"
                              />
                              {emailHasErrors && (
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
                            </div>
                            <div className={styles.inputBox}>
                              <p>SSN</p>
                              <Field
                                // type="number"
                                className={styles.input}
                                name="SSN"
                                placeholder="Social Security"
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
                                <Document item={item} id={id} />
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
                            </div>
                            <div className={styles.inputBox}>
                              <p>State</p>
                              <Field
                                name="State"
                                as="select"
                                className={styles.select}
                              >
                                {states.map((item) => (
                                  <option value={item.Short}>
                                    {item.State}
                                  </option>
                                ))}
                              </Field>
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
                                <option value="Rent">Rent</option>
                                <option value="Own">Own</option>
                                <option value="ParentsBasement">
                                  Live in parents basement
                                </option>
                              </Field>
                            </div>
                            <div className={styles.inputBox}>
                            
                              <div style={{ display: 'flex' }}>
                                <div>
                                  {' '}  <p>Time at this address </p>
                                  <Field
                                    type="number"
                                    name="HowLong"
                                    placeholder="Time at this address"
                                    className={styles.input}
                                  />
                                    {TimeAtAddressHasErrors && (
                              <div className={styles.error} style={{marginLeft:"15px"}}>
                                {errors.HowLong}
                              </div>
                            )}
                                </div>
                                <div>
                                <p style={{marginLeft:"15px"}}>Months or Years</p>
                                  <Field
                                    as="select"
                                    className={styles.input}
                                    style={{ marginLeft: '10px' }}
                                    name="Term"
                                  >
                                    <option value="">Choose an option</option>

                                    <option value="Years">Years</option>
                                    <option value="Months">Months</option>
                                  </Field>
                                  {Term &&  (<div className={styles.error} style={{marginLeft:"15px"}}>
                                {errors.Term}
                              </div>)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.formRow}>
                            <div className={styles.inputBox}>
                              <p>Monthly Payment</p>
                              <Field
                                type="number"
                                name="MonthlyHousingPayment"
                                placeholder="Monthly Housing Payment"
                                className={styles.input}
                              />
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
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part Time</option>
                              </Field>
                            </div>
                            <div className={styles.inputBox}>
                              <p>Years at company</p>
                              <Field
                                type="number"
                                name="YearsAtCurrentJob"
                                className={styles.input}
                              />
                            </div>
                            <div className={styles.inputBox}>
                              <p>Monthly Income</p>
                              <Field
                                type="number"
                                name="MonthlyIncome"
                                placeholder="Monthly Income"
                                className={styles.input}
                              />
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
                                type="string"
                                name="VIN"
                                className={styles.input}
                              />
                              {values.VIN !== '' ? (
                                <FontAwesomeIcon
                                  onClick={() => lookUpVehicle(values.VIN)}
                                  icon={faSearch as IconProp}
                                  style={{ cursor: 'pointer' }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faSearch as IconProp}
                                  color="red"
                                />
                              )}
                              {vinHasErrors && (
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
                            </div>
                            <div className={styles.inputBox}>
                              <p>Make</p>
                              <Field
                                placeholder="Vehicle Make"
                                type="text"
                                name="VehicleMake"
                                className={styles.input}
                              />
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
                            </div>
                            <div className={styles.inputBox}>
                              <p>Engine</p>
                              <Field
                                name="VehicleEngine"
                                className={styles.input}
                                placeholder="Engine"
                              />
                            </div>
                          </div>
                          {/* <div className={styles.formRow}>
                            <div className={styles.inputBox}>
                              <p>Transmission</p>
                              <Field
                                name="VehicleTransmission"
                                className={styles.input}
                                as="select"
                                placeholder="Vehicle transmission"
                              >
                                <option value=" ">Choose an option</option>
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                              </Field>
                            </div>
                          </div> */}
                          <div className={styles.formRow}>
                            <div className={styles.inputBox}>
                              <p>Color</p>
                              <Field
                                name="VehicleColor"
                                className={cs(
                                  colorHasErrors,
                                  styles.errorInput,
                                  styles.input
                                )}
                                placeholder="Color"
                              />
                              {colorHasErrors && (
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
                            </div>
                            <div className={styles.inputBox}>
                              <p>Deposit</p>
                              <Field
                                name="DepositFloat"
                                ssn
                                className={styles.input}
                                placeholder="Deposit"
                              />
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
};
