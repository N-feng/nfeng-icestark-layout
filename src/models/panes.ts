import { asideMenuConfig } from '../layouts/BasicLayout/menuConfig';
import type { MenuConfig } from "../utils";
import { Store } from 'vuex'

export interface State {
  panes: MenuConfig[]
  activeKey: string
}

export default {
  namespaced: true,
  state: {
    panes: asideMenuConfig.slice(0, 1),
    activeKey: asideMenuConfig[0].activePath,
  },
  mutations: {
    append (prevState: State, payload: MenuConfig) {
      const opened = prevState.panes.some((pane) => pane.activePath === payload.activePath);
      prevState.panes = opened ? prevState.panes : prevState.panes.concat(payload);
      prevState.activeKey = payload.activePath
    }
  },
  actions: {
    append({ commit }: Store<State>, payload: MenuConfig) {
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
