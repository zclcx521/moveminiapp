// app.ts
import { getToken, checkNetworkAndServer } from './utils/http'

App<IAppOption>({
  globalData: {
    isTokenReady: false
  },

  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查网络和服务器连接
    const isServerAvailable = await checkNetworkAndServer()
    if (!isServerAvailable) {
      console.error('服务器连接失败，无法获取token')
      return
    }

    // 获取并缓存token
    try {
      const token = await getToken()
      this.globalData.isTokenReady = true
      console.log('Token获取成功')
    } catch (error) {
      console.error('Token获取失败:', error)
      // 这里可以添加重试逻辑
      wx.showToast({
        title: 'Token获取失败，请检查网络连接',
        icon: 'none',
        duration: 3000
      })
    }

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },

  // 提供一个方法让页面可以等待token就绪
  waitForToken(): Promise<void> {
    return new Promise((resolve) => {
      if (this.globalData.isTokenReady) {
        resolve()
      } else {
        // 轮询检查token是否就绪
        const checkToken = () => {
          if (this.globalData.isTokenReady) {
            resolve()
          } else {
            setTimeout(checkToken, 100)
          }
        }
        checkToken()
      }
    })
  }
})