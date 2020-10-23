export const state = () => ({
    token: null,
    user: null
});

export const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user;
    },
};

export const actions = {
    guardarToken(state, token) {
        this.commit("setToken", token);
        this.$axios.defaults.headers.common["auth-token"] = token;
    },
    guardarUser(state, user) {
        this.commit("setUser", user);
    },
};

export const getters = {
    isToken(state) {
        return state.token ? true : false;
    },
    isUser(state) {
        return state.user.user ? true : false;
    },

    getUser(state) {
        return state.user;
    }
};