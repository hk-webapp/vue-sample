import productApi from '../../apis/productApi'
import { ApiException } from '../../apis/ApiException'

var productService = new productApi();
export default {
    state: {
        products: {},
        currentProducts: [],
        pageSize: 10,
        startIndex: 0,
        loaded: false,
        errorMsg: "",
    },
    mutations: {
        setProducts(state, payload) {
            state.products[state.startIndex] = payload;
            state.currentProducts = payload;
        },
        setProductsLoaded(state, payload) {
            state.loaded = payload;
        },
        setProductsErrorMsg(state, payload) {
            state.errorMsg = payload;
        },
    },
    getters: {
        getProducts: (state) => {
            return state.currentProducts || [];
        },
        getProductsLoaded: (state) => {
            return state.loaded
        },
        getProductsError: (state) => {
            return state.errorMsg
        },
    },
    actions: {
        getProductsData({ commit }) {
            commit("setProductsLoaded", false);
            commit("setProductsErrorMsg", "")

            productService.getProducts()
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setProductsErrorMsg", response.getError())
                        commit("setProducts", []);
                    }
                    else {
                        commit("setProducts", response);
                    }
                    commit("setProductsLoaded", true);
                }).catch(error => {
                    commit("setProductsLoaded", true);
                    commit("setProductsErrorMsg", error)
                    commit("setProducts", []);
                });
        },
        approvedProduct({ commit }, payload) {
            commit("setProductsLoaded", false);
            commit("setProductsErrorMsg", "")

            return productService.approvedProduct(payload[0], payload[1])
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setProductsLoaded", true);
                        commit("setProductsErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setProductsLoaded", true);
                        commit("setProductsErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setProductsLoaded", true);
                    commit("setProductsErrorMsg", error)
                    return -1;
                });
        }

    }
}