import { servers } from '~/services/fgapi/index'
import { useUserStore } from '~/stores/user'

export default () => {
  const serverList = ref([])
  const serversLoading = ref(true)

  function loadServers() {
    serversLoading.value = true
    servers(useUserStore().accessToken)
      .then(async(response) => {
        serverList.value = await response.json()
        serversLoading.value = false
      })
  }
  return { serverList, serversLoading, loadServers }
}
