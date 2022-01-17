export const login = async() => {
  return fetch('http://localhost:5001/api-project-63529888616/us-central1/api-auth')
}

export const processCode = async(code: string) => {
  return fetch('http://localhost:5001/api-project-63529888616/us-central1/api-code', { method: 'POST', body: JSON.stringify({ code }), headers: { 'Content-Type': 'application/json' } })
}

export const refresh = async(refreshToken: string) => {
  return fetch('http://localhost:5001/api-project-63529888616/us-central1/api-refresh', { method: 'POST', body: JSON.stringify({ refreshToken }), headers: { 'Content-Type': 'application/json' } })
}
