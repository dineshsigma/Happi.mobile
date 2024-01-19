import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64';
import axios from 'axios';
import LogServices from '../logServices';
import { RNS3 } from 'react-native-aws3';
import {ToastAndroid} from "react-native";
 


export const getStockSingle = createAsyncThunk('stocktransfer/getstock', async (payload, thunkAPI) => {
    let response;
    try { 
        let url;
        thunkAPI.dispatch(updateIsButtonLoading(true));
        url=`https://tm-api.happimobiles.com/api/stocktransfer/getstock?model=${payload.model}&store=${payload.store}&brand=${payload.brand}`
        console.log('url is', url)
         response = await fetch(url, {  
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json' 
            },
        });
        const json = await response.json();
        console.log('api resp', json); 
        thunkAPI.dispatch(updateIsButtonLoading(false));
        return json;
    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})  

export const getStockmultiple = createAsyncThunk('stocktransfer/getStoreListStock', async (payload, thunkAPI) => {
    let response;
    console.log('payload on multiple', payload) 
    try { 
        let url;
        thunkAPI.dispatch(updateIsLoading(true));
        url=`https://tm-api.happimobiles.com/api/stocktransfer/getStoreListStock?model=${payload.model}&store=0&brand=${payload.brand}&branch_code=${payload.branch_code}`
        console.log('url is', url)
         response = await fetch(url, {  
            method: 'GET',
            headers: { 
                // 'Content-Type': 'application/json' 
            },
        });
        const json = await response.json();
        console.log('api resp multiple', json); 
        thunkAPI.dispatch(updateIsLoading(false));
        return json; 
    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getModalListStock = createAsyncThunk('stocktransfer/getItemList', async (payload, thunkAPI) => { 
    console.log('payload send', payload) 
    let response;
    try {
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/getItemList`, {
            method: 'POST', 
            headers: { 
                 'Content-Type': 'application/json'
            },
            body: 
            JSON.stringify(payload) 
        });
        const json = await response.json(); 
        console.log('jsosn res',json)
        thunkAPI.dispatch(updateIsLoading(false));
        let list = [] 
        json?.data?.map((item) => { 
            let obj = {}
            obj['key'] = item.ITEM_CODE
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

export const getMakeList = createAsyncThunk('stocktransfer/getBrandList', async (payload, thunkAPI) => {
    let response;
    console.log('hitting brands')
    try {
        //   let  userDetails = JSON.parse(payload) 
        // thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/getBrandList`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log('response brand',json)
        // thunkAPI.dispatch(updateIsLoading(false));
        let list = [] 
        json?.data?.map((item) => {
            let obj = {}
            obj['key'] = item
            obj['value'] = item
            list.push(obj) 
        })
        return list;
    } catch (error) {
        console.error(error,'errrrooooo');
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})


export const submitRequest = createAsyncThunk('stocktransfer/stockRaise', async (payload, thunkAPI) => {
    let response;
   try {
        thunkAPI.dispatch(updateIsLoading(true));
        response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/stockRaise`, {
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
       console.log('raise request res',json)
       return json;

   } catch (error) {
       console.error(error);
       LogServices('error', response, error + "") //check req here
       // thunkAPI.dispatch(updateIsLoading(false));
       // return { status: false, message: "internal server error" };
   }
})

export const getRequestedStock = createAsyncThunk('stocktransfer/getRequestedStock', async (payload, thunkAPI) => {
    let response;
    console.log('hitting request stock',`https://tm-api.happimobiles.com/api/stocktransfer/getRequestedStock?store_id=${payload}&status=all`)
    try {
        //   let  userDetails = JSON.parse(payload) 
        thunkAPI.dispatch(updateIsLoading(true));
        
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/getRequestedStock?store_id=${payload.store_id}&status=${payload.filter}`, { 
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json' 
            },
        });
        const json = await response.json();
        console.log('response req',json)
        thunkAPI.dispatch(updateIsLoading(false));
        return json;
    } catch (error) {
        console.error(error,'errrrooooo');
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getRejectReasons = createAsyncThunk('stocktransfer/rejectReasons', async (payload, thunkAPI) => {
    let response;

    try {
        //   let  userDetails = JSON.parse(payload) 
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/rejectReasons`, { 
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json' 
            }, 
        });
        const json = await response.json(); 
        console.log('reject reasons',json)
        let list = [] 
        json?.data?.map((item) => {
            let obj = {}
            obj['label'] = item.reason
            obj['value'] = item.reason
            list.push(obj) 
        }) 
        thunkAPI.dispatch(updateIsLoading(false));
        return list;
    } catch (error) {
        console.error(error,'errrrooooo');
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const getReceivedStock = createAsyncThunk('stocktransfer/getReceivedStock', async (payload, thunkAPI) => {
    let response;
    console.log('payload',payload)
    try {
        //   let  userDetails = JSON.parse(payload) 
        thunkAPI.dispatch(updateIsLoading(true));
        
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/getReceivedStock?store_id=${payload.store_id}&status=${payload.filter}`,{ 
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log('response req',json)
        thunkAPI.dispatch(updateIsLoading(false));
        return json;
    } catch (error) {
        console.error(error,'errrrooooo');
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false)); 
        // return { status: false, message: "internal server error" };
    }
})

export const getAdminRaisedStock = createAsyncThunk('stocktransfer/getAdminRaisedStock', async (payload, thunkAPI) => {
    let response;
    console.log('payload',payload)
    try {
        //   let  userDetails = JSON.parse(payload) 
        thunkAPI.dispatch(updateIsLoading(true));
        
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/getAdminRaisedStock?store_id=${payload}`, { 
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log('response req',json)
        thunkAPI.dispatch(updateIsLoading(false));
        return json;
    } catch (error) {
        console.error(error,'errrrooooo');
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false)); 
        // return { status: false, message: "internal server error" };
    }
})

export const getDeliveryMode = createAsyncThunk('stocktransfer/getModeOfDelivaryNames', async (payload, thunkAPI) => {
    let response;
    try {
        //   let  userDetails = JSON.parse(payload) 
        // thunkAPI.dispatch(updateIsLoading(true));
        
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/getModeOfDelivaryNames`, { 
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log('response req',json) 
        // thunkAPI.dispatch(updateIsLoading(false));
        let list = [] 
        json?.data?.map((item) => {
            let obj = {}
            obj['key'] = item.delivary_name
            obj['value'] = item.delivary_name
            list.push(obj) 
        })
        return list;
    } catch (error) {
        console.error(error,'errrrooooo');
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const scanIMEINumber = createAsyncThunk('stocktransfer/scanIMEINumbers', async (payload, thunkAPI) => { 
    console.log('payload IMEI', payload) 
    let response;
    try {
        thunkAPI.dispatch(updateIsLoading(true));
         response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/scanIMEINumbers`,{
            method: 'POST', 
            headers: { 
                 'Content-Type': 'application/json'
            },
            body: 
            JSON.stringify(payload) 
        });
        const json = await response.json(); 
        console.log('jsosn res',json)
        thunkAPI.dispatch(updateIsLoading(false));
        return json;

    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const approveStock = createAsyncThunk('stocktransfer/approvedStock', async (payload, thunkAPI) => {
    // thunkAPI.dispatch(setTicketsLoader(true));
    let response;
    try {
       response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/approvedStock`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
  
      const json = await response.json();
      console.log('apporved stock',json)
    // thunkAPI.dispatch(setTicketsLoader(false));
      ToastAndroid.show(json.message, ToastAndroid.LONG);
      return  json ;
   
    } catch (error) {
      console.error(error,'errrorrrrr');
    //   thunkAPI.dispatch(updateIsLoading(false));
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
  
  })

  export const rejectStock = createAsyncThunk('stocktransfer/rejectStock', async (payload, thunkAPI) => {
    // thunkAPI.dispatch(setTicketsLoader(true));
    let response;
    try {
       response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/rejectStock`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
      });
      const json = await response.json();
      console.log('rejected stock',json)
    // thunkAPI.dispatch(setTicketsLoader(false));
        ToastAndroid.show(json.message, ToastAndroid.LONG);
      return  json ;
   
    } catch (error) {
    //   console.error(error);
    //   thunkAPI.dispatch(updateIsLoading(false));
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
  
  })

  export const imageUpload = createAsyncThunk('tickets/addComment', async (payload, thunkAPI) => {
    // thunkAPI.dispatch(updateIsLoading(true)); 
    console.log('payload received',payload)
    let response;
    let awsResponse
    let awsFiles = []
    let awsProFiles = []
    const options = {
        keyPrefix: `store_transfer/${payload?.attachmentFile?.name}`,
        bucket: "happimobiles",
        region: "ap-south-1",
        accessKey: "AKIASTAEMZYQ3D75TOOZ",
        secretKey: "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",
        successActionStatus: 201 
      }
                   
            await Promise.all( payload?.attachmentFile?.map( async(eachFile) => {
               const file = {
                   uri: eachFile.uri,
                   name: eachFile.name, //extracting filename from image pat
                   type: 'image/jpg',
               };
                 const awsResponse = await RNS3.put(file, options)
                console.log('aws responseeeee',JSON.stringify(awsResponse))
                 awsFiles.push({images:awsResponse.body.postResponse.location,file_name:eachFile.name})
                 console.log('aws files',awsFiles)  
             })) 
             delete payload.attachmentFile;
        

              
            console.log('pro hereeeeee')  
            await Promise.all( payload?.product_attachments?.map( async(eachFile) => {
               const file1 = {
                   uri: eachFile.uri,
                   name: eachFile.name, //extracting filename from image pat
                   type: 'image/jpg',
               }; 
                 const awsResponse1 = await RNS3.put(file1, options) 
                console.log('aws pro responseeeee',JSON.stringify(awsResponse1))
                 awsProFiles.push({images:awsResponse1.body.postResponse.location,file_name:eachFile.name})
                 console.log('aws pro files',awsProFiles)  
             })) 
             delete payload.product_attachments;
        
        let commentBody = {...payload,attachment:awsFiles,product_attachments:awsProFiles}
        console.log('commentttt',commentBody) 
        try {
            response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/addDelivaryDetails`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(commentBody)
           });
           console.log("response",response);
           const json = await response.json(); 
           console.log(json,"image proceed response") 
           return  json ;
        
         } catch (error) {
            console.log("errrrrrrrrrrrrrrrr")
             LogServices('error', response, error + "") //check req here
             return { status: false, message: "internal server error" };
         }
  
  })

  export const getIntransistDelivaryDetails = createAsyncThunk('stocktransfer/getIntransistDelivaryDetails', async (payload, thunkAPI) => {
    let response;
    console.log('payload on intransit', payload) 
    try { 
        let url;
        thunkAPI.dispatch(updateIsLoading(true));
        url=`https://tm-api.happimobiles.com/api/stocktransfer/getIntransistDelivaryDetails?id=${payload.id}`
        console.log('url is', url)
         response = await fetch(url, {  
            method: 'GET',
            headers: { 
                // 'Content-Type': 'application/json' 
            },
        });
        const json = await response.json();
        console.log('api resp intransit details', json); 
        thunkAPI.dispatch(updateIsLoading(false)); 
        return json; 
    } catch (error) {
        console.error(error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(updateIsLoading(false));
        // return { status: false, message: "internal server error" };
    }
})

export const updateReceivedStock = createAsyncThunk('stocktransfer/updateReceivedStock', async (payload, thunkAPI) => { 
    console.log('payload IMEI', payload) 
    let response; 
    let awsFiles = []
    let awsProFiles = []
    const options = {
        keyPrefix: `store_transfer/${payload?.attachmentFile?.name}`,
        bucket: "happimobiles",
        region: "ap-south-1",
        accessKey: "AKIASTAEMZYQ3D75TOOZ",
        secretKey: "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",
        successActionStatus: 201 
      }
                   
            await Promise.all( payload?.product_received_attachments?.map( async(eachFile) => {
               const file = {
                   uri: eachFile.uri,
                   name: eachFile.name, //extracting filename from image pat
                   type: 'image/jpg',
               };
                 const awsResponse = await RNS3.put(file, options)
                console.log('aws responseeeee',JSON.stringify(awsResponse))
                 awsFiles.push({images:awsResponse.body.postResponse.location,file_name:eachFile.name})
                 console.log('aws files',awsFiles)  
             })) 
             delete payload.product_received_attachments;
             let commentBody = {...payload,product_received_attachments:awsFiles,}
             console.log('commentttt',commentBody) 
        
            try {
                thunkAPI.dispatch(updateIsLoading(true));
                response = await fetch(`https://tm-api.happimobiles.com/api/stocktransfer/updateReceivedStock`,{ 
                    method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: 
                JSON.stringify(commentBody)
                });
                const json = await response.json(); 
                console.log('updatessss',json)
                thunkAPI.dispatch(updateIsLoading(false));
                return json;

            } catch (error) {
                console.error(error);
                LogServices('error', response, error + "") //check req here
                // thunkAPI.dispatch(updateIsLoading(false));
                // return { status: false, message: "internal server error" };
            }
})


export const stockTransferSlice = createSlice({
    name: 'stockTransfer',

    initialState: {
        stockAmount:{},
        modalList:{},
        makeList:{},
        storeList:{},
        isLoading: false,
        isButtonLoading:false,
        requestedStocks:{},
        scannedProduct:{},
        deliveryMode:{},
        receivedStock:{},
        deliveryDetails:{}
    },
    reducers: {
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload;
            return state;
        },
        updatemodalList: (state, action) => {
            state.modalList = action.payload; 
            return state;
        },
        updateIsButtonLoading: (state, action) => {
            state.isButtonLoading = action.payload;
            return state;
        },
        updateScanProduct: (state, action) => {
            console.log(action.payload,"action.payloadaction.payload") 
            state.scannedProduct = action.payload; 
            return state;
        },

    },

    extraReducers: (builder) => {
        builder.addCase(getStockSingle.fulfilled, (state, action) => {
            state.stockAmount = action.payload;
            return state; 
        })
        builder.addCase(getModalListStock.fulfilled, (state, action) => {
            state.modalList = action.payload;
            return state;
        })
        builder.addCase(getMakeList.fulfilled, (state, action) => {
            state.makeList = action.payload;
            return state;
        })
        builder.addCase(getStockmultiple.fulfilled, (state, action) => {
            state.storeList = action.payload;
            return state; 
        })
        builder.addCase(getRequestedStock.fulfilled, (state, action) => {
            state.requestedStocks = action.payload;
            return state;
        })
        builder.addCase(getReceivedStock.fulfilled, (state, action) => {
            state.receivedStock = action.payload;
            return state;
        })
        builder.addCase(getDeliveryMode.fulfilled, (state, action) => {
            state.deliveryMode = action.payload;
            return state;
        })
        builder.addCase(getIntransistDelivaryDetails.fulfilled, (state, action) => {
            state.deliveryDetails = action.payload;
            return state; 
        })
     }
})

export const { updateIsLoading,updatemodalList,updateIsButtonLoading,updateScanProduct} = stockTransferSlice.actions
 
export default stockTransferSlice.reducer