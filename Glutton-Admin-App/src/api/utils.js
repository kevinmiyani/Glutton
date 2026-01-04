import axios from "axios";

export const DOMAIN = `ADD_YOUR_DOMAIN_URL_HERE/`

const BASE_URL = `${DOMAIN}api/`;

const USER_BASE_URL = `${BASE_URL}/user`;
const CUSTOMER_BASE_URL = `${BASE_URL}/customer`;
const RESTAURANT_BASE_URL = `${BASE_URL}/restaurant`;
const RATING_BASE_URL = `${BASE_URL}/rating`;
const PACKAGE_BASE_URL = `${BASE_URL}/package`;
const BOOKING_BASE_URL = `${BASE_URL}/booking`;
const MENU_CATEGORY_BASE_URL = `${BASE_URL}/menu-category`;

const CHECK_USER_URL = `${USER_BASE_URL}/check`;

const ADD_PACKAGE_URL = `${PACKAGE_BASE_URL}/add`;
const REMOVE_PACKAGE_URL = `${PACKAGE_BASE_URL}/remove`;

const ADD_MENU_CATEGORY_URL = `${MENU_CATEGORY_BASE_URL}/add`;
const UPDATE_MENU_CATEGORY_URL = `${MENU_CATEGORY_BASE_URL}/update`;

// GET
export const checkUserByUIDAPI = async (uid) => {
    const res = await axios.get(`${CHECK_USER_URL}/${uid}`);
    return res;
}

export const getRestaurantbyUIDAPI = async (uid) => {
    const res = await axios.get(`${RESTAURANT_BASE_URL}/${uid}`);
    return res;
}

export const getAllCustomerListAPI = async () => {
    const res = await axios.get(`${CUSTOMER_BASE_URL}`);
    return res;
}

export const getAllRestauratListAPI = async () => {
    const res = await axios.get(`${RESTAURANT_BASE_URL}`);
    return res;
}

export const getAllBookingsListAPI = async () => {
    const res = await axios.get(`${BOOKING_BASE_URL}`);
    return res;
}

export const getAllPackagesListAPI = async () => {
    const res = await axios.get(`${PACKAGE_BASE_URL}`);
    return res;
}

export const getAllMenuCategoryListAPI = async () => {
    const res = await axios.get(`${MENU_CATEGORY_BASE_URL}`);
    return res;
}

export const getRestaurantReviewsAPI = async (id) => {
    const res = await axios.get(`${RATING_BASE_URL}/${id}`);
    return res;
}

export const getPackagesAPI = async () => {
    const res = await axios.get(`${PACKAGE_BASE_URL}`);
    return res;
}


// POST
export const addPackageAPI = async (params) => {
    const res = await axios.post(`${ADD_PACKAGE_URL}`, params);
    return res;
}

export const addMenuCategoryAPI = async (params) => {
    const res = await axios.post(`${ADD_MENU_CATEGORY_URL}`, params);
    return res;
}

// PATCH


// DELETE
export const removePackageAPI = async (id) => {
    const res = await axios.delete(`${REMOVE_PACKAGE_URL}/${id}`);
    return res;
}

export const updateMenuCategoryByIdAPI = async (id, params) => {
    const res = await axios.patch(`${UPDATE_MENU_CATEGORY_URL}/${id}`, params);
    return res;
}
