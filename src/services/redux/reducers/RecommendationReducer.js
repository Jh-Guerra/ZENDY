import {
    MY_RECOMMENDATIONS
} from '../common/Types'

const initialState = {
    recommendations: [],
}

export default function(state = initialState, action){
    switch(action.type){
        case MY_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: action.payload
            }
        default: return state
    }
}