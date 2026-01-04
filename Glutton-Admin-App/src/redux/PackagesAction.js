import { FETCH_PACKAGES_DATA } from "./Constants"

export const FetchPackagesData = (data) => {
    return {
        type: FETCH_PACKAGES_DATA,
        data: data,
    }
}