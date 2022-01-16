import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export declare class Auth {
  authUrl: string
}

export declare class DiscordAuthSuccess {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}
