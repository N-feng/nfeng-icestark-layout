import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig';
import { Module } from 'vuex'
import { PanesState, IRootState } from '@/store/types'

const panes: Module<PanesState, IRootState> = {
  namespaced: true,
  state: {
    panes: asideMenuConfig.slice(0, 1),
    activeKey: asideMenuConfig[0].activePath,
  },
  mutations: {
    append (prevState, payload) {
      const opened = prevState.panes.some((pane) => pane.activePath === payload.activePath);
      prevState.panes = opened ? prevState.panes : prevState.panes.concat(payload);
      prevState.activeKey = payload.activePath
    }
  },
  actions: {
    append({ commit }, payload) {
      commit('append', payload)
    },
    remove(prevState: any, key: any) {
      return {
        ...prevState,
        panes: prevState.panes.filter((pane: any) => pane.key !== key),
      };
    },
    updateKey(preState: any, key: any) {
      return {
        ...preState,
        activeKey: key,
      };
    },
  },
};

export default panes;
