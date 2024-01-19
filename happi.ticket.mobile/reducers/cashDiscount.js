import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64';
import axios from 'axios';
import LogServices from '../logServices';

export const getStoreList = createAsyncThunk('discount/getstoreList', async (payload, thunkAPI) => {
    let response;  
    let userDetails = JSON.parse(payload)
    try {
        // thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/discount/getEmployeeStoreHeadList?id=${userDetails?._id}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json' 
            },
        });
        const json = await response.json();
        // thunkAPI.dispatch(updateIsLoading(false));
        let list ={}
        let ar = []
        json.data.map((item) => {
            let obj = {}
            obj['key'] = item._id
            obj['value'] = item.store_name
            ar.push(obj)
        })
        list["data"] = ar
        list['employData'] = json.employeeManagementResponse
        return list;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getMakeList = createAsyncThunk('discount/getMakeList', async (payload, thunkAPI) => {
    let response;
    try {
        //   let  userDetails = JSON.parse(payload)
        // thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/discount/getBrandNames`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        // thunkAPI.dispatch(updateIsLoading(false));
        let list = []
        json.data.map((item) => {
            let obj = {}
            obj['key'] = item
            obj['value'] = item
            list.push(obj)
        })
        return list;
    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})


export const getDiscountHistory = createAsyncThunk('discount/getHistoryDiscount', async (payload, thunkAPI) => {
    let response;
    
    try {
          let  userDetails = JSON.parse(payload.user)
          let url;
        thunkAPI.dispatch(updateIsLoading(true));
        if(payload.reference == '' || payload.reference.length<4){
            url=`https://tm-api.happimobiles.com/api/discount/getHistoryDiscount?id=${userDetails?._id}`
        }
        else if(payload.reference.length>=4){
            url=`https://tm-api.happimobiles.com/api/discount/getHistoryDiscount?id=${userDetails?._id}&reference_no=${payload.reference}`
        }
         response = await fetch(url, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        thunkAPI.dispatch(updateIsLoading(false));
        return json.awaitingApprovaldata;
    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getReportsReference = createAsyncThunk('discount/getDiscountReferenceDetails', async (payload, thunkAPI) => {
    let response;
    try { 
        let url;
        thunkAPI.dispatch(updateIsLoading(true));
        url=`https://tm-api.happimobiles.com/api/discount/getDiscountReferenceDetails?reference_no=${payload.reference}`
         response = await fetch(url, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        thunkAPI.dispatch(updateIsLoading(false));
        return json.usedDiscountdata;
    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getModalList = createAsyncThunk('discount/getModalList', async (payload, thunkAPI) => {
    let response;
    try {
        // thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/discount/getItemNames`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body:
            JSON.stringify(payload)
        });
        const json = await response.json();
        // thunkAPI.dispatch(updateIsLoading(false));
        let list = []
        json.message.map((item) => {
            let obj = {}
            obj['key'] = item.ITEM_NAME
            obj['value'] = item.ITEM_NAME
            list.push(obj)
        })
        return list;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getModalPrice = createAsyncThunk('discount/getModalPrice', async (payload, thunkAPI) => {
    let response;
    try {
         thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/discount/getDiscountPrice`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body:
            JSON.stringify(payload)
        });
        const json = await response.json();
         thunkAPI.dispatch(updateIsLoading(false));
        // let list = []
        // json.message.map((item) => {
        //     let obj = {}
        //     obj['key'] = item._id
        //     obj['value'] = item.ITEM_NAME
        //     list.push(obj)
        // })
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const checkAutorizeDiscount = createAsyncThunk('discount/checkAutorizeDiscount', async (payload, thunkAPI) => {
    let response;
    console.log
    try {
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/discount/authorisedDiscount`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body:
            JSON.stringify(payload)
        });
        const json = await response.json();
        let per;
        if(json.status == true) {
            per =  (payload.totalPrice * payload.discountPrice)/100;
            json["discountPercentage"] = payload.totalPrice - per.toFixed(2)
            json["finalPrice"] = payload.totalPrice - payload.discountPrice
        }
        thunkAPI.dispatch(updateIsLoading(false)); 
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getcashApprover = createAsyncThunk('discount/cashApprover', async (payload, thunkAPI) => {
    let response;
    try {
        // thunkAPI.dispatch(updateIsLoading(true));
        response = await fetch(`https://tm-api.happimobiles.com/api/discount/getCashApprover`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body:
            JSON.stringify(payload)
        });
        const json = await response.json();
        let list = []
        json.data.map((item) => {
            let obj = {}
            obj['key'] = item._id
            obj['value'] = item.name
            list.push(obj)
        })
        return list;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const verifyPhoneNumber = createAsyncThunk('discount/discountSendOtp', async (payload, thunkAPI) => {
    let response;
    try {
        thunkAPI.dispatch(updateIsLoading(true));
        response = await fetch(`https://tm-api.happimobiles.com/api/discount/discountSendOtp`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        });
        const json = await response.json();
        thunkAPI.dispatch(updateIsLoading(false));
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})
export const verifyOtp = createAsyncThunk('discount/discountVerifyOtp', async (payload, thunkAPI) => {
    let response; 
    try {
        // thunkAPI.dispatch(updateIsLoading(true));
        response = await fetch(`https://tm-api.happimobiles.com/api/discount/discountVerifyOtp`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        });
        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})
export const createDiscount = createAsyncThunk('discount/discountResponse', async (payload, thunkAPI) => {
    let response;
   try {
        thunkAPI.dispatch(updateIsLoading(true));
        response = await fetch(`https://tm-api.happimobiles.com/api/discount/createDiscount`, {
           method: 'POST',
           headers: {
                'Content-Type': 'application/json'
           },
           body:
           JSON.stringify(payload)
       });
       const json = await response.json();
       if(json.status) {
        thunkAPI.dispatch(updateIsLoading(false));
       }
       return json;

   } catch (error) {
       console.error(error);
       LogServices('error', response, error + "") //check req here
       // thunkAPI.dispatch(updateIsLoading(false));
       // return { status: false, message: "internal server error" };
   }
})



export const getProductPrice = createAsyncThunk('incentives/getApxPrice', async (payload, thunkAPI) => {
    let respo;
    try {

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
            category: [json?.apxProductRes?.PROD_CATG_NAME],
            apx_code: [json?.data[0]?.ITEM_CODE],
            price: json?.data[0]?.ITEM_PRICE
        }
        respo = await fetch('https://dev-services.happimobiles.com/api/emp/offers-fetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify(offersPayload)
        });
        const offersjson = await respo.json();
        const finalJson = {
            price: json,
            offers: offersjson
        }
        return finalJson;
    } catch (error) {
        console.error(error);
        LogServices('error', respo, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
})

export const getStoreReports = createAsyncThunk('adminReport/getStoreReports', async (payload, thunkAPI) => {
    let response;
    try { 
        //   let  userDetails = JSON.parse(payload)
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/adminReport/reportHeirarchy`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        // const newArr = json.data.map((v,id) => ({...v, key: id}))
        thunkAPI.dispatch(updateIsLoading(false));
        return json; 

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getBrandReports = createAsyncThunk('adminReport/getBrandReports', async (payload, thunkAPI) => {
    let response;
    try { 
        //   let  userDetails = JSON.parse(payload)
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/adminReport/brandReports?store_name=${payload}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        thunkAPI.dispatch(updateIsLoading(false));
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getModelReports = createAsyncThunk('adminReport/getModelReports', async (payload, thunkAPI) => {
    let response;
    try { 
        //   let  userDetails = JSON.parse(payload)
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/adminReport/modelReport?store_name=${payload.store_name}&brand=${payload.brand}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        thunkAPI.dispatch(updateIsLoading(false));
        console.log('modelsssss', json)
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getDayReports = createAsyncThunk('adminReport/getdayReports', async (payload, thunkAPI) => {
    let response;
    try { 
        //   let  userDetails = JSON.parse(payload)
         thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/adminReport/reportHeirarchywithFilters?fromdate=${payload.startDate}&todate=${payload.endDate}&filter_by=${payload.filterby}`, {
            method: 'GET',
            headers: {
                 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
         thunkAPI.dispatch(updateIsLoading(false));
        console.log('modelsssss', JSON.stringify(json))
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})


export const cashDiscountSlice = createSlice({
    name: 'cashDiscount',

    initialState: {
        storeList: {},
        makeList: {},
        modalList: {},
        modalPrice : {},
        authorizeDiscount :{},
        cashApprover : {},
        createDiscountResponse : {},
        isLoading:false,
        storeReports:{},
        brandReports:{},
        modelReports:{},
        dayWiseReports:{}
    },
    reducers: {
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload;
            return state;
        },
        updateAuthorizeDiscount: (state, action) => {
            state.authorizeDiscount = action.payload;
            return state;
        },
        updateModalPrice: (state, action) => {
            state.modalPrice = action.payload;
            return state;
        },
        updateDayreports: (state, action) => {
            state.dayWiseReports = action.payload;
            return state;
        },
        updatemodalList: (state, action) => {
            state.modalList = action.payload;
            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getStoreList.fulfilled, (state, action) => {
            state.storeList = action.payload;
            return state;
        })
        builder.addCase(getMakeList.fulfilled, (state, action) => {
            state.makeList = action.payload;
            return state;
        })
        builder.addCase(getModalList.fulfilled, (state, action) => {
            state.modalList = action.payload;
            return state;
        })
        builder.addCase(getModalPrice.fulfilled, (state, action) => {
            state.modalPrice = action.payload;
            return state;
        })
        builder.addCase(checkAutorizeDiscount.fulfilled, (state, action) => {
            state.authorizeDiscount = action.payload;
            return state;
        })
        builder.addCase(getcashApprover.fulfilled, (state, action) => {
            state.cashApprover = action.payload;
            return state;
        })
        builder.addCase(createDiscount.fulfilled, (state, action) => {
            state.createDiscountResponse = action.payload;
            return state;
        })
        builder.addCase(getStoreReports.fulfilled, (state, action) => {
            state.storeReports = action.payload;
            return state;
        })
        builder.addCase(getBrandReports.fulfilled, (state, action) => {
            state.brandReports = action.payload;
            return state; 
        }) 
        builder.addCase(getModelReports.fulfilled, (state, action) => {
            state.modelReports = action.payload;
            return state;
        })
        builder.addCase(getDayReports.fulfilled, (state, action) => {
            state.dayWiseReports = action.payload;
            return state;
        })
    }
})

export const { updateIsLoading,updateAuthorizeDiscount,updateModalPrice,updateDayreports,updatemodalList } = cashDiscountSlice.actions

export default cashDiscountSlice.reducer