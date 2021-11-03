import { components } from "react-select";
import variantTypes from "../types/variant-types";
const initialState = {
    productVariants: []
}

const variantReducer = (state = initialState, action) => {
    switch (action.type) {
        case variantTypes.set:

            var tmpProdVarList = state.productVariants.slice();
            if (tmpProdVarList.length <= action.payload.varId) {
                tmpProdVarList.push(action.payload);
            }
            else {
                tmpProdVarList[action.payload.varId] = action.payload;
            }
            return {
                ...state,
                productVariants: tmpProdVarList
            }

        case variantTypes.remove:
            var tmpProdVarList = state.productVariants.slice();
            if (tmpProdVarList.length > action.payload) {
                tmpProdVarList.splice(action.payload, 1);
            }
            return {
                ...state,
                productVariants: tmpProdVarList
            }

        case variantTypes.clear:
            return {
                ...state,
                productVariants: []
            }
        default:
            return state;
    }
}

export default variantReducer;