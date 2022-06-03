import { configureStore, createSlice } from '@reduxjs/toolkit'



//Create state and intilize
const userState = createSlice({
  name: 'userState',
  initialState: {
    products: [],
    cart: [],
    newProduct: {
      name: '',
      description: '',
      price: 0,
      picLocation: '',
    },
    username: '',
    password: '',
    cookie: ""
  },
  reducers: {
    loadProducts(state, action) {
      state.products = action.payload
    },
    loadCart(state, action) {
        state.cart.push(action.payload)
    },
    initCart(state, action){
      state.cart = action.payload
    },
    removeItem(state, action) {
      state.cart.filter((item) => item.id !== action.payload.id)
    },
    clearCart(state, action) {
      state.cart = []
    },
    newProductLoad(state, action) {
      state.newProduct.name = action.payload.name
      state.newProduct.description = action.payload.description
      state.newProduct.price = action.payload.price
    },
    addProductURL(state, action) {
      state.newProduct.picLocation = action.payload
    },
    clearNewProduct(state, action){
      state.newProduct = {}
    }
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
  newProductLoad,
  addProductURL,
  clearNewProduct,
  initCart
} = userState.actions
