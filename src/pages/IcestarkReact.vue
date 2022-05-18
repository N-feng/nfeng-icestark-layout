<script setup lang="ts">
import { onMounted, ref } from "vue";
import start from "@ice/stark/lib/start";
import { registerMicroApps } from "@ice/stark/lib/apps";
import { useRouter } from "vue-router";

// export default {
//   name: "IcestarkApp",
//   props: {},
//   mounted() {
//     createMicroApp({
//       name: "waiter",
//       activePath: "/waiter",
//       title: "小二平台",
//       sandbox: true,
//       entry: "http://localhost:8080",
//       container: document.getElementById("container"),
//     });
//   },
//   destroyed() {
//     console.log("icestarkApp destroyed");
//     unmountMicroApp("waiter");
//   },
// };
//

const router = useRouter();
let loading = ref(false);
let microAppsActive = ref(false);

onMounted(() => {
  const container = document.getElementById("seller") as HTMLElement;
  console.log("seller");
  registerMicroApps([
    {
      name: "seller",
      activePath: "/seller",
      title: "小二平台",
      loadScriptMode: "import",
      // sandbox: true,
      entry:
        "http://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-ice-vite/index.html",
      container,
    },
  ]);

  start({
    onLoadingApp: () => {
      console.log("onLoadingApp");
      loading.value = true;
    },
    onFinishLoading: () => {
      console.log("onFinishLoading");

      loading.value = false;
    },
    onRouteChange: (_, pathname) => {
      // 处理微应用间跳转无法触发 Vue Router 响应
      router.push(pathname).catch(() => {});
    },
    onActiveApps: (activeApps) => {
      microAppsActive.value = !!(activeApps || []).length;
    },
  });
});
</script>

<script lang="ts">
export  default {
  name: 'IcestarkApp',
  mounted() {
    console.log('script mounted')
  }
}
</script>

<template>
  <div>
    <div id="seller">seller</div>
  </div>
</template>
