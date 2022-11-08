import baseApi from './baseApi'
import { ApiException } from './ApiException'
export default class productApi extends baseApi {
    currentCourseMngUrl = "/CourseMng/";

    async getProducts() {
        try {
            const response = await this.getMng(this.currentCourseMngUrl + "Allcourse");
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

    async getProduct(name) {
        try {
            const response = await this.getMng(this.currentCourseMngUrl + "Course/" + name);
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

    async saveProduct(data, fileInfo) {
        try {
            //data.fileInfo = fileInfo;
            const response = await this.postMng(this.currentCourseMngUrl + "ChangeCourse", data);
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
    async approvedProduct(id, name) {
        try {
            const data = { "Id": id, "Name": name };
            const response = await this.postMng(this.currentCourseMngUrl + "ChangeStatusCourse", data);
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

    async deleteProduct(id) {
        try {
            const response = await this.deleteMng(this.currentCourseMngUrl + "Course/" + id);
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