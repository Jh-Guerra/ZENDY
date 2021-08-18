import axios from '../../utils/axios';
import config from "../../config/Config";
import moment from 'moment'

class CommonService {

    // async getContractsForCompany() {
    //     return await axios.get(
    //         config.apiVersion + `mgmt/contracts/byCompany`, 
    //         { headers: {
    //             ...config.headers, 
    //             Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
    //         } }
    // )}

    // async addMemberToQueue(body) {
    //     return await axios.post(
    //         config.apiVersion + `mgmt/shops/transactions`, 
    //         body,
    //         { headers: {
    //             ...config.headers, 
    //             Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
    //         } }
    // )}

    // async removeTransaction(transactionId, data) {
    //     return await axios.delete(
    //         config.apiVersion + `pos/shops/transactions/${transactionId}`,
    //         { 
    //             headers: {
    //                 ...config.headers, 
    //                 Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
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
    //                 Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
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