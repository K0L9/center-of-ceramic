import { CategoryActionTypes } from "./types";

import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "../store";
import { Category } from "../../Models/Category";

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
