/*import { createStore } from 'vuex'
export default createStore({
    state: {
        username: null
    },
    getters: {
        username: (state) => {
            return state.username
        }
    },

    mutations: {
        resetStates(state) {
            state.username = null
        },

        //USER AUTHENTICATED
        setUser(state, loggedInUsername) {
            state.username = loggedInUsername
        },
        resetUser(state) {
            if (state.username) {
                //this.$socket.emit('logged_out', state.user)
                state.username = null
            }
        },
    }
})*/