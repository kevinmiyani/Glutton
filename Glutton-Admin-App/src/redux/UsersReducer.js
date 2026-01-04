import { FETCH_USER_DATA } from "./Constants";

const initialState = [];

export const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return action.data;
        default:
            return state;
    }
}