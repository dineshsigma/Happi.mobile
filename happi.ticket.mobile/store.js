import { configureStore } from '@reduxjs/toolkit'
import auth from './reducers/auth'
import products from './reducers/products'
import apx_products from './reducers/apx_products'
import tickets from "./reducers/ticketsReducer"
import cashDiscount from './reducers/cashDiscount'
import stockTransfer from './reducers/stockTransfer'
export const store = configureStore({
  reducer: {
    auth: auth,
    products: products,
    apx_products: apx_products,
    tickets:tickets,
    cashDiscount:cashDiscount,
    stockTransfer:stockTransfer
    // incentives: incentives
  },
})