import { 
    UPDATE_LAST_ROUTE
 } from '../common/Types'

 const initialState = {
    lastRoute: ""
 }

 export default function(state = initialState, action){
    switch(action.type){
        case UPDATE_LAST_ROUTE:
            return {
                ...state,
                lastRoute: action.payload
            }
        default:
            return state;
    }
 }