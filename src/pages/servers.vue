<script setup lang="ts">
import { servers } from '../services/fgapi/index'
import { useUserStore } from '../stores/user'
useHead({
  title: 'Forget Games - Server',
  meta: [
    { name: 'description', content: 'Our server dashboard' },
  ],
})

// TODO: replace with REST Api
const serverList = ref([])
servers(useUserStore().accessToken)
  .then(async(response) => {
    serverList.value = await response.json()
  })

</script>
<template>
  <h1>Forget Games</h1>
  <hr class="-mt-2 mb-4 border-black">
  <h2 class="mb-12">
    Servers
  </h2>
  <div class="server-list">
    <template
      v-for="server in serverList"
      :key="server.name"
    >
      <card :server="server" />
    </template>
  </div>
</template>
