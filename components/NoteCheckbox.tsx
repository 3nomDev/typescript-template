import React from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from '../features/authSlice';

const NoteCheckbox = ({handleNoteOptions, name, handleformchange, index,}) => {

  return (
    <div>
    <input
    type="radio"
    value={name}
    key={index}
    name='radioBtn'

    onChange={(e) => {handleNoteOptions(e, index); {name === 'Propose Terms' ? handleformchange(e) : null}}}
  />
  <label>{name}</label>
  </div>
  )
}

export default NoteCheckbox