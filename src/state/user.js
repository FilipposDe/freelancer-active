import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import dbAPI from "../api/db"
import userAPI from "../api/user"
import { updateFilters } from "./settingsCommon"



export const loadUser = createAsyncThunk(
    "user/loadUserStatus",
    async ( authenticatedUserClaims ) => {
        
        if ( !authenticatedUserClaims ) return { userData: null, user: null }
        
        const user = userAPI.prepareUserObject( authenticatedUserClaims )
        const userData = await dbAPI.fetchUserData( user )
        return { userData, user }
    }
)



const userSlice = createSlice({
    name: "user",
    initialState: {
        authenticatedUser: null,
        userData: null,
        loading: false,
        error: null,
    },
    reducers: {
        startLoading: (state, action) => {
            if ( state.loading )  return
            state.loading = true
        }
    },
    extraReducers: {
        [loadUser.pending]: (state, action) => {
            if ( state.loading ) return
            state.loading = true
            state.error = null
        },
        [loadUser.fulfilled]: (state, action) => {
            if ( !state.loading ) return
            state.loading = false
            state.error = null
            state.userData = action.payload.userData
            state.authenticatedUser = action.payload.user
        },
        [loadUser.rejected]: (state, action) => {
            if (!state.loading) return 
            state.loading = false
            state.error = action.error
            state.userData = null
            state.authenticatedUser = null
        },
        [updateFilters.fulfilled]: (state, action) => {
            state.userData.filters = action.payload.filters
        },
    }
})

export const { startLoading } = userSlice.actions
export default userSlice.reducer

