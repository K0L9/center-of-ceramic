import categoryType from "../types/category-type"

export const getAllCategories = (list) => {
    return {
        type: categoryType.get,
        payload: list
    }
}

export const addCategory = (category) => {
    return {
        type: categoryType.add,
        payload: category
    }
}

export const deleteCategory = (index) => {
    return {
        type: categoryType.delete,
        payload: index
    }
}

export const editCategory = (category) => {
    return {
        type: categoryType.edit,
        payload: category
    }
}