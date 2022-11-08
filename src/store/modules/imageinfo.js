import { imageManagment } from './../../apis/imageApi'
var service = imageManagment
export default {
    state: {
        loaded: false,
        images: []
    },
    mutations: {
        setImages(state, payload) {
            state.images = payload;
        },
        setImageLoaded(state, payload) {
            state.loaded = payload;
        }
    }
    , getters: {
        getimages(state) {
            return state.images
        },
        getImagesLoaded(state) {
            return state.loaded
        }
    },
    actions: {
        getImagesData({ commit }, category) {
            commit("setImageLoaded", true)
            // eslint-disable-next-line no-console
            service.GetImagesInfo(category).then((response) => {
                commit("setImageLoaded", true)
                commit("setImages", response)

            }).catch((error) => {
                commit("setImageLoaded", true)
                // eslint-disable-next-line no-console
                console.log(error)
            })
        }
    }
}