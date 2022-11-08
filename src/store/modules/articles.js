import { ApiException } from './../../apis/ApiException';
import acticleApi from '../../apis/acticleApi';
var service = new acticleApi();
export default {
    state: {
        article: {},
        articles: [],
        pageSize: 10,
        startIndex: 0,
        loaded: false,
        saving: 2,
        errorMsg: "",
        savingErrorMsg: "",
    },
    mutations: {
        setArticles(state, payload) {
            state.articles = payload;
        },
        setArticleLoaded(state, payload) {
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
        setArticle(state, payload) {
            state.article = payload;
        },
    },
    getters: {
        getArticle: (state) => {
            return state.article;
        },
        getArticles: (state) => {
            return state.articles || {};
        },
        getArticleLoaded: (state) => {
            return state.loaded
        },
        getArticleError: (state) => {
            return state.errorMsg
        },
        getSavingArticleError: (state) => {
            return state.savingerrorMsg
        },
        getSavingarticle: (state) => {
            return state.saving;
        },
    },
    actions: {
        setCurrentItem({ commit }, payload) {
            commit("setSavingErrorMsg", "");
            commit("setErrorMsg", "");
            commit("setArticle", payload);
        },
        getArticle({ commit }, payload) {
            service.getArticle(payload).then(response => {
                commit("setArticle", response);
                commit("setArticleLoaded", true);
                commit("setSavingErrorMsg", "");

            }).catch(error => {
                commit("setArticleLoaded", true);
                // eslint-disable-next-line
                console.log(error);
                commit("setSavingErrorMsg", error);

            });
        }
        ,
        approvedArticle({ commit }, payload) {
            commit("setArticleLoaded", false);
            commit("setErrorMsg", "");

            return service.approvedArticle(payload)
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setArticleLoaded", true);
                        commit("setErrorMsg", response.getError())
                        return -1;
                    } else {
                        commit("setArticleLoaded", true);
                        commit("setErrorMsg", "");
                        return 1
                    }
                }).catch(error => {
                    commit("setArticleLoaded", true);
                    commit("setErrorMsg", error)
                    return -1;
                });
        },
        getArticleData({ commit }, payload) {
            const name = payload[0];
            const id = payload[1];
            commit("setArticleLoaded", false);
            commit("setSavingErrorMsg", "");
            commit("setErrorMsg", "");

            service.getArticles(name, id)
                .then(response => {
                    commit("setArticles", response);
                    commit("setArticleLoaded", true);
                    commit("setSavingErrorMsg", "");
                }).catch(error => {
                    commit("setArticleLoaded", true);
                    // eslint-disable-next-line
                    console.log(error);
                    commit("setSavingErrorMsg", error);
                });
        },
        getEmptyArticleData({ commit }, courseName) {
            commit("setArticleLoaded", false);
            commit("setSavingErrorMsg", "");
            commit("setErrorMsg", "");

            service.getEmptyArticle(courseName)
                .then(response => {
                    commit("setArticle", response);
                    commit("setArticleLoaded", true);
                    commit("setSavingErrorMsg", "");

                }).catch(error => {
                    commit("setArticleLoaded", true);
                    // eslint-disable-next-line
                    console.log(error);
                    commit("setErrorMsg", error);
                });
        },
        async   deleteArticle({ commit }, payload) {
            commit("setSaving", 0);
            commit("setProductErrorMsg", "")
            commit("setErrorMsg", "");
            const response = await service.deleteArticle(payload);

            // .then(response => {
            if (response instanceof ApiException) {
                commit("setSaving", 1);
                commit("setErrorMsg", response.getError())
                return -1;
            } else {
                commit("setSaving", 2);
                commit("setErrorMsg", "");
                return 1
            }
            // }).catch(error => {
            //     commit("setSaving", 1);
            //     commit("setErrorMsg", error)
            //     return -1;
            // });
        },
        saveArticle({ commit }, payload) {
            commit("setSaving", 0);
            commit("setErrorMsg", "")
            // eslint-disable-next-line no-console
            console.log(payload, 104441010);
            // const article = payload[0];
            // const name = payload[1];
            // const fileInfo = null;
            return service.saveArticle(payload)
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