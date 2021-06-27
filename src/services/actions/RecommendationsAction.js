import RecommendationService from "services/api/RecommendationService";

const recommendationService = new RecommendationService()

export const createRecommendation = (data) => async dispatch => {
    const res = await recommendationService.createRecommendation(data);
    return res && res.data || [];
}

export const updateRecommendation = (id, data) => async dispatch => {
    const res = await recommendationService.updateRecommendation(id, data);
    return res && res.data || [];
}

export const findRecommendation = (id) => async dispatch => {
    const res = await recommendationService.findRecommendation(id);
    return res && res.data || [];
}

export const listRecommendations = () => async dispatch => {
    const res = await recommendationService.listRecommendations();
    return res && res.data || [];
}

export const deleteRecommendation = (id) => async dispatch => {
    const res = await recommendationService.deleteRecommendation(id);
    return res && res.data || [];
}