import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMobileSidebarActive: false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleIsMobileSidebarActive: (state) => {
            state.isMobileSidebarActive = !state.isMobileSidebarActive
        }
    }
})

export const { toggleIsMobileSidebarActive } = sidebarSlice.actions

export default sidebarSlice.reducer
