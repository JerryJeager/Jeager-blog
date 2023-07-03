import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    displayName: '',
    uid: ''
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload
    },
    setDisplayName: (state, action) => {
        state.displayName = action.payload
    },
    setUid: (state, action) => {
      state.uid = action.payload
    }
  }
})

export const { setIsLoggedIn, setDisplayName, setUid } = userSlice.actions

export default userSlice.reducer