import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import IcestarkApp from '@/components/IcestarkApp.vue'
import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig'
import { checkActive } from '@/utils'
import type { MenuConfig } from '@/utils'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const panesStateRef = computed(() => store.state.panes)
    const onChange = (activeKey: string) => {
      const path = store.state.panes.panes.find(
        (pane) => pane.activePath === activeKey,
      )?.activePath
      if (path) {
        console.log(path)
        router.push(path)
      }
    }

    onMounted(() => {
      const idx = asideMenuConfig.findIndex((config: MenuConfig) =>
        checkActive(window.location.pathname, config),
      )
      if (idx > -1) {
        store.dispatch('panes/append', asideMenuConfig[idx])
      }
    })
    return () => {
      const panesState = panesStateRef.value
      return (
        <a-tabs activeKey={panesState.activeKey} onChange={onChange}>
          {panesState.panes.map((item) => (
            <a-tab-pane key={item.activePath} tab={item.name}>
              <IcestarkApp appConfig={item} />
            </a-tab-pane>
          ))}
        </a-tabs>
      )
    }
  },
})
