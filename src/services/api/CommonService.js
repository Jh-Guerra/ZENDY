import axios from 'axios';
import config from "../../config/Config";
import moment from 'moment'

class CommonService {

    // async getContractsForCompany() {
    //     return await axios.get(
    //         config.apiVersion + `mgmt/contracts/byCompany`, 
    //         { headers: {
    //             ...config.headers, 
    //             Authorization: `token ${JSON.parse(localStorage.getItem('user')).accessToken || ''}` 
    //         } }
    // )}

    // async addMemberToQueue(body) {
    //     return await axios.post(
    //         config.apiVersion + `mgmt/shops/transactions`, 
    //         body,
    //         { headers: {
    //             ...config.headers, 
    //             Authorization: `token ${JSON.parse(localStorage.getItem('user')).accessToken || ''}` 
    //         } }
    // )}

    // async removeTransaction(transactionId, data) {
    //     return await axios.delete(
    //         config.apiVersion + `pos/shops/transactions/${transactionId}`,
    //         { 
    //             headers: {
    //                 ...config.headers, 
    //                 Authorization: `token ${JSON.parse(localStorage.getItem('user')).accessToken || ''}` 
    //             },
    //             data: data
    //         }
    // )}}

    // async getOrdersByStatus({start = 0, limit = 0, status = '', term = '', afterDate = '', beforeDate = ''}) {
    //     return await axios.get(
    //         config.apiVersion + `mgmt/dispatch/transactions/status`, 
    //         { 
    //             headers: {
    //                 ...config.headers, 
    //                 Authorization: `token ${JSON.parse(localStorage.getItem('user')).accessToken || ''}` 
    //             },
    //             params: {
    //                 start: start || 0,
    //                 limit: limit || 0,
    //                 status: status,
    //                 afterDate: afterDate,
    //                 beforeDate: beforeDate,
    //                 term: term || ""
    //             }
    //         }
    // )}


}

export default CommonService;