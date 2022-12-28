import { computed, DefineComponent, defineComponent, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import IcestarkApp from '@/components/IcestarkApp/index'
import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig'
import { checkActive } from '@/utils'
import type { MenuConfig } from '@/utils'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const panesStateRef = computed(() => store.state.panes)
    // console.log('panesStateRef: ', panesStateRef.value)

    onMounted(() => {
      const idx = asideMenuConfig.findIndex((config: MenuConfig) =>
        checkActive(window.location.pathname, config),
      )
      if (idx > -1) {
        store.dispatch('panes/append', asideMenuConfig[idx])
      }
    })

    const onChange = (activeKey: string) => {
      const path = store.state.panes.panes.find(
        (pane) => pane.activePath === activeKey,
      )?.activePath
      if (path) {
        const idx = asideMenuConfig.findIndex((config: MenuConfig) =>
          checkActive(path, config),
        )
        if (idx > -1) {
          store.dispatch('panes/append', asideMenuConfig[idx])
        }
        console.log(store.state.panes)
        router.push(path)
      }
    }
    return () => {
      // const activeKey = activeKeyRef.value
      const panesState = panesStateRef.value
      return (
        <div>全栈学习</div>
        // <a-tabs activeKey={panesState.activeKey} onChange={onChange}>
        //   {panesState.panes.map((item) => (
        //     <a-tab-pane
        //       key={item.activePath}
        //       tab={item.name}
        //       forceRender={true}
        //     >
        //       {/* <IcestarkApp appConfig={item} /> */}
        //     <a-tab-pane key={item.activePath} tab={item.name} forceRender>
        //       <IcestarkApp appConfig={item} />
        //       {/* <router-view appConfig={item} /> */}
        //     </a-tab-pane>
        //   ))}
        // </a-tabs>
      )
    }
  },
})
