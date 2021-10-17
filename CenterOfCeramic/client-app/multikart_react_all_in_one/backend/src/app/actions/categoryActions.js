export const getAllCategories = (list) => {
    return {
        type: "LOADED",
        payload: list
    }
}