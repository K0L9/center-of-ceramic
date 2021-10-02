import React from "react";

import { connect } from "react-redux";
import { useEffect } from "react";

import { Category } from "../../../Models/Category";
import CategoryService from "../../../Services/CategoryService";

import { ApplicationState } from "../../../app/store";
import { fetchRequest } from "../../../app/category/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface PropsFromState {
    data: Category[]
}
interface propsFromDispatch {
    fetchRequest: (list: Category[]) => any;
}
type AllProps = PropsFromState & propsFromDispatch;

const ProductList: React.FC<AllProps> = ({ data, fetchRequest }: { data: Category[], fetchRequest: (list: Category[]) => void }) => {
    useEffect(() => {
        var service = new CategoryService();
        service.GetCategories().then(data => {
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
            dispatch(fetchRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);