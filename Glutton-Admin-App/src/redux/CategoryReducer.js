import { FETCH_CATEGORY_DATA } from "./Constants";

const initialState = [];

export const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_DATA:
            return action.data;
        default:
            return state;
    }
}