import variantTypes from "../types/variant-types"

export const setVariant = (variant) => {
    return {
        type: variantTypes.set,
        payload: variant
    }
}
export const clearVariants = () => {
    return {
        type: variantTypes.clear,
    }
}
export const removeVariant = (id) => {
    return {
        type: variantTypes.remove,
        payload: id
    }
}