import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    displayName: ''
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload
    },
    setDisplayName: (state, action) => {
        state.displayName = action.payload
    }
  }
})

export const { setIsLoggedIn, setDisplayName } = userSlice.actions

export default userSlice.reducer