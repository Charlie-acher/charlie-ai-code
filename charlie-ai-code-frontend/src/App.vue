<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'

const route = useRoute()
const isBlankLayout = computed(() => route.meta.layout === 'blank')

</script>

<template>
  <router-view v-if="isBlankLayout" />
  <BasicLayout v-else />
</template>

<style>
</style>
