import React, { FC, useState, Component, useEffect } from 'react';
import styles from './Document.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import {
   faCheckCircle,
  faTimesCircle,
  faTrash,
  faCommentAlt,
} from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
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
    console.log(response)
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
    var w = window.open('about:blank');
    setTimeout(function () {
      //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement('iframe')).src =
        document.Content;
      w.document.getElementsByTagName('iframe')[0].style.width = '100%';
      w.document.getElementsByTagName('iframe')[0].style.height = '100%';
    }, 0);
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
          <div>
            <h3>
              Approved by {item.ApprovedByName}{' '}
              {/* <FontAwesomeIcon
                icon={faTrash as IconProp}
                className={styles.trash}
                onClick={() => handleDocStatusChange('delete', item)}
              /> */}
            </h3>
          </div>
        ) : (
   
          <div>
            
            {' '}
            {profileType !== 'dealer' && <><FontAwesomeIcon
              icon={faCheckCircle as IconProp}
              className={styles.checkMark}
              onClick={() => handleDocStatusChange('approve', item)}
            />
            <FontAwesomeIcon
              icon={faTimesCircle as IconProp}
              className={styles.xmark}
              onClick={() => handleDocStatusChange('deny', item)}
            />
            {item.Notes && (
              <FontAwesomeIcon
                icon={faCommentAlt as IconProp}
                className={styles.note}
                onClick={() => handleDenialNote(item)}
              />
            )}
            
            <FontAwesomeIcon
              icon={faTrash as IconProp}
              className={styles.trash}
              onClick={() => handleDocStatusChange('delete', item)}
            /></>
            }
            
          </div>
        )}
      </div>
    </div>
  );
};
export default Document;
