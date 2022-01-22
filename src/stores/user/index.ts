import { acceptHMRUpdate, defineStore } from 'pinia'
import { login, processCode, refresh } from '~/services/fgapi/index'
import type { Auth, DiscordAuthSuccess } from '~/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    // Token
    accessToken: useLocalStorage('accessToken', ''),
    refreshToken: useLocalStorage('refreshToken', ''),
    tokenType: useLocalStorage('tokenType', ''),
    grantType: useLocalStorage('grantType', ''),
    scope: useLocalStorage('scope', ''),
    expiresIn: useLocalStorage('expiresIn', 0),
    // User
    redirect: useLocalStorage('redirect', ''),
    username: useLocalStorage('username', ''),
    locale: useLocalStorage('locale', ''),
    mfa_enabled: useLocalStorage('mfa_enabled', ''),
    flags: useLocalStorage('flags', ''),
    avatar: useLocalStorage('avatar', ''),
    discriminator: useLocalStorage('discriminator', ''),
    id: useLocalStorage('id', ''),
    // Guild Info
  }),
  actions: {
    async login() {
      const discord: Response = await login()
      const auth = await discord.json() as Auth
      window.location.href = auth.authUrl
    },
    setRedirect(url: string) {
      this.redirect = url
    },
    async setSessionByCode(code: string) {
      const discord: Response = await processCode(code)
      const response = (await discord.json()) as DiscordAuthSuccess
      this.accessToken = response.access_token
      this.expiresIn = response.expires_in
      this.refreshToken = response.refresh_token
      this.scope = response.scope
      this.tokenType = response.token_type
    },
    async refresh() {
      refresh(this.refreshToken)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
