import React from "react";

import { connect } from "react-redux";
import { useEffect } from "react";

import { Category } from "../../../redux/types/categoryTypes";
import CategoryService from "../../../Services/CategoryService";

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

const ProductList: React.FC<AllProps> = ({ data, fetchRequest }) => {
    useEffect(() => {
        var service = new CategoryService();
        service.GetCategories().then(data => {
            console.log("HELLO from prodList: ", data.List)
            fetchRequest(data.List);
        })
    }, [])

    console.log("CATEROGRIES: ", data)

    return (
        <h2>HELLO</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);