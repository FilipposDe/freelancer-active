import { createAsyncThunk } from "@reduxjs/toolkit"
import dbAPI from "../api/db"

export const updateFilters = createAsyncThunk(
    "filters/patchFiltersStatus",
    async ( filters, { getState } ) => {
        const { authenticatedUser: user } = getState().user
        await dbAPI.updateUserSettings( user, { filters } )
        return { filters }
    }
)



