const TOKEN_KEY = 'ad_token'

export const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}
