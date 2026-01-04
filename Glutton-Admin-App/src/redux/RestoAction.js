import { FETCH_RESTOES_DATA } from "./Constants"

export const FetchRestoData = (data) => {
    return {
        type: FETCH_RESTOES_DATA,
        data: data,
    }
}