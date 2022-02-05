<script setup lang="ts">
import Error from './components/organisms/error/error.vue'
import useAuthentication from '~/composables/useAuthentication/useAuthentication'
const { userStore } = useAuthentication()
</script>

<template>
  <router-view />
  <Error v-if="userStore.state==='error'" />
</template>
