import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import freelancerAPI from "../api/projects"
import filterProject from "../helpers/filterProject"
import normalizeProjects from "../helpers/normalize"


export const fetchNextProjectsBatch = createAsyncThunk(
    "projects/fetchNextBatchStatus",
    async ( isInitial, { getState } ) => {
        const { nextPage } = getState().projects
        const { filters } = getState().filters
        const projects = await freelancerAPI.fetchNextBatch( nextPage )
        const filteredProjects = projects
            .filter( project => filterProject( project, filters) )
        const { projects: normalizedProjects, ids } = normalizeProjects(filteredProjects)
        const excludedCount = projects.length - ids.length
        return { projects: normalizedProjects, ids, isInitial, excludedCount }
    }
)




const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: {},
        ids: [],
        nextPage: 0,
        currExcludedCount: 0,
        loading: false,
        error: null
    },
    reducers: {
        clearProjects: (state, action ) => {
            state.ids = []
            state.projects = {}
            state.nextPage = 0
        }
    },
    extraReducers: {
        [fetchNextProjectsBatch.pending]: (state, action) => {
            if ( state.loading ) return
            state.currExcludedCount = 0
            state.loading = true
            state.error = null
        },
        [fetchNextProjectsBatch.fulfilled]: (state, action) => {
            if ( !state.loading ) return
            state.loading = false
            state.error = null

            if ( action.payload.isInitial ) {
                state.ids = []
                state.projects = {}
                state.nextPage = 0
                state.currExcludedCount = 0
            }

            state.ids.push(...action.payload.ids)
            Object.assign(state.projects, action.payload.projects) 
            state.nextPage = state.nextPage + 1
            state.currExcludedCount = action.payload.excludedCount
        },
        [fetchNextProjectsBatch.rejected]: (state, action) => {
            if (!state.loading) return 
            state.loading = false
            state.error = action.error
        }
    }
})

export const { clearProjects } = projectsSlice.actions
export default projectsSlice.reducer


// export const usersAdapter = createEntityAdapter({
//     sortComparer: (a, b) => a.first_name.localeCompare(b.first_name)
// })
// export const {
//     selectById: selectUserById,
//     selectIds: selectUserIds,
//     selectEntities: selectUserEntities,
//     selectAll: selectAllUsers,
//     selectTotal: selectTotalUsers
// } = usersAdapter.getSelectors(state => state.users)


