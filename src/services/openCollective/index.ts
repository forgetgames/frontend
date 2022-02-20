
export async function get() {
  const response = await fetch('https://opencollective.com/forget-games.json')
  return await response.json()
}
