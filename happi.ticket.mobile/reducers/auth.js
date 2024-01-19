import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogServices from '../logServices';
// import Config from "react-native-config";
// import {API_URL} from "@env";
export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(updateIsLoading(true));
    let response;
    try {
      response = await fetch(
        'https://cyechamp-api-prod-56vj7j6n3a-uc.a.run.app/api/auth/sendotp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: payload,
          }),
        },
      );

      const json = await response.json();
      thunkAPI.dispatch(updateIsLoading(false));
      return json;
    } catch (error) {
      console.error(error);
      LogServices('error', response, error + ''); //check req here
      thunkAPI.dispatch(updateIsLoading(false));
      return {status: false, message: 'internal server error'};
    }
  },
);

export const verify = createAsyncThunk(
  'auth/userlogin',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(updateIsLoading(true));
    let response;
    try {
      response = await fetch(
        'https://tm-api.happimobiles.com/users/userlogin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const json = await response.json();
      console.log('resss',json)
      thunkAPI.dispatch(updateIsLoading(false));
      return json;
    } catch (error) {
      console.error('error', error);
      thunkAPI.dispatch(updateIsLoading(false));
      LogServices('error', response, error + ''); //check req here
      return {status: false, message: 'Employee ID not Registered'};
    }
  },
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOtp',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(updateIsLoading(true));
    console.log('payloadd', payload);
    let response;
    try {
      response = await fetch( 
        'https://tm-api.happimobiles.com/users/verifyOtp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const json = await response.json();
      console.log('response otp', response);

      thunkAPI.dispatch(updateIsLoading(false));
      return json;
    } catch (error) {
      console.error('error', error);
      thunkAPI.dispatch(updateIsLoading(false));
      LogServices('error', response, error + ''); //check req here
      return {status: false, message: 'Employee ID not Registered'};
    }
  },
);

export const discountLogin = createAsyncThunk(
  'auth/discountEmployeeLogin',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(updateIsLoading(true));
    console.log('payloadd', payload);
    let response;
    try {
      response = await fetch( 
        'https://tm-api.happimobiles.com/api/employee/discountEmployeeLogin1',  
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const json = await response.json();
      thunkAPI.dispatch(updateIsLoading(false));
      return json;
    } catch (error) {
      console.error('error', error);
      thunkAPI.dispatch(updateIsLoading(false));
      LogServices('error', response, error + ''); //check req here
      return {status: false, message: 'Employee ID not Registered'};
    }
  },
);
export const discountVerifyOtp = createAsyncThunk(
  'auth/loginverifiyOtp',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(updateIsLoading(true));
    console.log('payloadd', payload);
    let response;
    try { 
      response = await fetch(
        'https://tm-api.happimobiles.com/api/employee/loginverifiyOtp',  
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }, 
      );

      const json = await response.json();
      thunkAPI.dispatch(updateIsLoading(false));
      return json;
    } catch (error) {
      console.error('error', error);
      thunkAPI.dispatch(updateIsLoading(false));
      LogServices('error', response, error + ''); //check req here
      return {status: false, message: 'Enter Valid OTP'};
    }
  },
);

// let nextTodoId = 0;
export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isLoading: false,
    otp_send_resp: undefined,
    phone: '',
    user_data: {},
    token: '',
    verify_data: {},
    latAndLong: [],
    employee_data: {},
    otpVerify: {},
    discountLogin:{},
    discountToken: '', 
    discountOtpVerify: {},
    discountUserData:{},
    storeDetails:{}
  },

  // reducers: {
  //   addTodo(state, action) {
  //     state.push({ id: nextTodoId++, text: action.payload, completed: false })
  //   },
  //   toggleTodo(state, action) {
  //     const todo = state.find(todo => todo.id === action.payload)
  //     if (todo) {
  //       todo.completed = !todo.completed
  //     }
  //   }
  // }
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.otp_send_resp = action.payload;
      } else {
      }

      return state;
    }),
      builder.addCase(verify.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.token = action.payload.token;
          state.verify_data = action.payload.userId;
          AsyncStorage.setItem('token', state.token);
          AsyncStorage.setItem('user', JSON.stringify(state.verify_data));
       
        } else {
        }
        return state;
      }),
      builder.addCase(verifyOTP.fulfilled, (state, action) => {
        if (action.payload.status) {
          console.log('logssss',action.payload) 
          state.storeDetails = action.payload.storeDetails
          state.token = action.payload.token;
          AsyncStorage.setItem('token', state.token);
          AsyncStorage.setItem('user', JSON.stringify(state.verify_data));
          AsyncStorage.setItem('storeDetails', JSON.stringify(state.storeDetails));

        }
        state.otpVerify = action.payload;

        return state;
      });

      builder.addCase(discountLogin.fulfilled, (state, action) => {
        if (action.payload.status) {     
          state.discountToken = action.payload.token;
          state.verify_data = action.payload.userId;
          state.discountUserData = action.payload.userId;
          state.employee_data = action.payload.employeeResponse;
          AsyncStorage.setItem(
            'employeeData',
            JSON.stringify(state.employee_data),
          ); 
          AsyncStorage.setItem('discountUser', JSON.stringify(state.discountUserData));
          AsyncStorage.setItem('discountToken', state.discountToken); 
        }
        state.discountLogin = action.payload;
        return state;
      });
      builder.addCase(discountVerifyOtp.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.discountToken = action.payload.token;
          state.verify_data = action.payload.userId;
          state.discountUserData = action.payload.userId;
          state.employee_data = action.payload.discountEmployee;
          AsyncStorage.setItem(
            'employeeData',
            JSON.stringify(state.employee_data),
          );
          AsyncStorage.setItem('discountUser', JSON.stringify(state.discountUserData));
          AsyncStorage.setItem('discountToken', state.discountToken); 
        }
        state.discountOtpVerify = action.payload;
        return state;
      });
  },
  reducers: {
    updatephone: (state, action) => {
      state.phone = action.payload;
      return state;
    },
    updatetoken: (state, action) => {
      state.token = action.payload;
      return state;
    },
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
      return state;
    },
    updateDiscountToken: (state, action) => {
      state.discountToken = action.payload;
      return state;
    },
  },
});
export const {updatephone, updateIsLoading, updatetoken,updateDiscountToken} = authSlice.actions;

export default authSlice.reducer;
