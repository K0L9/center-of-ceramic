import productTypes from "../types/product-types"
const initialState = {
    ProductList: [],
    CurrentProduct: {}
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productTypes.get:
            return {
                ...state,
                ProductList: action.payload
            }
        case productTypes.add:
            var addList = state.ProductList.slice();
            addList.push(action.payload);
            return {
                ...state,
                ProductList: addList
            }
        case productTypes.delete:
            var deletedList = state.ProductList.slice();
            deletedList.splice(action.payload, 1);
            return {
                ...state,
                ProductList: deletedList
            }
        case productTypes.edit:
            var editedList = state.ProductList.slice();
            editedList[editedList.indexOf(editedList.find(x => x.id == action.payload.id))] = action.payload;
            return {
                ...state,
                ProductList: editedList
            }
        case productTypes.setCurrProd:
            return {
                ...state,
                CurrentProduct: action.payload
            }

        default:
            return state;
    }
}

export default productReducer;