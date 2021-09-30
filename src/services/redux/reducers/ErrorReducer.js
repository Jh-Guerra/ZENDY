import { ERROR } from '../common/Types'

const initialState = {
    error: [],
}

export default function(state = initialState, action){
    switch(action.type){

        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return state
    }
}