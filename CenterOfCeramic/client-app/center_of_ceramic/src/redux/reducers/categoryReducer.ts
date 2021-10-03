import { Reducer } from "redux";
import { CategoryActionTypes, CategoryState } from "../types/categoryTypes";

export const initialState: CategoryState = {
    data: [],
};

const reducer: Reducer<CategoryState> = (state = initialState, action) => {
    console.log("HELLO FROM REDUCER: ", action.payload)
    switch (action.type) {
        case CategoryActionTypes.Get: {
            return {
                ...state,
                data: action.payload,
                loading: true
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer as CategoryReducer };
