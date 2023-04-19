import React, { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { OnEventFn } from '@rnw-community/shared';
import { Button } from 'react-bootstrap';
import styles from './PaymentsModal.module.css';
import { DatePickerField } from '../DatePicker/DatePickerField';
import { SchedulePaymentPayloadInterface } from '../../contracts';

interface Props {
  onClose: OnEventFn;
  onSubmit: OnEventFn<SchedulePaymentPayloadInterface>;
  application:any
}

export const PaymentsModal: FC<Props> = ({ onClose, onSubmit, application }) => {


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
          AmountFinanced: application.AmountFinanced || 0,
          Frequency: 'Weekly',
          NumberOfPayments: 12,
          FirstPaymentDate: new Date(),
          BuyoutOption:0,
          LeaseLengthMonths:0,
          HoldBack:0,
          Deposit:application.DepositFloat || 0,
          Amount:0,
          SellingPrice:application.PurchasePrice || 0

        }}
      >
        {({ values, submitForm, errors, touched }) => {
      
          return (
            <div className={styles.body}>
              <Form style={{padding:"20px"}}>
                <span className={styles.fieldLabel}>Selling Price</span>
                <Field type="number" name="SellingPrice" className={styles.select} />
                <span className={styles.fieldLabel}>Deposit</span>
                <Field type="number" name="Deposit" className={styles.select} />
                <span className={styles.fieldLabel}>Amount Finanaced</span>
                <Field type="number" name="AmountFinanced" className={styles.select} />
                <span className={styles.fieldLabel}>Hold Back</span>
                <Field type="number" name="HoldBack" className={styles.select} />
                <span className={styles.fieldLabel}>Buyout Amount at maturity</span>
                <Field type="number" name="BuyoutOption" className={styles.select} />

                <span className={styles.fieldLabel}>Payment frequency</span>
                <Field as="select" name="Frequency" className={styles.select}>
                  <option>Semi-monthly</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </Field>
                <span className={styles.fieldLabel}>Payment Amount</span>
                <Field type="number" name="Amount" className={styles.select} />
                <span className={styles.fieldLabel}>Number of Payments</span>
                <Field name="NumberOfPayments" className={styles.select} />
                <span className={styles.fieldLabel}>Date of first payment</span>
                <DatePickerField
                  name="FirstPaymentDate"
                  className={styles.select}
                />
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
