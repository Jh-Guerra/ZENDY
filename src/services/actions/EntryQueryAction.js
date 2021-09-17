import EntryQueryService from "services/api/EntryQueryService";
import { showBackdrop } from "./CustomAction";

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

export const listPendingQueries = (term) => async dispatch => {
    const res = await service.listPendingQueries(term);
    return res && res.data || [];
}

export const listQueries = (term) => async dispatch => {
    const res = await service.listQueries(term);
    return res && res.data || [];
}

export const deleteEntryQuery = (id) => async dispatch => {
    const res = await service.deleteEntryQuery(id);
    return res && res.data;
}