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
        case "ADD":
            var addList = state.List.slice();
            addList.push(action.payload);
            return {
                ...state,
                List: addList
            }
        case "DELETE":
            var deletedList = state.List.slice();
            deletedList.splice(action.payload, 1);
            return {
                ...state,
                List: deletedList
            }
        case "EDIT":
            var editedList = state.List.slice();
            editedList[editedList.indexOf(editedList.find(x => x.id == action.payload.id))] = action.payload;
            return {
                ...state,
                List: editedList
            }

        default:
            return state;
    }
}

export default categoryReducer;