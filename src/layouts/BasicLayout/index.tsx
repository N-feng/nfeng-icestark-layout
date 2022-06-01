// import { Location, SetUp } from "@element-plus/icons-vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, computed, onMounted, ref } from 'vue'
// import { store } from "@ice/stark-data";
import PageNav from './components/PageNav/index'
import TabPanes from './components/TabPanes/index'
import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig'
import { checkActive } from '@/utils'
import type { MenuConfig } from '@/utils'
import { useStore } from '@/store'
import type { MenuProps, MenuTheme } from 'ant-design-vue'

export default defineComponent({
  setup() {
    // console.log(router);
    const route = useRoute()
    console.log('route: ', route)

    const value = computed(() => {
      return route.path
    })

    const store = useStore()

    const isKeepAlive = computed(() => {
      if (route.meta.keepAlive === undefined) {
        return true
      }
      return route.meta.keepAlive
    })

    const collapsedRef = ref<boolean>(false)
    const theme = 'light' as MenuTheme

    onMounted(() => {
      const idx = asideMenuConfig.findIndex((config: MenuConfig) =>
        checkActive(window.location.pathname, config),
      )
      if (idx > 0) {
        store.dispatch('panes/append', asideMenuConfig[idx])
      }
    })

    const handleClick = () => {
      collapsedRef.value = !collapsedRef.value
    }

    return () => {
      let collapsed = collapsedRef.value

      return (
        <a-layout id={'components-layout-demo-custom-trigger'}>
          <a-layout-sider
            v-model:collapsed={collapsed}
            trigger={null}
            collapsible
            theme={theme}
          >
            <div class={'logo'} />
            <PageNav />
          </a-layout-sider>
          <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
              {collapsed ? (
                <MenuUnfoldOutlined
                  class={'trigger'}
                  onClick={() => handleClick()}
                />
              ) : (
                <MenuFoldOutlined
                  class={'trigger'}
                  onClick={() => handleClick()}
                />
              )}
            </a-layout-header>
            <a-layout-content
              style={{
                margin: '24px 16px',
                padding: '24px',
                background: '#fff',
                minHeight: '280px',
              }}
            >
              <TabPanes />
            </a-layout-content>
          </a-layout>
        </a-layout>
      )
    }
  },
})
