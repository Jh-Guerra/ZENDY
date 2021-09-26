import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CommonReducer from './CommonReducer'
import ChatReducer from './ChatReducer';
import CustomReducer from './CustomReducer';
import EntryQueryReducer from './EntryQueryReducer';

//We have to combine all reducers
const rootReducer = combineReducers({
  session: AuthReducer,
  common: CommonReducer,
  custom: CustomReducer,
  entryQueryRedux: EntryQueryReducer,
  chatRx: ChatReducer
})

export default (state, action) =>
  rootReducer(action.type === 'AUTH_LOGOUT' ? undefined : state, action);