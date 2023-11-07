import React, { FC } from 'react';
import styles from './LoanDealInfo.module.css';

interface Props {
  requestedDeal?: any;
  isEditable?: boolean;
  setRequestedDeal?: any;
  item?: any;
  index?: number;
  title?: string;
  status?: string;
  application?: any;
}

const LoanDealInfo: FC<Props> = ({
  requestedDeal,
  item,
  status,
  application,
}) => {
  console.log(requestedDeal);
  console.log(item);
  return (
    <div className={styles.wrapper}>
      {/* {status !== "Approved" && <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Offer Type:</label>
   <p>{requestedDeal?.OfferType}</p>
    </div>} */}
      {/* <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>AIRA:</label>
   <p>{requestedDeal?.AIRA}%</p>
    </div> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Purchase Price:</label>
        <p>${application?.PurchasePrice.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Licence/Registration:</label>
        <p>${requestedDeal?.LicenseAndRegistration?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Sales Tax:</label>
        <p>${requestedDeal?.SalesTax?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Doc Fee:</label>
        <p>${requestedDeal?.DocFee?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>APR:</label>
        <p>{requestedDeal?.APR}%</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Down Payment:</label>
        <p>${requestedDeal?.DownPayment?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Tags Fee:</label>
        <p>${requestedDeal?.Tags?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Other Fees:</label>
        <p>${requestedDeal?.OtherFees?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Other Fee Description:</label>
        <p>{requestedDeal?.OtherFeesDescription}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>JD Power:</label>
        <p>${requestedDeal?.JDPower?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Black Book:</label>
        <p>${requestedDeal?.Blackbook?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Carfax:</label>
        <p>${requestedDeal?.Carfax?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Manheim:</label>
        <p>${requestedDeal?.Manheim?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Service Agreement:</label>
        <p>${requestedDeal?.ServiceAgreement?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Tire/Wheel:</label>
        <p>${requestedDeal?.TireWheel?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Key Replacement:</label>
        <p>${requestedDeal?.KeyReplacement?.toFixed(2)}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Loan Term:</label>
        <p>{requestedDeal?.LoanTerm}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Loan Term Type:</label>
        <p>{requestedDeal?.LoanTermType}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Loan Amount:</label>
        <p>${requestedDeal?.FrontEnd?.toFixed(2)}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Loan Origination Fee:</label>
        <p>${requestedDeal?.LoanOriginationFee?.toFixed(2)}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Loan Payment Amount:</label>
        <p>${requestedDeal?.LoanTermPaymentAmount?.toFixed(2)}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Front End:</label>
        <p>${requestedDeal?.FrontEnd?.toFixed(2)}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Net Financed:</label>
        <p>${requestedDeal?.NetFinanced}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Net Check:</label>
        <p>${requestedDeal?.NetCheck}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>Hamilton Fee:</label>
        <p>${requestedDeal?.HamiltonFee}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>PTI:</label>
        <p>{requestedDeal?.PTI}%</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>GPS:</label>
        <p>${requestedDeal?.GPS?.toFixed(2)}</p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px 5px',
        }}
      >
        <label>VSI:</label>
        <p>${requestedDeal?.VSI?.toFixed(2)}</p>
      </div>

      {status !== 'Approved' && requestedDeal?.OfferType !== 'Accepted' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '15px 5px',
          }}
        >
          <label>Comments:</label>
          <p>{requestedDeal?.Comments}</p>
        </div>
      )}
    </div>
  );
};

export default LoanDealInfo;
