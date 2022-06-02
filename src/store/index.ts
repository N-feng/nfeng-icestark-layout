import { createStore, Store, useStore as useVuexStore } from 'vuex';

import panes from './models/panes';
import { InjectionKey } from "vue";
import { IRootState } from './types';
import type { IStore } from './types';

export const IStoreKey: InjectionKey<Store<IRootState>> = Symbol()

export const store = createStore<IRootState>({
  state: {
    count: 0
  },
  modules: {
    panes: panes,
  }
});

export default store;

export function useStore(): Store<IStore> {
  return useVuexStore();
}
