import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import { baseUrl } from '../environment';
import LogServices from '../logServices';


//--------------------------------get LIST OF BRAND NAMES API--------------------------------------
export const getBrandList = createAsyncThunk('product/BrandList', async (payload, thunkAPI) => {
    let response;
    try {
        thunkAPI.dispatch(brandDataIsLoading(true));
        response = await fetch(`${baseUrl}api/apx_products/getBrandList`, {
            method: 'GET',
            headers: {},
        });
        const brandListJSON = await response.json();
        thunkAPI.dispatch(brandDataIsLoading(false));
        return brandListJSON.data;

    } catch (error) {
        console.log("error", error);
        LogServices('error', response, error + "") //check req here
        thunkAPI.dispatch(brandDataIsLoading(false));
        return { status: false, message: "internal server error" };
    }
})

//--------------------------------get LIST OF ITEM_NAMES NAMES API--------------------------------------
export const getItemNameList = createAsyncThunk('product/ItemNameList', async (payload, thunkAPI) => {
    // console.log("payload",payload);
    // console.log(`${baseUrl}api/apx_products/getItemNames?brandName=${payload}`)
    let response;
    try {
        response = await fetch(`${baseUrl}api/apx_products/getItemNames?brandName=${payload}`, {
            method: 'GET',
            headers: {},
        });
        const itemListJSON = await response.json();
        return itemListJSON.message

    } catch (error) {
        LogServices('error', response, error + "") //check req here
        return { status: false, message: "internal server error" };
    }
})

export const apx_productsSlice = createSlice({
    name: 'apx_products',
    initialState: {
        brandList: [],
        itemList: [],
        isLoading: false,
    },
    reducers: {
        brandDataIsLoading: (state, action) => {
            state.isLoading = action.payload;
            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getBrandList.fulfilled, (state, action) => {
            state.brandList = action.payload;
            return state;
        })
        builder.addCase(getItemNameList.fulfilled, (state, action) => {
            state.itemList = action.payload;
            return state;
        })
    }

})

export const { brandDataIsLoading } = apx_productsSlice.actions

export default apx_productsSlice.reducer