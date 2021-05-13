import { 
    AUTH_SUCCESS,
    AUTH_LOGOUT
 } from '../common/Types'
 
const initialState = {}

// TODO: User models class
export default function(state = initialState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            localStorage.setItem('user',JSON.stringify(action.payload));
            return {
                ...action.payload
            }
        case AUTH_LOGOUT:
            localStorage.setItem('user',JSON.stringify({}));
            return {
                ...action.payload
            }
        default: return state
    }
}