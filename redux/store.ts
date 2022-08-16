import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'

const Store = configureStore({
    reducer: {
        Products: productReducer,
        Cart: cartReducer
    }
})

export default Store;