import auth from '../../apis/authMng'
export default {
    state: {
        loading: false,
        authorized: false,
        userInfo: {
            userName: "",
            name: "",
            image: ""
        }
    },
    mutations: {
        setloginLoading(state, payload) {
            state.loading = payload;
        },
        setUserInfo(state, payload) {
            state.authorized = !!payload.authorized;
            state.userInfo.userName = payload.username;
            state.userInfo.name = payload.userInfo.Name;
            state.userInfo.image = payload.userInfo.Image;
        }
    },
    getters: {
        isAuthorized: (state) => state.authorized,
        getUserName: (state) => state.userInfo.userName,
        getUserInfo: (state) => state.userInfo,
        getUserLoginLoad: (state) => state.loading,
    },
    actions: {
        LoginUser({ commit }, payload) {//{ state, commit, rootState }
            commit('setloginLoading', true);

            auth.LogIn(payload.username, payload.password)
                .then(data => {
                    commit('setUserInfo', { username: payload.username, authorized: true, userInfo: data })
                    commit('setloginLoading', false);
                }).catch(error => {
                    commit('setloginLoading', false);
                    auth.HandleError(error);
                });
        }
    }
}
