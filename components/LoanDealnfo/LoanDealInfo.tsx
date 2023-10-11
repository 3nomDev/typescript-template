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
}

const LoanDealInfo:FC<Props> = ({requestedDeal, item, status}) => {

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
   <p>${requestedDeal?.SalesTax}</p>
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
   <p>${requestedDeal?.LoanAmount}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Origination Fee:</label>
   <p>${requestedDeal?.LoanOriginationFee}</p>
    </div>
   
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Loan Payment Amount:</label>
   <p>${requestedDeal?.LoanTermPaymentAmount}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Front End:</label>
   <p>${requestedDeal?.FrontEnd}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Back End:</label>
   <p>${requestedDeal?.BackEnd}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Hanilton Fee:</label>
   <p>${requestedDeal?.HamiltonFee}</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Net Check:</label>
   <p>${requestedDeal?.NetCheck}</p>
    </div>
   {status !== "Approved" && requestedDeal.OfferType !== "Accepted" && <div style={{display:"flex", justifyContent:"space-between", margin:"15px 5px"}}>
       <label>Comments:</label>
   <p>{requestedDeal?.Comments}</p>
    </div>}
   
   
    
   
   </div>
  )
}

export default LoanDealInfo