import { FETCH_PACKAGES_DATA } from "./Constants";

const initialState = [];

export const PackagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PACKAGES_DATA:
            return action.data;
        default:
            return state;
    }
}