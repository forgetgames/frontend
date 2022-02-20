<script setup lang="ts">
import { get } from '~/services/openCollective/index'
const openCollective = ref()
get().then((data) => {
  openCollective.value = data
})
useHead({
  title: 'Forget Games - Home',
  meta: [
    { name: 'description', content: 'Things' },
  ],
})

</script>
<template>
  <h2>Homepage</h2>
  <p class="my-12">
    Control our game servers for select invite-only Discord Communities.
  </p>
  <q-card dark class="mt-8 bg-gradient border-dark-300 border-dotted border-8">
    <q-card-section>
      <h3 class="mb-4">
        In complete contrast to the title...
      </h3>
      <p class="mb-4">
        ...we actually don't forget games. We play them a lot!
      </p>
      <q-chip square>
        <q-avatar color="green" class="w-48px">
          {{ openCollective?.backersCount }}
        </q-avatar> Backers
      </q-chip>
      <q-chip square>
        <q-avatar color="green" class="w-48px">
          ${{ openCollective?.balance }}
        </q-avatar> Balance
      </q-chip>
      <q-chip square>
        <q-avatar color="green" class="w-48px">
          $120
        </q-avatar> Monthly Goal
      </q-chip>
    </q-card-section>
    <q-card-section>
      <q-card-actions class="p-0">
        <q-btn push size="lg" to="/servers" icon="dashboard_customize" class="bg-fuchsia-800">
          Servers Dashboard
        </q-btn>
        <q-btn push size="lg" href="https://opencollective.com/forget-games" target="_blank" icon="savings" class="bg-fuchsia-800">
          Back Costs
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
  <q-card dark class="mt-8 bg-gradient border-dark-300 border-dotted border-8">
    <q-card-section>
      <h3 class="mb-4">
        What is this?
      </h3>
      <p>This platform offers functionality to manage active game servers for our communities. To view and change the servers, you will require permissions from the following communities on Discord.</p>
      <q-list dark bordered separator class="border-dark-300 mt-8">
        <q-item v-ripple>
          <q-item-section class="border-dark-300">
            <q-item-label>P.O.T</q-item-label>
            <q-item-label caption>
              Admins & Players
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label>Cuddle Dungeon</q-item-label>
            <q-item-label caption>
              Admins & Players
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple>
          <q-item-section>
            <q-item-label>Forget Games</q-item-label>
            <q-item-label caption>
              Admins
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
