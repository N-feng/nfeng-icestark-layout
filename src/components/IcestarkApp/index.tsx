import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  PropType,
  onActivated,
} from 'vue'
import { createMicroApp, unmountMicroApp } from '@ice/stark/lib/apps'
import type { MenuConfig } from '@/utils'
import { useStore } from '@/store'

export default defineComponent({
  name: 'IcestartApp',
  // props: {
  //   appConfig: {
  //     type: Object as PropType<MenuConfig>,
  //     required: true,
  //   },
  // },
  setup(props) {
    // const appRef = ref(undefined)
    const store = useStore()
    const appName = location.pathname.split('/')[1]

    onActivated(() => {
      console.log('onActivated')
    })

    onMounted(async () => {
      const appConfig = await store.dispatch(
        'micro/GET_FIND_MICRO_CONFIG',
        appName,
      )
      const container = document.getElementById(appName) as HTMLElement
      createMicroApp(
        {
          ...appConfig,
          container,
        },
        undefined,
        {
          onAppEnter: (appConfig) => {
            console.log('appConfig: ', appConfig)
          },
          onActiveApps: (activeApps) => {
            console.log('activeApps: ', activeApps)
          },
          onFinishLoading: () => {
            // console.log('onFinishLoading')
          },
          onRouteChange: (_, pathname) => {
            console.log('pathname: ', pathname)
          },
          shouldAssetsRemove: () => false,
        },
      )
    })

    onUnmounted(async () => {
      const appConfig = await store.dispatch(
        'micro/GET_FIND_MICRO_CONFIG',
        appName,
      )
      unmountMicroApp(appConfig.name)
    })
    return () => {
      // return <div id={props.appConfig.name} />
      return <div id={appName}>IcestarkApp</div>
    }
  },
})
