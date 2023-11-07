import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';
import { RootState } from '../app/store';
import {
  AddUserArgsInterface,
  DealerInterface,
  LoginPayloadInterface,
  UserInterface,
} from '../contracts';
import { addNotification } from './notifications/notificationSlice';

// here we are typing the types for the state
type AuthState = {
  user: UserInterface | null;
  pending: boolean;
  error: boolean;
  errorMessage: string;
  applicationDealers: DealerInterface[];
  approvalCode: number | string;
};

const initialState: AuthState = {
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  pending: false,
  error: false,
  errorMessage: '',
  approvalCode: null,
  applicationDealers: [],
};


export const sendLoginRequest = createAsyncThunk(
  'auth/sendLoginRequest',
  async (userData: LoginPayloadInterface) => {
    console.log(userData)
    const res = await fetch('https://tlcfin.prestoapi.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData }),
    });

    const response: UserInterface = await res.json();
    return response;
  }
);
export const addUserLogin = createAsyncThunk(
  'auth/addUserLogin',
  async (userData: LoginPayloadInterface, thunkApi) => {
    let res;
    try {
      res = await fetch('https://tlcfin.prestoapi.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ...userData }),
      });

      const response: UserInterface = await res.json();

      if (res.status === 200) {
        thunkApi.dispatch(
          addNotification({
            type: 'success',
            autoHideDuration: 6000,
            message: 'New Login Added',
          })
        );
      }

      return response;
    } catch (error) {
      if (res.status === 409) {
        thunkApi.dispatch(
          addNotification({
            type: 'error',
            autoHideDuration: 6000,
            message: 'Email Already exists',
          })
        );
      }
    }
  }
);
export const editUserInfo = createAsyncThunk(
  'auth/edituserinfo',
  async (userData: LoginPayloadInterface, thunkApi) => {

    delete userData.token;
    delete userData.expMinutes
    delete userData.LastUpdated
   delete userData.ID
    delete userData.DealerID

    let res;
    try {
      res = await fetch(`https://tlcfin.prestoapi.com/api/edituserpassword/${userData.ProfileGUID}`, {
        method: 'PuT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify( userData ),
      });

      const response: UserInterface = await res.json();
      console.log(res)
      if (res.status === 200) {
        thunkApi.dispatch(
          addNotification({
            type: 'success',
            autoHideDuration: 6000,
            message: 'Account Updated',
          })
        );
      }
      return response;
    } catch (error) {
      console.log(error)

    }
  }
);

export const addUser = createAsyncThunk(
  'dashboard/addUser',
  async ({ payload }: AddUserArgsInterface, thunkApi) => {
    const res = await fetch('https://tlcfin.prestoapi.com/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    });
    const response: [{ ApprovalCode: string }] = await res.json();

    if (response[0].ApprovalCode === 'Account Exists') {
      thunkApi.dispatch(
        addNotification({
          type: 'error',
          autoHideDuration: 6000,
          message: 'Account already exists',
        })
      );
    }

    return response[0].ApprovalCode;
  }
);
export const getUserByEmail = createAsyncThunk(
  'dashboard/getUserByEmail',
  async (payload,thunkApi) => {
    const res = await fetch(`https://tlcfin.prestoapi.com/api/getuserbyemail/${payload}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
     
    });
   
    const response = await res.json();



    return response
  }
);
export const sendApprovalEmail = createAsyncThunk(
  'dashboard/sendApprovalEmail',
  async (payload: any, thunkApi) => {
    let email;
    if (payload.fromContact === true) {
      email = payload.emailMessage;
    } else {
      email = {
        ToAddress: payload[0],
        FromAddress: 'admin@tlc.com',
        FromDisplayName: 'Tony Montana',
        Subject: 'Approval Code',
        Body: payload[1],
        APIKey: process.env.NEXT_PUBLIC_EMAILAPIKEY,
        cc: '',
        bcc: '',
      };
    }

    const res = await fetch('https://sendmail.3nom.com/SendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    const response: [] = await res.json();
    return response;
  }
);

export const loadApplicationDealers = createAsyncThunk(
  'dashboard/LoadApplicationDealers',
  async () => {
    const response = await fetch('https://tlcfin.prestoapi.com/api/dealers');
    const result: DealerInterface[] = await response.json();

    return result;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAction(state, action: PayloadAction<UserInterface>) {
      state.user = action.payload;
    },
    logoutAction(state) {
      state.user = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginRequest.pending, (state) => {
        state.pending = true;
        state.error = false;
      })
      .addCase(sendLoginRequest.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.error = false;
        state.user = payload;
        localStorage.setItem('accessToken', payload.token);
        localStorage.setItem('userInfo', JSON.stringify(payload));
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Invalid credentials';
      })
      .addCase(addUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(addUser.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.approvalCode = payload;
        state.pending = false;
      })
      .addCase(loadApplicationDealers.pending, (state) => {
        state.pending = true;
      })
      .addCase(loadApplicationDealers.rejected, (state) => {
        state.pending = false;
        state.error = true;
        state.errorMessage = 'Loading dealers failed';
      })
      .addCase(loadApplicationDealers.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.applicationDealers = payload;
      })
      .addCase(editUserInfo.pending, (state, { payload }) => {
        state.pending = true;
    
      })
      .addCase(editUserInfo.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.user = payload
    
      });
  },
});

export const { setUserAction, logoutAction } = authSlice.actions;

export const authSelector = (state: RootState): AuthState => state.auth;
export const isAuthorizedSelector = (state: RootState): boolean =>
  isDefined(state.auth.user);
export const userSelector = (state: RootState): UserInterface | null =>
  state.auth.user;
export const approvalCodeSelector = (state: RootState): number | string =>
  state.auth.approvalCode;
export const applicationDealersSelector = (
  state: RootState
): DealerInterface[] => state.auth.applicationDealers;

export default authSlice.reducer;
