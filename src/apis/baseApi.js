import axios from 'axios'
import setting from './apiconfig'
import { ApiException, ErrorType } from './ApiException'

export default class baseApi {

    baseUrl = setting.baseUrl + "api/";
    axiosObj = axios.create({ baseURL: this.baseUrl });
    currentMngUrl = this.baseUrl + "mng";

    async get(url, config = {}) {
        const that = this
        const currentUrl = this.baseUrl + url;
        try {
            const response = await axios.get(currentUrl, config);
            return response;
        }
        catch (error) {
            return that.HandleError(error)
        }

    }

    async getOrginalResponse(url, config = {}) {

        const currentUrl = this.baseUrl + url;
        const that = this;
        try {
            const response = await axios.get(currentUrl, config);
            return response;
        }
        catch (error) {
            return that.HandleError(error)
        }
    }

    async saveOrginImage(url, data, config = {}) {

        const currentUrl = this.baseUrl + url;
        const that = this;
        try {
            const response = await axios.post(currentUrl, data, config);
            return response;
        }
        catch (error) {
            return that.HandleError(error)
        }

    }



    async getMng(url) {

        const currentUrl = this.currentMngUrl + url;
        const that = this; 
        try {
            const response = await axios.get(currentUrl);
            return response || [];
        }
        catch (error) {
            window._______qqqq = error;
            return that.HandleError(error)
        }
    }

    async postMng(url, data) {

        const headers = {
            "Content-Type": "application/json",
            // tslint:disable-next-line: object-literal-sort-keys
            Accept: "application/json"
        };
        // eslint-disable-next-line no-console
        console.log(3333, this.currentMngUrl + url)
        const that = this
        try {
            const response = await axios.post(this.currentMngUrl + url, data, { headers });
            return response || [];
        }
        catch (error) {
            return that.HandleError(error)
        }
    }

    async deleteMng(url) {

        const currentUrl = this.currentMngUrl + url;
        const that = this;
        try {
            const response = await axios.delete(currentUrl);
            return response || [];
        }
        catch (error) {
            window._______qqqq = error;
            return that.HandleError(error)
        }
    }

    HandleError(exception) {
        const error = exception.response;
        // eslint-disable-next-line no-console
        console.log("err", error);
        window.______qqqqq = exception;
        if (error === undefined && exception.message) {
            return new ApiException(exception.message, ErrorType.General);
        } else
            if (error.status === 400) {
                // eslint-disable-next-line no-console
                console.log("error ", "bad request", error);
                if (error.data) {
                    const data = error.data;
                    if (data.error_description) {
                        return new ApiException(data.error_description, ErrorType.General);
                    } else if (data.error) {
                        return new ApiException(data.error + "", ErrorType.General);
                    } else if (Object.keys(data).length > 0) {
                        let message = "";
                        Object.keys(data).map((err) => {
                            message = message + "\r\n " + data[err];
                        });
                        return new ApiException(message, ErrorType.General);
                    }
                    return new ApiException(error.data + "", ErrorType.General);
                } else {
                    return new ApiException(error.statusText + " 400", ErrorType.General);
                }
            }
        if (error.status === 404) {
            // eslint-disable-next-line no-console
            console.log("error ", "NotFound", error);
            return new ApiException(error.statusText + " url", ErrorType.General);
        } else if (error.status === 403) {
            // eslint-disable-next-line no-console
            console.log("error ", "Forbidden");
            window.location.href = location.origin + "/";
            return new ApiException(error.data, ErrorType.Forbidden);
        } else if (error.status === 401) {
            // this.ResetAuthorizationData();
            // this._router.navigate(['/Unauthorized']);
            // eslint-disable-next-line no-console
            console.log("error ", "Unauthorized");
            // authService.ResetAuthorizationData();
            //  this.Logoff();

            return new ApiException(error.data, ErrorType.Unauthorized);
        } else {
            return new ApiException(error.data);
        }
    }

}