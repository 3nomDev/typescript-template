import React, { FC } from 'react'
import styles from './LoanDealInfo.module.css'


interface Props{
    requestedDeal?:any;
    isEditable?:boolean;
    setRequestedDeal?:any;
    item?:any;
    index?:number;
    title?:string;
    status?:string;
    application?:any
}

const LoanDealInfo:FC<Props> = ({requestedDeal, item, status, application}) => {

  console.log(requestedDeal)
console.log(item)
  return (
   <div className={styles.wrapper}>
    {status !== "Approved" && <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Offer Type:</label>
   <p>{requestedDeal?.OfferType}</p>
    </div>}
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>AIRA:</label>
   <p>{requestedDeal?.AIRA}%</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Purchase Price:</label>
   <p>${application?.PurchasePrice}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Down Payment:</label>
   <p>${requestedDeal?.DownPayment}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>APR:</label>
   <p>{requestedDeal?.APR}%</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>PTI:</label>
   <p>{requestedDeal?.PTI}%</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>GPS:</label>
   <p>${requestedDeal?.GPS}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Sales Tax:</label>
   <p>${requestedDeal?.SalesTax?.toFixed(2)}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Tags Fee:</label>
   <p>${requestedDeal?.Tags}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>VSI:</label>
   <p>${requestedDeal?.VSI}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Term:</label>
   <p>{requestedDeal?.LoanTerm}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Term Type:</label>
   <p>{requestedDeal?.LoanTermType}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Amount:</label>
   <p>${requestedDeal?.LoanAmount?.toFixed(2)}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Origination Fee:</label>
   <p>${requestedDeal?.LoanOriginationFee?.toFixed(2)}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Payment Amount:</label>
   <p>${requestedDeal?.LoanTermPaymentAmount?.toFixed(2)}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Front End:</label>
   <p>${requestedDeal?.FrontEnd?.toFixed(2)}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Back End:</label>
   <p>${requestedDeal?.BackEnd?.toFixed(2)}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Hanilton Fee:</label>
   <p>${requestedDeal?.HamiltonFee}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Net Check:</label>
   <p>${requestedDeal?.NetCheck}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Net Financed:</label>
   <p>${requestedDeal?.NetFinanced}</p>
    </div>
  
   {status !== "Approved" && requestedDeal.OfferType !== "Accepted" && <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Comments:</label>
   <p>{requestedDeal?.Comments}</p>
    </div>}
   
   
    
   
   </div>
  )
}

export default LoanDealInfo