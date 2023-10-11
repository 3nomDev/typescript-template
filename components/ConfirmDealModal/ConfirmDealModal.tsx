import React, { FC } from 'react'
import styles from './ConfirmDealModal.module.css'


 interface Props{
        setAcceptDealClicked: React.Dispatch<React.SetStateAction<boolean>>
        handleAccept: () => void
    }


const ConfirmDealModal :FC<Props> = ({setAcceptDealClicked, handleAccept}) => {


const handleClick = () =>{
    setAcceptDealClicked(false) 
    handleAccept()
}


  return (
    <div className={styles.popUpBackground}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Confirm</h1>
       
      </div >
      <div  style={{ textAlign:"center", margin:"30px"}}>
            <p>Are you sure you want to accept this deal?</p>
            <button className={styles.saveBtn} onClick={handleClick}>Accept</button>
        </div>
    </div>
  </div>
  )
}

export default ConfirmDealModal