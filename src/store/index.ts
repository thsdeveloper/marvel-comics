import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from '@src/store/charactersSlice'

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
})
