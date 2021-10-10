import { timeLog } from "console";
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
    switch (action.type) {
        case CategoryActionTypes.Get: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case CategoryActionTypes.Add: {
            return {
                ...state,
                data: state.data.push(action.payload),
            };
        }
        case CategoryActionTypes.Delete: {
            let tmp = state.data.slice();
            tmp.splice(action.payload, 1);
            return {
                ...state,
                data: tmp,
            }
        }
        case CategoryActionTypes.Edit: {
            let tmp = state.data.slice();
            tmp.filter(x => x.id == action.payload.id)[0] = action.payload.category;
            return {
                ...state,
                data: tmp,
            }
        }
        case CategoryActionTypes.SetCurrent: {
            return {
                ...state,
                currentCategory: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export { reducer as CategoryReducer };
