import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isString } from '@rnw-community/shared';
import styles from '../../styles/dealership.module.css';
import { AdminSidebar, EditDealerContent } from '../../../components';
import { withAuth } from '../../../hocs';
import {
  adminDashboardSelector,
  changeApplicationStatus,
  generatePdf,
  loadApplication,
  loadContractTypes,
  loadDocumentTypes,
  loadStates,
  schedulePayment,
  updateApplication,
} from '../../../features/adminDashboardSlice';
import {
  ApplicationInterface,
  ChangeApplicationStatusArgs,
  SchedulePaymentPayloadInterface,
} from '../../../contracts';
import { userSelector } from '../../../features/authSlice';

const EditDealerPage: FC = () => {
  const router = useRouter();

  const { applicationItem, pending, contractsTypes, documentTypes, states } =
    useSelector(adminDashboardSelector);
  const user = useSelector(userSelector);
  const userid = user?.ID

  const dispatch = useDispatch();

  const { id } = router.query;
  const data = {appId: id, userId:userid}

  useEffect(() => {
    if (isString(id)) {
      dispatch(loadContractTypes());
      dispatch(loadApplication(data));
      dispatch(loadDocumentTypes());
      dispatch(loadStates());
    }
  }, [id]);

  const handleBackPress = (): void => router.back();
  const handleGeneratePdf = (): void =>
    void dispatch(generatePdf(applicationItem.ApplicationID));
  const handleSubmit = (payload: Partial<ApplicationInterface>): void =>
    void dispatch(updateApplication({ ...payload, userid: Number(user?.ID) }));
  const handleChangeAppStatus = (statusid: number) => () =>
    void dispatch(
      changeApplicationStatus({
        statusid,
        userId: Number(user.ID),
        appid: Number(id),
      })
    );
  const handleApprove =
    (payload: Partial<ChangeApplicationStatusArgs>) => () => {
      if(payload.leaseApproved === false || payload.userApproved === false){
        dispatch(
          changeApplicationStatus({
            ...payload,
            appid: Number(id),
            userId: Number(user.ID),
            statusid: 6,
          })
        );
      }
else { dispatch(
        changeApplicationStatus({
          ...payload,
          appid: Number(id),
          userId: Number(user.ID),
          statusid: 3,
        })
      );}
     
    };
  const handleSchedulePayments = (
    payload: SchedulePaymentPayloadInterface
  ): void =>

    void dispatch(
      schedulePayment({
        ...payload,
        ApplicationID: applicationItem.ApplicationID,
      })
    );

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <EditDealerContent
        onSchedulePayments={handleSchedulePayments}
        onApprove={handleApprove}
        onChangeAppStatus={handleChangeAppStatus}
        onSubmit={handleSubmit}
        onGeneratePdf={handleGeneratePdf}
        states={states}
        documentTypes={documentTypes}
        contractTypes={contractsTypes}
        pending={pending}
        application={applicationItem}
        onBackPress={handleBackPress}
      />
    </div>
  );
};

export default withAuth(EditDealerPage);
