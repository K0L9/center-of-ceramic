import React from "react";

import { connect } from "react-redux";
import { useEffect } from "react";

import { getAllCategoriesAction } from "../../../Actions/CategoryAction";

import CategoryReducer from "../../../Reducers/CategoryReducer"
import CategoryService from "../../../Services/CategoryService";


const ProductList = ({ getAllCategoriesAction, Categories }: { getAllCategoriesAction: any, Categories: any }) => {
    useEffect(() => {
        var service = new CategoryService();
        service.GetCategories().then(data => {
            getAllCategoriesAction(data.List);
        })
    }, [])

    console.log("CATEROGRIES: ", Categories)

    return (
        <h2>{Categories[0]}</h2>
    )
}

const mapStateToProps = (CategoryReducer: any) => {
    const { Categories } = CategoryReducer;
    return { Categories };
}

const mapDispatchToProps = {
    getAllCategoriesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);