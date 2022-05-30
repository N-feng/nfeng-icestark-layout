<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "@/store";
import IcestarkApp from "@/components/IcestarkApp.vue";
import Component from "./component.vue";

onMounted(() => {
  console.log("tabPanes");
});

const store = useStore();
const activeKey = ref("/" + window.location.pathname.split("/")[1]);

const panesState = store.state.panes;
</script>

<template>
  <div>
    {{ activeKey }}{{ panesState.panes }}
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        v-for="item in panesState.panes"
        :key="item.activePath"
        :tab="item.name"
      >
        IcestarkApp
        <IcestarkApp />
        <Component />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
