import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import dbAPI from "../api/db"
import { F } from "../helpers/constants"
import { updateFilters } from "./settingsCommon"
import { loadUser } from "./user"


const defaultFilters = {
    [F.EXCLUDE_KEYWORDS]: {
        "urine": true
    },
    [F.EXCLUDE_COUNTRIES]: {
        "india": true
    },
    [F.EXCLUDE_CATEGORIES]: {},
    [F.EXCLUDE_NAMES]: {
        "Crap": true
    },
    [F.EXCLUDE_CURRENCIES]: {
        "inr": true
    },
    [F.MAX_BIDS]: 15,
    [F.MIN_CLIENT_RATING]: 1,
    [F.LANGUAGES]: {
        "en": true
    },
}





const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        filters: defaultFilters,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [updateFilters.pending]: (state, action) => {
            if ( state.loading ) return
            state.loading = true
            state.error = null

        },
        [updateFilters.fulfilled]: (state, action) => {
            if ( !state.loading ) return
            Object.assign(state.filters, action.payload.filters)
            state.loading = false
            state.error = null
        },
        [updateFilters.rejected]: (state, action) => {
            if (!state.loading) return 
            state.loading = false
            state.error = action.error
        },
        [loadUser.fulfilled]: (state, action) => {
            const loadedFilters = action.payload.userData?.settings?.filters 
            state.filters = loadedFilters || defaultFilters
        },
    }
})

// export const { updateFIlters } = filtersSlice.actions
export default filtersSlice.reducer
