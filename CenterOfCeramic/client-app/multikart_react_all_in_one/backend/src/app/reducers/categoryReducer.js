import { getDefaultNormalizer } from "@testing-library/dom";

const initialState = {
    List: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADED":
            return {
                ...state,
                List: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer;