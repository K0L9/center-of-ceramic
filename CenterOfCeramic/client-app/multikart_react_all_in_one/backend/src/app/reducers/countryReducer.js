import countryTypes from "../types/country-types";
const initialState = {
    CountryList: []
}

const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case countryTypes.get:
            return {
                ...state,
                CountryList: action.payload
            }
        case countryTypes.add:
            var addList = state.CountryList.slice();
            addList.push(action.payload);
            return {
                ...state,
                CountryList: addList
            }
        case countryTypes.delete:
            var deletedList = state.CountryList.slice();
            deletedList.splice(action.payload, 1);
            return {
                ...state,
                CountryList: deletedList
            }
        case countryTypes.edit:
            var editedList = state.CountryList.slice();
            editedList[editedList.indexOf(editedList.find(x => x.id == action.payload.id))] = action.payload;
            return {
                ...state,
                CountryList: editedList
            }
        default:
            return state;
    }
}

export default countryReducer;