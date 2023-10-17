import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoanTermsPopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminDashboardSelector,
  loanTermsSelector,
  setupLoanTerm,
} from '../../features/adminDashboardSlice';

interface LoanTermsFormValues {
  PTI: number;
  AIRA: string;
  APR: number;
  LoanTerm: string;
  FrontEnd: string;
  BackEnd: string;
  DownPayment: string;
  GPS: number;
  SalesTax: number;
  Tags: number;
  VSI: number;
  NetFinanced: string;
  NetCheck: string;
  HamiltonFee: number;
  LoanAmount: number;
  Comments: string;
  LoanOriginationFee: number;
  LoanTermPaymentAmount: string;
  LoanTermType: string; // For the dropdown
  OfferType: string;
}

interface Props {
  application: any;
  user: any;
  setShowLoanTermsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isCounter?: boolean;
}

const validationSchema = Yup.object().shape({
  AIRA: Yup.number()
   
    .min(0, 'AIRA must be a positive number'),
  APR: Yup.number()
    .required('APR is required')
    .min(0, 'APR must be a positive number'),
  LoanTerm: Yup.number()
    .required('Loan Term is required')
    .min(0, 'Loan Term must be a positive number'),
  LoanTermType: Yup.string().required('Loan Term Type is required'),
  LoanAmount: Yup.number()
    .required('Loan Amount is required')
    .min(0, 'Loan Amount must be a positive number'),
  LoanOriginationFee: Yup.number()
    .required('Loan Origination Fee is required')
    .min(0, 'Loan Origination Fee must be a positive number'),
  LoanTermPaymentAmount: Yup.number()
    .required('Loan Term Payment Amount is required')
    .min(0, 'Loan Term Payment Amount must be a positive number'),
  FrontEnd: Yup.number()
    .required('Front End Total is required')
    .min(0, 'Front End Total must be a positive number'),
  BackEnd: Yup.number()
  .min(0, 'Back End Total must be a positive number'),
  DownPayment: Yup.number()
    .required('Down Payment is required')
    .min(0, 'Down Payment must be a positive number'),
  NetFinanced: Yup.number()
    .required('Net Financed is required')
    .min(0, 'Net Financed must be a positive number'),
  NetCheck: Yup.number()
    .required('Net Check is required')
    .min(0, 'Net Check must be a positive number'),
  HamiltonFee: Yup.number()
    .required('Hamilton Fee is required')
    .min(0, 'Hamilton Fee must be a positive number'),
  Comments: Yup.string(),
  OfferType: Yup.string(),
  PTI: Yup.number()
    .required('PTI is required')
    .min(0, 'PTI must be a positive number'),
  GPS: Yup.number()
    .required('GPS is required')
    .min(0, 'GPI must be a positive number'),
  Tags: Yup.number()
    .required('Tag fee is required')
    .min(0, 'Tag fee must be a positive number'),
  VSI: Yup.number()
    .required('VSI is required')
    .min(0, 'VSI must be a positive number'),
  SalesTax: Yup.number()
    .required('Sales Tax is required')
    .min(0, 'Sales Tax must be a positive number'),
});

export const LoanTermsPopup: React.FC<Props> = ({
  application,
  user,
  setShowLoanTermsPopup,
  isCounter,
}) => {
  const dispatch = useDispatch();
  const [calculatedPayment, setCalculatedPayment] = useState(0);
  const [calculatedTaxes, setCalculatedTaxes] = useState(0);
  const [calculatedFrontEnd, setCalculatedFrontEnd] = useState(0);

  function calculateAPR(creditScore) {
    switch (true) {
      case creditScore >= 560 && creditScore <= 649:
        return 18.99;
      case creditScore >= 650 && creditScore <= 699:
        return 14.99;
      case creditScore >= 700 && creditScore <= 749:
        return 11.99;
      case creditScore >= 750 && creditScore <= 850:
        return 9.99;
      default:
        // Handle cases where the credit score is outside the specified ranges
        return null; // or return a default APR rate
    }
  }

  const calculatePTI = (totalBills, totalIncome) => {
    // Ensure MonthlyIncome is greater than zero to avoid division by zero

    const PTI = (totalBills / totalIncome) * 100;

    return PTI.toFixed(2);
  };
  function calculateMonthlyPMT(principal, annualInterestRate, loanTermMonths) {
    // Convert annual interest rate to monthly rate
    var monthlyInterestRate = annualInterestRate / 12 / 100; // Convert to decimal and monthly

    // Calculate the monthly payment
    var monthlyPayment =
      (principal *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    return monthlyPayment;
  }

  function calculateWeeklyPMT(principal, annualInterestRate, loanTermWeeks) {
    // Convert annual interest rate to weekly rate
    var weeklyInterestRate = annualInterestRate / 52 / 100; // Convert to decimal and weekly

    // Calculate the weekly payment
    var weeklyPayment =
      (principal *
        (weeklyInterestRate *
          Math.pow(1 + weeklyInterestRate, loanTermWeeks))) /
      (Math.pow(1 + weeklyInterestRate, loanTermWeeks) - 1);

    return weeklyPayment;
  }

  const calculateTotalLoan = (
    Gps,
    vsi,
    tags,
    loanFee,
    amtFinanced,
    orginFee
  ) => {
    let totalCost = Gps + vsi + tags + loanFee + amtFinanced + orginFee;
    return totalCost;
  };

  const calculateFrontEnd = (
    Gps,
    vsi,
    tags,
    loanFee,
    amtFinanced,
    orginFee,
    taxes
  ) => {

    let totalCost = Gps + vsi + tags + loanFee + amtFinanced + orginFee + taxes;
    return totalCost;
  };

  const calculateSalesTax = (payment, termLength) => {
    
    if (application.State === 'NY') {
      console.log('from New york ')
      let taxes = payment * 0.08875 * termLength;
    
      return taxes;
    }
     else if (application.State === "FL"){
      console.log('from florida')
      let taxes = payment * 0.07 * termLength;
    
      return taxes;
     }
  };

  const calculatedLoanTotal = calculateTotalLoan(
    225,
    110,
    495,
    450,
    900,
    application.AmountFinanced
  );

  const calculatedAPR = calculateAPR(application.CreditScore);
  const calculatedPTI = calculatePTI(
    application.MonthlyHousingPayment,
    application.MonthlyIncome
  );

  const initialValues: LoanTermsFormValues = {
    PTI: calculatedPTI,
    AIRA: '',
    APR: calculatedAPR,
    LoanTerm: '',
    FrontEnd: calculatedFrontEnd,
    BackEnd: '',
    DownPayment: application.DepositFloat || '',
    GPS: 225,
    VSI: 110,
    Tags: 495,
    SalesTax: calculatedTaxes,
    NetFinanced: calculatedLoanTotal,
    NetCheck: application.AmountFinanced || '',
    HamiltonFee: 450,
    LoanAmount: 0,
    Comments: '',
    LoanOriginationFee: 900,
    LoanTermPaymentAmount: calculatedPayment,
    LoanTermType: '', // For the dropdown
    OfferType: '',
  };

  const loanTerms = useSelector(loanTermsSelector);
  const [newApplication, setNewApplication] = useState<boolean>();

  // console.log(application);

  const handleSubmit = (values: LoanTermsFormValues) => {
    // console.log(values)
    let valuesToSend;
    console.log(values);
    if (isCounter) {
      valuesToSend = {
        ...values,
        AddedBy: user.ProfileGUID,
        ApplicationID: application.ApplicationID,
        Deleted: false,
        OfferType: 'Counter',
        FrontEnd: calculatedFrontEnd,
        SalesTax: calculatedTaxes,
        LoanTermPaymentAmount: calculatedPayment,
      };
    } else {
      valuesToSend = {
        ...values,
        AddedBy: user.ProfileGUID,
        ApplicationID: application.ApplicationID,
        Deleted: false,
        OfferType: 'Proposal',
        FrontEnd: calculatedFrontEnd,
        SalesTax: calculatedTaxes,
        LoanTermPaymentAmount: calculatedPayment,
      };
    }

    dispatch(
      setupLoanTerm({ payload: valuesToSend, newApplication: newApplication })
    );
    setShowLoanTermsPopup(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true, // Enable validation on change
    validateOnBlur: true, // Enable validation on blur
  });

  useEffect(() => {
    if (formik.values.LoanTerm && formik.values.LoanTermType) {
      if (formik.values.LoanTermType === 'Weeks') {
        let payment = calculateWeeklyPMT(
          formik.values.NetCheck,
          formik.values.APR,
          formik.values.LoanTerm
        );
        setCalculatedPayment(payment);
        let taxes = calculateSalesTax(payment, formik.values.LoanTerm);
        setCalculatedTaxes(taxes);
        let frontEndTotal = calculateFrontEnd(
          225,
          110,
          495,
          450,
          900,
          application.AmountFinanced,
          taxes
        );
        setCalculatedFrontEnd(frontEndTotal);
      } else {
        let payment = calculateMonthlyPMT(
          formik.values.NetCheck,
          formik.values.APR,
          formik.values.LoanTerm
        );
        setCalculatedPayment(payment);
        let taxes = calculateSalesTax(payment, formik.values.LoanTerm);
        setCalculatedTaxes(taxes);
        let frontEndTotal = calculateFrontEnd(
          225,
          110,
          495,
          450,
          900,
          application.AmountFinanced,
          taxes
        );
        setCalculatedFrontEnd(frontEndTotal);
      }
    }
  }, [formik.values]);

  console.log(application)

  return (
    <div className={styles.popUpBackground}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Loan Details</h1>
          {/* <span onClick={closeModal}>X</span> */}
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.loanForm}>
          {/* AIRA */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="AIRA" style={{ marginRight: '15px' }}>
              AIRA
            </label>
            <div>
              <input
                type="number"
                id="AIRA"
                name="AIRA"
                value={formik.values.AIRA}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.AIRA && formik.errors.AIRA ? (
                <div className={styles.error}>{formik.errors.AIRA}</div>
              ) : null}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="AIRA" style={{ marginRight: '15px' }}>
              Car Price
            </label>
            <div>
              <input
                // type="number"
                id="PurchasePrice"
                name="PurchasePrice"
                value={application.PurchasePrice}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
          
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="APR" style={{ marginRight: '15px' }}>
              APR
            </label>
            <div>
              <input
                // type="number"
                id="APR"
                name="APR"
                value={formik.values.APR}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.APR && formik.errors.APR ? (
                <div className={styles.error}>{formik.errors.APR}</div>
              ) : null}
            </div>
          </div>

          {/* Loan Term */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="LoanTerm" style={{ marginRight: '15px' }}>
              Loan Term
            </label>
            <div>
              <input
                type="number"
                id="LoanTerm"
                name="LoanTerm"
                value={formik.values.LoanTerm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.LoanTerm && formik.errors.LoanTerm ? (
                <div className={styles.error}>{formik.errors.LoanTerm}</div>
              ) : null}
            </div>
          </div>
          {/* Loan Term Type (Dropdown) */}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ marginRight: '15px' }}>Loan Term Type</label>
            <div>
              <div style={{ display: 'flex', width: 'auto' }}>
                <label>
                  <input
                    type="radio"
                    id="Months"
                    name="LoanTermType"
                    value="Months"
                    checked={formik.values.LoanTermType === 'Months'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      border: '1px solid lightgrey',
                      borderRadius: '5px',
                    }}
                  />
                  Months
                </label>
                <label style={{ marginLeft: '10px' }}>
                  <input
                    type="radio"
                    id="Weeks"
                    name="LoanTermType"
                    value="Weeks"
                    checked={formik.values.LoanTermType === 'Weeks'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      border: '1px solid lightgrey',
                      borderRadius: '5px',
                      marginLeft: '15px',
                    }}
                  />
                  Weeks
                </label>
              </div>
              {formik.touched.LoanTermType && formik.errors.LoanTermType ? (
                <div className={styles.error}>{formik.errors.LoanTermType}</div>
              ) : null}
            </div>
          </div>

          {/* Loan Amount */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="LoanAmount" style={{ marginRight: '15px' }}>
              Loan Amount
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="LoanAmount"
                name="LoanAmount"
                value={formik.values.LoanAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.LoanAmount && formik.errors.LoanAmount ? (
                <div className={styles.error}>{formik.errors.LoanAmount}</div>
              ) : null}
            </div>
          </div>
          {/* Loan Origination Fee */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="LoanOriginationFee" style={{ marginRight: '15px' }}>
              Loan Origination Fee
            </label>
            <div>
              <input
                type="number"
                id="LoanOriginationFee"
                name="LoanOriginationFee"
                value={formik.values.LoanOriginationFee}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.LoanOriginationFee &&
              formik.errors.LoanOriginationFee ? (
                <div className={styles.error}>
                  {formik.errors.LoanOriginationFee}
                </div>
              ) : null}
            </div>
          </div>

          {/* Loan Term Payment Amount */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label
              htmlFor="LoanTermPaymentAmount"
              style={{ marginRight: '15px' }}
            >
              Loan Term Payment Amount
            </label>
            <div>
              <input
                type="number"
                id="LoanTermPaymentAmount"
                name="LoanTermPaymentAmount"
                value={calculatedPayment.toFixed(2)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.LoanTermPaymentAmount &&
              formik.errors.LoanTermPaymentAmount ? (
                <div className={styles.error}>
                  {formik.errors.LoanTermPaymentAmount}
                </div>
              ) : null}
            </div>
          </div>

          {/* Front End */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="FrontEnd" style={{ marginRight: '15px' }}>
              Front End Total
            </label>
            <div>
              <input
                type="number"
                id="FrontEnd"
                name="FrontEnd"
                value={calculatedFrontEnd.toFixed(2)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.FrontEnd && formik.errors.FrontEnd ? (
                <div className={styles.error}>{formik.errors.FrontEnd}</div>
              ) : null}
            </div>
          </div>

          {/* Backend */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="BackEnd" style={{ marginRight: '15px' }}>
              Back End Total
            </label>
            <div>
              <input
                type="number"
                id="BackEnd"
                name="BackEnd"
                value={formik.values.BackEnd}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.BackEnd && formik.errors.BackEnd ? (
                <div className={styles.error}>{formik.errors.BackEnd}</div>
              ) : null}
            </div>
          </div>

          {/* Down Payment */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="DownPayment" style={{ marginRight: '15px' }}>
              Down Payment
            </label>
            <div>
              <input
                type="number"
                id="DownPayment"
                name="DownPayment"
                value={formik.values.DownPayment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.DownPayment && formik.errors.DownPayment ? (
                <div className={styles.error}>{formik.errors.DownPayment}</div>
              ) : null}
            </div>
          </div>

          {/* Net Financed */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="NetFinanced" style={{ marginRight: '15px' }}>
              Net Financed
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="NetFinanced"
                name="NetFinanced"
                value={formik.values.NetFinanced}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.NetFinanced && formik.errors.NetFinanced ? (
                <div className={styles.error}>{formik.errors.NetFinanced}</div>
              ) : null}
            </div>
          </div>

          {/* Net Check */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="NetCheck" style={{ marginRight: '15px' }}>
              Net Check
            </label>
            <div>
              <input
                type="number"
                id="NetCheck"
                name="NetCheck"
                value={formik.values.NetCheck}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.NetCheck && formik.errors.NetCheck ? (
                <div className={styles.error}>{formik.errors.NetCheck}</div>
              ) : null}
            </div>
          </div>

          {/* Hamilton Fee */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="HamiltonFee" style={{ marginRight: '15px' }}>
              Hamilton fees
            </label>
            <div>
              <input
                type="number"
                id="HamiltonFee"
                name="HamiltonFee"
                value={formik.values.HamiltonFee}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.HamiltonFee && formik.errors.HamiltonFee ? (
                <div className={styles.error}>{formik.errors.HamiltonFee}</div>
              ) : null}
            </div>
          </div>

          {/* Comments */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <label htmlFor="Comments" style={{ marginRight: '15px' }}>
              Comments
            </label>
            <div>
              <textarea
                id="Comments"
                name="Comments"
                value={formik.values.Comments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.Comments && formik.errors.Comments ? (
                <div className={styles.error}>{formik.errors.Comments}</div>
              ) : null}
            </div>
          </div>

          {/* Offer Type */}

          {/* {!isCounter && (
            <div>
              <label htmlFor="LoanTermType" style={{ marginRight: '15px' }}>
                Offer Type
              </label>
              <select
                id="OfferType"
                name="OfferType"
                value={formik.values.OfferType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              >
                <option value="">Select Offer Type</option>
                <option value="Proposal">Proposal</option>
                <option value="Counter">Counter</option>
              </select>
              {formik.touched.OfferType && formik.errors.OfferType ? (
                <div className={styles.error}>{formik.errors.OfferType}</div>
              ) : null}
            </div>
          )} */}
          {/* PTI */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="PTI" style={{ marginRight: '15px' }}>
              PTI
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="PTI"
                name="PTI"
                value={formik.values.PTI}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.PTI && formik.errors.PTI ? (
                <div className={styles.error}>{formik.errors.PTI}</div>
              ) : null}
            </div>
          </div>
          {/* GPS */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="GPS" style={{ marginRight: '15px' }}>
              GPS
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="GPS"
                name="GPS"
                value={formik.values.GPS}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.GPS && formik.errors.GPS ? (
                <div className={styles.error}>{formik.errors.GPS}</div>
              ) : null}
            </div>
          </div>
          {/* Sales Tax */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="SalesTax" style={{ marginRight: '15px' }}>
              Sales Tax
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="SalesTax"
                name="SalesTax"
                value={calculatedTaxes.toFixed(2)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.SalesTax && formik.errors.SalesTax ? (
                <div className={styles.error}>{formik.errors.SalesTax}</div>
              ) : null}
            </div>
          </div>
          {/* VSI */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="VSI" style={{ marginRight: '15px' }}>
              VSI
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="VSI"
                name="VSI"
                value={formik.values.VSI}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.VSI && formik.errors.VSI ? (
                <div className={styles.error}>{formik.errors.VSI}</div>
              ) : null}
            </div>
          </div>
          {/* Tag Fee */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="PTI" style={{ marginRight: '15px' }}>
              Tag Fees
            </label>
            <div>
              {' '}
              <input
                type="number"
                id="Tags"
                name="Tags"
                value={formik.values.Tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: '1px solid lightgrey', borderRadius: '5px' }}
              />
              {formik.touched.Tags && formik.errors.Tags ? (
                <div className={styles.error}>{formik.errors.Tags}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className={styles.cancelBtn}
            onClick={() => setShowLoanTermsPopup(false)}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
