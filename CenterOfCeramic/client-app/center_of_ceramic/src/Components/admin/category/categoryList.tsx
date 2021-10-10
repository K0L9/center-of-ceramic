import React from "react";

import { connect } from "react-redux";
import { useEffect } from "react";

import { Category } from "../../../redux/types/categoryTypes";
import categoryService from "../../../services/CategoryService";

import { ApplicationState } from "../../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

//import actions
import { fetchRequest, deleteCategoryRequest } from "../../../redux/actions/categoryAction";

import { Link } from "react-router-dom"

interface PropsFromState {
    data: Category[]
}
interface propsFromDispatch {
    fetchRequest: (list: Category[]) => any;
    deleteCategoryRequest: (id: number) => any;
}
type AllProps = PropsFromState & propsFromDispatch;

const CategoryList: React.FC<AllProps> = ({ data, fetchRequest, deleteCategoryRequest }) => {
    useEffect(() => {
        categoryService.GetCategories().then(data => {
            fetchRequest(data.List);
        })
    }, [])

    const onRemoveClick = (id: number, categId: number) => {
        deleteCategoryRequest(id);
        categoryService.DeleteCategory(categId);
    }

    const dataList = data.map((d, index) =>
        <tr key={d.id}>
            <td scope="row">{d.id}</td>
            <td>{d.name}</td>
            <td>
                <i onClick={() => onRemoveClick(index, d.id)} className="fas fa-remove"></i>
                <i className="fas fa-edit"></i>
            </td>
        </tr>)

    return (

        <div>
            <Link to="add-category" className="btn btn-success">Добавити категорію</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Ід</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList}
                </tbody>
            </table>
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
        },
        deleteCategoryRequest: (id: number) => {
            dispatch(deleteCategoryRequest(id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);