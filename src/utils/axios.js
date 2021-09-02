import axiosClassic from 'axios';
import { findUserStatus } from 'services/actions/UserAction';
import { getSessionInfo } from 'utils/common';

const handleAxiosResponse = async (config) => {
    const results = { response: null, error: null };

    try {
        const res = await axiosClassic(config.url, config);
        results.response = res;
    } catch (error) {
        results.error = error;
        const { data } = error.response;

        const session = getSessionInfo();

        if (data.status === 'Token is Expired') {
            this.props.dispatch(findUserStatus(session.user.id, '0' ))
            localStorage.clear();
            window.location.href('/');
        }
    }

    return new Promise((resolve, reject) => {
        if(results.response) 
            resolve(results.response);

        if(results.error) 
            reject(results.error);
    });
}

class CustomAxios {
    get(url, config){
        return handleAxiosResponse({
            ...config,
            url,
            method: 'get'
        });
    }

    post(url, data, config){
        return handleAxiosResponse({
            ...config,
            url,
            data,
            method: 'post'
        });
    }

    put(url, data, config){
        return handleAxiosResponse({
            ...config,
            url,
            data,
            method: 'put'
        });
    }

    options(url, config){
        return handleAxiosResponse({
            ...config,
            url,
            method: 'options'
        });
    }

    patch(url, data, config){
        return handleAxiosResponse({
            ...config,
            url,
            data,
            method: 'patch'
        });
    }

    delete(url, config){
        return handleAxiosResponse({
            ...config,
            url,
            method: 'delete'
        });
    }

    head(url, config){
        return handleAxiosResponse({
            ...config,
            url,
            method: 'head'
        });
    }

    request(config){
        return handleAxiosResponse({
            ...config
        });
    }
}


export default new CustomAxios()