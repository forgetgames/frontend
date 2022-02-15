<script setup lang="ts">
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
    This platform is a primary controller of gaming servers for select Discord Communities.
  </p>
  <q-card dark class="mt-8">
    <q-card-section>
      <h3 class="mb-4">
        In complete contrast to the title...
      </h3>
      <p>...we actually don't forget games. We play them a lot!</p>
    </q-card-section>
    <q-card-section>
      <q-card-actions class="p-0">
        <q-btn flat size="lg" to="/servers" class="bg-fuchsia-800 mt-8">
          Servers Dashboard
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
  <q-card dark class="mt-8">
    <q-card-section>
      <h3 class="mb-4">
        Our Communities
      </h3>
      <p>P.O.T</p>
      <p>Cuddle Dungeon</p>
      <p>Forget Games</p>
    </q-card-section>
    <q-card-section>
      <q-card-actions align="right" class="p-0">
        <q-btn flat size="lg" to="/communities" class="bg-fuchsia-800 mt-8">
          Join a Community
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
