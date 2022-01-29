<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Error from './components/organisms/error/error.vue'
import { useUserStore } from '~/stores/user/index'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!userStore.accessToken) {
      next({
        path: '/',
      })
      userStore.setRedirect(to.fullPath)
      userStore.login()
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

onMounted(async() => {
  if (typeof route.query.code === 'string') {
    await userStore.setSessionByCode(route.query.code).then(() => {
      router.push(userStore.redirect)
    }).catch(() => {
      router.push('/')
    })
  }

  if (route.meta.auth) {
    if (!userStore.accessToken && userStore.state !== 'error') {
      router.push('/')
      if (typeof route.query.redirect === 'string')
        userStore.setRedirect(route.query.redirect)
      userStore.login()
    }
    else if (userStore.refreshToken) {
      userStore.refresh()
    }
  }
})
</script>

<template>
  <router-view />
  <Error v-if="userStore.state==='error'" />
</template>
