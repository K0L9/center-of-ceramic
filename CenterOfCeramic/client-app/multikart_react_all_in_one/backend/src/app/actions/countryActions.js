import countryTypes from "../types/country-types"

export const getAllCountries = (list) => {
    return {
        type: countryTypes.get,
        payload: list
    }
}

export const addCountry = (country) => {
    return {
        type: countryTypes.add,
        payload: country
    }
}

export const deleteCountry = (index) => {
    return {
        type: countryTypes.delete,
        payload: index
    }
}

export const editCountry = (country) => {
    return {
        type: countryTypes.edit,
        payload: country
    }
}