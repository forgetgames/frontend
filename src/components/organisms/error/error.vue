<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const inError = computed(() => userStore.state === 'error')
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="inError" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-primary text-white">
        <q-bar class="bg-red-800 p-8">
          <h3>Unauthorized</h3>
          <q-space />
          <q-btn v-close-popup icon="close" flat round dense class="hover:bg-red-600" @click="userStore.setState('')" />
        </q-bar>

        <q-card-section class="q-pt-none bg-red-600 p-8">
          You are not part of the authorized discord communities or part of their accepted game master roles.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
