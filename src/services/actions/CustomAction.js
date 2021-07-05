import { SHOW_SNACKBAR, HIDE_SNACKBAR, SHOW_BACKDROP, HIDE_BACKDROP } from "services/redux/common/Types"

export const showSnackBar = (alertType, message) => async dispatch => {
    dispatch({
        type: SHOW_SNACKBAR,
        alertType: alertType,
        message: message
    })

    setTimeout(() => {
        dispatch({
            type: HIDE_SNACKBAR
        })
    }, 5000)
}

export const showBackdrop = (open) => async dispatch => {
    if(open){
        dispatch({ type: SHOW_BACKDROP })
    }else{
        dispatch({ type: HIDE_BACKDROP })
    }
    
}