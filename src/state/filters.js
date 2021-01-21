import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const defaultFilters = {
    excludeKeywords: [
        "urine"
    ],
    excludeCountries: {
        "India": true,
    },
    maxBids: 15,
    minClientRating: 1,
}


export const updateFilters = createAsyncThunk(
    "filters/patchFiltersStatus",
    async ( filters, { getState } ) => {
        // const { nextPage, freelancerFilters } = getState()
        // const { projects, ids } = await freelancerAPI.fetchNextBatch( nextPage, freelancerFilters )
        // return { projects, ids, isInitial }
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

            Object.assign(state.filters, action.payload)
        },
        [updateFilters.fulfilled]: (state, action) => {
            if ( !state.loading ) return
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
