import React, { useState } from "react"

import { connect } from "react-redux"

//import models
import { Category } from "../../../redux/types/categoryTypes"

//import thunk
import { ApplicationState } from "../../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface propsFromDispatch {
    // fetchRequest: (list: Category[]) => any;
}
type AllProps = propsFromDispatch;

const AddCategory: React.FC<AllProps> = () => {

    const [name, setName] = useState('');

    const onNameChanged = (e: any) => setName(e.target.value);

    const onSavePostClicked = async () => {
        console.log(name);
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

    };
};

export default connect(null, mapDispatchToProps)(AddCategory)
