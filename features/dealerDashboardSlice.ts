import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Simulate } from 'react-dom/test-utils';
import {
  AddApplicationArgs,
  ApplicationInterface,
  NotificationInterface,
  DocumentInterface,
  DocumentTypeInterface,
  RejectionNotesInterface,
} from '../contracts';
import { RootState } from '../app/store';
import load = Simulate.load;
import { addNotification } from './notifications/notificationSlice';

type DashboardState = {
  applications: ApplicationInterface[];
  notifications: NotificationInterface[];
  applicationItem: ApplicationInterface;
  pending: boolean;
  error: boolean;
  errorMessage: string;
  remoteIp: {};
  documents: DocumentInterface[];
  documentTypes: DocumentTypeInterface[];
  RejectionNotes: RejectionNotesInterface[];
  VehicleInfo:[]
};

const initialState: DashboardState = {
  applications: [],
  notifications: [],
  applicationItem: null,
  pending: false,
  error: false,
  errorMessage: '',
  documentTypes: [],
  documents: [],
  remoteIp: {},
  RejectionNotes: [],
  VehicleInfo : []
};

export const loadDocumentTypes = createAsyncThunk(
  'dashboard/loadDocumentTypes',
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
  'dashboard/uploadDocument',
  async (data: any, thunkApi) => {
   
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
  'dashboard/getDocuments',
  async (data: any) => {
 
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
export const getIpAddress = createAsyncThunk(
  'dashboard/getIpAddress',
  async () => {
    const res = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
    });
    const response = await res.json();
    return response;
  }
);
export const getVehicleInfoByVin = createAsyncThunk(
  'dashboard/getVehicleInfoByVin',
  async (vin:string) => {
    const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`, {
      method: 'GET',
    });
    const response = await res.json();
    return response;
  }
);
export const loadApplications = createAsyncThunk(
  'dashboard/loadApplications',
  async (userId: string) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/getaplications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ userid: Number(userId) }),
    });
    const response: ApplicationInterface[] = await res.json();
    return response;
  }
);

export const loadApplicationItem = createAsyncThunk(
  'dashboard/loadApplicationItem',
  async (data: any, thunkApi) => {
  
    const res = await fetch('https://tlcfin.prestoapi.com/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ id: Number(data.appId || data.id) }),
    });
    const response: ApplicationInterface[] = await res.json();
  
    if (res.status === 200 && data.appId) {
      let dataToSend = { userid: data.userId, ApplicationID: data?.appId };
      let noteData = { id: data?.appId, status: response[0].StatusID };
    
      thunkApi.dispatch(getDocuments(dataToSend));
      thunkApi.dispatch(loadRejectionNotes(noteData));
    }

    return response[0];
  }
);

export const updateApplication = createAsyncThunk(
  'dashboard/updateApplication',
  async (payload: any, thunkApi) => {
 
    const res = await fetch(
      'https://tlcfin.prestoapi.com/api/updateapplication',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const response: any[] = await res.json();

    if (res.status === 200) {
      const appId = payload.ApplicationID;
   
      thunkApi.dispatch(loadApplicationItem({ id: payload.ApplicationID }));
    }

    if (response[0]?.Message === 'Success') {
      thunkApi.dispatch(
        addNotification({
          type: 'success',
          message: 'Application has been updated',
          autoHideDuration: 6000,
        })
      );
    }
  }
);
export const addApplication = createAsyncThunk(
  'dashboard/addApplication',
  async (payload: AddApplicationArgs, thunkApi) => {

    const res = await fetch('https://tlcfin.prestoapi.com/api/addapplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    });
    const response: any[] = await res.json();

    if (res.status === 200) {
      thunkApi.dispatch(
        addNotification({
          type: 'success',
          message: 'Application has been added',
          autoHideDuration: 6000,
        })
      );
    }
  }
);

export const loadNotifications = createAsyncThunk(
  'dashboard/loadNotifications',
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

export const loadRejectionNotes = createAsyncThunk(
  'dashboard/loadRejectionNotes',
  async (data: {}) => {
  
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

export const AddNote = createAsyncThunk(
  'dashboard/AddNote',
  async (data: any, thunkApi) => {
    let noteData = { id: data.ApplicationID, status: data.StatusID };

 
    const res = await fetch('https://tlcfin.prestoapi.com/api/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    const results = await res.json();
   
    if (res.status === 200) {
      thunkApi.dispatch(loadRejectionNotes(noteData));
    }
    return results;
  }
);
export const AssignToDealer = createAsyncThunk(
  'dashboard/assignToDealer',
  async (data: any, thunkApi) => {
   
    const res = await fetch('https://tlcfin.prestoapi.com/api/assigndealer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });
 if (res.status === 200) {
      thunkApi.dispatch(loadApplications(data.LastUpdatedBy));
    }
    if(res.status !== 200){
      thunkApi.dispatch(
        addNotification({
          type: 'error',
          message: 'Error with approval code',
          autoHideDuration: 6000,
        })
      );
    }

    const results = await res.json();
   
    return results;
  }
);



export const dealerDashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setApplicationsAction(
      state,
      { payload }: PayloadAction<ApplicationInterface[]>
    ) {
      state.applications = payload;
    },
    setNotificationsAction(
      state,
      { payload }: PayloadAction<NotificationInterface[]>
    ) {
      state.notifications = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApplications.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApplications.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.applications = payload;
        state.applications = state.applications.length && state.applications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadApplications.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading applications failed';
      })
      .addCase(loadNotifications.pending, (state) => {
        // state.pending = true;
      })
      .addCase(loadNotifications.fulfilled, (state, { payload }) => {
        // state.pending = false;
        state.notifications = payload;
        state.notifications = state.notifications.length && state.notifications.map((item) => ({
          ...item,
          isShown: true,
        }));
      })
      .addCase(loadNotifications.rejected, (state, { payload }) => {
        // state.pending = false;
        state.error = true;
        state.errorMessage = 'Error loading notifications';
      })
      .addCase(loadApplicationItem.pending, (state) => {
        state.pending = true;
        state.VehicleInfo = [];
      })
      .addCase(loadApplicationItem.fulfilled, (state, { payload }) => {
        // state.pending = false;
        state.applicationItem = payload;
        state.VehicleInfo = [];

      })
      .addCase(loadApplicationItem.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading application failed';
      })
      .addCase(updateApplication.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(updateApplication.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Adding application failed';
        state.pending = false;
      })
      .addCase(updateApplication.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(addApplication.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(addApplication.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Adding application failed';
        state.pending = false;
      })
      .addCase(addApplication.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(loadDocumentTypes.pending, (state) => {
        // state.pending = true;
      })
      .addCase(loadDocumentTypes.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Loading document types failed';
        // state.pending = false;
      })
      .addCase(loadDocumentTypes.fulfilled, (state, { payload }) => {
        state.documentTypes = payload;
        // state.pending = false;
      })
      .addCase(getDocuments.pending, (state) => {
        // state.pending = true;
      })
      .addCase(getDocuments.rejected, (state) => {
        state.error = true;
        state.errorMessage = 'Loading documents failed';
      })
      .addCase(getDocuments.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.documents = payload;
      })
      .addCase(getIpAddress.pending, (state) => {
        state.pending = true;
      })
      .addCase(getIpAddress.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.remoteIp = payload.ip;
      })
      .addCase(uploadDocument.pending, (state) => {
        state.pending = true;
      })
      .addCase(uploadDocument.fulfilled, (state) => {
        state.pending = false;
      })

      .addCase(loadRejectionNotes.pending, (state) => {
        // state.pending = true
      })
      .addCase(loadRejectionNotes.fulfilled, (state, { payload }) => {
        // state.pending = false
        state.RejectionNotes = payload;
      })
      .addCase(AddNote.pending, (state) => {
        state.pending = true;
      })
      .addCase(AddNote.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(AssignToDealer.pending, (state) => {
        state.pending = true;
      })
      .addCase(AssignToDealer.rejected, (state, action) => {
        state.pending = false;
        state.errorMessage = 'Error with approval code';
      })
      .addCase(AssignToDealer.fulfilled, (state) => {
        state.pending = false;
      })
      // .addCase(getVehicleInfoByVin.pending, (state) =>{
      //   state.pending = true
      // })
      .addCase(getVehicleInfoByVin.fulfilled, (state, {payload}) =>{
        // state.pending = false;
        state.VehicleInfo = payload.Results[0]
      })
      
  },
});

export const { setApplicationsAction, setNotificationsAction } =
  dealerDashboardSlice.actions;

export const dealerDashboardSelector = (state: RootState): DashboardState =>
  state.dashboard;
export const applicationsSelector = (
  state: RootState
): ApplicationInterface[] => state.dashboard.applications;

export const notificationsSelector = (
  state: RootState
): NotificationInterface[] => state.dashboard.notifications;

export const singleApplicationSelector = (
  state: RootState
): ApplicationInterface => state.dashboard.applicationItem;

export const documentTypesSelector = (
  state: RootState
): DocumentTypeInterface[] => state.dashboard.documentTypes;

export const documentSelector = (state: RootState): DocumentInterface[] =>
  state.dashboard.documents;

export const ipAddressSelector = (state: RootState) => state.dashboard.remoteIp;

export const vehicleInfoSelector = (state: RootState) => state.dashboard.VehicleInfo;

export const notesSelector = (state: RootState) =>
  state.dashboard.RejectionNotes;
export const pendingSelector = (state: RootState) => state.dashboard.pending;

export default dealerDashboardSlice.reducer;
