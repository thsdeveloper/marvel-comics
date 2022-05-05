import { createSlice } from '@reduxjs/toolkit'

//add item in array object redux
const addCharacterToArray = (state, action) => {
  const item = state.favorites.find((item) => item.id === action.payload.id)
  if (!item) {
    state.favorites.push(action.payload)
  }
}

const removeCharacter = (state, action) => {
  // Construct a new result array immutably and return it
  const index = state.favorites.findIndex(({ id }) => id === action.payload.id)
  state.favorites.splice(index, 1)
}

export const slice = createSlice({
  name: 'characters',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorites: addCharacterToArray,
    removeFavorites: removeCharacter,
  },
})

export const { addFavorites, removeFavorites } = slice.actions
export const selectCharacters = (state) => state.characters

export default slice.reducer
