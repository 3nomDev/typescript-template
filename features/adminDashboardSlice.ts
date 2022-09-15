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
  SchedulePaymentPayloadInterface,
  StateInterface,
  StatsInterface,
  UpdateApplicationInterface,
  ActiveAccountsInterface,
  UserPaymentsInterface,
  PaymentsInterface,
  UserActiveAccountsInterface,
  DocumentInterface,
  SingleDocumentInterface,
  AddedRejectionNote,
  RejectionNotesInterface,
} from '../contracts';
import { RootState } from '../app/store';

import { addNotification } from './notifications/notificationSlice';

type AdminDashboardState = {
  approvedApplications: ApplicationInterface[];
  pendingApplications: ApplicationInterface[];
  incompleteApplications: ApplicationInterface[];
  conditionalApplications: ApplicationInterface[];
  declinedApplications: ApplicationInterface[];
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
  activeAccounts: ActiveAccountsInterface[];
  userActiveAccount: any;
  userPayments: UserPaymentsInterface[];
  payments: PaymentsInterface[];
  documents: DocumentInterface[];
  document: SingleDocumentInterface;
  AddedRejectionNote: AddedRejectionNote;
  RejectionNotes: RejectionNotesInterface[];
};

const initialState: AdminDashboardState = {
  approvedApplications: [],
  pendingApplications: [],
  declinedApplications: [],
  AddedRejectionNote: null,
  RejectionNotes: [],
  incompleteApplications: [],
  conditionalApplications: [],
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
    'Conditional Approval Applications': 0,
  },
  dashboardApplications: [],
  applicationItem: null,
  documentTypes: [],
  error: false,
  errorMessage: '',
  contractsTypes: [],
  paymentItem: null,
  activeAccounts: [],
  userPayments: [],
  payments: [],
  userActiveAccount: {},
  documents: [],
  document: null,
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
export const loadDeclinedApplications = createAsyncThunk(
  'adminDashboard/loadDeclinedApplications',
  async (userId: string) => {
    console.log(userId);
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getdeniedapplications',
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
export const loadConditionalApplications = createAsyncThunk(
  'adminDashboard/loadConditionalApplications',
  async (userId: string) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/getconditionalapplications',
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

export const loadActiveAccounts = createAsyncThunk(
  'adminDashboard/loadActiveAccounts',
  async () => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/activeaccounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      // body: JSON.stringify({ userid: Number(userId) }),
    });
    const response: ActiveAccountsInterface[] = await res.json();
    return response;
  }
);
export const loadUserActiveAccount = createAsyncThunk(
  'adminDashboard/loadUserActiveAccount',
  async (id: string) => {
    const res = await fetch(
      `https://tlcfin.prestoapi.com/api/activeaccounts/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        // body: JSON.stringify({ userid: Number(userId) }),
      }
    );
    const response: UserActiveAccountsInterface = await res.json();
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
export const loadRejectionNotes = createAsyncThunk(
  'adminDashboard/loadRejectionNotes',
  async (data: {}) => {
    console.log('********************getting notes', data);
    const res = await fetch('https://tlcfin.prestoapi.com/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
    const results: RejectionNotesInterface[] = await res.json();

    return results;
  }
);
export const AddRejectionNote = createAsyncThunk(
  'adminDashboard/AddedRejectionNote',
  async (data: any, thunkApi) => {
    let noteData = { id: Number(data.ApplicationID), status: data.StatusID };

    const res = await fetch('https://tlcfin.prestoapi.com/api/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
    const results: RejectionNotesInterface[] = await res.json();

    if (res.status === 200) {
      thunkApi.dispatch(loadRejectionNotes(noteData));
    }

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

    if (JSON.stringify(response) === '{}') return [];
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

    if (JSON.stringify(result) === '{}') {
      return [];
    }

    return result;
  }
);

export const loadApplication = createAsyncThunk(
  'adminDashboard/loadApplication',
  async (data: any, thunkApi) => {
    console.log(data);
    const res = await fetch('https://tlcfin.prestoapi.com/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ id: Number(data.appId || data) }),
    });
    const response: ApplicationInterface[] = await res.json();
    if (res.status === 200 && data.appId) {
      let dataToSend = { userid: data.userId, ApplicationID: data?.appId };
      let noteData = { id: data?.appId, status: response[0].StatusID };
      console.log(noteData);
      thunkApi.dispatch(getDocuments(dataToSend));
      // thunkApi. dispatch(loadRejectionNotes(noteData));
    }
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
export const uploadDocument = createAsyncThunk(
  'adminDashboard/uploadDocument',
  async (data: any, thunkApi) => {
    console.log(data);
    let userid;
    let appid;
    if (data) {
      userid = data.userID;
      appid = data.ApplicationID;
    }

    const res = await fetch('https://tlcfin.prestoapi.com/api/adddocument', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (res.status === 200) {
      thunkApi.dispatch(getDocuments({ userid: userid, ApplicationID: appid }));
    }
    return response;
  }
);
export const getDocuments = createAsyncThunk(
  'adminDashboard/getDocuments',
  async (data: any) => {
    console.log(Object.values(data));
    const res = await fetch('https://tlcfin.prestoapi.com/api/getdocuments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    const response: DocumentInterface[] = await res.json();
    return response;
  }
);
export const getDocument = createAsyncThunk(
  'adminDashboard/getDocument',
  async (data: any) => {
    console.log(Object.values(data));
    const res = await fetch('https://tlcfin.prestoapi.com/api/getdocument', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    const response: SingleDocumentInterface = await res.json();
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
      SSN: payload.SSN,
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
 
    const payloadToSend = {
      appid: Number(payload.appid),
      userId: Number(payload.userId),
      statusid: payload.statusid,
    };

    const response = await fetch(
      'https://tlcfin.prestoapi.com/api/changeappstatus',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payloadToSend),
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

      if (res[0].Message === 'Updated' && payload.statusid === 3) {
        let date = new Date().toISOString();
        let approvalNote = {
          ApplicationID: payload.appid,
          DateAdded: date,
          Deleted: false,
          LastUpdated: date,
          LeaseApproved: payload.leaseApproved,
          LeaseNotes: payload.leaseNotes,
          StatusID: payload.statusid,
          UpdatedBy: payload.userId,
          UserNotes: payload.userNotes,
          UserApproved: payload.userApproved,
        };
        thunkApi.dispatch(AddRejectionNote(approvalNote));
      }

      thunkApi.dispatch(loadApplication(payload.appid as unknown as string));
    }
  }
);
export const changeDocStatus = createAsyncThunk(
  'adminDashboard/changeDocStatus',
  async (payload: any, thunkApi) => {
    let userid;
    let appid;
    if (payload) {
      userid = payload.userid;
      appid = payload.appid;
    }

    const response = await fetch(
      'https://tlcfin.prestoapi.com/api/changedocstatus',
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
    if (response.status === 200) {
      thunkApi.dispatch(getDocuments({ userid: userid, ApplicationID: appid }));
    }

    return res;
  }
);

export const loadPayments = createAsyncThunk(
  'adminDashboard/loadPayments',
  async () => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/payments', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    const result: PaymentsInterface[] = await res.json();

    return result;
  }
);

export const loadPaymentsByAppId = createAsyncThunk(
  'adminDashboard/loadPaymentsByAppId',
  async (id: string) => {
    const res = await fetch(
      `https://tlcfin.prestoapi.com/api/getpaymentsbyappid`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ApplicationID: Number(id) }),
      }
    );
    const response: UserPaymentsInterface[] = await res.json();

    return response;
  }
);

export const loadPaymentItem = createAsyncThunk(
  'adminDashboard/loadPaymentItem',
  async (id: string) => {
    const res = await fetch(`tlcfin.prestoapi.com/api/payments/${id}`);

    const result = await res.json();
  }
);

export const schedulePayment = createAsyncThunk(
  'adminDashboard/schedulePayment',
  async (payload: SchedulePaymentPayloadInterface, thunkApi) => {
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/schedulepayments',
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    const result = await res.json();

    if (result) {
      thunkApi.dispatch(
        addNotification({
          autoHideDuration: 6000,
          message: 'Payments have been confirmed',
          type: 'info',
        })
      );
    }
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
    setConditionalApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.conditionalApplications = payload;
    },
    setDeclinedApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.declinedApplications = payload;
    },
    setActiveCustomersAction(
      state,
      { payload }: PayloadAction<ActiveAccountsInterface[]>
    ) {
      state.activeAccounts = payload;
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
      .addCase(loadConditionalApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadConditionalApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.conditionalApplications = payload;
        state.conditionalApplications = state.conditionalApplications.map(
          (item) => ({
            ...item,
            isShown: true,
          })
        );
      })
      .addCase(loadApprovedApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadDeclinedApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadDeclinedApplications.fulfilled, (state, { payload }) => {
        state.pending = true;
        state.declinedApplications = payload;
        state.declinedApplications = state.declinedApplications.map((item) => ({
          ...item,
          isShown: true,
        }));
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
        // state.pending = true;
      })
      .addCase(loadContractTypes.rejected, (state) => {
        // state.error = true;
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
      .addCase(changeDocStatus.pending, (state) => {
        state.pending = true;
      })

      .addCase(changeDocStatus.fulfilled, (state) => {
        state.pending = false;
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
      })
      .addCase(loadActiveAccounts.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadActiveAccounts.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'loading accounts failed';
      })
      .addCase(loadActiveAccounts.fulfilled, (state, action) => {
        state.pending = false;
        state.activeAccounts = action.payload;
        state.activeAccounts =
          state.activeAccounts.length &&
          state.activeAccounts.map((item) => ({ ...item, isShown: true }));
      })
      .addCase(loadPaymentsByAppId.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(loadPaymentsByAppId.fulfilled, (state, action) => {
        state.pending = false;
        state.userPayments = action.payload;
      })
      .addCase(loadUserActiveAccount.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadUserActiveAccount.fulfilled, (state, action) => {
        state.pending = false;
        state.userActiveAccount = action.payload;
      })

      .addCase(uploadDocument.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.pending = false;
      })
      .addCase(getDocuments.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        (state.pending = false), (state.documents = action.payload);
      })
      .addCase(getDocument.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.pending = false;
        state.document = action.payload;
      })
      .addCase(loadRejectionNotes.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadRejectionNotes.fulfilled, (state, action) => {
        state.pending = false;
        state.RejectionNotes = action.payload;
      })
      .addCase(AddRejectionNote.pending, (state) => {
        state.pending = true;
      })
      .addCase(AddRejectionNote.fulfilled, (state) => {
        state.pending = false;
      });
    // .addCase(loadPayments.pending, (state)=>{
    //   state.pending = true;
    // })
    // .addCase(loadPayments.fulfilled,(state, action) =>{
    //   state.pending = false;
    //   state.payments = action.payload
    // })
  },
});

export const {
  setIncompleteApplicationsAction,
  setApprovedApplicationsAction,
  setDealersAction,
  setPendingApplicationsAction,
  setActiveCustomersAction,
  setDeclinedApplicationsAction,
  setConditionalApplicationsAction,
} = dealerDashboardSlice.actions;

export const adminDashboardSelector = (state: RootState): AdminDashboardState =>
  state.adminDashboard;

export const approvedApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.approvedApplications;

export const declinedApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.declinedApplications;

export const conditionalApplicationSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.conditionalApplications;

export const userPaymentsSelector = (
  state: RootState
): UserPaymentsInterface[] => state.adminDashboard.userPayments;

export const PaymentsSelector = (state: RootState): PaymentsInterface[] =>
  state.adminDashboard.payments;

export const activeAccountsSelector = (
  state: RootState
): ActiveAccountsInterface[] => state.adminDashboard.activeAccounts;

export const documentsSelector = (state: RootState): DocumentInterface[] =>
  state.adminDashboard.documents;

export const documentSelector = (state: RootState) =>
  state.adminDashboard.document;

export const pendingApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.pendingApplications;

export const incompleteApplicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.adminDashboard.incompleteApplications;

export const notificationsSelector = (
  state: RootState
): NotificationInterface[] => state.dashboard.notifications;

export const rejectionsNotesSelector = (
  state: RootState
): RejectionNotesInterface[] => state.adminDashboard.RejectionNotes;

export const stateSelector = (state: RootState): StateInterface[] =>
  state.adminDashboard.states;

export const dealersSelector = (state: RootState): DealerInterface[] =>
  state.adminDashboard.dealers;

export const dealerItemSelector = (state: RootState): DealerInterface =>
  state.adminDashboard.dealerItem;

export const pendingSelector = (state: RootState) =>
  state.adminDashboard.pending;

export default dealerDashboardSlice.reducer;
