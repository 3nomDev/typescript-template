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
import generatePassword from 'generate-password';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const approvalCode = useSelector(approvalCodeSelector);


  useEffect(() => {
    if (typeof approvalCode === 'number') {
      router.push('/approved');
    }
  }, []);


  const handleSubmit = async (values: AddUserPayloadInterface) => {
    try {

      const password = generatePassword.generate({length:15,numbers:true})

          //  const Email = values.EmailAddress
          // const finalTemplate = emailtemplate(324243, values.EmailAddress, password);
          // const payload = [Email, finalTemplate];

          // dispatch(sendApprovalEmail(payload));
          let finalValues = {...values, Password:password}
      let response: any = await dispatch(addUser({ payload: finalValues }));
  

      if (response.meta.requestStatus === 'fulfilled') {
        if (response.payload === 'Account Exists') {
          return;
        } else {
          const Email = response.meta.arg.payload.EmailAddress;
          const finalTemplate = emailtemplate(response.payload, values.EmailAddress, password);
          const payload = [Email, finalTemplate];

          dispatch(sendApprovalEmail(payload));

          router.push('/approved');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ApplicationForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default IndexPage;
