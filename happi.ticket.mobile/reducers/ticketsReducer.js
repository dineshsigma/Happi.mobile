import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import { baseUrl } from '../environment'
import LogServices from '../logServices'
import { RNS3 } from 'react-native-aws3';
import {ToastAndroid} from "react-native";


//--------------------------------get LIST OF BRAND NAMES API--------------------------------------
export const getTicketList = createAsyncThunk('tickets/TicketList', async (payload, thunkAPI) => {
   let response; 
    try {
        thunkAPI.dispatch(setTicketsLoader(true));
         response = await fetch(`${baseUrl}tickets/getTicketList?id=${payload.user._id}&type=${payload.type}&status=${payload.status}`, {
            method: 'GET',
            headers: {},
        });
        const brandListJSON = await response.json();
        // thunkAPI.dispatch(brandDataIsLoading(false));
        const newArr = brandListJSON.data.map((v,id) => ({...v, key: id+1}))
        thunkAPI.dispatch(setTicketsLoader(false));
        return newArr;
    } catch (error) {
        console.log("error", error);
        thunkAPI.dispatch(setTicketsLoader(false));
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(brandDataIsLoading(false));
        return { status: false, message: "internal server error" };
    }
})


//get all departments
export const getDepartments = createAsyncThunk('tickets/DepartmentList', async (payload, thunkAPI) => {
    let response;
    try {
        // thunkAPI.dispatch(brandDataIsLoading(true));
         response = await fetch(`${baseUrl}department/getDepartments`, {
            method: 'GET',
            headers: {},
        });
        const deptList = await response.json();
        // thunkAPI.dispatch(brandDataIsLoading(false));
         let deps = []
         deptList.data.map((item) => {
            let obj = {}
            obj['value'] = item._id
            obj['label'] = item.mainDeptName
            deps.push(obj)
         })
        return deps;

    } catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(brandDataIsLoading(false));
        return { status: false, message: "internal server error" };
    }
})

//get typeofissues
export const getTypeofIssues = createAsyncThunk('tickets/getTypeofIssues', async (payload, thunkAPI) => {
    let response;
    try {
        response = await fetch(`${baseUrl}department/gettypeofIssues`, {
            method: 'GET',
            headers: {},
        });
        const deptList = await response.json();
         let issues = []
         deptList.data.map((item) => {
            let obj = {}
            obj['key'] = item._id
            obj['value'] = item.issue_name
            issues.push(obj)
         })
        return issues;

    } catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
})

//get priority
export const getPriority = createAsyncThunk('tickets/getPriority', async (payload, thunkAPI) => {
    let response;
    try {
         response = await fetch(`${baseUrl}tickets/getPriorities`, {
            method: 'GET',
            headers: {},
        });
        const deptList = await response.json();
         let priorityy = []
         deptList.data.map((item) => {
            let obj = {}
            obj['key'] = item.level
            obj['value'] = item.level
            priorityy.push(obj)
         })
        return priorityy;

    } catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
})

//get priority
export const getStatusList = createAsyncThunk('tickets/getStatusList', async (payload, thunkAPI) => {
    let response;
    try {
        response = await fetch(`${baseUrl}tickets/getStatusList`, {
            method: 'GET',
            headers: {},
        });
        const deptList = await response.json();
   
         let status = []
         let data ={key:'null',value:'All Status'}
         status.push(data)
         deptList.data.map((item) => {
            let obj = {}
            obj['key'] = item._id
            obj['value'] = item.status_name
            status.push(obj)
         })
        return status;
    } 
    catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
})

//get priority
export const getAssigneeList = createAsyncThunk('tickets/getAssigeelist', async (payload, thunkAPI) => {
    let response;
    try {
         response = await fetch(`${baseUrl}tickets/userDropDown`, {
            method: 'GET',
            headers: {},
        });
        const deptList = await response.json();
   
         let status = []
         deptList.data.map((item) => {
            let obj = {}
            obj['key'] = item._id
            obj['value'] = item.email
            status.push(obj)
         })
        return status;

    } catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
})

export const addTickets = createAsyncThunk('tickets/addTicket', async (payload, thunkAPI) => {
    // thunkAPI.dispatch(updateIsLoading(true));
    thunkAPI.dispatch(setTicketsLoader(true));
    let response;
    const options = {
        keyPrefix: `test-images-v1/org/${90909}/tickets/${'emp'}/`,
        bucket: "happimobiles",
        region: "ap-south-1",
        accessKey: "AKIASTAEMZYQ3D75TOOZ",
        secretKey: "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",
        successActionStatus: 201
      }
    //  let FileNames = []
     let awsFiles = []
     await Promise.all( payload.attachmentFile.map( async(eachFile) => {
        const file = {
            uri: eachFile.uri,
            name: eachFile.name, //extracting filename from image pat
            type: eachFile.type,
        };
          const awsResponse = await RNS3.put(file, options)
        //   FileNames.push(eachFile.name)
          awsFiles.push({images:awsResponse.body.postResponse.location,file_name:eachFile.name})
      }))
     delete payload.attachmentFile;
      let ticketBody = {...payload,attachment:awsFiles}
    try {
       response = await fetch(`${baseUrl}tickets/createTickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketBody)
      });
  
     
      const json = await response.json();
      console.log(json,"jsonn")
      if(json.status) {
        ToastAndroid.show(json.data, ToastAndroid.LONG);
      }
      thunkAPI.dispatch(setTicketsLoader(false));
      return  json ;
   
    } catch (error) {
    //   console.error(error);
    //   thunkAPI.dispatch(updateIsLoading(false));
      LogServices('error', response, error + "") //check req here
      return { status: false, message: "internal server error" };
    }
  
  })
  //Function to update updateTickets
  export const updateTickets = createAsyncThunk('tickets/editTickets', async (payload, thunkAPI) => {
    thunkAPI.dispatch(setTicketsLoader(true));
    let response;
    try {
       response = await fetch(`${baseUrl}tickets/editTickets`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
  
      const json = await response.json();
    thunkAPI.dispatch(setTicketsLoader(false));
    ToastAndroid.show(json.message, ToastAndroid.LONG);
      return  json ;
   
    } catch (error) {
    //   console.error(error);
    //   thunkAPI.dispatch(updateIsLoading(false));
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
  
  })

  // Create Comments
  export const createComments = createAsyncThunk('tickets/addComment', async (payload, thunkAPI) => {
    // thunkAPI.dispatch(updateIsLoading(true));
    let response;
    let awsResponse
    let file
    const options = {
        keyPrefix: `test-images-v1/org/${90909}/tickets/${'emp'}/`,
        bucket: "happimobiles",
        region: "ap-south-1",
        accessKey: "AKIASTAEMZYQ3D75TOOZ",
        secretKey: "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",
        successActionStatus: 201
      }
    //  let FileNames = []
        //   FileNames.push(eachFile.name)
        //   awsFiles.push({images:awsResponse.body.postResponse.location,file_name:eachFile.name})
        if(payload?.attachmentFile){
             file = {
                uri: payload?.attachmentFile?.uri,
                name: payload?.attachmentFile?.name, //extracting filename from image pat
                type: payload?.attachmentFile?.type,
            };
             awsResponse = await RNS3.put(file, options)
     delete payload?.attachmentFile;
        }
      let commentBody = {...payload,attachment:awsResponse?.body?.postResponse.location,file_name:file?.name}
    try {
       response = await fetch(`${baseUrl}tickets/addCommentsMobile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentBody)
      });
      const json = await response.json();
      console.log(json,"comment response")
    //   thunkAPI.dispatch(updateIsLoading(false))
      return  json ;
   
    } catch (error) {
    //   thunkAPI.dispatch(updateIsLoading(false));
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
  
  })
  //--------------------------------getComments--------------------------------------
export const getComments = createAsyncThunk('tickets/getComments', async (payload, thunkAPI) => {
    let response;
    try {
        // thunkAPI.dispatch(brandDataIsLoading(true));
         response = await fetch(`${baseUrl}tickets/getComments?ticket_id=${payload.ticket_id}`, {
            method: 'GET',
            headers: {},
        });
        const brandListJSON = await response.json();
        // thunkAPI.dispatch(brandDataIsLoading(false));
        return brandListJSON.data;

    } catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        // thunkAPI.dispatch(brandDataIsLoading(false));
        return { status: false, message: "internal server error" };
    }
})

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        ticketsList: [],
        description : '',
        departmentList : [],
        issuesList : [],
        priorityList : [],
        statusList : [],
        createTicketResponse:{},
        allComments : [],
        createCommentResponse : {},
        updateTicketResponse : {},
        loading: false,
        assigneeList : {},
    },
    reducers: {
        setDescription: (state, action) => {
            state.description = action.payload;
            return state;
        },
        setTicketsLoader: (state, action) => {
            state.loading = action.payload;
      
            return state;
          },
    },

    extraReducers: (builder) => {
        builder.addCase(getTicketList.fulfilled, (state, action) => {
            state.ticketsList = action.payload;
            return state;
        }),
        builder.addCase(getDepartments.fulfilled, (state, action) => {
            state.departmentList = action.payload;
            return state;
        }),
        builder.addCase(getTypeofIssues.fulfilled, (state, action) => {
            state.issuesList = action.payload;
            return state;
        }),
        builder.addCase(getPriority.fulfilled, (state, action) => {
            state.priorityList = action.payload;
            return state;
        }),
        builder.addCase(addTickets.fulfilled, (state, action) => {
            state.createTicketResponse = action.payload;
            return state;
        }),
        builder.addCase(getStatusList.fulfilled, (state, action) => {
            state.statusList = action.payload;  
            return state;
        }),
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.allComments = action.payload;
            return state;
        }),
        builder.addCase(createComments.fulfilled, (state, action) => {
            state.createCommentResponse = action.payload;
            return state;
        }),
        builder.addCase(updateTickets.fulfilled, (state, action) => {
            state.updateTicketResponse = action.payload;
            return state;
        }),
        builder.addCase(getAssigneeList.fulfilled, (state, action) => {
            state.assigneeList = action.payload;
            return state;
        })
    }

})

 export const { setDescription,setTicketsLoader} = ticketsSlice.actions

export default ticketsSlice.reducer