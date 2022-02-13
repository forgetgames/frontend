<script setup lang="ts">
defineProps(['server'])
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>{{ server.name }}</h3>
      <span class="ml-auto p-1 bg-white rounded-4xl">
        <span class="px-2 border-r-1 border-black"><carbon-user-filled class="align-text-top" />{{ server.playerCount }}</span>
        <span class="mx-2 rounded-xl text-lime-800">
          <carbon-checkmark-outline v-if="server.status === 'ONLINE'" class="align-text-top" />
          <carbon-restart v-else-if="server.status === 'RESTARTING'" class="align-text-top animate-spin-slow" />
          <carbon-pause-outline v-else-if="server.status === 'OFFLINE'" class="align-text-top" />
          <carbon-data-check v-else-if="server.status === 'archived'" class="align-text-top" />
          <carbon-data-error v-else-if="server.status === 'DELETED'" class="align-text-top" />
          <carbon-migrate v-else-if="server.status === 'MIGRATING'" class="align-text-top" />
          <carbon-warning-hex v-else />

        </span>
      </span>
    </div>
    <div class="card-body">
      <p>{{ server.description }}</p>
    </div>
    <div class="card-actions">
      <button v-if="server.status === 'online'">
        Restart
      </button>
      <button v-if="server.status === 'offline'">
        Start
      </button>
      <button v-if="server.status === 'online'">
        Stop
      </button>
      <button v-if="server.status === 'offline'">
        Archive
      </button>
      <button v-if="server.status === 'offline'">
        Migrate
      </button>
      <button
        v-if="!['restarting', 'migrating', 'deleted'].includes(server.status)"
      >
        Swap
      </button>
    </div>
  </div>
</template>
