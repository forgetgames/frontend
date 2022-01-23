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

  accent_color: string
  avatar: string
  banner: string
  banner_color: string
  discriminator: string
  flags: number
  id: string
  locale: string
  mfa_enabled: boolean
  public_flags: number
  username: string
}
