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

export default defineComponent({
  name: 'IcestartApp',
  props: {
    appConfig: {
      type: Object as PropType<MenuConfig>,
      required: true,
    },
  },
  setup(props) {
    // const appRef = ref(undefined)

    onActivated(() => {
      console.log('onActivated')
    })

    onMounted(() => {
      const container = document.getElementById(
        props.appConfig.name,
      ) as HTMLElement
      createMicroApp(
        {
          ...props.appConfig,
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

    onUnmounted(() => {
      unmountMicroApp(props.appConfig.name)
    })
    return () => {
      return <div id={props.appConfig.name} />
    }
  },
})
