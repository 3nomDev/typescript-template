import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Field, Form, Formik } from 'formik';
import { cs } from '@rnw-community/shared';
import * as Yup from 'yup';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CreateAppForm.module.css';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { emptyApplication, StateInterface } from '../../contracts';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userSelector } from '../../features/authSlice';
import {
  documentTypesSelector,
  getDocuments,
  loadDocumentTypes,
  uploadDocument,
  addApplication,
  documentSelector,
  getIpAddress,
  ipAddressSelector,
  loadApplications,
} from '../../features/dealerDashboardSlice';
import Select from 'react-select';
import Document from '../DocumentCard/Document';
import moment from 'moment';


interface Props {
  states: StateInterface[];
}

const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  EmailAddress: Yup.string().email().required('Email is required'),
  CellPhone: Yup.string().trim().required('Phone is required'),
  WorkPhone: Yup.string().trim().required('Phone is required'),
  SSN: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  DOB: Yup.string().required('Date of birth is required').test("DOB", "Please choose a valid date of birth", value => {
    return moment().diff(moment(value),'years') >= 18;
  }),
  VIN: Yup.string().min(17).max(17).required('VIN is required'),

  Position: Yup.string().required('Position is required'),
  PositionType:Yup.string().required("Postion Type is required"),
  TAXID: Yup.string(),
  DLNumber: Yup.string().required('Driver license is required'),
  DLState: Yup.string(),
  Address: Yup.string().required('Address is required'),
  City: Yup.string().required('City is required'),
  PostalCode: Yup.string().required('Postal code is required'),
  PurchasePrice: Yup.number()
    .required('Purchase price is required')
    .min(1, 'Price cannot be less than 1'),
  State: Yup.string(),
  AmountFinanced: Yup.number(),
  DepositFloat: Yup.number(),
  EmployerName: Yup.string().required('Employer name is required'),
  VehicleMake: Yup.string().required('Vehicle make is required'),
  VehicleModel: Yup.string().required('Vehicle model is required'),
  VehicleColor: Yup.string().required('Color is required'),
  VehicleEngine: Yup.string().required("Engine Type is required"),
  HousingStatus: Yup.string().required(),
  HowLong: Yup.string().required('Need to specify time'),
  MiddleName: Yup.string(),
  MonthlyHousingPayment: Yup.number()
    .required('Monthly payment is required')
    .min(1, 'Monthly payment must be higher than 0'),
  MonthlyIncome: Yup.number()
    .required('Income is required')
    .min(1, 'Income must be greater than 0'),
  VehicleMileage: Yup.number()
    .required('Milage is required')
    .min(1, 'Milage cannot be less that 1'),
  YearsAtCurrentJob: Yup.number()
    .required('This field is required')
    .min(1, 'Years must be greater than 0'),
});

export const CreateAppForm: FC<Props> = ({ states }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let approvalCode = router.query.id;


  const user = useSelector(userSelector);
  const userId = user?.ID;
  const [documentToSend, setDocumentToSend] = useState<any>({ userID: userId });

  const documentTypes = useSelector(documentTypesSelector);
  const documents = useSelector(documentSelector);
  const ipAddress = useSelector(ipAddressSelector)
  const newStates = [{Short:'', State:'Choose an option'},...states ]
  console.log(ipAddress);
  let id;
  if (typeof window !== 'undefined') {
    id = JSON.parse(localStorage.getItem('userInfo')).ID;
  }
 
  useEffect(()=>{
dispatch(getIpAddress())
  },[])

  useEffect(() => {
    const data = { userid: userId, ApplicationID: id };
    if (id && userId) dispatch(getDocuments(data));
    dispatch(loadDocumentTypes());
    
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



  const moveScreen = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(
      addApplication({
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
        RemoteIP: ipAddress.toString(),
        SSN:values.SSN
      })
    );
    dispatch(loadApplications(userId))
    moveScreen();
    router.push("/dealership")
  };

  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.title}>
        <div className={styles.titleContent}>
         
        <h3> <FontAwesomeIcon
          icon={faUserPlus as IconProp}
          color="#154F85"
          className={styles.icon}
        />Create Account</h3>
        </div>
        
      </div>
      <Formik
        initialValues={{ ...emptyApplication, approvalCode: '', color: '', PositionType:'', }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, errors, touched, values }) => {
          console.log(errors);

          const firstNameHasError = errors.FirstName && touched.FirstName;
          const lastNameHasError = errors.LastName && touched.LastName;
          const cellPhoneHasErrors = errors.CellPhone && touched.CellPhone;
          const workPhoneHasErrors = errors.WorkPhone && touched.WorkPhone;
          const DobHasErrors = errors.DOB && touched.DOB;
          const licenceHasErrors = errors.DLNumber && touched.DLNumber;
          const emailHasErrors = errors.EmailAddress && touched.EmailAddress;
          const MonthlyPaymentHasErrors =
            errors.MonthlyHousingPayment && touched.MonthlyHousingPayment;
          const ssnHasErrors = errors.SSN && touched.SSN;
          const dlHasErrors = errors.DLNumber && touched.DLNumber;
          const addressHasErrors = errors.Address && touched.Address;
          const cityHasErrors = errors.City && touched.City;
          const stateHasErrors = errors.State && touched.State;
          const postalCodeHasErrors = errors.PostalCode && touched.PostalCode;
          const companyNameHasErrors =
            errors.EmployerName && touched.EmployerName;
          const howLongHasErrors = errors.HowLong && touched.HowLong;
          const positionHasErrors = errors.Position && touched.Position;
          const yearsAtCompanyHasErrors =
            errors.YearsAtCurrentJob && touched.YearsAtCurrentJob;
          const monthlyIncomeHasErrors =
            errors.MonthlyIncome && touched.MonthlyIncome;
          const vinHasErrors = errors.VIN && touched.VIN;
          const vehicleYearHasErrors =
            errors.VehicleYear && touched.VehicleYear;
          const colorHasError = errors.VehicleColor && touched.VehicleColor;
          const vehicleMakeHasErrors =
            errors.VehicleMake && touched.VehicleMake;
          const vehicleModelHasErrors =
            errors.VehicleModel && touched.VehicleModel;
          const vehicleMilageHasErrors =
            errors.VehicleMileage && touched.VehicleMileage;
          const vehicleEngineHasErrors =
            errors.VehicleEngine && touched.VehicleEngine;
          const depositFloatHasError =
            errors.DepositFloat && touched.DepositFloat;
          const PurchasePriceHasErrors =
            errors.PurchasePrice && touched.PurchasePrice;
          const AmountFinancedHasErrors =
            errors.AmountFinanced && touched.AmountFinanced;
          const PostionTypeHasErrors =
           touched.PositionType && values.PositionType === ""
          const housingStatusHasErrors =
           touched.HousingStatus && values.HousingStatus === ""
          const vehicleTransmissionHasErrors =
           touched.VehicleTransmission && values.VehicleTransmission === ""

          return (
            <div className={styles.formWrapper}>
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
                            firstNameHasError,
                            styles.errorInput,
                            styles.input
                          )}
                          name="FirstName"
                          placeholder="First Name"
                        />
                        {firstNameHasError && (
                          <div className={styles.error}>{errors.FirstName}</div>
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
                          Last name <span className={styles.required}>*</span>
                        </p>
                        <Field
                          className={cs(
                            lastNameHasError,
                            styles.errorInput,
                            styles.input
                          )}
                          name="LastName"
                          placeholder="Last Name"
                        />
                        {lastNameHasError && (
                          <div className={styles.error}>{errors.LastName}</div>
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
                        {cellPhoneHasErrors && (
                          <div className={styles.error}>{errors.CellPhone}</div>
                        )}
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
                        {licenceHasErrors && (
                          <div className={styles.error}>{errors.DLNumber}</div>
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
                        <DatePickerField className={styles.input} name="DOB" />
                        {DobHasErrors && (
                          <div className={styles.error}>{errors.DOB}</div>
                        )}
                      </div>
                     
                    </div>
                  
                  </div>
                </div>

                {/* {documents.length && (
              <div className={styles.personalDetails}>
                <div className={styles.headerRight}>
                  <h1 className={styles.rowTitle}>Documents</h1>
                  <p>02</p>
                </div>
                <div className={styles.headerLeft}>
                  {documents.length &&
                    documents.map((item) => <Document item={item} id={id}/>)}
                </div>
              </div>
            )}  */}

                {/* <div className={styles.personalDetails}>
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
            
              </div>
            </div> */}
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
                        {addressHasErrors && (
                          <div className={styles.error}>{errors.Address}</div>
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
                        {cityHasErrors && (
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
                          {newStates.map((item) => (
                            
                            <option value={item.Short}>{item.State}</option>
                          ))}
                        </Field>
                        {stateHasErrors && (
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
                        {postalCodeHasErrors && (
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
{housingStatusHasErrors &&   <div className={styles.error}>
                           Housing status is required
                          </div>}
                      </div>
                      <div className={styles.inputBox}>
                        <p>Time at this address</p>
                        <Field
                          type="number"
                          name="HowLong"
                          placeholder="Time at this address"
                          className={styles.input}
                        />
                        {howLongHasErrors && (
                          <div className={styles.error}>{errors.HowLong}</div>
                        )}
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
                    <h1 className={styles.rowTitle}>Employment details</h1>{' '}
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
                        {companyNameHasErrors && (
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
                        {workPhoneHasErrors && (
                          <div className={styles.error}>{errors.WorkPhone}</div>
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
                        {positionHasErrors && (
                          <div className={styles.error}>{errors.Position}</div>
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
                        {PostionTypeHasErrors && (
                          <div className={styles.error}>
                            Postion Type is required
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
                        {yearsAtCompanyHasErrors && (
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
                          min="0"
                        />
                        {monthlyIncomeHasErrors && (
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
                          type="string"
                          name="VehicleMake"
                          className={styles.input}
                        />
                        {vehicleMakeHasErrors && (
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
                          type="string"
                          placeholder="Vehicle Model"
                          className={styles.input}
                          name="VehicleModel"
                        />
                        {vehicleModelHasErrors && (
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
                        {vehicleMilageHasErrors && (
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
                          {vehicleEngineHasErrors && (
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
                         
                          <option value="">Choose an option</option>
                          <option value="automatic">Automatic</option>
                          <option value="manual">Manual</option>
                        </Field>
                        {vehicleTransmissionHasErrors && (<div className={styles.error}> 
                          Transmission is required
                        </div>)}
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.inputBox}>
                        <p>Color</p>
                        <Field
                          name="VehicleColor"
                          className={cs(
                            colorHasError,
                            styles.errorInput,
                            styles.input
                          )}
                          placeholder="Color"
                        />
                        {colorHasError && (
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
                        {AmountFinancedHasErrors && (
                          <div className={styles.error}>
                            {errors.AmountFinanced}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.saveBtn}>
                  SAVE
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
