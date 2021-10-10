import React, { useState } from "react"

import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

//import models
import { Category } from "../../../redux/types/categoryTypes"

//import thunk
import { ApplicationState } from "../../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { addCategoryRequest } from "../../../redux/actions/categoryAction"

import CategoryList from "./categoryList"

interface propsFromDispatch {
    // fetchRequest: (list: Category[]) => any;
}
type AllProps = propsFromDispatch;

const AddCategory: React.FC<AllProps> = () => {

    const [name, setName] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    const onNameChanged = (e: any) => setName(e.target.value);

    const onSavePostClicked = async () => {
        addCategoryRequest({ id: 0, name: name, products: "" });
        setIsRedirect(true);
        console.log("IS REDIRECT on save: ", isRedirect);
    }

    console.log("IS REDIRECT before return: ", isRedirect);
    if (isRedirect == true) {
        return (<Redirect to="/category-list"></Redirect>)
    }

    return (
        <div className="container">
            <input type="text" value={name} onChange={onNameChanged} />
            <button type="button" onClick={onSavePostClicked}>ADD</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        addCategoryRequest: (categ: Category) => {
            dispatch(addCategoryRequest(categ));
        }
    };
};

export default connect(null, mapDispatchToProps)(AddCategory)
