// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, onMounted } from 'vue'
import start from '@ice/stark/lib/start'

export default defineComponent({
  setup() {
    onMounted(() => {
      // start({
      //   onActiveApps: (activeApps) => {
      //     console.log('activeApps: ', activeApps)
      //   },
      // })
    })

    return () => {
      return <router-view />
    }
  },
})
