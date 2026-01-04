import { FETCH_BOOKINGS_DATA, } from "./Constants";

const initialState = [];

export const BookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKINGS_DATA:
            return action.data;
        default:
            return state;
    }
}