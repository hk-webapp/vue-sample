import { ApiException } from './ApiException'
import baseApi from './baseApi'
export default class categoryApi extends baseApi {
    currentCourseMngUrl = "/CourseMng/";
    currentCategoryMngUrl = "/CategoryMng/";

    async getAllCategory(courseName) {
        try {
            const response = await this.getMng(this.currentCourseMngUrl + courseName + "/AllCategories");
            return response.data || [];
        }
        catch (error) {
            return error;
        }
    }


    async getEmptyCategory(name) {
        try {
            const response = await this.getMng(this.currentCategoryMngUrl + "GetEmpty/" + name);
            return response.data || [];
        }
        catch (error) {
            return error;
        }
    }

    async getCategory(name) {
        try {
            const response = await this.getMng(this.currentCategoryMngUrl + "GetCategory/" + name);
            return response.data || [];
        }
        catch (error) {
            return error;
        }
    }
    async saveCategory(data) {
        try {
            // eslint-disable-next-line no-console
            console.log(1114444444444444, data)
            // data.fileInfo = fileInfo;
            const response = await this.postMng(this.currentCategoryMngUrl + "ChangeCategory", data);
            // eslint-disable-next-line no-console
            console.log(response, 740000000000)
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
    async approvedCategory(id, name) {
        try {
            const data = { "Id": id, "Name": name };
            const response = await this.postMng(this.currentCategoryMngUrl + "ChangeStatusCategory", data);
            // eslint-disable-next-line no-console
            console.log(response, 7400000000000000000000000000000)
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
    async deleteCategory(id) {
        try {
            const response = await this.deleteMng(this.currentCategoryMngUrl + "Category/" + id);
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