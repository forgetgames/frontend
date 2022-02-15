<script setup lang="ts">
import { Status } from '~/constants'
defineProps(['server'])
</script>

<template>
  <q-card dark>
    <q-card-section class="grid grid-cols-2">
      <h3>{{ server.name }}</h3>
      <span class="ml-auto p-1 bg-white text-black rounded-4xl">
        <span class="px-2 border-r-1 border-black"><carbon-user-filled class="align-text-top" />{{ server.playerCount }}</span>
        <span class="mx-2 rounded-xl text-lime-800">
          <carbon-checkmark-outline v-if="server.status === Status.ONLINE" class="align-text-top" />
          <carbon-restart v-else-if="server.status === Status.RESTARTING" class="align-text-top animate-spin-slow" />
          <carbon-pause-outline v-else-if="server.status === Status.OFFLINE" class="align-text-top" />
          <carbon-data-check v-else-if="server.status === Status.ARCHIVED" class="align-text-top" />
          <carbon-data-error v-else-if="server.status === Status.DELETED" class="align-text-top" />
          <carbon-migrate v-else-if="server.status === Status.MIGRATING" class="align-text-top" />
          <carbon-warning-hex v-else />

        </span>
      </span>
    </q-card-section>
    <q-card-section>
      <p>{{ server.description }}</p>
    </q-card-section>
    <q-card-actions class="text-white">
      <q-btn v-if="server.status === Status.ONLINE" flat size="lg" class="bg-fuchsia-800">
        Restart
      </q-btn>
      <q-btn v-if="server.status === Status.OFFLINE" flat size="lg" class="bg-fuchsia-800">
        Start
      </q-btn>
      <q-btn v-if="server.status === Status.ONLINE" flat size="lg" class="bg-fuchsia-800">
        Stop
      </q-btn>
      <q-btn v-if="server.status === Status.OFFLINE" flat size="lg" class="bg-fuchsia-800">
        Archive
      </q-btn>
      <q-btn v-if="server.status === Status.OFFLINE" flat size="lg" class="bg-fuchsia-800">
        Migrate
      </q-btn>
      <q-btn
        v-if="!['restarting', 'migrating', 'deleted'].includes(server.status)"
        flat size="lg" class="bg-fuchsia-800"
      >
        Swap
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
