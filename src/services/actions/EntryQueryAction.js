import EntryQueryService from "services/api/EntryQueryService";
import { ENTRY_QUERY } from "services/redux/common/Types"

const service = new EntryQueryService();

export const createEntryQuery = (data) => async dispatch => {
    const res = await service.createEntryQuery(data);
    return res && res.data;
}

export const findEntryQuery = (id) => async dispatch => {
    const res = await service.findEntryQuery(id);
    return res && res.data;
}

export const listEntryQueries = (term) => async dispatch => {
    const res = await service.listEntryQueries(term);
    return res && res.data || [];
}

export const listPendingQueries = (term, idHelpdesk) => async dispatch => {
    const res = await service.listPendingQueries(term, idHelpdesk);
    dispatch({
        type: ENTRY_QUERY,
        payload: res && res.data || []
    })
    return res && res.data || [];
}

export const deleteEntryQuery = (id) => async dispatch => {
     const res = await service.deleteEntryQuery(id);
     return res && res.data || [];
}

export const listQueries = (term, status, idHelpdesk) => async dispatch => {
    const res = await service.listQueries(term, status, idHelpdesk);
    dispatch({
        type: ENTRY_QUERY,
        payload: res && res.data || []
    })
    return res.data;
}

export const updateEntryQuery = (id, data) => async dispatch => {
    const res = await service.updateEntryQuery(id, data);
    return res && res.data || [];
}

export const acceptEntryQuery = (id, byRecommend) => async dispatch => {
    const res = await service.acceptEntryQuery(id, byRecommend);
    return res && res.data || [];
}

export const recommendUser = (userIds, idEntryQuery) => async dispatch => {
    const res = await service.recommendUser(userIds, idEntryQuery);
    return res && res.data || [];
}

export const listFrequent = () => async dispatch => {
    const res = await service.listFrequent();
    return res && res.data || [];
}

export const updateFrequent = (id, data) => async dispatch => {
    const res = await service.updateFrequent(id, data);
    return res && res.data || [];
}

export const deleteImageEntryQuery = (imageLink,id) => async dispatch => {
    const res = await service.deleteImage(imageLink,id);
    return res && res.data || {};
}

export const deleteFileEntryQuery = (link, id) => async dispatch => {
    const res = await service.deleteFile(link, id);
    return res && res.data || [];
}

export const statusConsult = (id) => async dispatch => {
    const res = await service.statusConsult(id);
    return res && res.data || [];
}

export const consultaPendiente  = () => async dispatch => {
    const res = await service.consultaPendiente ();
    return res && res.data || [];
}

export const statusModalOff  = (status) => async dispatch => {
    const res = await service.statusModalOff(status);
    return res && res.data || [];
}
