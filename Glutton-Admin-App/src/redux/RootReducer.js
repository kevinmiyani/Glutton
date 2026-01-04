import { combineReducers } from "redux";
import { UsersReducer } from "./UsersReducer";
import { RestoReducer } from "./RestoReducer";
import { BookingsReducer } from "./BookingsReducer";
import { CategoryReducer } from "./CategoryReducer";
import { PackagesReducer } from "./PackagesReducer";
import { AuthReducer } from "./Authentication/AuthReducer";

export default rootReducer = combineReducers({
    UsersReducer,
    RestoReducer,
    BookingsReducer,
    CategoryReducer,
    PackagesReducer,
    AuthReducer,
})