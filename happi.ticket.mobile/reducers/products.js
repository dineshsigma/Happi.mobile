import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64';
import axios from 'axios';
import moment from 'moment/moment';
import LogServices from '../logServices'
export const getProductDetails = createAsyncThunk('incentives/getItemCode', async (payload, thunkAPI) => {
  let response;
  try {
    thunkAPI.dispatch(updateIsLoading(true));
     response = await fetch(`https://dev-services.happimobiles.com/api/emp/searchIteamName?name=${payload}`, {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    thunkAPI.dispatch(updateIsLoading(false));
    return json;

  } catch (error) {
    LogServices('error', response, error + "") //check req here
    // thunkAPI.dispatch(updateIsLoading(false));
    // return { status: false, message: "internal server error" };
  }
})

export const getProductPrice = createAsyncThunk('incentives/getApxPrice', async (payload, thunkAPI) => {
  let respo;
  let offerDets;
  try {
    thunkAPI.dispatch(updateIsLoading(true));
    const response = await fetch('https://dev-services.happimobiles.com/api/emp/apxPrice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify(payload)
    });
    const json = await response.json();
    let offersPayload = {
      // category: [json?.apxProductRes?.PROD_CATG_NAME],
      apx_code: json?.data[0]?.ITEM_NAME,
      // price: json?.data[0]?.ITEM_PRICE,
      // brand : [json?.apxProductRes?.BRAND_NAME] 
    }
     respo = await fetch('https://dev-services.happimobiles.com/api/emp/storeOffers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify(offersPayload)
    });
    const offersjson = await respo.json();
    offerDets = await fetch('https://dev-services.happimobiles.com/api/emp/listOfStoreOffers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify(offersPayload)
    });
    const offerDetails = await offerDets.json();
    const finalJson = {
      price: json,
      offers: offersjson,
      offerDetails: offerDetails
    }
    thunkAPI.dispatch(updateIsLoading(false));
    return finalJson;
  } catch (error) {
    LogServices('error', respo, error + "") //check req here
    return { status: false, message: "internal server error" };
  }
})

export const getBarcodeDetails = createAsyncThunk('incentives/getBarCode', async (payload, thunkAPI) => {
  let response;
  try {
    response = await fetch('https://dev-services.happimobiles.com/api/emp/apxPrice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify(payload)
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    LogServices('error', response, error + "") //check req here
    return { status: false, message: "internal server error" };
  }
})

export const iphoneUpload = createAsyncThunk('auth/upload', async (payload, thunkAPI) => {
let response;
  try {
    thunkAPI.dispatch(uploadLoder(true));
     response = await fetch('https://dev-services.happimobiles.com/api/emp/matchIMEINumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    thunkAPI.dispatch(uploadLoder(false));
    return json;
  } catch (error) {
    thunkAPI.dispatch(uploadLoder(false));
    LogServices('error', response, error + "") //check req here
    return { status: false, message: "internal server error" };
  }
})



export const getBarcodeImage = createAsyncThunk('auth/getbarcode', async (payload, thunkAPI) => {
  thunkAPI.dispatch(uploadLoder(true));
  let response;
  try {
    response = await fetch('https://dev-services.happimobiles.com/api/emp/generateQRcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    const json = await response.text();
    thunkAPI.dispatch(uploadLoder(false));
    let barcodeImage = JSON.parse(json)
    return barcodeImage;
  } catch (error) {
    console.error(error);
    LogServices('error', response, error + "") //check req here
    thunkAPI.dispatch(uploadLoder(false));
    return { status: false, message: "internal server error" };
  }
})

export const getReports = createAsyncThunk('store/getReports', async (payload, thunkAPI) => {
  let userDetails;
  let response;
  if (payload.type == "all") {
    userDetails = JSON.parse(payload.userDetails)

  }
  try {
    thunkAPI.dispatch(updateIsLoading(true))
    let url;
    if (payload.type == "all") {
      url = `https://dev-services.happimobiles.com/api/emp/getStoreWiseReports1?id=${userDetails._id}&from_date=all&to_date=all`
    }
    if (payload.type == "filter") {
      url = `https://dev-services.happimobiles.com/api/emp/getStoreWiseReports1?id=${payload.userDetails._id}&from_date=${payload.startDate}&to_date=${payload.endDate}`
    }
    response = await fetch(url, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    thunkAPI.dispatch(updateIsLoading(false))
    return json;

  } catch (error) {
    console.error(error);
    LogServices('error', response, error + "") //check req here
    // thunkAPI.dispatch(updateIsLoading(false));
    // return { status: false, message: "internal server error" };
  }
})

// function for IMEI verification
export const ImeiVerification = createAsyncThunk('incentives/ImeiVerification', async (payload, thunkAPI) => {
  let response;
  try {
     thunkAPI.dispatch(setBarcodeVerificationLoader(true));
     response = await fetch(`https://dev-services.happimobiles.com/api/emp/verifyImeiNumber?id=${payload}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
     thunkAPI.dispatch(setBarcodeVerificationLoader(false));
    return json;

  } catch (error) {
    LogServices('error', response, error + "") //check req here
    // thunkAPI.dispatch(updateIsLoading(false));
    // return { status: false, message: "internal server error" };
  }
})

//function for file upload
export const IMEIFileUpload = createAsyncThunk('auth/IMEIFileUpload', async (payload, thunkAPI) => {
  LogServices('debug', payload, 'File upload payload' ) //check req here
  var formdata = new FormData();
  let response;
  formdata.append("file", payload.file, payload.file.uri);
  formdata.append("id", payload.id);
  // LogServices('debug', payload, 'File upload payload formData',formdata ) //check req here
    try {
    thunkAPI.dispatch(uploadLoder(true));
    response = await fetch('https://dev-services.happimobiles.com/api/emp/getQRCodeUploadIMEINumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body:formdata,
      redirect: 'follow'
    });
    const json = await response.json()
    LogServices('debug', payload, 'After file uploading response',json ) //check req here

    let verificationPayload = {
      id: payload.id,
      imageResponse: json
    }
    LogServices('debug', payload, 'Entering IMEI verification' ,verificationPayload) //check req here
    const validationResponse = await fetch('https://7089-182-156-148-35.ngrok-free.app/api/emp/checkUploadIMEINumberScreenShoot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(verificationPayload),
    });
    const jsonResponse = await validationResponse.json()
    LogServices('debug', payload, 'After IMEI verification' ,jsonResponse) //check req here

    thunkAPI.dispatch(uploadLoder(false));
    return jsonResponse;
  } catch (error) {
    console.error(error);
    thunkAPI.dispatch(uploadLoder(false));
    LogServices('error', response, error + "") //check req here
    return { status: false, message: "internal server error" };
  }
})

export const checkInvoiceNumber = createAsyncThunk('auth/checkInvoiceNumber', async (payload, thunkAPI) => {
  let response;
  try {
    thunkAPI.dispatch(uploadLoder(true));
    response = await fetch('https://dev-services.happimobiles.com/api/emp/checkInvoiceNumber', {
            method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    
    thunkAPI.dispatch(uploadLoder(false));
    return json;
  } catch (error) {
    console.error(error);
    LogServices('error', response, error + "") //check req here
    thunkAPI.dispatch(uploadLoder(false));
    return { status: false, message: "internal server error" };
  }
})

export const activityLogs = createAsyncThunk('auth/employeeLoginCount', async (payload, thunkAPI) => {
  let response;
  try {
    response = await fetch('https://tm-api.happimobiles.com/api/employeeactivity/employeeLoginCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    LogServices('error', response, error + "") //check req here
    return { status: false, message: "internal server error" };
  }
})
export const productsSlice = createSlice({
  name: 'products',

  initialState: {
    isLoading: false,
    productSearch_data: {},
    productPrice: {},
    barCodeResponse: {},
    uploadResponse: {},
    invoiceNumber: undefined,
    uploadLoading: false,
    barcode: {},
    storeWiseReports: {},
    IMEI_VerificationResponse: {},
    IMEIFileUploadResponse: {},
    checkInvoiceNumberResponse:{},
    barcodeVerificationLoader : false,
    activityLogRes:{}
  },
  reducers: {
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
      return state;
    },
    updateEmptyVal: (state, action) => {
      state.productSearch_data = action.payload;
      return state;
    },
    invoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
      return state;
    },
    uploadResponseEmpty: (state, action) => {
      state.uploadResponse = action.payload;
      return state;
    },
    uploadLoder: (state, action) => {
      state.uploadLoading = action.payload;
      return state;
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;
      return state;
    },
    setFileUploadResponse: (state, action) => {
      state.IMEIFileUploadResponse = action.payload;
      return state;
    },
    setImeiVerificationResponse: (state, action) => {
      state.IMEI_VerificationResponse = action.payload;
      return state;
    },
    setBarcodeVerificationLoader: (state, action) => {
      state.barcodeVerificationLoader = action.payload;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.productSearch_data = action.payload;
      return state;
    })
    builder.addCase(getProductPrice.fulfilled, (state, action) => {
      state.productPrice = action.payload;
      return state;
    })

    builder.addCase(getBarcodeDetails.fulfilled, (state, action) => {
      state.barCodeResponse = action.payload;
      return state;
    })

    builder.addCase(iphoneUpload.fulfilled, (state, action) => {
      state.uploadResponse = action.payload;
      return state;
    })
    builder.addCase(getBarcodeImage.fulfilled, (state, action) => {
      state.barcode = action.payload;
      return state;
    })

    builder.addCase(getReports.fulfilled, (state, action) => {
      state.storeWiseReports = action.payload;
      return state;
    })
    builder.addCase(ImeiVerification.fulfilled, (state, action) => {
      state.IMEI_VerificationResponse = action.payload;
      return state;
    })
    builder.addCase(IMEIFileUpload.fulfilled, (state, action) => {
      state.IMEIFileUploadResponse = action.payload;
      return state;
    })
    builder.addCase(checkInvoiceNumber.fulfilled, (state, action) => {
      state.checkInvoiceNumberResponse = action.payload;
      return state;
    })
    builder.addCase(activityLogs.fulfilled, (state, action) => {
      state.activityLogRes = action.payload;
      return state;
    })
  }
})

export const { updateIsLoading, updateEmptyVal, uploadResponseEmpty, invoiceNumber, uploadLoder, setBarcode,setFileUploadResponse,setImeiVerificationResponse,setBarcodeVerificationLoader} = productsSlice.actions

export default productsSlice.reducer