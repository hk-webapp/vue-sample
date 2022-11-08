import { ApiException } from '../../apis/ApiException'
import categoryApi from '../../apis/categoryApi'
var service = new categoryApi();
export default {
    state: {
        // categories: {},
        categoryList: [],
        pageSize: 10,
        startIndex: 0,
        loaded: false,
        errorMsg: ""
    },
    mutations: {
        setCategories(state, payload) {
            //  state.categories[state.startIndex] = payload;
            state.categoryList = payload;
        },
        setLoaded(state, payload) {
            state.loaded = payload;
        },
        setErrorMsg(state, payload) {
            state.errorMsg = payload
        }
    },
    getters: {
        getAllCategories: (state) => {
            return state.categoryList || [];
        },
        getAllProductCategoryLoaded: (state) => {
            return state.loaded
        },
        geterrorMsg: (state) => {
            return state.errorMsg
        }
    },
    actions: {
        getAllCategoryData({ commit }, courseName) {
            commit("setLoaded", false);
            commit("setErrorMsg", "");
            service.getAllCategory(courseName)
                .then(response => {
                    commit("setCategories", response);
                    commit("setLoaded", true);
                }).catch(error => {
                    commit("setLoaded", true);
                    commit("setErrorMsg", error);
                });
        },
        approvedCategory({ commit }, payload) {
            commit("setLoaded", false);
            commit("setErrorMsg", "");

            return service.approvedCategory(payload[0], payload[1])
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setLoaded", true);
                        commit("setErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setLoaded", true);
                        commit("setErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setLoaded", true);
                    commit("setErrorMsg", error)
                    return -1;
                });
        }
    }
}