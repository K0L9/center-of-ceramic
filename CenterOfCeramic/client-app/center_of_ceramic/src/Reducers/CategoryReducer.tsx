import { Category } from "../Models/Category"

interface CategoryState {
    Categories: Category[]
}

const initialState: CategoryState = {
    Categories: []
}

const CategoryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "GET_CATEGORIES":
            return {
                ...state,
                Categories: action.payload
            }
        default:
            return state;
    }
}

export default CategoryReducer