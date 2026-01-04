import { FETCH_BOOKINGS_DATA } from "./Constants"

export const FetchBookingsData = (data) => {
    return {
        type: FETCH_BOOKINGS_DATA,
        data: data,
    }
}