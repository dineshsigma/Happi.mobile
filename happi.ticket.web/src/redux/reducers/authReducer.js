import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { client, baseUrl } from "../../environment";
import { toast } from "react-toastify";
import axios from "axios";
import CryptoJS from "crypto-js";





const orgReg = gql`
  mutation orgRegistration($object: FirsttimeOrganizationRegistrationInput!) {
    org_registration(arg1: $object) {
      message
      status
    }
  }
`;

const getUserByOrgIdQuery = gql`
  query getUserOrgByid($user_id: Int!) {
    user_org(where: { user_id: { _eq: $user_id } }) {
      id
      department_id
      location_id
      role_id
      reporting_manager
      org_id
      designation_id
      is_active
      active_time
      id
    }
  }
`;

const changeOrgMutation = gql`
  mutation changeorganization($object: change_org_insert_input!) {
    changeOrganization(arg1: $object) {
      accessToken
      current_organization
      message
      status
    }
  }
`;

const verifyUserQuery = gql`
  query getuser($input: String!) {
    users(
      where: { _or: [{ phone: { _eq: $input } }, { email: { _eq: $input } }] }
    ) {
      name
      lastname
      created_at
      email
      phone
      is_delete
      id
      password
      pin
      login_type
    }
  }
`;

export const loginCount = createAsyncThunk(
  "auth/empLoginCount",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://happi-ticket-api-qa-4at4ivbija-uc.a.run.app/api/employeeactivity/employeeLoginCount`,
        payload
      );
      // console.log("response-----", response);
    } catch (error) {
      console.log(error);
    }
    return 
  }
);
export const loginOtpVerify = createAsyncThunk('auth/loginOtpVerify', async (payload, thunkAPI) => {
  //  console.log('login payload', payload)
  thunkAPI.dispatch(setAuthBtnLoading(true))
  let data = {}
  try {
    const response = await axios.post(`https://happi-ticket-api-qa-4at4ivbija-uc.a.run.app/users/verifyOtp`, payload);
    if (response.data.token) {
      data = {
        success: true,
        message: 'Login Successful'
      }
      // console.log(response)
      toast.success(data.message);
      return response.data;
    } else {
      data = {
        success: true,
        message: response.data.message
      }
      toast.error(response.data.message);
      localStorage.clear()
    }
  } catch (error) {
    console.log(error)
    data = {
      success: false,
      message: 'Network Error'
    }
    toast.error(data.message);
    localStorage.clear()
  }
  return data;
})

export const adminlogin = createAsyncThunk('auth/adminlogin', async (payload, thunkAPI) => {
  //  console.log('login payload', payload)
  thunkAPI.dispatch(setAuthBtnLoading(true))
  let data = {}
  try {
    const response = await axios.post(`https://happi-ticket-api-qa-4at4ivbija-uc.a.run.app/users/userlogin`, payload);
    if(response.data.status){
      // thunkAPI.dispatch(setAuthBtnLoading(false))
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
      localStorage.clear()
    }
    // if (response.data.token) {
    //   data = {
    //     success: true,
    //     message: 'Login Successful'
    //   }
    //   console.log(response)
    //   thunkAPI.dispatch(setAuthBtnLoading(false))
    //   toast.success(data.message);
    //   return response.data;
    // } else {
    //   data = {
    //     success: true,
    //     message: response.data.message
    //   }
    //   toast.error(response.data.message);
    //   localStorage.clear()
    // }

  } catch (error) {
    console.log(error)
    data = {
      success: false,
      message: 'Network Error'
    }
    toast.error(data.message);
    localStorage.clear()
  }
  return
})


export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setAuthBtnLoading(true));
    let temp = {
      phone: payload.phone,
      type: "admin",
    };
    var response;
    var pass = "";
    const secret = "1584FFBB3C6D5F74A5A41E7D3674A";
    var str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#";
    for (let i = 1; i <= 12; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    try {
      const hash = CryptoJS.AES.encrypt(payload.phone, secret).toString();
      var config = {
        headers: {
          "x-sign": hash,
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "POST",
        // url: "https://7e21-183-83-216-63.in.ngrok.io/api/user-login",
        url: 'https://dev-services.happimobiles.com/api/user-login',
        data: JSON.stringify(temp),
      };
      response = await axios(config);
    } catch (error) {
      console.log("error", error);
    }
    localStorage.setItem("userLoginPhone", payload.phone);
    return response.data;
  }
);

export const otpVerify = createAsyncThunk(
  "auth/otpVerify",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setAuthBtnLoading(true));
        let temp = {
            phone: localStorage.getItem('userLoginPhone'), 
            otp: payload.otp
        };
        var response;
        const otpUrl = 'https://dev-services.happimobiles.com';
        try {
            response = await axios.post(`${otpUrl}/api/user-verify`, temp);
        } catch (error) {
            console.log('error', error);
        }
        if(response.data.status){  
            if(localStorage != null){
                localStorage.clear();
            } 
            var hours = 24; // Reset when storage is more than 24hours
            var now = new Date();
            now.setHours(now.getHours() + 23);
            var time =  now.getTime();
            localStorage.setItem("timeout", time);
            localStorage.setItem('userDetails', JSON.stringify(response.data.data));
            localStorage.setItem('accessToken', response.data.token);
        }
        return response.data;
  }
);

export const organizationRegistartion = createAsyncThunk(
  "organizations/create",
  async (payload, thunkAPI) => {
    //console.log("Create Organization Payload ...................", payload)
    let data = {};
    try {
      const response = await client.mutate({
        mutation: orgReg,
        variables: {
          object: payload,
        },
      });
      data = {
        status: response.data.org_registration.status,
        message: response.data.org_registration.message,
      };

      return data;
    } catch (e) {
      //console.log('error', e)
      data = {
        status: false,
        message: e.message,
      };
      // console.log("response+++++++", data);
      toast.error(data.message);
    }
    return data;
  }
);


export const getUserOrgByid = createAsyncThunk(
  "users/byOrgId",
  async (payload, thunkAPI) => {
    //console.log("user++++++++++++++++++++++++", payload)
    try {
      const response = await client.mutate({
        mutation: getUserByOrgIdQuery,
        variables: {
          user_id: `${payload}`,
        },
      });
      // console.log("userDetails", response.data.user_org);
      return response.data.user_org;
    } catch (e) {
      console.log("error", e);
    }
  }
);

export const changeCurrentOrg = createAsyncThunk(
  "users/changeOrg",
  async (payload, thunkAPI) => {
    try {
      const response = await client.mutate({
        mutation: changeOrgMutation,
        variables: {
          object: {
            org_id: payload,
          },
        },
      });
      return response.data.changeOrganization;
    } catch (e) {
      console.log("error", e);
    }
  }
);

export const validateUser = createAsyncThunk(
  "users/verifyUser",
  async (payload, thunkAPI) => {
    try {
      const response = await client.mutate({
        mutation: verifyUserQuery,
        variables: {
          input: `${payload}`,
        },
      });

      return response.data.users[0];
    } catch (e) {
      console.log("error", e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    available_organizations: [],
    current_organization: "",
    toggleSideMenu: false,
    toggleSubMenu: false,
    user_id: "",
    userDetails: {},
    authBtnLoading: false,
    userOrgDetails: {},
    isLoggedIn: false,
    org_id: undefined,
    accessFor: [],
    emp_id: ""
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      // state.org_id = action.payload.org_id;
      // state.isLoggedIn = action.payload;
      return state;
    },
    [otpVerify.fulfilled]: (state, action) => {
      state.isLoggedIn = action.payload.status;
      state.accessFor = action.payload.data.access;
      return state;
    },
    [loginOtpVerify.fulfilled]: (state, action) => {
      // console.log("action",action);
      if (action.payload.token) {
        state.accessToken = action.payload.token;
        state.user_id = action.payload.userId._id;
        state.emp_id = action.payload?.userId?.emp_code;
        state.current_organization = action.payload.current_organization;
        //state.user_id = action.payload.data.user_id;
        state.available_organizations = action.payload.available_organizations;
        localStorage.setItem('token', action.payload.token)
      }
      return state;
    },
    
  },
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = ""
      state.userDetails = {}
      state.userOrgDetails = {}
      state.user_id = ''
      state.available_organizations = []
      state.current_organization = ''
      state.notificationList = []
      localStorage.clear()
      return state;
    },
    setAuthBtnLoading: (state, action) => {
      state.authBtnLoading = action.payload;
    },
    setToggleMenu: (state, action) => {
      state.toggleSideMenu = action.payload;
    },
    // setToggleSubMenu: (state, action) => {
    //   state.toggleSubMenu = action.payload.status;
    // }
  },
});

export const { logOut, setAuthBtnLoading, setToggleMenu } = authSlice.actions;

export default authSlice.reducer;
