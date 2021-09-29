import {
    NOTIFICATIONS
} from '../common/Types'

const initialState = {
    notifications: [],
}

export default function(state = initialState, action){
    switch(action.type){

        case NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        default: return state
    }
}