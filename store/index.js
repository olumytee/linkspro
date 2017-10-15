import axios from 'axios';

export const state = () => ({
  authUser: null,
  accountsTable: null
});

export const mutations = {
  SET_USER: function(state, user) {
    state.authUser = user;
  },
  SET_ACCOUNTS: function(state, data) {
    state.accountsTable = data;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser);
    }
  },
  updateUser({ commit }, { data }) {
    commit('SET_USER', data);
  },
  login({ commit }, { email, password }) {
    return axios
      .post('/api/login', {
        email,
        password
      })
      .then(res => {
        commit('SET_USER', res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          throw new Error('Bad credentials');
        }
      });
  },

  register({ commit }, { email, password }) {
    return axios
      .post('/api/register', {
        email,
        password
      })
      .then(res => {
        commit('SET_USER', res.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          throw new Error('Bad credentials');
        }
      });
  },

  logout({ commit }) {
    return axios.get('/api/logout').then(() => {
      commit('SET_USER', null);
    });
  },

  load_dashboard({ commit }) {
    return axios
      .get('/api/dashboard')
      .then(res => {
        if (res.data && res.data.accounts && res.data.accounts.length > 0) {
          commit('SET_ACCOUNTS', res.data.accounts);
        }
      })
      .catch(e => {
        const errorMessage = e.response.data.message
          ? e.response.data.message
          : 'There was an error';
        throw new Error(errorMessage);
      });
  },
  delete_account({ commit }, { username }) {
    return axios
      .delete(`/api/account/${username}`)
      .then(res => {
        const data = this.state.accountsTable.filter(
          e => e.username !== username
        );
        commit('SET_ACCOUNTS', data);
      })
      .catch(e => {
        const errorMessage = e.response.data.message
          ? e.response.data.message
          : 'There was an error';
        throw new Error(errorMessage);
      });
  }
};
