import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CommonReducer from './CommonReducer'
import ChatReducer from './ChatReducer';
import CustomReducer from './CustomReducer';
import EntryQueryReducer from './EntryQueryReducer';
import RecommendationReducer from './RecommendationReducer';
import NotificationReducer from './NotificationReducer';
import NotificationViewedReducer from './NotificationViewedReducer';

//We have to combine all reducers
const rootReducer = combineReducers({
  session: AuthReducer,
  common: CommonReducer,
  custom: CustomReducer,
  entryQueryRx: EntryQueryReducer,
  recommendationRx: RecommendationReducer,
  chatRx: ChatReducer,
  notificationRx: NotificationReducer,
  notificationViewedRx: NotificationViewedReducer
})

export default (state, action) =>
  rootReducer(action.type === 'AUTH_LOGOUT' ? undefined : state, action);