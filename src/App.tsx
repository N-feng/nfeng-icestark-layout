// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, onMounted, watch } from 'vue'

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
