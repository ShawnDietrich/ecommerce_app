import { configureStore, createSlice } from '@reduxjs/toolkit'
import noImagePic from '../images/NoImage.png'


//Create state and intilize
const userState = createSlice({
  name: 'userState',
  initialState: {
    products: [],
    cart: [],
    newProduct: {
      id: 0,
      name: '',
      description: '',
      price: 0,
      picLocation: noImagePic,
    },
  },
  reducers: {
    loadProducts(state, action) {
      state.products = action.payload
    },
    addToCart(state, action) {
      state.cart.push(action.payload)
      updateCartSession(state.cart)
    },
    updateCart(state, action){
      state.cart[action.payload.index].qty = action.payload.qty
      updateCartSession(state.cart)
    },
    initCart(state, action) {
      state.cart = action.payload
    },
    removeItem(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
      updateCartSession(state.cart)
    },
    clearCart(state, action) {
      state.cart = []
    },
    newProductLoad(state, action) {
      state.newProduct.id = action.payload.id
      state.newProduct.name = action.payload.name
      state.newProduct.description = action.payload.description
      state.newProduct.price = action.payload.price
    },
    addProductURL(state, action) {
      state.newProduct.picLocation = action.payload
    },
    clearNewProduct(state, action) {
      state.newProduct = {}
      state.newProduct.picLocation = noImagePic
    }
  },
})

const updateCartSession = (data) => {
  sessionStorage.setItem('cartData', JSON.stringify(data))
}

//Create the store
export const userStore = configureStore({
  reducer: {
    userState: userState.reducer,
  },
})

//export actions
export const {
  loadProducts,
  addToCart,
  updateCart,
  removeItem,
  clearCart,
  newProductLoad,
  addProductURL,
  clearNewProduct,
  initCart
} = userState.actions
