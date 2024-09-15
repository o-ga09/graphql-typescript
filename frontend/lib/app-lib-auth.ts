let isLoggedIn = false
let currentUser: string | null = null

export const login = async (username: string, password: string): Promise<boolean> => {
  // ダミーの認証ロジック
  if (username && password) {
    isLoggedIn = true
    currentUser = username
    return true
  }
  return false
}

export const logout = (): void => {
  isLoggedIn = false
  currentUser = null
}

export const isAuthenticated = (): boolean => {
  return isLoggedIn
}

export const getCurrentUser = (): string | null => {
  return currentUser
}