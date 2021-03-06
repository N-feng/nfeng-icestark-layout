import { useRouter, useRoute } from 'vue-router'
import { defineComponent, computed, onMounted, ref, PropType } from 'vue'
import type { MenuProps, MenuTheme } from 'ant-design-vue'
import { useStore } from '@/store'
import { asideMenuConfig } from '@/layouts/BasicLayout/menuConfig'
import { checkActive } from '@/utils'
import type { MenuConfig } from '@/utils'

import { store as starkData } from '@ice/stark-data'

export interface MenuItem {
  key: string | number
  title: string
  children?: MenuItem[]
}

const SubMenu = defineComponent({
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object as PropType<MenuItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => {
      const { menuInfo } = props

      return (
        <a-sub-menu
          key={menuInfo.key}
          v-slots={{
            default: () => {
              return menuInfo.children?.map((item) => {
                return <a-menu-item key={item.key}>{item.title}</a-menu-item>
              })
            },
            title: () => {
              return <span>{menuInfo.title}</span>
            },
          }}
        />
      )
    }
  },
})

export default defineComponent({
  setup() {
    const openKeysRef = ref<string[]>([
      '/' + window.location.pathname.split('/')[1],
    ])

    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const selectedKeysRef = computed(() => {
      return [route.path]
    })

    const theme = 'light' as MenuTheme
    const list: MenuItem[] = [
      {
        key: '/',
        title: 'Home',
      },
      {
        key: '/about',
        title: 'About',
      },
      {
        key: '/login',
        title: 'Login',
      },

      {
        key: '/seller',
        title: '商家平台（React）',
        children: [
          {
            key: '/seller',
            title: '商家首页',
          },
          {
            key: '/seller/list',
            title: '商家列表',
          },
          {
            key: '/seller/detail',
            title: '商家详情',
          },
        ],
      },

      {
        key: '/waiter',
        title: '小二平台（Vue）',
        children: [
          {
            key: '/waiter',
            title: '小二首页',
          },
          {
            key: '/waiter/list',
            title: '小二列表',
          },
          {
            key: '/waiter/detail',
            title: '小二详情',
          },
        ],
      },
    ]

    const handleClick: MenuProps['onClick'] = (menuInfo) => {
      const pathname = menuInfo.key.toString()
      console.log('pathname: ', pathname)

      const idx = asideMenuConfig.findIndex((config: MenuConfig) =>
        checkActive(pathname, config),
      )
      if (idx > -1) {
        store.dispatch('panes/append', asideMenuConfig[idx])
      }

      const state = {}
      const title = pathname.split('/')[1]
      console.log('title: ', title)
      const url = pathname
      starkData.set('routerPush', { state, title, url })
      router.push(pathname)
      // console.log('router: ', router);
    }

    return () => {
      const openKeys = openKeysRef.value
      const selectedKeys = selectedKeysRef.value

      return (
        <a-menu
          id={'dddddd'}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          theme={theme}
          mode={'inline'}
          onClick={handleClick}
        >
          {list.map((item) =>
            item.children ? (
              <SubMenu menuInfo={item} />
            ) : (
              <a-menu-item key={item.key}>{item.title}</a-menu-item>
            ),
          )}
        </a-menu>
      )
    }
  },
})
