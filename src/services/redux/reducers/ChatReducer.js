import { CURRENT_CHAT } from '../common/Types'

const initialState = {
    currentChats: [],
}

export default function(state = initialState, action){
    switch(action.type){

        case CURRENT_CHAT:
            return {
                ...state,
                currentChats: action.payload
            }
        default: return state
    }
}