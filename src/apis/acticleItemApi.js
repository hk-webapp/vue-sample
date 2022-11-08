import baseApi from './baseApi'
import { ApiException } from './ApiException'
export default class articleApi extends baseApi {
    currentMngArticleUrl = "/ArticleMng/";

    async getArticleItems(artName, artId) {
        try {
            const url = this.currentMngArticleUrl + "AllArticleItems/" + encodeURI(artName) + "/" + artId;
            const response = await this.getMng(url);
            if (response instanceof ApiException) {
                return response;
            }
            else {
                return response.data || [];
            }
        }
        catch (error) {
            return new ApiException(error);
        }
    }

    async getArticle(name) {
        try {
            const response = await this.getMng(this.currentMngArticleUrl + "Article/" + name);
            if (response instanceof ApiException) {
                return response;
            }
            else {
                return response.data || [];
            }
        }
        catch (error) {
            return new ApiException(error);
        }
    }

    async saveArticle(data) {
        try {
            // eslint-disable-next-line no-console
            console.log(1111,data)
           // data.fileInfo = fileInfo;
            const response = await this.postMng(this.currentMngArticleUrl + "ChangeArticle", data);
            // eslint-disable-next-line no-console
            console.log(response, 56565000000000000000656)
            if (response instanceof ApiException) {
                return response;
            }
            else {
                return response.data || [];
            }
        }
        catch (error) {
            return new ApiException(error);
        }
    }
    async approvedArticle(entity) {
        try {
            // eslint-disable-next-line no-console
            console.log(entity, 999999999999)

            const response = await this.postMng(this.currentMngArticleUrl + "ChangeStatusArticle", entity);
            // eslint-disable-next-line no-console
            console.log(response, 741147777777777777)
            if (response instanceof ApiException) {
                return response;
            }
            else {
                return response.data || [];
            }
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.log(error, 9999999999999999999999999)
            return new ApiException(error);
        }
    }

    async deleteArticle(id) {
        try {
            const response = await this.deleteMng(this.currentMngArticleUrl + "article/" + id);
            // eslint-disable-next-line no-console
            console.log(response, 2222222222299999999999999999)
            if (response instanceof ApiException) {
                return response;
            }
            else {
                return 1;
            }
        }
        catch (error) {
            return new ApiException(error);
        }
    }

}