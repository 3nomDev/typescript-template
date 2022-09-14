import React, { FC, useState, Component, useEffect } from 'react';
import AdminNoteItem from './AdminNoteItem';
import styles from './AdminNotes.module.css';
import { cs, OnEventFn } from '@rnw-community/shared';

interface Props {
  notes: any;
  setShowNotes: (value) => void;
}

export const AdminNotes: FC<Props> = ({ notes, setShowNotes }) => {


  return (
    <div className={styles.notesContainer}>
      <div className={styles.notes}>
        <h1 className={styles.notesHeader}>Notes </h1>

        <div className={styles.noteItemHolder}>
          {notes &&
            notes.length &&
            notes.map((note) => <AdminNoteItem note={note} />)}
        </div>

        <button onClick={() => setShowNotes(false)}>Close</button>
      </div>
    </div>
  );
};

export default AdminNotes;
