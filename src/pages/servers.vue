<script setup lang="ts">
import useServers from '~/composables/useServers/useServers'
const { serverList, serversLoading, loadServers } = useServers()
useHead({
  title: 'Forget Games - Server',
  meta: [
    { name: 'description', content: 'Our server dashboard' },
  ],
})
loadServers()

</script>
<template>
  <h1>Forget Games</h1>
  <hr class="-mt-2 mb-4 border-black">
  <h2 class="mb-12">
    Servers
  </h2>
  <div class="server-list">
    <div v-if="serversLoading">
      Loading...
    </div>
    <template
      v-for="server in serverList"
      :key="server.name"
    >
      <card :server="server" />
    </template>
  </div>
</template>
