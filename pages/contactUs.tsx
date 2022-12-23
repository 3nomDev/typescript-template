import React, { useState } from 'react';
import { Layout, Sidebar } from '../components';
import styles from './styles/contactus.module.css';
import {
  addUser,
  approvalCodeSelector,
  sendApprovalEmail,
} from '../features/authSlice';
import { useDispatch } from 'react-redux';


const ContactUs = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false)

  const [emailMessage, setEmailMessage] = useState<any>({
    APIKey: process.env.NEXT_PUBLIC_EMAILAPIKEY,
    cc: '',
    bcc: '',
    ToAddress: 'mvanderloon@3nom.com',
    FromDisplayName: '',
    FromAddress: '',
    Subject: '',
    Body: '',
  });

 
  const handleSubmit = async () => {

    if(emailMessage.Body === "" || emailMessage.FromAddress === "" || emailMessage.FromDisplayName === ""){
      setError(true)
   return 
    } 
    else{
       let response: any = await dispatch(
      sendApprovalEmail({ emailMessage, fromContact: true })
    );
    alert(response);
    }

   
  };

  return (
    <Layout>
  
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.formContainer}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
           Full Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) =>
             {setError(false); setEmailMessage({
                ...emailMessage,
                FromDisplayName: e.target.value,
              })}
            }
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Email <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) =>
             {setError(false); setEmailMessage({ ...emailMessage, FromAddress: e.target.value })}
            }
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>Subject</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) =>
             {setError(false); setEmailMessage({ ...emailMessage, Subject: e.target.value })}
            }
          />
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            Message <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea className={styles.textArea}
            onChange={(e) =>
          {setError(false);    setEmailMessage({ ...emailMessage, Body: e.target.value })}
            }
          />
        </div>
{error && <p style={{textAlign :"center", color:'red'}}>Please fill out all fields </p>}
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </Layout>
  );
};

export default ContactUs;
