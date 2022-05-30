<script setup lang="ts">
// import { Location, SetUp } from "@element-plus/icons-vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
// import { store } from "@ice/stark-data";
import PageNav from "./components/PageNav/index.vue";
import TabPanes from "./components/TabPanes/index.vue";
import { asideMenuConfig } from "./menuConfig";
import { checkActive } from "../../utils";
import type { MenuConfig } from "../../utils";
import { useStore } from "../../store";
import type { MenuProps, MenuTheme } from "ant-design-vue";

const router = useRouter();
// console.log(router);
const route = useRoute();

const value = computed(() => {
  return route.path;
});

const handleClick: MenuProps["onClick"] = (menuInfo) => {
  console.log("menuInfo: ", menuInfo);
  const state = { page_id: 1, user_id: 5 };
  const title = "title 1";
  const url = menuInfo.key.toString();

  console.log(history);

  history.pushState(state, title, url);
  // console.log(key)
  // if (typeof menuInfo.key === "string") {
  // router.push(menuInfo.key.toString());
  // }
  // store.set("routerPush", key);
};

const store = useStore();

onMounted(() => {
  const idx = asideMenuConfig.findIndex((config: MenuConfig) =>
    checkActive(window.location.pathname, config)
  );
  if (idx > 0) {
    store.dispatch("panes/append", asideMenuConfig[idx]);
  }
});

const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
const theme = "light" as MenuTheme;
</script>

<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :theme="theme"
    >
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="theme"
        mode="inline"
        @click="handleClick"
      >
        <a-menu-item key="/">
          <!-- <template #title> -->
          <!-- <el-icon><location /></el-icon> -->
          <span>Home</span>
          <!-- </template> -->
        </a-menu-item>
        <a-menu-item key="/about">
          <!-- <template #title> -->
          <span>About</span>
          <!-- </template> -->
        </a-menu-item>
        <a-menu-item key="/login">
          <!-- <template #title> -->
          <span>Login</span>
          <!-- </template> -->
        </a-menu-item>

        <a-sub-menu key="/seller">
          <template #title>
            <span>商家平台（React）</span>
          </template>

          <a-menu-item key="/seller">商家首页</a-menu-item>
          <a-menu-item key="/seller/list">商家列表</a-menu-item>
          <a-menu-item key="/seller/detail">商家详情</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="/waiter">
          <template #title>
            <span>小二平台（Vue）</span>
          </template>
          <a-menu-item key="/waiter"
            >小二首页
            <!-- <router-link to="/waiter" replace>小二首页</router-link> -->
          </a-menu-item>
          <a-menu-item key="/waiter/list"
            >小二列表
            <!-- <router-link to="/waiter/list" replace>小二列表</router-link> -->
          </a-menu-item>
          <a-menu-item key="/waiter/detail"
            >小二详情
            <!-- <router-link to="/waiter/detail" replace>小二详情</router-link> -->
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <!--    <transition name="fade-transform" mode="out-in">-->
    <!--      <keep-alive :include="['Waiter', 'IcestarkApp']">-->
    <!--        <router-view />-->
    <!--      </keep-alive>-->
    <!--    </transition>-->
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <TabPanes />
        <PageNav />
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="css" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
