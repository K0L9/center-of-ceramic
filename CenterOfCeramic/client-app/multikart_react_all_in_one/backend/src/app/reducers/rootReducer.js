import { combineReducers } from "redux"

import categoryReducer from "./categoryReducer"
import productReducer from "./productReducer"
import countryReducer from "./countryReducer"
import variantReducer from "./variantReducer"

export default combineReducers({
    categoryReducer, productReducer, countryReducer, variantReducer
})