export const getAllProducts = (list) => {
    return {
        type: "LOADED",
        payload: list
    }
}

export const addProduct = (product) => {
    return {
        type: "ADD",
        payload: product
    }
}

export const deleteProduct = (index) => {
    return {
        type: "DELETE",
        payload: index
    }
}

export const editProduct = (product) => {
    return {
        type: "EDIT",
        payload: product
    }
}