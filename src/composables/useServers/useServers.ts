import { FgApi } from '~/services/fgapi/index'

export default () => {
  const serverList = ref([])
  const serversLoading = ref(true)
  const fgApi = new FgApi()

  function loadServers() {
    serverList.value = []
    serversLoading.value = true
    fgApi.servers()
      .then(async(response) => {
        serverList.value = await response.json()
      }).finally(() => {
        serversLoading.value = false
      })
  }
  return { serverList, serversLoading, loadServers }
}
