import FrequentQueryService from 'services/api/FrequentQueryService';

const frequentQueryService = new FrequentQueryService()

export const findFrequentQuery = (id) => async dispatch => {
    const res = await frequentQueryService.findFrequentQuery(id);
    return res && res.data || [];
}

export const listFrequentQueries = () => async dispatch => {
    const res = await frequentQueryService.listFrequentQueries();
    return res && res.data || [];
}
