import { configureStore, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { cartArray } from '../Pages/products/tempDB'

//Create state and intilize
const userState = createSlice({
  name: 'userState',
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    loadProducts(state, action) {
      state.products = action.payload
    },
    loadCart(state, action) {
        state.cart = action.payload
    },
    removeItem(state, action) {
      state.cart.filter((item) => item.id !== action.payload.id)
    },
    clearCart(state, action) {
      state.cart = []
    },
  },
})

//Create the store
export const userStore = configureStore({
  reducer: {
    userState: userState.reducer,
  },
})

//export actions
export const {
  loadProducts,
  loadCart,
  removeItem,
  clearCart,
} = userState.actions
