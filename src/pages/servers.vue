<script setup lang="ts">
useHead({
  title: 'Forget Games - Server',
  meta: [
    { name: 'description', content: 'Our server dashboard' },
  ],
})

// TODO: replace with REST Api
const servers = [
  { name: '7 Days 2 Die', description: 'The usual sessional play through with the crew.', playerCount: 0, maxPlayers: 10, status: 'offline' },
  { name: 'Minecraft', description: 'Some mod pack', playerCount: 0, maxPlayers: 10, status: 'offline' },
  { name: 'Valhiem', description: 'Third rendition of a P.O.T 24/7 server.', playerCount: 1, maxPlayers: 64, status: 'online' },
  { name: 'Satisfactory', description: 'First play through to end game.', playerCount: 5, maxPlayers: 10, status: 'restarting' },
]

</script>
<template>
  <h1>Forget Games</h1>
  <hr class="-mt-2 mb-4 border-black">
  <h2 class="mb-12">
    Servers
  </h2>
  <div class="server-list">
    <template
      v-for="server in servers"
      :key="server.name"
    >
      <card :server="server" />
    </template>
  </div>
</template>
