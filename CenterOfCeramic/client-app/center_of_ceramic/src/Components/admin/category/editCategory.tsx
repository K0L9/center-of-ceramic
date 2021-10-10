import React, { useState } from "react"

import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

//import models
import { Category } from "../../../redux/types/categoryTypes"

//import thunk
import { ApplicationState } from "../../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { editCategoryRequest } from "../../../redux/actions/categoryAction"

import categoryService from "../../../services/CategoryService";

interface PropsFromState {
    currentCategory: Category
}
interface propsFromDispatch {
    editCategoryRequest: (id: number, category: Category) => any;
}
type AllProps = propsFromDispatch & PropsFromState;

const EditCategory: React.FC<AllProps> = ({ currentCategory, editCategoryRequest }) => {
    console.log("current catego: ", currentCategory)
    const [name, setName] = useState(currentCategory.name);
    const [isRedirect, setIsRedirect] = useState(false);

    const onNameChanged = (e: any) => setName(e.target.value);

    const onSavePostClicked = async () => {
        editCategoryRequest(currentCategory.id, { id: currentCategory.id, name: name, products: currentCategory.products });
        categoryService.EditCategory(currentCategory.id, { id: currentCategory.id, name: name, products: currentCategory.products })
        setIsRedirect(true);
    }

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

const mapStateToProps = ({ category }: ApplicationState) => ({
    currentCategory: category.currentCategory
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        editCategoryRequest: (id: number, category: Category) => {
            dispatch(editCategoryRequest(id, category))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory)
