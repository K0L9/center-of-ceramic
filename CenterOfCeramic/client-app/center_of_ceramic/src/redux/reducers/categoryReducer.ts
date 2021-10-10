import { Reducer } from "redux";
import { CategoryActionTypes, CategoryState } from "../types/categoryTypes";

export const initialState: CategoryState = {
    data: [],
    currentCategory: {
        id: 0,
        name: "",
        products: "",
    },
};

const reducer: Reducer<CategoryState> = (state = initialState, action) => {
    console.log("HELLO FROM REDUCER: ", action.payload)
    switch (action.type) {
        case CategoryActionTypes.Get: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case CategoryActionTypes.Add: {
            console.log("FROM ADD ACTION: ", action.payload);
            return {
                ...state,
                data: state.data.push(action.payload),
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer as CategoryReducer };
