// http.ts
// 注意：微信小程序无法直接访问localhost/127.0.0.1，需要使用本机IP地址
// 请将此处改为您电脑的实际IP地址，例如192.168.1.100
const BASE_URL = 'http://127.0.0.1:8000'
const DEFAULT_TOKEN = 'f1567eea889a2ac08c769cbe48f72486af7fb665'  // 已知有效的token
const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRY_KEY = 'token_expiry'
const TOKEN_EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24小时过期

// 初始化时设置默认token
wx.setStorageSync(TOKEN_KEY, DEFAULT_TOKEN)
wx.setStorageSync(TOKEN_EXPIRY_KEY, new Date().getTime() + TOKEN_EXPIRY_TIME)

// 检查网络连接
export const checkNetworkAndServer = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // 检查网络状态
    wx.getNetworkType({
      success: (res) => {
        console.log('当前网络类型:', res.networkType)
        if (res.networkType === 'none') {
          console.error('无网络连接')
          wx.showToast({
            title: '无网络连接',
            icon: 'none'
          })
          resolve(false)
          return
        }
        
        // 尝试ping服务器
        console.log(`尝试连接服务器: ${BASE_URL}`)
        wx.request({
          url: BASE_URL,
          method: 'GET',
          timeout: 5000,
          success: (res) => {
            // 即使返回404也说明服务器在运行，只是路径不存在
            console.log(`服务器连接测试结果: 状态码 ${res.statusCode}`)
            if (res.statusCode >= 200 && res.statusCode < 600) {
              console.log('服务器连接成功 (服务器正在运行)')
              resolve(true)
            } else {
              console.error('服务器返回了异常状态码:', res.statusCode)
              resolve(false)
            }
          },
          fail: (error) => {
            console.error('服务器连接失败:', error)
            wx.showToast({
              title: '服务器连接失败，请检查服务器是否运行',
              icon: 'none'
            })
            resolve(false)
          }
        })
      },
      fail: () => {
        console.error('获取网络状态失败')
        resolve(false)
      }
    })
  })
}

// 检查token是否有效
const isTokenValid = (): boolean => {
  const expiry = wx.getStorageSync(TOKEN_EXPIRY_KEY)
  const token = wx.getStorageSync(TOKEN_KEY)
  return expiry && token && new Date().getTime() < expiry
}

// 检查token状态
export const checkTokenStatus = async (): Promise<{
  isValid: boolean
  token?: string
  message: string
}> => {
  try {
    const token = wx.getStorageSync(TOKEN_KEY)
    const expiry = wx.getStorageSync(TOKEN_EXPIRY_KEY)
    
    if (!token) {
      return { isValid: false, message: '未找到token' }
    }

    if (!isTokenValid()) {
      return { isValid: false, message: 'token已过期' }
    }

    // 尝试发送测试请求验证token
    try {
      await request({
        url: '/test-auth/',  // 或者使用其他需要认证的API端点
        method: 'GET'
      })
      return { 
        isValid: true, 
        token, 
        message: 'token有效' 
      }
    } catch (error) {
      clearToken()
      return { 
        isValid: false, 
        message: 'token无效，已清除' 
      }
    }
  } catch (error) {
    return { 
      isValid: false, 
      message: '检查token状态时发生错误' 
    }
  }
}

// 保存token和过期时间
const saveToken = (token: string) => {
  wx.setStorageSync(TOKEN_KEY, token)
  wx.setStorageSync(TOKEN_EXPIRY_KEY, new Date().getTime() + TOKEN_EXPIRY_TIME)
}

// 清除token
const clearToken = () => {
  wx.removeStorageSync(TOKEN_KEY)
  wx.removeStorageSync(TOKEN_EXPIRY_KEY)
}

// 获取token
export const getToken = (): Promise<string> => {
  // 先检查缓存的token是否有效
  if (isTokenValid()) {
    const cachedToken = wx.getStorageSync(TOKEN_KEY)
    if (cachedToken) {
      return Promise.resolve(cachedToken)
    }
  }

  // 重新获取token
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}/api-token-auth/`,
      method: 'POST',
      data: {
        username: 'admin',
        password: 'admin'
      },
      success: (res: any) => {
        if (res.statusCode === 200 && res.data.token) {
          const token = res.data.token
          saveToken(token)
          resolve(token)
        } else {
          clearToken()
          reject(new Error('Failed to get token'))
        }
      },
      fail: (error) => {
        clearToken()
        reject(error)
      }
    })
  })
}

// 带token的请求方法
export const request = <T>(options: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}): Promise<T> => {
  const makeRequest = async (token: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: options.url.startsWith('http') ? options.url : `${BASE_URL}${options.url}`,
        method: options.method || 'GET',
        data: options.data,
        header: {
          'Authorization': `Token ${token}`,
          ...options.header
        },
        success: (res: any) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data as T)
          } else if (res.statusCode === 401) {
            // Token可能过期，清除后重新获取
            clearToken()
            reject(new Error('Token expired'))
          } else {
            reject(new Error(`Request failed with status ${res.statusCode}`))
          }
        },
        fail: (error) => {
          reject(error)
        }
      })
    })
  }

  // 主请求流程
  return new Promise(async (resolve, reject) => {
    try {
      // 获取token（如果缓存的token有效就使用缓存的，否则重新获取）
      const token = await getToken()
      try {
        // 使用token发起请求
        const result = await makeRequest(token)
        resolve(result)
      } catch (error: any) {
        if (error.message === 'Token expired') {
          // token过期，重新获取token并重试请求
          const newToken = await getToken()
          const result = await makeRequest(newToken)
          resolve(result)
        } else {
          reject(error)
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}