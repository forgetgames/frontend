<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

</script>

<template>
  <div class="grid grid-rows-[64px,auto,64px] lg:w-3/4 mx-auto py-8 px-8 lg:px-0 default-template">
    <nav class="grid grid-cols-[auto,auto]">
      <span class="flex flex-row">
        <router-link to="/">
          <img src="/logo.png" class="rounded-full h-20">
        </router-link>
        <h1 class="header-hide">
          <router-link to="/">
            Forget Games
          </router-link>
        </h1>
      </span>
      <span class="ml-auto">
        <q-btn
          v-if="!userStore.id" push size="lg" class="bg-fuchsia-800" @click="userStore.login()"
        >
          Login
        </q-btn>
        <q-btn
          v-if="userStore.id" push size="lg" class="bg-fuchsia-800" @click="userStore.logout()"
        >
          Logout
        </q-btn>
        <q-avatar v-if="userStore.id" class="ml-4">
          <img
            :src="userStore.getAvatarUrl()"
          >
        </q-avatar>
      </span>
      <hr class="-mt-6 mb-4 col-start-1 col-end-3 border-white -z-99">
    </nav>
    <main class="mt-4">
      <router-view />
    </main>
    <footer class="grid grid-cols-[3fr,1fr]">
      <hr class="col-start-1 col-end-3">
      <p class="col-start-1">
        © Copyright {{ new Date().getFullYear() }} Forget Games. All rights reserved.
      </p>
      <a href="https://github.com/forgetgames" target="_blank" class="text-right">
        <carbon-logo-github />
      </a>
    </footer>
  </div>
</template>

<style>
.default-template {
  min-height: 100vh;
}
.header-hide {
  display: block;

  @media (max-width: 1024px) {
    display: none;
  }
}
</style>
