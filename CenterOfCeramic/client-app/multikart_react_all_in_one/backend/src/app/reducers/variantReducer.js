import { components } from "react-select";
import variantTypes from "../types/variant-types";
import { initialState as otherInitialState } from "./productReducer";
const initialState = {
    productVariants: otherInitialState.productVariants
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
            console.log("tmpProdVarList: ", tmpProdVarList)

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