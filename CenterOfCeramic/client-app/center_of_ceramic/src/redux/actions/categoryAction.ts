import { CategoryActionTypes } from "../types/categoryTypes";

import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "../store";
import { Category } from "../types/categoryTypes";

import categoryService from "../../services/CategoryService";

export type AppThunk = ActionCreator<
    ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const fetchRequest: AppThunk = (list: Category[]) => {
    return (dispatch: Dispatch): Action => {
        return dispatch({
            type: CategoryActionTypes.Get,
            payload: list
        });
    };
};

export const addCategoryRequest: AppThunk = (category: Category) => {
    categoryService.AddCategory(category);
    return (dispatch: Dispatch): Action => {
        return dispatch({
            type: CategoryActionTypes.Add,
            payload: category
        });
    };
}

export const deleteCategoryRequest: AppThunk = (id: number) => {
    return (dispatch: Dispatch): Action => {
        return dispatch({
            type: CategoryActionTypes.Delete,
            payload: id
        });
    };
}