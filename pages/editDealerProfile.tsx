import React from 'react'
import { AdminSidebar, Sidebar } from '../components'
import AddNewUserForm from '../components/AddNewUserForm/AddNewUserForm'
import EditUserForm from '../components/EditUserForm/EditUserForm'

import styles from './styles/addNewUser.module.css'
import { userSelector } from '../features/authSlice'
import { useSelector } from 'react-redux'




const EditDealerProfile = () => {

    const user = useSelector(userSelector)

    console.log(user, 'THIs is the logged in user')
  return (
    <div className={styles.wrapper}>
    <Sidebar />
  <EditUserForm />
</div>
  )
}

export default EditDealerProfile
