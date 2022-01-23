import { acceptHMRUpdate, defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { login, logout, processCode, refresh } from '~/services/fgapi/index'
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
    accentColor: useLocalStorage('accentColor', ''),
    avatar: useLocalStorage('avatar', ''),
    banner: useLocalStorage('banner', ''),
    bannerColor: useLocalStorage('bannerColor', ''),
    discriminator: useLocalStorage('discriminator', ''),
    flags: useLocalStorage('flags', 0),
    id: useLocalStorage('id', ''),
    locale: useLocalStorage('locale', ''),
    mfaEnabled: useLocalStorage('mfaEnabled', false),
    publicFlags: useLocalStorage('publicFlags', 0),
    username: useLocalStorage('username', ''),
    // Guild Info
  }),
  actions: {
    async login() {
      const discord: Response = await login()
      const auth = await discord.json() as Auth
      window.location.href = auth.authUrl
    },
    async logout() {
      const router = useRouter()
      await logout()
      localStorage.clear()
      router.push('/')
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

      this.accentColor = response.accent_color
      this.avatar = response.avatar
      this.banner = response.banner
      this.bannerColor = response.banner_color
      this.discriminator = response.discriminator
      this.flags = response.flags
      this.id = response.id
      this.locale = response.locale
      this.mfaEnabled = response.mfa_enabled
      this.publicFlags = response.public_flags
      this.username = response.username
    },
    async refresh() {
      refresh(this.refreshToken)
    },
    getAvatarUrl() {
      return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png`
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
