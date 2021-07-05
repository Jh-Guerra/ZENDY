import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CommonReducer from './CommonReducer'
import CustomReducer from './CustomReducer';

//We have to combine all reducers
const rootReducer = combineReducers({
  session: AuthReducer,
  common: CommonReducer,
  custom: CustomReducer
})

export default (state, action) =>
  rootReducer(action.type === 'AUTH_LOGOUT' ? undefined : state, action);