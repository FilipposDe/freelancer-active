import { combineReducers, configureStore } from "@reduxjs/toolkit"
import projectsReducer from "./projects"
import userReducer from "./user"
import filtersReducer from "./filters"



const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
    filters: filtersReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store