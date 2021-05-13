import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from '../reducers'

const initalState = {

}

const middleware = [thunk]

const Store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default Store;