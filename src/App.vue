<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from './stores/user/index'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!userStore.accessToken) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

onMounted(() => {
  if (typeof route.query.code === 'string')
    userStore.setSessionByCode(route.query.code)

  if (route.meta.auth) {
    if (!userStore.accessToken) {
      router.push('/')
      if (typeof route.query.redirect === 'string')
        userStore.setRedirect(route.query.redirect)
      userStore.login()
    }
  }
})
</script>

<template>
  <router-view />
</template>
