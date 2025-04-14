// http.ts
// 注意：微信小程序无法直接访问localhost/127.0.0.1，需要使用本机IP地址
// 请将此处改为您电脑的实际IP地址，例如192.168.1.100
const BASE_URL = 'http://127.0.0.1:8000'

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

// 获取token
export const getToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}/api-token-auth/`,
      method: 'POST',
      data: {
        // 这里添加获取token所需的参数
        username: 'admin',
        password: 'admin'
      },
      success: (res: any) => {
        if (res.statusCode === 200 && res.data.token) {
          resolve(res.data.token)
        } else {
          reject(new Error('Failed to get token'))
        }
      },
      fail: (error) => {
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
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    
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