import variantTypes from "../types/variant-types";
const initialState = {
    productVariants: []
}

const variantReducer = (state = initialState, action) => {
    switch (action.type) {
        case variantTypes.set:
            var tmpProdVarList = state.productVariants.slice();

            if (tmpProdVarList.length <= action.payload.varId)
                tmpProdVarList.push(action.payload);

            tmpProdVarList[action.payload.varId] = action.payload;
            return {
                ...state,
                productVariants: tmpProdVarList
            }
        default:
            return state;
    }
}

export default variantReducer;