import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ApplicationForm, Layout } from '../components';
import { AddUserArgsInterface, AddUserPayloadInterface } from '../contracts';
import {
  addUser,
  approvalCodeSelector,
  sendApprovalEmail,
} from '../features/authSlice';
// import { useAppDispatch } from '../app/hooks';
import { emailtemplate } from '../components/EmailTemplate';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const approvalCode = useSelector(approvalCodeSelector);

  useEffect(() => {
    if (typeof approvalCode === 'number') {
      router.push('/approved');
    }
  }, []);
  console.log(typeof approvalCode);
 

  const handleSubmit = async (values: AddUserPayloadInterface) => {
    try {
      let response: any = await dispatch(addUser({ payload: values }));

    if (response.meta.requestStatus === 'fulfilled') {
  
      
      if (response.payload === 'Account Exists') {
        alert("This account already exists");
        return;
      } else {
        const Email = response.meta.arg.payload.EmailAddress;

        const finalTemplate = emailtemplate(approvalCode);
        const payload = [Email, finalTemplate];

        dispatch(sendApprovalEmail(payload));

        router.push('/approved');
      }
    }
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <Layout>
      <ApplicationForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default IndexPage;
