import RecommendationService from "services/api/RecommendationService";
import { MY_RECOMMENDATIONS } from "services/redux/common/Types";

const service = new RecommendationService();

export const createRecommendation = (data) => async dispatch => {
    const res = await service.createRecommendation(data);
    return res && res.data;
}

export const updateRecommendation = (id, data) => async dispatch => {
    const res = await service.updateRecommendation(id, data);
    return res && res.data || [];
}

export const findRecommendation = (id) => async dispatch => {
    const res = await service.findRecommendation(id);
    return res && res.data;
}

export const listRecommendations = (term) => async dispatch => {
    const res = await service.listRecommendations(term);
    return res && res.data || [];
}

export const listMyRecommendations = (term) => async dispatch => {
    const res = await service.listMyRecommendations(term);
    dispatch({
        type: MY_RECOMMENDATIONS,
        payload: res && res.data || []
    })
    return res && res.data || [];
}

export const listRecommendationsByEntryQuery = (idEntryQuery) => async dispatch => {
    const res = await service.listRecommendationsByEntryQuery(idEntryQuery);
    return res && res.data || [];
}

export const deleteRecommendation = (id) => async dispatch => {
     const res = await service.deleteRecommendation(id);
     return res && res.data || [];
}