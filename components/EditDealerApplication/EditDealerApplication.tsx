import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { cs, StyleType } from '@rnw-community/shared';
import { useDispatch, useSelector } from 'react-redux';
import { hasErrors } from '../../utils/hasErrors';
import styles from './EditDealerApplication.module.css';
import { ApplicationInterface } from '../../contracts';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import { updateApplication } from '../../features/dealerDashboardSlice';
import { userSelector } from '../../features/authSlice';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { MaskedInput } from '../MaskedInput/MaskedInput';

const validationSchema = Yup.object({
  FirstName: Yup.string().trim().required('First name is required'),
  LastName: Yup.string().trim().required('Last name is required'),
  MiddleName: Yup.string().trim(),
  SSN: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  DOB: Yup.date().max(new Date(2004, 1, 1)).required(),
  MonthlyIncome: Yup.number().required('Monthly income is required'),
  DLNumber: Yup.string().required('Driver license number is required'),
  EmailAddress: Yup.string().trim().required('EmailAddress is required'),
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
  VehicleColor: Yup.string().trim(),
  PurchasePrice: Yup.number().required('Purchase price is required'),
  DepositFloat: Yup.number().required('Deposit is required'),
  AmountFinanced: Yup.number().required('Amount financed is required'),
});

interface Props {
  initialValues: ApplicationInterface;
}

export const EditDealerApplication: FC<Props> = ({ initialValues }) => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const handleSubmit = (values: Partial<ApplicationInterface>): void => {
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
  return (
    <div className={styles.wrapper}>
      <DealerHeader />
      <div className={styles.headerContainer}>
        <h1 className={styles.blue}>Update Account (Profile #)</h1>
        <div className={styles.buttonContainer2}>
          <button type="submit">SAVE</button>
        </div>
      </div>

      {/* <div className={styles.steps01}>
        <h4 className={styles.margeR}>01 Approval Code</h4>

        <h4>10001</h4>
      </div> */}
      <Formik<ApplicationInterface>
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={{
          ...initialValues,
          DOB: new Date(initialValues?.DOB ?? '2004-04-04T00:00:00'),
        }}
      >
        {({ errors, values, touched, submitForm }) => {
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

          console.log(errors);

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
          const phoneHasErrors = hasErrors(touched.CellPhone, errors.CellPhone);
          const inputErrorStyle = (hasError: boolean): StyleType =>
            cs(
              hasError,
              cx(styles.errorInput, styles.input) as StyleType,
              styles.input as StyleType
            );

          return (
            <Form className={styles.form}>
              <div className={styles.steps01}>
                <h4 className={styles.margeR}>01 Approval Code</h4>

                <h4>10001</h4>
              </div>
              <div className={styles.steps}>
                <p>02</p>
                <h2>Personal Details</h2>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="FirstName">
                    First name <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="First name"
                    name="FirstName"
                    type="text"
                    className={inputErrorStyle(firstNameHasErrors)}
                  />
                  {firstNameHasErrors && (
                    <div className={styles.error}>{errors.FirstName}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="MiddleName">
                    Middle name
                  </label>
                  <Field
                    placeholder="Middle name"
                    name="MiddleName"
                    type="text"
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="LastName">
                    Last name <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    name="LastName"
                    type="text"
                    placeholder="Last name"
                    className={inputErrorStyle(LastNameHasErrors)}
                  />
                  {LastNameHasErrors && (
                    <div className={styles.error}>{errors.LastName}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="EmailAddress">
                    Email Address <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="EmailAddress"
                    name="EmailAddress"
                    type="text"
                    className={inputErrorStyle(EmailAddressHasErrors)}
                  />
                  {EmailAddressHasErrors && (
                    <div className={styles.error}>{errors.EmailAddress}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="CellPhone">
                    Phone number <span className={styles.asterisk}>*</span>
                  </label>
                  <MaskedInput
                    name="CellPhone"
                    placeholder="Phone number"
                    className={inputErrorStyle(phoneHasErrors)}
                  />
                  {phoneHasErrors && (
                    <div className={styles.error}>{errors.CellPhone}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="SSN">
                    SSN# <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="SSN"
                    name="SSN"
                    type="number"
                    className={inputErrorStyle(ssnHasErrors)}
                  />
                  {ssnHasErrors && (
                    <div className={styles.error}>{errors.SSN}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Driver License">
                    Driver License <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Driver License"
                    name="DLNumber"
                    type="number"
                    className={inputErrorStyle(driverLicenseHasErrors)}
                  />
                  {driverLicenseHasErrors && (
                    <div className={styles.error}>{errors.DLNumber}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="DOB">
                    DOB <span className={styles.asterisk}>*</span>
                  </label>
                  <DatePickerField
                    name="DOB"
                    className={inputErrorStyle(DOBHasErrors)}
                  />
                  {DOBHasErrors && (
                    <div className={styles.error}>{errors.DOB}</div>
                  )}
                </div>
              </div>
              <div className={styles.docs}>
                <div className={styles.steps}>
                  <h2>Upload Documents</h2>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputContainer}>
                    <label className={styles.formLabel} htmlFor="MonthlyIncome">
                      Monthly income <span className={styles.asterisk}>*</span>
                    </label>
                    <Field
                      placeholder="Monthly income"
                      name="MonthlyIncome"
                      type="number"
                      className={inputErrorStyle(MonthlyIncomeHasErrors)}
                    />
                    {MonthlyIncomeHasErrors && (
                      <div className={styles.error}>{errors.MonthlyIncome}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.docs}>
                <div className={styles.steps}>
                  <p>04</p>
                  <h2>Residence Details</h2>
                </div>

                <div className={styles.row}>
                  <div className={styles.column}>
                    <div className={styles.inputContainer}>
                      <label
                        className={styles.formLabel}
                        htmlFor="MonthlyIncome"
                      >
                        Primary Address{' '}
                        <span className={styles.asterisk}>*</span>
                      </label>
                      <Field
                        placeholder="Address"
                        name="Address"
                        type="text"
                        className={inputErrorStyle(MonthlyIncomeHasErrors)}
                      />
                    </div>
                    <div className={styles.inputContainer2}>
                      <Field
                        name="MonthlyIncome"
                        type="text"
                        className={inputErrorStyle(MonthlyIncomeHasErrors)}
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
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="City">
                    City <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="City"
                    name="City"
                    type="text"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="State">
                    State <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="State"
                    name="State"
                    type="text"
                    className={inputErrorStyle(StateHasErrors)}
                  />
                  {StateHasErrors && (
                    <div className={styles.error}>{errors.State}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="PostalCode">
                    Zip Code <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Zip Code"
                    name="PostalCode"
                    type="text"
                    className={inputErrorStyle(PostalCodeHasErrors)}
                  />
                  {PostalCodeHasErrors && (
                    <div className={styles.error}>{errors.PostalCode}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Housing Status">
                    Housing Status <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Housing Status"
                    name="HousingStatus"
                    type="text"
                    className={inputErrorStyle(HousingStatusHasErrors)}
                  />
                  {HousingStatusHasErrors && (
                    <div className={styles.error}>{errors.HousingStatus}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="TimeAtAddress">
                    Time at this address
                    <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Time at this address"
                    name="HowLong"
                    type="number"
                    className={inputErrorStyle(TimeAtAddressHasErrors)}
                  />
                  {TimeAtAddressHasErrors && (
                    <div className={styles.error}>{errors.HowLong}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="MonthlyPayment">
                    Monthly Housing Payment
                    <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Monthly Housing Payment"
                    name="MonthlyHousingPayment"
                    type="number"
                    className={inputErrorStyle(MonthlyPaymentHasErrors)}
                  />
                  {MonthlyPaymentHasErrors && (
                    <div className={styles.error}>
                      {errors.MonthlyHousingPayment}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.docs}>
                <div className={styles.steps}>
                  <p>05</p>
                  <h2>Employment Details</h2>
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="EmployerName">
                    Company Name <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Company Name"
                    name="EmployerName"
                    type="text"
                    className={inputErrorStyle(CompanyNameHasErrors)}
                  />
                  {CompanyNameHasErrors && (
                    <div className={styles.error}>{errors.EmployerName}</div>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="WorkPhone">
                    Work Phone <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Work Phone"
                    name="WorkPhone"
                    type="text"
                    className={inputErrorStyle(WorkPhoneHasErrors)}
                  />
                  {WorkPhoneHasErrors && (
                    <div className={styles.error}>{errors.WorkPhone}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Position">
                    Position <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Position"
                    name="Position"
                    type="text"
                    className={inputErrorStyle(PositionHasErrors)}
                  />
                  {PositionHasErrors && (
                    <div className={styles.error}>{errors.Position}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="PositionType">
                    Employment Status <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Position Type"
                    name="PositionType"
                    type="select"
                    className={inputErrorStyle(PositionTypeHasErrors)}
                  />
                  {PositionTypeHasErrors && (
                    <div className={styles.error}>{errors.PositionType}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label
                    className={styles.formLabel}
                    htmlFor="YearsAtCurrentJob"
                  >
                    Years at company <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Years at company"
                    name="YearsAtCurrentJob"
                    type="number"
                    className={inputErrorStyle(YearsAtCurrentJobHasErrors)}
                  />
                  {YearsAtCurrentJobHasErrors && (
                    <div className={styles.error}>
                      {errors.YearsAtCurrentJob}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="MonthlyIncome">
                    Monthly income <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Monthly income"
                    name="MonthlyIncome"
                    type="number"
                    className={inputErrorStyle(MonthlyIncomeHasErrors)}
                  />
                  {MonthlyIncomeHasErrors && (
                    <div className={styles.error}>{errors.MonthlyIncome}</div>
                  )}
                </div>
              </div>
              <div className={styles.docs}>
                <div className={styles.steps}>
                  <p>05</p>
                  <h2>Vehicle Details</h2>
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="VIN">
                    17 Digits VIN <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="VIN"
                    name="VIN"
                    type="number"
                    className={inputErrorStyle(VINHasErrors)}
                  />
                  {VINHasErrors && (
                    <div className={styles.error}>{errors.VIN}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Year">
                    Year <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Year"
                    name="VehicleYear"
                    type="number"
                    className={inputErrorStyle(YearHasErrors)}
                  />
                  {YearHasErrors && (
                    <div className={styles.error}>{errors.VehicleYear}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Make">
                    Make <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Make"
                    name="VehicleMake"
                    type="text"
                    className={inputErrorStyle(MakeHasErrors)}
                  />
                  {MakeHasErrors && (
                    <div className={styles.error}>{errors.VehicleMake}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Model">
                    Model <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Model"
                    name="VehicleModel"
                    type="text"
                    className={inputErrorStyle(ModelHasErrors)}
                  />
                  {ModelHasErrors && (
                    <div className={styles.error}>{errors.VehicleModel}</div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="VehicleMileage">
                    Mileage <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Mileage"
                    name="VehicleMileage"
                    type="text"
                    className={inputErrorStyle(MileageHasErrors)}
                  />
                  {MileageHasErrors && (
                    <div className={styles.error}>{errors.VehicleMileage}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="VehicleEngine">
                    Engine <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Engine"
                    name="VehicleEngine"
                    type="type"
                    className={inputErrorStyle(EngineHasErrors)}
                  />
                  {EngineHasErrors && (
                    <div className={styles.error}>{errors.VehicleEngine}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label
                    className={styles.formLabel}
                    htmlFor="VehicleTransmission"
                  >
                    Transmission <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Transmission"
                    name="VehicleTransmission"
                    type="text"
                    className={inputErrorStyle(TransmissionHasErrors)}
                  />
                  {TransmissionHasErrors && (
                    <div className={styles.error}>
                      {errors.VehicleTransmission}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="VehicleColor">
                    Color
                  </label>
                  <Field
                    placeholder="Color"
                    name="VehicleColor"
                    type="text"
                    className={inputErrorStyle(ColorHasErrors)}
                  />
                  {ColorHasErrors && (
                    <div className={styles.error}>{errors.VehicleColor}</div>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="PurchasePrice">
                    Purchase Price <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Purchase Price"
                    name="PurchasePrice"
                    type="text"
                    className={inputErrorStyle(PurchasePriceHasErrors)}
                  />
                  {PurchasePriceHasErrors && (
                    <div className={styles.error}>{errors.PurchasePrice}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Deposit">
                    Deposit <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Deposit"
                    name="DepositFloat"
                    type="number"
                    className={inputErrorStyle(DepositHasErrors)}
                  />
                  {DepositHasErrors && (
                    <div className={styles.error}>{errors.DepositFloat}</div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Amount Financed">
                    Amount Financed <span className={styles.asterisk}>*</span>
                  </label>
                  <Field
                    placeholder="Amount Financed"
                    name="AmountFinanced"
                    type="number"
                    className={inputErrorStyle(AmountFinancedHasErrors)}
                  />
                  {AmountFinancedHasErrors && (
                    <div className={styles.error}>{errors.AmountFinanced}</div>
                  )}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={() => console.log('here')} type="submit">
                  SAVE
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
