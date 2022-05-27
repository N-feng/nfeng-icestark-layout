<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import start from "@ice/stark/lib/start";
// import { start } from '@ice/stark'
import { registerMicroApps, createMicroApp, unmountMicroApp, removeMicroApps } from "@ice/stark/lib/apps";
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

console.log('setup')

onMounted(() => {
  const container = document.getElementById("waiter") as HTMLElement;
  console.log("waiter");
  createMicroApp(
    {
      name: "waiter",
      activePath: "/waiter",
      title: "小二平台",
      loadScriptMode: "import",
      // sandbox: true,
      entry:
        "http://localhost:3001/",
      container,
    },
  );

  // registerMicroApps([
  //   {
  //     name: "waiter",
  //     activePath: "/waiter",
  //     title: "小二平台",
  //     loadScriptMode: "import",
  //     // sandbox: true,
  //     entry:
  //         "http://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-vue3-vite/index.html",
  //     container,
  //   },
  // ])
  //
  // start({
  //   onLoadingApp: () => {
  //     console.log("onLoadingApp");
  //     loading.value = true;
  //   },
  //   onFinishLoading: () => {
  //     console.log("onFinishLoading");
  //
  //     loading.value = false;
  //   },
  //   onRouteChange: (_, pathname) => {
  //     // 处理微应用间跳转无法触发 Vue Router 响应
  //     router.push(pathname).catch(() => {});
  //   },
  //   onActiveApps: (activeApps) => {
  //     microAppsActive.value = !!(activeApps || []).length;
  //   },
  // });
});

onUnmounted(() => {
  console.log('waiter destroyed')
  unmountMicroApp('waiter')
  // removeMicroApps(['waiter'])
})
</script>

<template>
  <div id="icestarkApp">
    <div id="waiter">waiter</div>
  </div>
</template>
