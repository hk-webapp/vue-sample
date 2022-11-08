import { ApiException } from './../../apis/ApiException'
import categoryApi from '../../apis/categoryApi'
var service = new categoryApi();
export default {
    state: {
        // categories: {},
        currentCategory: [],
        pageSize: 10,
        startIndex: 0,
        loaded: false,
        saving: 2,
        errorMsg: "",
        savingErrorMsg: "",
    },
    mutations: {
        setCategory(state, payload) {
            // state.categories[state.startIndex] = payload;
            state.currentCategory = payload;
        },
        setCategoryLoaded(state, payload) {
            state.loaded = payload;
        },
         setErrorMsg(state, payload) {
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
        getCategory: (state) => {
            return state.currentCategory || {};
        },
        getCategoryLoaded: (state) => {
            return state.loaded
        },
        getCategoryError: (state) => {
            return state.errorMsg
        },
        getSavingCategoryError: (state) => {
            return state.savingerrorMsg
        },
        getSavingCategory: (state) => {
            return state.saving;
        },
    },
    actions: {
        setCurrentItem({ commit }, payload) {
            commit("setSavingErrorMsg","");
            commit("setErrorMsg", "");
            commit("setCategory", payload);
        },
        getCategoryData({ commit }, courseName) {
            commit("setCategoryLoaded", false);
            commit("setSavingErrorMsg","");
            commit("setErrorMsg", "");

            service.getCategory(courseName)
                .then(response => {
                    commit("setCategory", response);
                    commit("setCategoryLoaded", true);
                    commit("setSavingErrorMsg","");

                }).catch(error => {
                    commit("setCategoryLoaded", true);
                    // eslint-disable-next-line
                    console.log(error);
                    commit("setErrorMsg", error);
                });
        },
        getEmptyCategoryData({ commit }, courseName) {
            commit("setCategoryLoaded", false);
            commit("setSavingErrorMsg","");
            commit("setErrorMsg", "");

            service.getEmptyCategory(courseName)
                .then(response => {
                    commit("setCategory", response);
                    commit("setCategoryLoaded", true);
                    commit("setSavingErrorMsg","");

                }).catch(error => {
                    commit("setCategoryLoaded", true);
                    // eslint-disable-next-line
                    console.log(error);
                    commit("setErrorMsg", error);
                });
        },
        deleteCategoey({ commit }, payload) {
            commit("setSaving", 0);
            commit("setProductErrorMsg", "")
            commit("setErrorMsg", "");

            return service.deleteCategory(payload)
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setSaving", 1);
                        commit("setErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setSaving", 2);
                        commit("setErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setSaving", 1);
                    commit("setErrorMsg", error)
                    return -1;
                });
        },
        saveCategory({ commit }, payload) {
            commit("setSaving", 0);
            commit("setErrorMsg", "")
            // eslint-disable-next-line no-console
            console.log(payload, 104441010);
            // const category = payload[0];
            // const name = payload[1];
            // const fileInfo = null;
            return service.saveCategory(payload)
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log(response, 101010);
                    if (response instanceof ApiException) {
                        commit("setSaving", 1);
                        commit("setErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setSaving", 2);
                        commit("setErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setSaving", 1);
                    commit("setErrorMsg", error)
                    return -1;
                });
        }

    }
}