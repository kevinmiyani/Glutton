import { FETCH_CATEGORY_DATA } from "./Constants"

export const FetchCategoriesData = (data) => {
    return {
        type: FETCH_CATEGORY_DATA,
        data: data,
    }
}