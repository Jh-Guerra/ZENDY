import {
    SHOW_SNACKBAR,
    HIDE_SNACKBAR,
    SHOW_BACKDROP,
    HIDE_BACKDROP
} from '../common/Types'

const initialState = {
    snackbar: {
        show: false,
        alertType: '',
        message:'',
        actions:[],
    },
    backdrop: {
        show: false
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case SHOW_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    show: true,
                    alertType: action.payload.alertType,
                    message: action.payload.message
                }
            }
        case HIDE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    show: false,
                    alertType: "",
                    message: ""
                }
            }
        case SHOW_BACKDROP:
            return {
                ...state,
                backdrop: {
                    show: true,
                }
            }
        case HIDE_BACKDROP:
            return {
                ...state,
                backdrop: {
                    show: false,
                }
            }
        default: return state
    }
}