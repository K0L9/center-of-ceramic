import categoryTypes from "../types/category-type";
import categoryType from "../types/category-type";
const initialState = {
    CategoryList: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryType.get:
            return {
                ...state,
                CategoryList: action.payload
            }
        case categoryType.add:
            var addList = state.CategoryList.slice();
            addList.push(action.payload);
            return {
                ...state,
                CategoryList: addList
            }
        case categoryType.delete:
            var deletedList = state.CategoryList.slice();
            deletedList.splice(action.payload, 1);
            return {
                ...state,
                CategoryList: deletedList
            }
        case categoryType.edit:
            var editedList = state.CategoryList.slice();
            editedList[editedList.indexOf(editedList.find(x => x.id == action.payload.id))] = action.payload;
            return {
                ...state,
                CategoryList: editedList
            }
        default:
            return state;
    }
}

export default categoryReducer;