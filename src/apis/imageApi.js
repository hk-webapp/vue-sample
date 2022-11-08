import { ApiException } from './ApiException';
import BaseApi from './baseApi';

class ImageApi extends BaseApi {

    async  GetImagesInfo(category) {
        const url = "Images/AllInfo/" + category;
        const response = await this.get(url);
        // eslint-disable-next-line no-console
        console.log(77777, response)
        if (response instanceof ApiException) {
            return response
        } else {
            // const minetype = this.GetImageMimeTypeFromImageFileExtension(name.split(".")[1].toLowerCase());

            // const image = btoa(new Uint8Array(response.data)
            //     .reduce((data, byte) => data + String.fromCharCode(byte), ''));

            // const item = {
            //     Name: name,
            //     // tslint:disable-next-line: object-literal-sort-keys
            //     Category: category,
            //     Data: 'data:' + minetype + ';base64,' + image,
            // };
            // eslint-disable-next-line no-console
            // console.log(item);
            // return item.Data;
            return null;
        }
    }
    GetImageUrl(name, category = "shared") {
        return this.baseUrl + "Images/" + category + "/" + name;
    }

    async GetImages(name, category = "shared") {

        if (name === "") {
            return null;
        }
        const response = await this.getOrginalResponse("Images/" + category + "/" + name, { responseType: 'arraybuffer' });

        if (response instanceof ApiException) {
            return response
        } else {
            const minetype = this.GetImageMimeTypeFromImageFileExtension(name.split(".")[1].toLowerCase());

            const image = btoa(new Uint8Array(response.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), ''));

            const item = {
                Name: name,
                // tslint:disable-next-line: object-literal-sort-keys
                Category: category,
                Data: 'data:' + minetype + ';base64,' + image,
            };
            // eslint-disable-next-line no-console
            console.log(item);
            return item.Data;
        }
    }

    async SaveImages(fileinput, category = "shared", minetype) {

        if (fileinput === null | undefined) {
            return null;
        }

        const image = btoa(new Uint8Array(fileinput)
            .reduce((data, byte) => data + String.fromCharCode(byte), ''));

        const data = 'data:' + minetype + ';base64,' + image;
        // eslint-disable-next-line no-console
        console.log(data, 5656565)
        const response = await this.saveOrginImage("ImagesIn/" + category, data,
            { requestType: 'arraybuffer' });

        //    { requestType: 'arraybuffer' }

        // eslint-disable-next-line no-console
        console.log(response, 878787878)

        if (response instanceof ApiException) {
            return response
        } else {


            // eslint-disable-next-line no-console
            console.log(response);
            const item = {
                Name: name,
                // tslint:disable-next-line: object-literal-sort-keys
                Category: category,
                Data: 'data:' + minetype + ';base64,' + fileinput,
            };
            // eslint-disable-next-line no-console
            console.log(item);
            return item.Data;
        }
    }

    ShowImages(fileinput, minetype) {

        if (fileinput === null | undefined) {
            return null;
        }

        const image = btoa(new Uint8Array(fileinput)
            .reduce((data, byte) => data + String.fromCharCode(byte), ''));

        const data = 'data:' + minetype + ';base64,' + image;

        return data;
    }


    GetImageMimeTypeFromImageFileExtension(extension) {
        let mimetype;

        switch (extension) {
            case "png":
                mimetype = "image/png";
                break;
            case "gif":
                mimetype = "image/gif";
                break;
            case "jpg":
            case "jpeg":
                mimetype = "image/jpeg";
                break;
            case "bmp":
                mimetype = "image/bmp";
                break;
            case "tiff":
                mimetype = "image/tiff";
                break;
            case "wmf":
                mimetype = "image/wmf";
                break;
            case "jp2":
                mimetype = "image/jp2";
                break;
            case "svg":
                mimetype = "image/svg+xml";
                break;
            default:
                mimetype = "application/octet-stream";
                break;
        }

        return mimetype;
    }
}

export const imageManagment = new ImageApi();