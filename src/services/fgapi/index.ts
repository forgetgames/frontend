import { useUserStore } from '~/stores/user'
import type { DiscordAuthSuccess } from '~/types'

export const login = async() => {
  return fetch(`${import.meta.env.VITE_FG_API_URL}api-auth`)
}

export const logout = async() => {
  return fetch(`${import.meta.env.VITE_FG_API_URL}api-revoke`)
}

export const processCode = async(code: string) => {
  return fetch(`${import.meta.env.VITE_FG_API_URL}api-code`, { method: 'POST', body: JSON.stringify({ code }), headers: { 'Content-Type': 'application/json' } })
}

export const refresh = async(refreshToken: string) => {
  return fetch(`${import.meta.env.VITE_FG_API_URL}api-refresh`, { method: 'POST', body: JSON.stringify({ refreshToken }), headers: { 'Content-Type': 'application/json' } })
}
interface ActionRequest {
  id: string
  action: string
}
export class FgApi {
  userStore = useUserStore()
  async apiCall(url: string, config: object): Promise<Response> {
    const headers = { authorization: `Bearer ${this.userStore.accessToken}` }
    config = { ...config, headers }
    const request = () => fetch(url, config)
    return request()
      .catch(async() => {
        const response = await (await refresh(this.userStore.refreshToken)).json() as DiscordAuthSuccess
        this.userStore.setSessionByRefresh(response)
        config = { ...config, headers: { authorization: `Bearer ${this.userStore.accessToken}` } }
        return fetch(url, config)
      })
  }

  async get(url: string, config: RequestInit = {}) {
    config = { ...config, method: 'GET' }
    return this.apiCall(url, config)
  }

  async post(url: string, config: RequestInit) {
    config = { ...config, method: 'POST' }
    return this.apiCall(url, config)
  }

  async put(url: string, config: RequestInit) {
    config = { ...config, method: 'PUT' }
    return this.apiCall(url, config)
  }

  async patch(url: string, config: RequestInit) {
    config = { ...config, method: 'PATCH' }
    return this.apiCall(url, config)
  }

  async remove(url: string, config: RequestInit) {
    config = { ...config, method: 'DELETE' }
    return this.apiCall(url, config)
  }

  async servers(): Promise<Response> {
    return this.get(`${import.meta.env.VITE_FG_API_URL}api-servers`)
  }

  async start(id: string): Promise<Response> {
    return this.post(`${import.meta.env.VITE_FG_API_URL}api-action`, { data: { id, action: 'start' } })
  }

  async stop(id: string): Promise<Response> {
    return this.post(`${import.meta.env.VITE_FG_API_URL}api-action`, { data: { id, action: 'stop' } })
  }

  async restart(id: string): Promise<Response> {
    return this.post(`${import.meta.env.VITE_FG_API_URL}api-action`, { data: { id, action: 'restart' } })
  }

  async update(id: string): Promise<Response> {
    return this.post(`${import.meta.env.VITE_FG_API_URL}api-action`, { data: { id, action: 'update' } })
  }
}
