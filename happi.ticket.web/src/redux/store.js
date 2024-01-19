import { configureStore, combineReducers} from '@reduxjs/toolkit'
import auth from './reducers/authReducer'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'persist',
  storage,
  whitelist: ['auth'] // which reducer want to store
};

const rootReducer = combineReducers({
  auth: auth,
})

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer
})