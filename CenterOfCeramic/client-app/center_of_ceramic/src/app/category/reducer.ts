import { Reducer } from "redux";
import { CategoryActionTypes, CategoryState } from "./types";

export const initialState: CategoryState = {
    data: [],
};

const reducer: Reducer<CategoryState> = (state = initialState, action) => {
    switch (action.type) {
        case CategoryActionTypes.Get: {
            return { ...state, loading: true };
        }
        default: {
            return state;
        }
    }
};

export { reducer as CategoryReducer };
