import {
    ENTRY_QUERY

} from '../common/Types'

const initialState = {
    entryQueries: [],
}

export default function(state = initialState, action){
    switch(action.type){

        case ENTRY_QUERY:
            return {
                ...state,
                entryQueries: action.payload
            }
        default: return state
    }
}