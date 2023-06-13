import React, { FC } from 'react';
import { Field, Formik } from 'formik';
import cx from 'classnames';
import * as Yup from 'yup';
import { cs, OnEventFn, StyleType } from '@rnw-community/shared';
import { Oval } from 'react-loader-spinner';
import { DealerHeader } from '../DealerHeader/DealerHeader';
import styles from './AddDealerForm.module.css';
import { InputBar } from '../InputBar/InputBar';
import { hasErrors } from '../../utils/hasErrors';
import { DealerInterface, StateInterface } from '../../contracts';
import { DealerFormTitleBar } from '../DealerFormTitleBar/DealerFormTitleBar';
import { MaskedInput } from '../MaskedInput/MaskedInput';

const validationSchema = Yup.object({
  Name: Yup.string().trim().required('Name is required'),
  Address: Yup.string().trim().required('Address is required'),
  City: Yup.string().trim().required('City is required'),
  EmailAddress: Yup.string().trim().required('Email Address is required'),
  State: Yup.string().trim().required('State is required'),
  License: Yup.string().trim().required('License is required'),
  Website: Yup.string().trim().required('Website is required'),
  WorkPhone: Yup.string().trim().required('Phone number is required'),
  EXT: Yup.string().trim(),
  ContactFirstName: Yup.string().required('Contact first name is required'),
  ContactLastName: Yup.string().required('Contact last name is required'),
  ContactPosition: Yup.string().required('Required contact position'),
});

interface Props {
  onSubmit: OnEventFn;
  states: StateInterface[];
  onBack: OnEventFn;
  pending: boolean;
  initialValues: Partial<DealerInterface>;
}

export const AddDealerForm: FC<Props> = ({
  onSubmit,
  states,
  onBack,
  pending,
  initialValues,
}) => {
  return (
    <div className={styles.wrapper}>
      <DealerHeader title="Admin" />
      <div className={styles.contents}>
        <DealerFormTitleBar onBack={onBack} />
        <Formik
          validateOnChange={false}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {({ submitForm, touched, errors, values }) => {
            const nameHasErrors = hasErrors(touched.Name, errors.Name);
            const addressHasErrors = hasErrors(touched.Address, errors.Address);
            const CityHasErrors = hasErrors(touched.City, errors.City);
            const LicenseHasErrors = hasErrors(touched.License, errors.License);
            const WebsiteHasErrors = hasErrors(touched.Website, errors.Website);
            const phoneHasErrors = hasErrors(
              touched.WorkPhone,
              errors.WorkPhone
            );
            const extHasErrors = hasErrors(touched.EXT, errors.EXT);
            const EmailAddressHasErrors = hasErrors(
              touched.EmailAddress,
              errors.EmailAddress
            );
            const contactFirstNameHasErrors = hasErrors(
              touched.ContactFirstName,
              errors.ContactFirstName
            );
            const contactLastNameHasErrors = hasErrors(
              touched.ContactLastName,
              errors.ContactLastName
            );
            const contactPositionHasErrors = hasErrors(
              touched.ContactPosition,
              errors.ContactPosition
            );

            const inputErrorStyle = (hasError: boolean): StyleType =>
              cs(
                hasError,
                cx(styles.errorInput, styles.input) as StyleType,
                styles.input as StyleType
              );

            return (
              <div className={styles.dealerForm}>
                {!pending ? (
                  <>
                    <InputBar
                      name="Name"
                      title="Name"
                      hasError={nameHasErrors}
                      error={errors?.Name}
                    />
                    <div className={styles.inputBar}>
                      <div>
                        <p>Address</p>
                        <Field
                          name="Address"
                          className={inputErrorStyle(addressHasErrors)}
                          placeholder="Address"
                        />
                        {addressHasErrors && (
                          <div className={styles.errorText}>
                            {errors.Address}
                          </div>
                        )}
                      </div>
                      <div>
                        <p>City</p>
                        <Field
                          className={inputErrorStyle(CityHasErrors)}
                          placeholder="City"
                          name="City"
                        />
                        {CityHasErrors && (
                          <div className={styles.errorText}>{errors.City}</div>
                        )}
                      </div>
                      <div>
                        <p>State</p>
                        <Field
                          as="select"
                          className={styles.input}
                          name="State"
                          defaultValue={states[0]?.State}
                        >
                          {states?.map((item) => (
                            <option
                              key={item.State}
                              label={item.State}
                              value={item.Short}
                            />
                          ))}
                        </Field>
                      </div>
                    </div>
                    <InputBar
                      name="License"
                      title="License"
                      hasError={LicenseHasErrors}
                      error={errors.License}
                    />
                    <div className={styles.inputBar}>
                      <div className={styles.phoneInputWrapper}>
                        <p>Work Phone</p>
                        <MaskedInput
                          name="WorkPhone"
                        
                          className={inputErrorStyle(phoneHasErrors)}
                          placeholder="Phone"
                        />
                        {phoneHasErrors && (
                          <div className={styles.errorText}>
                            {errors.WorkPhone}
                          </div>
                        )}
                      </div>
                      <div className={styles.phoneInputWrapper}>
                        <p>Extension</p>
                        <Field
                          name="EXT"
                          type="text"
                          placeholder="EXT"
                          className={inputErrorStyle(extHasErrors)}
                        />
                        {extHasErrors && (
                          <div className={styles.errorText}>{errors.EXT}</div>
                        )}
                      </div>
                    </div>
                    <InputBar
                      name="Website"
                      title="Website"
                      hasError={WebsiteHasErrors}
                      error={errors.Website}
                    />
                    <InputBar
                      name="EmailAddress"
                      title="Email Address"
                      hasError={EmailAddressHasErrors}
                      error={errors.EmailAddress}
                    />
                    <div className={styles.inputBar}>
                      <div className={styles.phoneInputWrapper}>
                        <p>Contact First Name</p>
                        <Field
                          type="text"
                          name="ContactFirstName"
                          placeholder="Contact first name"
                          className={inputErrorStyle(contactFirstNameHasErrors)}
                        />
                        {contactFirstNameHasErrors && (
                          <div className={styles.errorText}>
                            {errors.ContactFirstName}
                          </div>
                        )}
                      </div>

                      <div className={styles.phoneInputWrapper}>
                        <p>Contact Last Name</p>
                        <Field
                          type="text"
                          name="ContactLastName"
                          placeholder="Contact last name"
                          className={inputErrorStyle(contactLastNameHasErrors)}
                        />
                        {contactLastNameHasErrors && (
                          <div className={styles.errorText}>
                            {errors.ContactLastName}
                          </div>
                        )}
                      </div>
                    </div>
                    <InputBar
                      title="Contact position"
                      name="ContactPosition"
                      hasError={contactPositionHasErrors}
                      error={errors.ContactPosition}
                    />
                    <div className={styles.inputBar}>
                      <button
                        onClick={submitForm}
                        type="submit"
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <Oval
                    secondaryColor="black"
                    wrapperClass={styles.loader}
                    width={80}
                    height={80}
                    color="black"
                  />
                )}
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
