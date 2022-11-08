import { ApiException } from './../../apis/ApiException';

import articleItemApi from './../../apis/acticleItemApi'
const service = new articleItemApi();
export default {
    state: {
        articleItems: [],
        loaded: false,
        errorMsg: ""
    },
    mutations: {
        setArticleItems(state, payload) {
            state.articleItems = payload;
        },
        setLoadedArticleItems(state, payload) {
            state.loaded = payload;
        },
        setErrorArticleItems(state, payload) {
            state.errorMsg = payload;
        }
    },
    getters: {
        getArticleItems: (state) => {
            return state.articleItems;
        },
        getLoadedArticleItems: (state) => {
            return state.loaded;
        }
    },
    actions: {
        async  getArticleItemsData({ commit }, name, id) {
            commit("setLoadedArticleItems", false)
            const response = await service.getArticleItems(name, id);
            if (response instanceof ApiException) {
                commit("setErrorArticleItems", response)

            }
            else {
                commit("setErrorArticleItems", "")
                commit("setArticleItems", response.data || [])

            }
            commit("setLoadedArticleItems", true)

        }
    }
}