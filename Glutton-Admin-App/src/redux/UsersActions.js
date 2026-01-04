import { FETCH_USER_DATA } from "./Constants"

export const FetchUserData = (data) => {
    return {
        type: FETCH_USER_DATA,
        data: data,
    }
}