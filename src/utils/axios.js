import React from 'react';
import axiosClassic from 'axios';
import { updateStatus } from 'services/actions/UserAction';
import { defaultHeaders, getSessionInfo } from 'utils/common';
import config from './../config/Config';

const handleAxiosResponse = async (rConfig) => {
    const results = { response: null, error: null };

    try {
        const res = await axiosClassic(rConfig.url, rConfig);
        results.response = res;
    } catch (error) {
        results.error = error;
        const { data } = error.response;

        const session = getSessionInfo();

        if (data.status === 'Token is Expired') {
            const axiosService = new CustomAxios();
            axiosService.post(config.apiVersion + `users/updateStatus/` + session.user.id, '0', defaultHeaders() );
            localStorage.clear();
            window.location.href = config.commonHost;
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