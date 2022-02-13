import { refresh, servers } from '~/services/fgapi/index'
import { useUserStore } from '~/stores/user'
import type { DiscordAuthSuccess } from '~/types'

export default () => {
  const serverList = ref([])
  const serversLoading = ref(true)
  const userStore = useUserStore()

  function loadServers() {
    serverList.value = []
    serversLoading.value = true
    servers(userStore.accessToken)
      .then(async(response) => {
        serverList.value = await response.json()
        serversLoading.value = false
      }).catch(async() => {
        if (userStore.refreshToken) {
          refresh(userStore.refreshToken)
            .then(async(response) => {
              const data = await response.json() as DiscordAuthSuccess
              userStore.setSessionByRefresh(data)
              servers(userStore.accessToken)
                .then(async(response) => {
                  serverList.value = await response.json()
                  serversLoading.value = false
                })
            })
        }
      })
  }
  return { serverList, serversLoading, loadServers }
}
