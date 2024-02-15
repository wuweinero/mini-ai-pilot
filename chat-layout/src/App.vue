<template>
  <a-config-provider :locale="zhCN" :theme="{ algorithm: theme.darkAlgorithm}">
    <a-app>
      <Home/>
    </a-app>
  </a-config-provider>
</template>

<script setup>
import Home from './views/Home.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { theme } from 'ant-design-vue';
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background-color: #141414;
}
</style>
