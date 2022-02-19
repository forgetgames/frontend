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
    <q-btn push color="purple" icon="refresh" class="ml-4" @click="loadServers()">
      <q-tooltip
        transition-show="rotate"
        transition-hide="rotate"
        self="top middle" class="bg-gradient text-white text-lg"
      >
        Refresh Server List
      </q-tooltip>
    </q-btn>
  </h2>

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
