import React from "react";

import { connect } from "react-redux";
import { useEffect } from "react";

import { Category } from "../../../redux/types/categoryTypes";
import categoryService from "../../../services/CategoryService";

import { ApplicationState } from "../../../redux/store";
import { fetchRequest } from "../../../redux/actions/categoryAction";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface PropsFromState {
    data: Category[]
}
interface propsFromDispatch {
    fetchRequest: (list: Category[]) => any;
}
type AllProps = PropsFromState & propsFromDispatch;

const CategoryList: React.FC<AllProps> = ({ data, fetchRequest }) => {
    useEffect(() => {
        categoryService.GetCategories().then(data => {
            console.log("HELLO from prodList: ", data.List)
            fetchRequest(data.List);
        })
    }, [])

    const dataList = data.map((d) => <h1>{d.name}</h1>)

    console.log("DATA LISTL :", dataList);

    return (
        <div>
            <h1>{dataList}</h1>
        </div>
    )
}
const mapStateToProps = ({ category }: ApplicationState) => ({
    data: category.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchRequest: (list: Category[]) => {
            dispatch(fetchRequest(list));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);