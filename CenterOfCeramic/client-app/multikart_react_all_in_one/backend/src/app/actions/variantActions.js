import variantTypes from "../types/variant-types"

export const setVariant = (variant) => {
    return {
        type: variantTypes.set,
        payload: variant
    }
}