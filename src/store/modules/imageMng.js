import { imageManagment } from '../../apis/imageApi';
import { ApiException } from './../../apis/ApiException'

export default {
    state: {
        loaded: false,
        errorMsg: "",
        info: []
    },
    mutations: {
        setImgInfo(state, payload) {
            state.info = payload;
        },
        setImgLoaded(state, payload) {
            state.loaded = payload;
        },
        setImgErrorMsg(state, payload) {
            state.errorMsg = payload;
        },
    },
    getters: {
        getImg: (state) => {
            return state.info || [];
        },
        getimgLoaded: (state) => {
            return state.loaded
        },
        getImgError: (state) => {
            return state.errorMsg
        },
    },
    actions: {
        saveImage({ commit }, payload) {
            commit("setImgLoaded", false);
            commit("setImgErrorMsg", "")
            const info = payload[0];
            const category = payload[1];
            const mineType = payload[2];

            return imageManagment.SaveImages(info, category, mineType)
                .then(response => {
                    if (response instanceof ApiException) {
                        commit("setImgLoaded", true);
                        commit("setImgErrorMsg", response.getError())
                    } else {
                        commit("setImgInfo", response);
                        commit("setImgLoaded", true);
                        commit("setImgErrorMsg", "");
                    }
                }).catch(error => {
                    commit("setImgLoaded", false);
                    commit("setImgErrorMsg", error)
                });
        }
    }
}