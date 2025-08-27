<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#22c55e',
    primaryColorHover: '#16a34a',
    primaryColorPressed: '#15803d',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
