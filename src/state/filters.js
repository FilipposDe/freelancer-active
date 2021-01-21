import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { F } from "../helpers/constants"


const defaultFilters = {
    [F.EXCLUDE_KEYWORDS]: [
        "urine"
    ],
    [F.EXCLUDE_COUNTRIES]: [
        "india"
    ],
    [F.MAX_BIDS]: 15,
    [F.MIN_CLIENT_RATING]: 1,
}


export const updateFilters = createAsyncThunk(
    "filters/patchFiltersStatus",
    async ( filters, { getState } ) => {
        // const { nextPage, freelancerFilters } = getState()
        // const { projects, ids } = await freelancerAPI.fetchNextBatch( nextPage, freelancerFilters )
        return { filters }
    }
)




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
        }
    }
})

// export const { updateFIlters } = filtersSlice.actions
export default filtersSlice.reducer
