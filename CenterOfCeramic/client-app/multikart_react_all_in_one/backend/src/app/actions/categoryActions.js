export const getAllCategories = (list) => {
    return {
        type: "LOADED",
        payload: list
    }
}

export const addCategory = (category) => {
    return {
        type: "ADD",
        payload: category
    }
}

export const deleteCategory = (index) => {
    return {
        type: "DELETE",
        payload: index
    }
}

export const editCategory = (category) => {
    return {
        type: "EDIT",
        payload: category
    }
}