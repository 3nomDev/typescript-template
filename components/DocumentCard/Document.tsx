import React, { FC, useState, Component, useEffect } from 'react';
import styles from './Document.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {
   faCheckCircle,
  faTimesCircle,
  faTrash,
  faCommentAlt,
  faQuestionCircle,
} from '@fortawesome/fontawesome-free-solid';
import { Icon, IconProp } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import {
  adminDashboardSelector,
  changeDocStatus,
  getDocument,
} from '../../features/adminDashboardSlice';
import { useRouter } from 'next/router';
import { userSelector } from '../../features/authSlice';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { faCircleCheck } from '@fortawesome/pro-regular-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  item;
  id;
  profileType?;
}
export const Document: FC<Props> = ({ item, id, profileType }) => {



  const router = useRouter();
  
  const { appid } = router.query;
  const user = useSelector(userSelector);
  const { document } = useSelector(adminDashboardSelector);
  const dispatch = useDispatch();
  const userId = user?.ID;

  const [showPopup, setShowPopUp] = useState(false);
  const [itemNote, setItemNote] = useState();
  const [showDenial, setShowDenial] = useState(false)
  const [denailMessage, setDenialMessage] = useState()

  const denyDoc = (type, item) => {
    if (itemNote) {
      const data = {
        userid: userId,
        appid: id,
        docid: item.ID,
        notes: itemNote,
        internal: true,
        status: type,
      };
      dispatch(changeDocStatus(data));
    }
  };

  const handleDocStatusChange = (type, item) => {
    if (type === 'deny') {
      setShowPopUp(true);
    } else {
      const data = {
        userid: userId,
        appid: id,
        docid: item.ID,
        notes: item.Notes,
        internal: false,
        status: type,
      };
      dispatch(changeDocStatus(data));
    }
  };

  const getItemDocument = async () => {
    const data = {
      userid: userId,
      ID: item.ID,
    };
   
    const res = dispatch(getDocument(data));
    const response :any = await res;
 
    let fileToOpen;
    if(response.payload !== undefined){
      fileToOpen = response?.payload[0];
    }
   

    if (fileToOpen) {
      openFile(fileToOpen);
    } 
    else{
      return 
    }
  };

  const openFile = (document) => {
    if(document){
        var w = window.open('about:blank');
        if(w !== null){
            setTimeout(function () {
      //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement('iframe')).src =
        document.Content;
      w.document.getElementsByTagName('iframe')[0].style.width = '100%';
      w.document.getElementsByTagName('iframe')[0].style.height = '100%';
    }, 0);
        }
  
    }
  
  };

  const handleInputChange = (e) => {
    setItemNote(e.target.value);
  };
  const saveNote = (type, item) => {
    denyDoc(type, item);
  };

  const handleDenialNote = (item) =>{
    setShowDenial(true)
    setDenialMessage(item.Notes)
  }

  const confirmDeny = (
    <div className={styles.popUpBackground}>
      <div className={styles.popup}>
        <h2 className={styles.popupHeader}>Reason For Denying</h2>
        <textarea onChange={handleInputChange} />
        <div>
          <input type="checkbox" />
          <label>Internal</label>
        </div>
        <div className={styles.popupBtnContainer}>
          <button
            onClick={() => setShowPopUp(false)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={() => saveNote('deny', item)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const denialMessage =(
    <div className={styles.popUpBackground}>
      <div className={styles.denialNote}>
      <h1>Message :</h1>
        <h3>{denailMessage}</h3>
        <div className={styles.popupBtnContainer}>
          <button
            onClick={() => setShowDenial(false)}
            className={styles.cancelBtn}
          >
            Close
          </button>
         
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.wrapper}>
      {showPopup && confirmDeny}
      {showDenial && denialMessage}
      <p className={styles.header}>{item.Name}</p>
      <div className={styles.innerWrapper}>
        <a onClick={getItemDocument} className={styles.documentName}>
          {item.DocumentName}
        </a>
        <p>{moment(item.DateAdded).format('MM/DD/YYYY')}</p>
        {item.ApprovedBy !== 0 ? (
          <div style={{display:"flex"}}>
            {
               <>
          <OverlayTrigger overlay={<Tooltip>
          {item.Status === 'Approved' ? ` Approved by ${item.ApprovedByName}` : 'Declined'}
          </Tooltip>}>

     <FontAwesomeIcon icon={item.Status === 'Approved' ? faCircleCheck : faTimesCircle as IconProp}  color={item.Status === 'Approved' ? "#50D00D" : "red"} size="lg" />
          </OverlayTrigger>


      
         
              </>
            }
            {/* <h3>
              Approved by {item.ApprovedByName}{' '}
             
            </h3> */}
          </div>
        ) : (
   
          <div>
            
            {' '}
            {profileType !== 'dealer' && <>
            <OverlayTrigger overlay={<Tooltip>
              Approve
            </Tooltip>}>
<FontAwesomeIcon
              icon={faCheckCircle as IconProp}
              className={styles.checkMark}
              onClick={() => handleDocStatusChange('approve', item)}
            />
            </OverlayTrigger>
            
           <OverlayTrigger overlay={<Tooltip>Decline</Tooltip>}>
<FontAwesomeIcon
              icon={faTimesCircle as IconProp}
              className={styles.xmark}
              onClick={() => handleDocStatusChange('deny', item)}
            />
           </OverlayTrigger>
           
            
            {item.Notes && (
              <OverlayTrigger overlay={<Tooltip>View Notes</Tooltip>}>
                  <FontAwesomeIcon
                icon={faCommentAlt as IconProp}
                className={styles.note}
                onClick={() => handleDenialNote(item)}
              />
              </OverlayTrigger>
            
            )}
            <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
               <FontAwesomeIcon
              icon={faTrash as IconProp}
              className={styles.trash}
              onClick={() => handleDocStatusChange('delete', item)}
            />
            </OverlayTrigger>
           
            
            
            </>
            }{
              profileType === 'dealer' && <>
          <OverlayTrigger overlay={<Tooltip>
          {item.Status === 'Approved' ? 'Approved' : item.Status === 'Declined' ? "Declined" : item.Status === 'Pending' ? 'Pending' : null}
          </Tooltip>}>

     <FontAwesomeIcon icon={item.Status === 'Approved' ? faCircleCheck : item.Status === 'Pending' ? faQuestionCircle : faTimesCircle as IconProp} color={item.Status === 'Approved' ? "green" : item.Status === "Pending" ? '#ef4b0c' : "red"} size="lg" />
          </OverlayTrigger>


      
         
              </>
            }
            
          </div>
        )}
      </div>
    </div>
  );
};
export default Document;
