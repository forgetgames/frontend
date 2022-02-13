<script setup lang="ts">
import useServers from '~/composables/useServers/useServers'
import Spinner from '~/components/atoms/Loaders/Spinner/Spinner.vue'
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
  <h2 class="mb-12">
    Servers
  </h2>
  <div><q-btn flat color="purple" icon="refresh" @click="loadServers()" /></div>
  <div class="server-list">
    <spinner v-if="serversLoading">
      Loading...
    </spinner>
    <template
      v-for="server in serverList"
      :key="server.name"
    >
      <card :server="server" />
    </template>
  </div>
</template>
