// import { Location, SetUp } from "@element-plus/icons-vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { useRouter, useRoute, RouterView, RouteRecordRaw } from 'vue-router'
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  watch,
  KeepAlive,
} from 'vue'
// import { store } from "@ice/stark-data";
import PageNav from './components/PageNav/index'
import TabPanes from './components/TabPanes/index'
import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig'
import { checkActive } from '@/utils'
import type { MenuConfig } from '@/utils'
import { useStore } from '@/store'
import type { MenuProps, MenuTheme } from 'ant-design-vue'
import { microApplicationLoading } from '@/micro'

export default defineComponent({
  setup() {
    const route = useRoute()

    const store = useStore()

    const appNameRef = computed(() => {
      return route.path.split('/')[1]
    })

    const isKeepAliveRef = computed(() => {
      if (route.meta.keepAlive === undefined) {
        return true
      }
      return route.meta.keepAlive
    })

    console.log(isKeepAliveRef.value)

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
      let isKeepAlive = isKeepAliveRef.value
      let appName = appNameRef.value

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
                margin: '24px 16px 0',
              }}
            >
              <div
                style={{
                  padding: '24px',
                  background: '#fff',
                  minHeight: '280px',
                }}
              >
                <TabPanes />
                <RouterView
                  v-slots={{
                    default: ({
                      Component,
                      route,
                    }: {
                      Component: any
                      route: RouteRecordRaw
                    }) => {
                      return (
                        <div>
                          <KeepAlive>
                            {isKeepAlive ? <Component key={appName} /> : ''}
                          </KeepAlive>

                          {!isKeepAlive ? (
                            <Component key={location.pathname} />
                          ) : (
                            ''
                          )}
                        </div>
                      )
                      // return <component is={Component} />
                    },
                  }}
                />
              </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
              <a href="https://beian.miit.gov.cn/">粤ICP备2022038483号-1</a>
            </a-layout-footer>
          </a-layout>
        </a-layout>
      )
    }
  },
})
