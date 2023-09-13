import React , {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './LoanTermsPopup.module.css'
import { useDispatch, useSelector, } from 'react-redux';
import { adminDashboardSelector, loanTermsSelector, setupLoanTerm } from '../../features/adminDashboardSlice';

interface LoanTermsFormValues {
  PTI: string;
  AIRA: string;
  LoanTerm: string;
  FrontEnd: string;
  Backend: string;
  DownPayment: string;

  NetFinanced: string;
  NetCheck: string;
  HamiltonFee: string;
  LoanAmount: string;
  Comments: string;
  LoanOriginationFee: string;
  LoanTermPaymentAmount: string;
  LoanTermType: string; // For the dropdown
  OfferType: string;
  
}

interface Props {
  application:any;
  user:any;
  setShowLoanTermsPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = Yup.object().shape({
  AIRA: Yup.number()
    .required('AIRA is required')
    .min(0, 'AIRA must be a positive number'),
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
  Backend: Yup.number()
    .required('Back End Total is required')
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
  OfferType: Yup.string().required('Offer Type is required'),
  PTI: Yup.number()
    .required('PTI is required')
    .min(0, 'PTI must be a positive number'),
});


export const LoanTermsPopup: React.FC<Props> = ({application, user, setShowLoanTermsPopup}) => {
  const dispatch = useDispatch();
  const initialValues: LoanTermsFormValues = {
    PTI: '',
    AIRA: '',
    LoanTerm: '',
    FrontEnd: '',
    Backend: '',
    DownPayment: '',

    NetFinanced: '',
    NetCheck: '',
    HamiltonFee: '',
    LoanAmount: '',
    Comments: '',
    LoanOriginationFee: '',
    LoanTermPaymentAmount: '',
    LoanTermType: '', // For the dropdown
    OfferType: '',
  };


const loanTerms = useSelector(loanTermsSelector)
const [newApplication, setNewApplication] = useState<boolean>()





  const handleSubmit = (values: LoanTermsFormValues) => {
  

    const valuesToSend = {...values, 
      AddedBy:user.ProfileGUID,
      ApplicationID:application.ApplicationID,
      Deleted:false,
      // ID:user.ID,
      // LoanTermsGUID:2343243
    
    }

    dispatch(setupLoanTerm({payload:valuesToSend, newApplication:newApplication}))
    setShowLoanTermsPopup(false)

  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: true, // Enable validation on change
    validateOnBlur: true,   // Enable validation on blur
  });

  return (
<div className={styles.popUpBackground}>
      <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Loan Details</h1>
        {/* <span onClick={closeModal}>X</span> */}
      </div>
    <form onSubmit={formik.handleSubmit} className={styles.loanForm}>
     

      {/* AIRA */}
      <div>
        <label htmlFor="AIRA" style={{marginRight:"15px"}}>AIRA</label>
        <input
          type="number"
          id="AIRA"
          name="AIRA"
          value={formik.values.AIRA}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
 
        />
         {formik.touched.AIRA && formik.errors.AIRA ? (
    <div className={styles.error}>{formik.errors.AIRA}</div>
  ) : null}
      </div>

      {/* Loan Term */}
      <div>
        <label htmlFor="LoanTerm" style={{marginRight:"15px"}}>Loan Term</label>
        <input
          type="number"
          id="LoanTerm"
          name="LoanTerm"
          value={formik.values.LoanTerm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
          {formik.touched.LoanTerm && formik.errors.LoanTerm ? (
    <div className={styles.error}>{formik.errors.LoanTerm}</div>
  ) : null}
      </div>
  {/* Loan Term Type (Dropdown) */}
  <div>
        <label htmlFor="LoanTermType" style={{marginRight:"15px"}}>Loan Term Type</label>
        <select
          id="LoanTermType"
          name="LoanTermType"
          value={formik.values.LoanTermType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}

        >
          <option value="">Select Loan Term Type</option>
          <option value="months">Months</option>
          <option value="weeks">Weeks</option>
      
        </select>
        {formik.touched.LoanTermType && formik.errors.LoanTermType ? (
    <div className={styles.error}>{formik.errors.LoanTermType}</div>
  ) : null}
      </div>
        {/* Loan Amount */}
        <div>
        <label htmlFor="LoanAmount" style={{marginRight:"15px"}}>Loan Amount</label>
        <input
          type="number"
          id="LoanAmount"
          name="LoanAmount"
          value={formik.values.LoanAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.LoanAmount && formik.errors.LoanAmount ? (
    <div className={styles.error}>{formik.errors.LoanAmount}</div>
  ) : null}
      </div>
         {/* Loan Origination Fee */}
         <div>
        <label htmlFor="LoanOriginationFee" style={{marginRight:"15px"}}>Loan Origination Fee</label>
        <input
          type="number"
          id="LoanOriginationFee"
          name="LoanOriginationFee"
          value={formik.values.LoanOriginationFee}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.LoanOriginationFee && formik.errors.LoanOriginationFee ? (
    <div className={styles.error}>{formik.errors.LoanOriginationFee}</div>
  ) : null}
      </div>

      {/* Loan Term Payment Amount */}
      <div>
        <label htmlFor="LoanTermPaymentAmount" style={{marginRight:"15px"}}>Loan Term Payment Amount</label>
        <input
          type="number"
          id="LoanTermPaymentAmount"
          name="LoanTermPaymentAmount"
          value={formik.values.LoanTermPaymentAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.LoanTermPaymentAmount && formik.errors.LoanTermPaymentAmount ? (
    <div className={styles.error}>{formik.errors.LoanTermPaymentAmount}</div>
  ) : null}
      </div>


      {/* Front End */}
      <div>
        <label htmlFor="FrontEnd" style={{marginRight:"15px"}}>Front End Total</label>
        <input
          type="number"
          id="FrontEnd"
          name="FrontEnd"
          value={formik.values.FrontEnd}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.FrontEnd && formik.errors.FrontEnd ? (
    <div className={styles.error}>{formik.errors.FrontEnd}</div>
  ) : null}
      </div>

      {/* Backend */}
      <div>
        <label htmlFor="Backend" style={{marginRight:"15px"}}>Back End Total</label>
        <input
          type="number"
          id="Backend"
          name="Backend"
          value={formik.values.Backend}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.Backend && formik.errors.Backend ? (
    <div className={styles.error}>{formik.errors.Backend}</div>
  ) : null}
      </div>

      {/* Down Payment */}
      <div>
        <label htmlFor="DownPayment" style={{marginRight:"15px"}}>Down Payment</label>
        <input
          type="number"
          id="DownPayment"
          name="DownPayment"
          value={formik.values.DownPayment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.DownPayment && formik.errors.DownPayment ? (
    <div className={styles.error}>{formik.errors.DownPayment}</div>
  ) : null}
      </div>

      

      {/* Net Financed */}
      <div>
        <label htmlFor="NetFinanced" style={{marginRight:"15px"}}>Net Financed</label>
        <input
          type="number"
          id="NetFinanced"
          name="NetFinanced"
          value={formik.values.NetFinanced}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.NetFinanced && formik.errors.NetFinanced ? (
    <div className={styles.error}>{formik.errors.NetFinanced}</div>
  ) : null}
      </div>

      {/* Net Check */}
      <div>
        <label htmlFor="NetCheck" style={{marginRight:"15px"}}>Net Check</label>
        <input
          type="number"
          id="NetCheck"
          name="NetCheck"
          value={formik.values.NetCheck}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.NetCheck && formik.errors.NetCheck ? (
    <div className={styles.error}>{formik.errors.NetCheck}</div>
  ) : null}
      </div>

      {/* Hamilton Fee */}
      <div>
        <label htmlFor="HamiltonFee" style={{marginRight:"15px"}}>Hamilton fees</label>
        <input
          type="number"
          id="HamiltonFee"
          name="HamiltonFee"
          value={formik.values.HamiltonFee}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.HamiltonFee && formik.errors.HamiltonFee ? (
    <div className={styles.error}>{formik.errors.HamiltonFee}</div>
  ) : null}
      </div>

    
      {/* Comments */}
      <div>
        <label htmlFor="Comments" style={{marginRight:"15px"}}>Comments</label>
        <input
          type="text"
          id="Comments"
          name="Comments"
          value={formik.values.Comments}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.Comments && formik.errors.Comments ? (
    <div className={styles.error}>{formik.errors.Comments}</div>
  ) : null}
      </div>

   
    

      {/* Offer Type */}
     
      <div>
        <label htmlFor="LoanTermType" style={{marginRight:"15px"}}>Offer Type</label>
        <select
          id="OfferType"
          name="OfferType"
          value={formik.values.OfferType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}

        >
          <option value="">Select Offer Type</option>
          <option value="Proposal">Proposal</option>
          <option value="Counter">Counter</option>
      
        </select>
        {formik.touched.OfferType && formik.errors.OfferType ? (
    <div className={styles.error}>{formik.errors.OfferType}</div>
  ) : null}
      </div>
       {/* PTI */}
       <div>
        <label htmlFor="PTI" style={{marginRight:"15px"}}>PTI</label>
        <input
          type="number"
          id="PTI"
          name="PTI"
          value={formik.values.PTI}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
 style={{border:"1px solid lightgrey", borderRadius:"5px"}}
        />
         {formik.touched.PTI && formik.errors.PTI ? (
    <div className={styles.error}>{formik.errors.PTI}</div>
  ) : null}
      </div>

      <button type="submit" className={styles.cancelBtn} onClick={() => setShowLoanTermsPopup(false)}>Cancel</button>
      <button type="submit" className={styles.saveBtn}>Submit</button>
    </form>
    </div>
  </div>
  );
};