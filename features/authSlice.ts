import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'oidc-client';
import { RootState } from '../app/store';

// here we are typing the types for the state
export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  pending: boolean;

  error: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  pending: false,
  error: false,
};

// This action is what we will call using the dispatch in order to trigger the API call.
// export const sendLoginRequest = createAsyncThunk('auth/login', async ({name, password}: {name: string, password: string}) => {
//     // const response = await axios.post('http://apu.kanye.rest/be', { name, password  });
//     //
//     // return response.data;
//     return { accessToken: 'black',  refreshToken: 'black' }
// });

export const authSlice = createSlice({
  name: 'kanye',
  initialState,
  reducers: {
    sendLoginRequest(state) {
      state.pending = true;
    },
    loginRequestSuccess(state, action: PayloadAction<User>) {
      state.pending = false;
      state.user = action.payload;
    },
    loginRequestFailed(state) {
      state.pending = false;
      state.error = true;
    },
    // leave this empty here
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // eslint-disable-next-line max-len
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
  //     extraReducers: builder => {
  //         builder
  //             .addCase(sendLoginRequest.pending, state => {
  //                 state.pending = true;
  //             })
  //             .addCase(sendLoginRequest.fulfilled, (state, { payload }) => {
  // // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
  //                 state.pending = false;
  //                 state.isLoggedIn = true;
  //                 state.data = payload;
  //                 localStorage.setItem('accessToken', payload.accessToken)
  //             })
  //             .addCase(sendLoginRequest.rejected, state => {
  //                 state.pending = false;
  //                 state.error = true;
  //             });
  //     },
});

export const { sendLoginRequest, loginRequestSuccess, loginRequestFailed } =
  authSlice.actions;

export const authSelector = (state: RootState): AuthState => state.auth;
export const userSelector = (state: RootState): User | null => state.auth.user;

export default authSlice.reducer;
