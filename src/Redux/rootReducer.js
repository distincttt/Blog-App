import { combineReducers } from 'redux'

import articleSlice from './articleSlice'
import profileSlice from './profileSlice'

export const rootReducer = combineReducers({ articleSlice, profileSlice })
