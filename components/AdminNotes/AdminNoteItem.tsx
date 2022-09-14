import React, { FC, useState, Component, useEffect } from 'react';
import styles from './AdminNoteItem.module.css';
import moment from 'moment';

interface Props {
  note: {};
}

const AdminNoteItem = ({ note }) => {
  let data;
  if (note?.LeaseNotes.includes(':')) {
    data = JSON.parse(note?.LeaseNotes);
  }

  const createProposalData = (data) => {
    let content = [];
    for (const [key, value] of Object.entries(data)) {
      content.push(
        <ol>
          <span className={styles.proposalKey}>{key} </span>: {value}
        </ol>
      );
    }
    return content;
  };

  return (
    <div className={styles.noteWrapper}>
      <div className={styles.detailWrapper}>
        <span className={styles.label}>
          {!data ? 'Lease Note:' : 'Proposal'}
        </span>
        <p>{!data ? note.LeaseNotes : createProposalData(data)}</p>
      </div>
      <div className={styles.detailWrapper}>
        <span className={styles.label}>User Note:</span>
        <p>{note.UserNotes}</p>
      </div>
      <div className={styles.detailWrapper}>
        <span className={styles.label}>From:</span>
        <p>{note.UpdateBy}</p>
      </div>
      <div className={styles.detailWrapper}>
        <span className={styles.label}>Posted:</span>{' '}
        <p> {moment(note.LastUpdated).format('MM/DD/YYYY')}</p>
      </div>
    </div>
  );
};

export default AdminNoteItem;
