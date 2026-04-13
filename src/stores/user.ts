import { defineStore } from 'pinia'

interface UserInfo {
  id: string
  username: string
  name: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
    token: localStorage.getItem('token') || '',
    isLoggedIn: !!localStorage.getItem('token')
  }),

  getters: {
    username: (state) => state.userInfo?.username || '',
    userId: (state) => state.userInfo?.id || ''
  },

  actions: {
    login(username: string, _password: string) {
      // 模拟登录
      const mockToken = 'mock-token-' + Date.now()
      this.token = mockToken
      this.userInfo = {
        id: '1',
        username: username,
        name: username
      }
      this.isLoggedIn = true
      localStorage.setItem('token', mockToken)
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      return Promise.resolve()
    },

    logout() {
      this.token = ''
      this.userInfo = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },

    loadUserInfo() {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    }
  }
})
