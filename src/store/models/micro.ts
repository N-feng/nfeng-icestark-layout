import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig'
import { Module } from 'vuex'
import { MicroState, IRootState } from '@/store/types'

const micro: Module<MicroState, IRootState> = {
  namespaced: true,
  state: {
    microApplicationList: new Map([]), // 已注册的微应用列表
  },
  getters: {
    microApplicationList(state) {
      return state.microApplicationList
    },
  },
  actions: {
    // 设置微应用程序列表
    SET_MICRO_APPLICATION_LIST({ state, dispatch }, { key, value }) {
      state.microApplicationList.set(key, value)
    },
    // 通过路径获取微应用配置
    GET_FIND_MICRO_CONFIG({ state }, path) {
      return asideMenuConfig.find((e) => {
        return getPathPrefix(path, '/') === getPathPrefix(e.activePath, '/')
      })
    },
  },
}

// 获取当前的基础路径  如: getPathPrefix('/user/age/xxx', '/') => '/user'
export function getPathPrefix(path: string, prefix = '') {
  if (!path) return
  const pathArray = String(path)
    .split('/')
    .filter((item) => item)
  const basePath = prefix + pathArray[0]
  return basePath
}

export default micro
