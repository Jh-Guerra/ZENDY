import { 
    UPDATE_LAST_ROUTE,
    UPDATE_LAST_TAB
 } from '../common/Types'

 const initialState = {
    lastRoute: "",
    lastTab: ""
 }

 export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_LAST_ROUTE:
            return {
                ...state,
                lastRoute: action.payload
            }
        case UPDATE_LAST_TAB:
            return {
                ...state,
                lastTab: action.payload
            }
        default:
            return state;
    }
 }