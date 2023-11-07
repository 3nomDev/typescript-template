import React from 'react'
import { AdminSidebar } from '../../components'
import AddNewUserForm from '../../components/AddNewUserForm/AddNewUserForm'
import styles from '../styles/addNewUser.module.css'
import EditUserForm from '../../components/EditUserForm/EditUserForm'


const editUser = () => {
  return (
    <div className={styles.wrapper}>
          <AdminSidebar />
        <EditUserForm />
    </div>
  )
}

export default editUser