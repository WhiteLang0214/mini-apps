import { createStore } from 'vuex';
import { state } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import user from './modules/user';

export default createStore({
  state,
  getters,
  mutations,
  modules: {
    user,
  },
});
