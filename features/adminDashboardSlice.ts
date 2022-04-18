import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';
import {
  ApplicationInterface,
  ChangeApplicationStatusArgs,
  ContractInterface,
  CreateDealerArgsInterface,
  DashboardApplicationInterface,
  DealerInterface,
  DocumentTypeInterface,
  LoadDealerArgsInterface,
  NotificationInterface,
  StateInterface,
  StatsInterface,
  UpdateApplicationInterface,
} from '../contracts';
import { RootState } from '../app/store';

import { addNotification } from './notifications/notificationSlice';

type AdminDashboardState = {
  approvedApplications: ApplicationInterface[];
  pendingApplications: ApplicationInterface[];
  incompleteApplications: ApplicationInterface[];
  notifications: NotificationInterface[];
  dealers: DealerInterface[];
  dealerItem: DealerInterface;
  paymentItem: any;
  states: StateInterface[];
  stats: StatsInterface;
  dashboardApplications: DashboardApplicationInterface[];
  applicationItem: ApplicationInterface;
  contractsTypes: ContractInterface[];
  documentTypes: DocumentTypeInterface[];
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

const initialState: AdminDashboardState = {
  approvedApplications: [],
  pendingApplications: [],
  incompleteApplications: [],
  dealers: [],
  dealerItem: null,
  states: [],
  notifications: [],
  pending: false,
  stats: {
    'Incomplete Applications': 0,
    'Approved Applications': 0,
    'Awaiting Approval Applications': 0,
    'Declined Applications': 0,
  },
  dashboardApplications: [],
  applicationItem: null,
  documentTypes: [],
  error: false,
  errorMessage: '',
  contractsTypes: [],
  paymentItem: null,
};

export const loadApprovedApplications = createAsyncThunk(
  'adminDashboard/loadApprovedApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getapprovedapplications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadStates = createAsyncThunk(
  'adminDashboard/loadStates',
  async () => {
    const res = await fetch('https://adjournal.prestoapi.com/api/states', {
      method: 'GET',
    });
    const results: StateInterface[] = await res.json();

    return results;
  }
);

export const loadPendingApplications = createAsyncThunk(
  'adminDashboard/loadPendingApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getpendingapplications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadIncompleteApplications = createAsyncThunk(
  'adminDashboard/loadIncompleteApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getincompleteapplications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadDealers = createAsyncThunk(
  'adminDashboard/loadDealers',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getdealers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const response: DealerInterface[] = await res.json();
    return response;
  }
);

export const loadNotifications = createAsyncThunk(
  'adminDashboard/loadNotifications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getnotifications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: NotificationInterface[] = await res.json();
    return response;
  }
);

export const loadDealer = createAsyncThunk(
  'adminDashboard/loadDealer',
  async (payload: LoadDealerArgsInterface) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getdealer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    });
    const result: DealerInterface[] = await res.json();

    return result[0];
  }
);

export const updateDealers = createAsyncThunk(
  'adminDashboard/updateDealers',
  async ({ payload, router }: CreateDealerArgsInterface, thunkApi) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/updatedealers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    });
    const response: [{ ID: number }] = await res.json();

    thunkApi.dispatch(
      addNotification({
        type: 'success',
        message: 'Dealer has been successfully added',
        autoHideDuration: 5000,
      })
    );

    thunkApi.dispatch(
      loadDealer({ userid: payload.userid, dealerid: response[0].ID })
    );

    router.push(`/admin/edit-dealer/${response[0].ID}`);

    return response;
  }
);

// Convert array of stats to object
const convertArrayToObject = (array, key): any => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.Value,
    };
  }, initialValue);
};

export const loadStats = createAsyncThunk(
  'adminDashboard/loadStats',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getstats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const response = await res.json();

    return convertArrayToObject(response, 'Description');
  }
);

export const loadDashboard = createAsyncThunk(
  'adminDashboad/loadDashboard',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getDashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const result: DashboardApplicationInterface[] = await res.json();

    return result;
  }
);

export const loadApplication = createAsyncThunk(
  'adminDashboard/loadApplication',
  async (id: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ id: Number(id) }),
    });
    const response: ApplicationInterface[] = await res.json();

    return response[0];
  }
);

export const loadContractTypes = createAsyncThunk(
  'adminDashboard/loadContractTypes',
  async () => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/contracttypes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const response: ContractInterface[] = await res.json();

    return response;
  }
);

export const loadDocumentTypes = createAsyncThunk(
  'adminDashboard/loadDocumentTypes',
  async () => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getdocumenttypes',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    const response: DocumentTypeInterface[] = await res.json();

    return response;
  }
);

export const generatePdf = createAsyncThunk(
  'adminDashboard/generatePdf',
  async (id: number) => {
    const res = await fetch(`https://tlcpdf.3nom.com/api/GeneratePdf/${id}`, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    const response: { url: string } = await res.json();

    window.open(response.url, '_blank');
  }
);
export const updateApplication = createAsyncThunk(
  'adminDashboard/updateApplication',
  async (payload: UpdateApplicationInterface, thunkApi) => {
    const body = {
      Address: payload.Address,
      AmountFinanced: payload.AmountFinanced,
      ApplicationID: payload.ApplicationID,
      CellPhone: payload.CellPhone,
      City: payload.City,
      DLNumber: payload.DLNumber,
      DOB: payload.DOB,
      DepositFloat: payload.DepositFloat,
      EmailAddress: payload.EmailAddress,
      EmployerName: payload.EmployerName,
      FirstName: payload.FirstName,
      HousingStatus: payload.HousingStatus,
      HowLong: payload.HowLong,
      LastName: payload.LastName,
      MiddleName: payload.MiddleName,
      MonthlyHousingPayment: payload.MonthlyHousingPayment,
      MonthlyIncome: payload.MonthlyIncome,
      Position: payload.Position,
      PositionType: payload.PositionType,
      PostalCode: payload.PostalCode,
      PurchasePrice: payload.PurchasePrice,
      State: payload.State,
      VIN: payload.VIN,
      VehicleColor: payload.VehicleColor,
      VehicleEngine: payload.VehicleEngine,
      VehicleHorsePower: payload.VehicleHorsePower,
      VehicleMake: payload.VehicleMake,
      VehicleMileage: payload.VehicleMileage,
      VehicleModel: payload.VehicleModel,
      VehicleTransmission: payload.VehicleTransmission,
      VehicleYear: payload.VehicleYear,
      WorkPhone: payload.WorkPhone,
      YearsAtCurrentJob: payload.YearsAtCurrentJob,
      userId: payload.userid,
    };

    const response = await fetch(
      'https://tlcfin.prestoapi.com/api/updateapplication',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(body),
      }
    );

    const res = await response.json();

    if (res[0].Message === 'Success') {
      thunkApi.dispatch(
        addNotification({
          type: 'success',
          message: 'Application has been updated',
          autoHideDuration: 6000,
        })
      );
      thunkApi.dispatch(loadApplication(payload.ApplicationID.toString()));
    }
  }
);

export const changeApplicationStatus = createAsyncThunk(
  'adminDashboard/changeApplicationStatus',
  async (payload: ChangeApplicationStatusArgs, thunkApi) => {
    const response = await fetch(
      'https://tlcfin.prestoapi.com/api/changeappstatus',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const res = await response.json();

    if (isDefined(res[0].Message)) {
      thunkApi.dispatch(
        addNotification({
          type: 'success',
          autoHideDuration: 6000,
          message: 'Application has been updated',
        })
      );
      thunkApi.dispatch(loadApplication(payload.appid as unknown as string));
    }
  }
);

export const loadPayments = createAsyncThunk(
  'adminDashboard/loadPayments',
  async () => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/payments', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        // body: JSON.stringify({
        //   AccountNumber: '12345',
        //   Amount: 5342,
        //   ApplicationID: 53423243542,
        //   ConfirmationNumber: 'C4242',
        //   DateAdded: '02.12.2202',
        //   DateProcessed: '02.12.2202',
        //   ID: 35421435423,
        //   LastUpdated: '02.12.2202',
        //   PaymentGUID: 53424342,
        //   PaymentMethod: 'Paypal',
        //   ScheduledDate: '02.12.2202',
        //   Status: 'Processing',
        // }),
      },
    });

    const result = await res.json();

    return result;
  }
);

export const loadPaymentItem = createAsyncThunk(
  'adminDashboard/loadPaymentItem',
  async (id: string) => {
    const res = await fetch(`tlcfin.prestoapi.com/api/payments/${id}`);

    const result = await res.json();

    console.log(result);
  }
);

export const dealerDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    setApprovedApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.approvedApplications = payload;
    },
    setPendingApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.pendingApplications = payload;
    },
    setIncompleteApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.incompleteApplications = payload;
    },
    setDealersAction(state, { payload }: PayloadAction<DealerInterface[]>) {
      state.dealers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApprovedApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApprovedApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.approvedApplications = payload;
        state.approvedApplications = state.approvedApplications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadApprovedApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadPendingApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadPendingApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.pendingApplications = payload;
        state.pendingApplications = state.pendingApplications.length
          ? state.pendingApplications.map((item) => ({
              ...item,
              isShown: true,
            }))
          : [];
      })
      .addCase(loadPendingApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadIncompleteApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadIncompleteApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.incompleteApplications = payload;
        state.incompleteApplications = state.incompleteApplications.map(
          (item) => ({
            ...item,
            isShown: true,
          })
        );
      })
      .addCase(loadIncompleteApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadNotifications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadNotifications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.notifications = payload;
        state.notifications = state.notifications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadNotifications.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Error loading notifications';
      })
      .addCase(loadDealers.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadDealers.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.dealers = payload;
        state.dealers = state.dealers.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadDealers.rejected, (state) => {
        state.error = true;
        state.pending = false;
        state.errorMessage = 'Error loading dealers';
      })
      .addCase(loadStates.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadStates.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.states = payload;
      })
      .addCase(loadStates.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading states failed';
      })
      .addCase(updateDealers.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(updateDealers.fulfilled, (state, { payload }) => {
        state.pending = false;
      })
      .addCase(updateDealers.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Updating dealers failed';
      })
      .addCase(loadDealer.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(loadDealer.fulfilled, (state, { payload }) => {
        state.dealerItem = payload;
        state.pending = false;
      })
      .addCase(loadDealer.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading dealer failed';
      })
      .addCase(loadStats.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadStats.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Error loading stats';
      })
      .addCase(loadStats.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.stats = payload;
      })
      .addCase(loadDashboard.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadDashboard.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading dashboard failed';
      })
      .addCase(loadDashboard.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.dashboardApplications = payload;
      })
      .addCase(loadApplication.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApplication.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading application failed';
      })
      .addCase(loadApplication.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.applicationItem = payload;
      })
      .addCase(loadContractTypes.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadContractTypes.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Loading contracts types failed';
      })
      .addCase(loadContractTypes.fulfilled, (state, { payload }) => {
        state.contractsTypes = payload;
      })
      .addCase(loadDocumentTypes.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadDocumentTypes.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Loading document types failed';
        state.pending = false;
      })
      .addCase(loadDocumentTypes.fulfilled, (state, { payload }) => {
        state.documentTypes = payload;
        state.pending = false;
      })
      .addCase(changeApplicationStatus.pending, (state) => {
        state.pending = true;
      })
      .addCase(changeApplicationStatus.rejected, (state) => {
        state.pending = false;
        state.errorMessage = 'Failed changing application status';
        state.error = true;
      })
      .addCase(updateApplication.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateApplication.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Updating application failed';
      })
      .addCase(updateApplication.fulfilled, (state) => {
        state.pending = false;
      });
  },
});

export const {
  setIncompleteApplicationsAction,
  setApprovedApplicationsAction,
  setDealersAction,
  setPendingApplicationsAction,
} = dealerDashboardSlice.actions;

export const adminDashboardSelector = (state: RootState): AdminDashboardState =>
  state.adminDashboard;

export const approvedApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.approvedApplications;

export const pendingApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.pendingApplications;

export const incompleteApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.incompleteApplications;

export const notificationsSelector = (
  state: RootState
): NotificationInterface[] => state.dashboard.notifications;

export const stateSelector = (state: RootState): StateInterface[] =>
  state.adminDashboard.states;

export const dealersSelector = (state: RootState): DealerInterface[] =>
  state.adminDashboard.dealers;

export const dealerItemSelector = (state: RootState): DealerInterface =>
  state.adminDashboard.dealerItem;

export default dealerDashboardSlice.reducer;
