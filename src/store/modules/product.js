import productApi from '../../apis/productApi'
import { ApiException } from './../../apis/ApiException'

var productService = new productApi();
export default {
    state: {
        currentProduct: [],
        pageSize: 10,
        startIndex: 0,
        loaded: false,
        saving: 2,
        errorMsg: "",
        savingErrorMsg: "",
    },
    mutations: {
        setProduct(state, payload) {
            state.currentProduct = payload;
        },
        setProductLoaded(state, payload) {
            state.loaded = payload;
        },
        setProductErrorMsg(state, payload) {
            state.errorMsg = payload;
        },
        setSavingErrorMsg(state, payload) {
            state.savingErrorMsg = payload;
        },
        setSaving(state, payload) {
            state.saving = payload;
        },

    },
    getters: {
        getProduct: (state) => {
            return state.currentProduct || [];
        },
        getProductLoaded: (state) => {
            return state.loaded
        },
        getProductError: (state) => {
            return state.errorMsg
        },
        getSavingProductError: (state) => {
            return state.savingerrorMsg
        },
        getSaving: (state) => {
            return state.saving;
        },
    },
    actions: {
        getProductData({ commit }, name) {
            commit("setProductLoaded", false);
            commit("setProductErrorMsg", "")

            productService.getProduct(name)
                .then(response => {

                    // eslint-disable-next-line no-console
                    console.log(response, 4455000000000000055444);

                    if (response instanceof ApiException) {
                        commit("setProductErrorMsg", response.getError())
                        commit("setProduct", {});
                    }
                    else {
                        commit("setProduct", response);
                    }
                    commit("setProductLoaded", true);
                }).catch(error => {
                    commit("setProductLoaded", true);
                    commit("setProductErrorMsg", error)
                    commit("setProduct", {});
                });
        },

        deleteProduct({ commit }, payload) {
            commit("setSaving", 0);
            commit("setProductErrorMsg", "")

            return productService.deleteProduct(payload)
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setSaving", 1);
                        commit("setProductErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setSaving", 2);
                        commit("setProductErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setSaving", 1);
                    commit("setProductErrorMsg", error)
                    return -1;
                });
        },
        saveProduct({ commit }, payload, fileInfo) {
            commit("setSaving", 0);
            commit("setProductErrorMsg", "")

            return productService.saveProduct(payload, fileInfo)
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setSaving", 1);
                        commit("setProductErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setSaving", 2);
                        commit("setProductErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setSaving", 1);
                    commit("setProductErrorMsg", error)
                    return -1;
                });
        }
       
    }
}