<script setup lang="ts">
useHead({
  title: 'Forget Games - Home',
  meta: [
    { name: 'description', content: 'Things' },
  ],
})

</script>
<template>
  <h1>Forget Games</h1>
  <hr class="-mt-2 mb-4 border-black">
  <h2>Homepage</h2>
  <p class="my-12">
    This platform is a primary controller of gaming servers for select Discord Communities.
  </p>
  <div class="cta">
    <h3 class="mb-4">
      In complete contrast to the title...
    </h3>
    <p>...we actually don't forget games. We play them a lot!</p>
    <div>
      <router-link to="/servers" class="button mt-8 inline-block">
        Servers Dashboard
      </router-link>
    </div>
  </div>
  <div class="cta">
    <h3 class="mb-4">
      Our Communities
    </h3>
    <p>P.O.T</p>
    <p>Cuddle Dungeon</p>
    <div class="text-right">
      <router-link to="/communities" class="button mt-8 inline-block">
        Join a Community
      </router-link>
    </div>
  </div>
</template>
