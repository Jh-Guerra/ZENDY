import CommonService from 'services/api/CommonService';
import {
    UPDATE_LAST_ROUTE
} from '../redux/common/Types'

const commonService = new CommonService()

export const updateLastRoute = payload => ({
    type: UPDATE_LAST_ROUTE,
    payload: payload
})

// export const getIncomingOrders = () => async dispatch => {
//     try{
//         const res = await commonService.getIncomingOrders()
//         dispatch( {
//             type: GET_INCOMING_ORDERS,
//             payload: res.data
//         });
//         return res.data;
//     }
//     catch(e){
//         dispatch( {
//             type: ORDERS_ERROR,
//             payload: console.log(e),
//         })
//     }
// }