import React, { FC, useState, Component, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '../../features/adminDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { useSelector } from 'react-redux';
import { NavItem } from 'react-bootstrap';
import Document from '../DocumentCard/Document';
import {faFileAlt} from '@fortawesome/pro-regular-svg-icons'


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
  HowLong: Yup.string(),
  MiddleName: Yup.string(),
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

// const FileInput: FC<CustomFileProps> = ({ name }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field] = useField(name);

//   return (
//     <input
//       type="file"
//       className={styles.fileInput}
//       onChange={(val) => {
//         setFieldValue(field.name, val);
//       }}
//     />
//   );

// };

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
  // const { setFieldValue } = useFormikContext();

  const user = useSelector(userSelector);
  const documents = useSelector(documentsSelector);

  console.log(documents);
  const userId = user?.ID;
  const isApproved = application?.Status === 'Approved';

  const [isApproveModalShown, setIsApproveModalShown] = useState(false);
  const [isPaymentsModalShown, setIsPaymentsModalShown] = useState(false);
  const [documentName, setdocumentName] = useState();
  const [documentToSend, setDocumentToSend] = useState<any>({ userID: userId });

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
    if (id && userId) dispatch(getDocuments(data));
  }, [id]);

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

  console.log(Object.keys(documentToSend).length);

  return (
    <div className={styles.wrapper}>
      {isApproveModalShown && (
        <ApplicationApproveModal
          closeModal={toggleApproveModal}
          onSave={onApprove}
        />
      )}
      {isPaymentsModalShown && (
        <PaymentsModal
          onClose={togglePaymentsModal}
          onSubmit={onSchedulePayments}
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
            }}
          >
            {({ submitForm, touched, errors, values }) => {
              console.log(errors);
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
                    <p>
                      <FontAwesomeIcon
                        icon={faCar as IconProp}
                        className={styles.faCar}
                      />
                      {application?.Dealership}
                    </p>
                  </div>
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
                        className={cx(styles.generatePdf, styles.button)}
                        onClick={onGeneratePdf}
                      >
                        <FontAwesomeIcon icon={faFilePdf as IconProp} />{' '}
                        Generate pdf
                      </div>
                      <div
                        className={cx(styles.save, styles.button)}
                        onClick={submitForm}
                      >
                        <FontAwesomeIcon icon={faCheckCircle as IconProp} />
                        Save
                      </div>
                      <div
                        className={cx(styles.decline, styles.button)}
                        onClick={onChangeAppStatus(4)}
                      >
                        <FontAwesomeIcon icon={faTimes as IconProp} /> Decline
                      </div>
                      <div
                        className={cx(styles.incomplete, styles.button)}
                        onClick={onChangeAppStatus(1)}
                      >
                        <FontAwesomeIcon icon={faFile as IconProp} /> Incomplete
                      </div>
                      {!isApproved && (
                        <div
                          className={cx(styles.approved, styles.button)}
                          onClick={toggleApproveModal}
                        >
                          <FontAwesomeIcon icon={faCheck as IconProp} /> Approve
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
                              documents.map((item) => <Document item={item} />)}
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
                              <p>Time at this address</p>
                              <Field
                                type="number"
                                name="HowLong"
                                placeholder="Time at this address"
                                className={styles.input}
                              />
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
                                type="number"
                                name="VIN"
                                className={styles.input}
                              />
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
                                type="number"
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
                                name="Model"
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
                            </div>
                          </div>
                          <div className={styles.formRow}>
                            <div className={styles.inputBox}>
                              <p>Color</p>
                              <Field
                                name="VehicleColor"
                                className={styles.input}
                                placeholder="Color"
                              />
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
