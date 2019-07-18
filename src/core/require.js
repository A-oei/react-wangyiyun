import axios from 'axios';

let baseConfig = {
    baseURL: 'http://localhost:3000/',
    timeout: 300000,
    header: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

let interceprors = {
    requestSuccess(config) {
        let token = window.localStorage.getItem('token');
        if (token) {
            config.header['token'] = token;
        }
        return config;
    },
    requestError(error) {
        return Promise.reject(error)
    },
    responseSuccess(data) {

        let rdata = data.data;

        return Promise.resolve(rdata);
    },
    responseError(error) {
        return Promise.reject(error);
    }
}

const request = (ajax, methods, url, params, config = baseConfig, upload = false, isFormat = false) => {
    if (methods.toLowerCase() == 'get') {
        params && (Object.keys(params).forEach(item => {
            (params[item] == '' || params[item] == undefined || params[item] == null) && (delete params[item]);
        }))

        //-------------------------------
        //规避304请求

        let time = new Date().getTime();

        params && (params['__rid'] = time);

        return ajax.get(url, {params: {...params}});
    }
    else if (methods.toLowerCase() == 'post') {

        if (upload) {
            let formData = new FormData();
            Object.keys(params).map(item => {
                formData.append(item, params[item]);
            })
            params = formData;

            ajax({
                ...{
                    header: {
                        'Content-Type': 'multipart/form-data'
                    },
                    ...config
                }
            })
        }

        return ajax.post(url, params);
    }
};


const create = (config) => {

    let ajax = _ => {
        let http = axios.create({...baseConfig, ...config});
        http.interceptors.request.use(interceprors.requestSuccess, interceprors.requestError);
        http.interceptors.response.use(interceprors.responseSuccess, interceprors.responseError);
        return http;
    }

    return {
        get(url, params) {
            return request(ajax(config), 'get', url, params)
        },
        post(url, params, isFormat, upload, config) {
            return request(ajax(config), 'post', url, params, config, upload, isFormat);
        }
    }
}

export default {
    ...create(),
    create(config) {
        baseConfig = {
            ...baseConfig,
            ...config
        }
    }
}
