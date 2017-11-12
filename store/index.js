import axios from 'axios';

const url = {
  dev: 'http://localhost:3000/api',
  staging: 'http://thegram.ga/api',
  production: 'http://mycoo.link/api'
};

export const state = () => ({
  authUser: null,
  collectionsTable: null,
  url: url.production
});
export const mutations = {
  SET_USER: function(state, user) {
    state.authUser = user;
  },
  SET_ACCOUNTS: function(state, data) {
    state.collectionsTable = data;
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
        if (
          res.data &&
          res.data.collections &&
          res.data.collections.length > 0
        ) {
          commit('SET_ACCOUNTS', res.data.collections);
        }
      })
      .catch(e => {
        const errorMessage = e.response.data.message
          ? e.response.data.message
          : 'There was an error';
        throw new Error(errorMessage);
      });
  },
  delete_collection({ commit }, { collectionName }) {
    return axios
      .delete(`/api/collection/${collectionName}`)
      .then(res => {
        const data = this.state.collectionsTable.filter(
          e => e.collectionName !== collectionName
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
