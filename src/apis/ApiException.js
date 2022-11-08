export const ErrorType = { General: 0, Unauthorized: 1, Forbidden: 2 };


export class ApiException {
    constructor(error, errortype = 0) {
        // eslint-disable-next-line
        this._error = error;
        this._errorType = errortype;
        this.getError = () => {
            return this._error;
        }
        // // tslint:disable-next-line: variable-name
        // _error;
        // _errorType;
        // constructor() {
        // } 
    }
}
