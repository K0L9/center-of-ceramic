import productTypes from "../types/product-types"

export const getAllProducts = (list) => {
    return {
        type: productTypes.get,
        payload: list
    }
}

export const addProduct = (product) => {
    return {
        type: productTypes.add,
        payload: product
    }
}

export const deleteProduct = (index) => {
    return {
        type: productTypes.delete,
        payload: index
    }
}

export const editProduct = (product) => {
    return {
        type: productTypes.edit,
        payload: product
    }
}

export const setCurrProduct = (product) => {
    return {
        type: productTypes.setCurrProd,
        payload: product
    }
}