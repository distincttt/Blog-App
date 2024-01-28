import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const profileSlice = createAppSlice({
  name: 'profile',
  initialState: { user: {}, authorized: false, serverErrors: {} },
  reducers: (create) => ({
    userSave: create.reducer((state, action) => {
      state.user = action.payload
      state.authorized = true
    }),
    userDelete: create.reducer((state) => {
      state.user = {}
      state.authorized = false
    }),
    clearServerErrors: create.reducer((state, action) => {
      state.serverErrors[action.payload] = null
    }),
    userRegister: create.asyncThunk(
      async (userData, { dispatch }) => {
        const user = JSON.stringify({
          user: { username: userData.username, email: userData.email, password: userData.password },
        })
        const response = await fetch('https://blog.kata.academy/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: user,
        })
        let errors = await response.json()
        errors = JSON.stringify(errors)

        if (response.ok) {
          dispatch(userLogin(userData))
        } else throw Error(errors)
      },
      {
        fulfilled: (state) => {
          state.serverErrors = {}
          state.authorized = true
        },
        rejected: (state, action) => {
          state.serverErrors = JSON.parse(action.error.message).errors
        },
      }
    ),
    userLogin: create.asyncThunk(
      async (userData) => {
        const user = JSON.stringify({
          user: { email: userData.email, password: userData.password },
        })
        const response = await fetch('https://blog.kata.academy/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: user,
        })

        if (response.ok) {
          const res = await response.json()
          const user = JSON.stringify({ ...res, authorized: true })
          localStorage.setItem('user', user)
          return res
        } else {
          let errors = await response.json()
          errors = JSON.stringify(errors)
          throw Error(errors)
        }
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload.user
          state.serverErrors = {}
          state.authorized = true
        },
        rejected: (state, action) => {
          state.serverErrors = JSON.parse(action.error.message).errors
        },
      }
    ),
    userUpdate: create.asyncThunk(
      async (userData) => {
        const user = JSON.stringify({
          user: { email: userData.email, username: userData.username, image: userData.image },
        })
        const response = await fetch('https://blog.kata.academy/api/user', {
          method: 'PUT',
          headers: {
            Authorization: `Token ${userData.token}`,
            'Content-Type': 'application/json',
          },
          body: user,
        })

        if (response.ok) {
          const res = await response.json()
          const user = JSON.stringify({ ...res, authorized: true })
          localStorage.setItem('user', user)
          return res
        } else {
          let errors = await response.json()
          errors = JSON.stringify(errors)
          throw Error(errors)
        }
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload.user
          state.serverErrors = {}
        },
        rejected: (state, action) => {
          state.serverErrors = JSON.parse(action.error.message).errors
        },
      }
    ),
  }),
})

export const { userSave, userDelete, userRegister, userLogin, clearServerErrors, userUpdate } = profileSlice.actions

export default profileSlice.reducer
