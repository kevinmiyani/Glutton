import { FETCH_RESTOES_DATA } from "./Constants";

const initialState = [];

export const RestoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESTOES_DATA:
            return action.data;
        default:
            return state;
    }
}