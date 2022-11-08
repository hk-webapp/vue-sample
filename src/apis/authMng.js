import setting from './apiconfig'
import axios from 'axios'
import { ApiException, ErrorType } from './ApiException'

class authMng {

    baseUrl = setting.authBaseUrl;
    tokenUrl = "/connect/token";
    // authorizeUrl = "/connect/authorize";
    // registerUrl = "/api/Account/RegisterUser";
    // logoffUrl = "/connect/endsession";
    // userinfoUrl = "/connect/userinfo";
    secretId = "secret";

    oauthAxiosObj = axios.create({ baseURL: this.baseUrl });

    async LogIn(username, password) {
        // eslint-disable-next-line no-console
        console.log(username, password, this.baseUrl);

        this.Auth = true;
        this.userName = username;
        /*
                const clientId = "358974e8-a04b-492c-a412-cbb041455d84";
                const redirectUri = location.origin;
                const responseType = "id_token token";
        
                const headerobj = {
                    "content-Type": "application/x-www-form-urlencoded"
                };
        
                let data =
                    "grant_type=password&username=" + username + "&password=" + password;
        
                data =
                    data +
                    "&response_type=" +
                    responseType +
                    "&client_id=" +
                    clientId +
                    "&client_secret=" +
                    this.secretId +
                    "&redirect_uri=" +
                    encodeURI(redirectUri);
        
                const that = this;
                try {
                    const response = await this.oauthAxiosObj
                        .post(this.tokenUrl, data, {
                            headers: headerobj
                        });
                    // eslint-disable-next-line no-console
                    console.log(1000000000, response);
                    return response;
                }
                catch (error) {
                    // eslint-disable-next-line no-console
                    console.log(2111111111111111, typeof error, error);
                    that.HandleError(error)
                }
                */
        return new Promise((resolve, reject) => {
            // this.get("course")
            //  .then(response => {
            resolve({
                Name: "مریم رضایی",
                Image: "user1.jpg"
            });
            // })
            // .catch(error => {
            //     reject(error)
            // });

            // eslint-disable-next-line no-console
            console.log(reject);
        });

    }

    Register(userInfo) {
        // eslint-disable-next-line no-console
        console.log(userInfo);

    }

    loggedIn() {
        return this.Auth;
    }


    HandleError(exception) {
        const error = exception.response;
        // eslint-disable-next-line no-console
        console.log("err", error, exception);
        if (error === undefined && exception.message) {
            return new ApiException(exception.message, ErrorType.General);
        }
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
            //  window.location.href = location.origin + "/";
            return new ApiException(error.data, ErrorType.Forbidden);
        } else if (error.status === 401) {
            // eslint-disable-next-line no-console
            console.log("error ", "Unauthorized");

            return new ApiException(error.data, ErrorType.Unauthorized);
        } else {
            return new ApiException(error.data);
        }
    }

}
const auth = new authMng();
export default auth;