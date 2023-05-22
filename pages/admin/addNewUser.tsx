import React from 'react'
import { AdminSidebar } from '../../components'
import AddNewUserForm from '../../components/AddNewUserForm/AddNewUserForm'
import styles from '../styles/addNewUser.module.css'

const addNewUser = () => {
  return (
    <div className={styles.wrapper}>
          <AdminSidebar />
        <AddNewUserForm />
    </div>
  )
}

export default addNewUser