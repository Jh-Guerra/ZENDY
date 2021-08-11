import CommonService from 'services/api/CommonService';
import {
    UPDATE_LAST_ROUTE,
    UPDATE_LAST_TAB
} from '../redux/common/Types'

const commonService = new CommonService()

export const updateLastRoute = payload => ({
    type: UPDATE_LAST_ROUTE,
    payload: payload
})

export const updateLastTab = payload => ({
    type: UPDATE_LAST_TAB,
    payload: payload
})