import { configureStore, combineReducers} from '@reduxjs/toolkit'
import products from './slices/products'

const reducer = combineReducers({
   products,
})

export default configureStore({
  reducer
})