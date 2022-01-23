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

export const servers = async(bearerToken: string) => {
  return fetch(`${import.meta.env.VITE_FG_API_URL}api-servers`, { headers: { authorization: `Bearer ${bearerToken}` } })
}
