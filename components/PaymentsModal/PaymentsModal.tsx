import React, { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { OnEventFn } from '@rnw-community/shared';
import { Button } from 'react-bootstrap';
import styles from './PaymentsModal.module.css';
// import { DatePickerField } from '../DatePicker/DatePickerField';
import { SchedulePaymentPayloadInterface } from '../../contracts';

interface Props {
  onClose: OnEventFn;
  onSubmit: OnEventFn<SchedulePaymentPayloadInterface>;
}

export const PaymentsModal: FC<Props> = ({ onClose, onSubmit }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Payment options</span>
        <p className={styles.cross} onClick={onClose}>
          X
        </p>
      </div>
      <Formik<SchedulePaymentPayloadInterface>
        onSubmit={(values) => {
          onSubmit(values);
          onClose(void null);
        }}
        initialValues={{
          ApplicationID: 4,
          Amount: 0,
          Frequency: 'Weekly',
          NumberOfPayments: 12,
          FirstPaymentDate: new Date(),
        }}
      >
        {({ values, submitForm, errors, touched }) => {
          return (
            <div className={styles.body}>
              <Form>
                <span className={styles.fieldLabel}>Amount</span>
                <Field type="number" name="Amount" className={styles.select} />
                <span className={styles.fieldLabel}>Payment frequency</span>
                <Field as="select" name="Frequency" className={styles.select}>
                  <option>Semi-monthly</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </Field>
                <span className={styles.fieldLabel}>Frequency</span>
                <Field name="NumberOfPayments" className={styles.select} />
                <span className={styles.fieldLabel}>Number Of Payments</span>
                {/* <DatePickerField
                  name="FirstPaymentDate"
                  className={styles.select}
                /> */}
                <div className={styles.footer}>
                  <Button
                    variant="primary"
                    size="lg"
                    className={styles.button}
                    onClick={submitForm}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
