<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
</script>
<template>
  <div class="grid grid-rows-[64px,auto,64px] w-3/4 mx-auto p-8 default-template">
    <nav class="grid grid-cols-[auto,auto]">
      <span class="flex flex-row">
        <img src="/logo.png" class="rounded-full h-20">
        <h1>
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
        © Copyright {{ new Date().getFullYear() }} by nobody. All rights reversed.
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
</style>
