import { createStore } from 'vuex';
import panes from './models/panes';

const store = createStore({
  modules: {
    panes
  }
});

export default store;
