import {  createSlice } from "@reduxjs/toolkit"



const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        toast: {
            success: "",
            warning: "",
            error: "",
        }
    },
    reducers: {
        showSuccessToast: (state, action) => {
            state.toast.success = action.payload
        },
        clearToast: (state, action) => {
            if ( state.toast.success ) {
                state.toast.success = ""
            }
            if ( state.toast.warning ) {
                state.toast.warning = ""
            }
            if ( state.toast.error ) {
                state.toast.error = ""
            }
        },
    },
})

export const { showSuccessToast, clearToast } = messagesSlice.actions
export default messagesSlice.reducer
