// utils/request.ts
interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: object
}

// 从本地存储获取token
const getToken = () => {
  return wx.getStorageSync('token') || ''
}

// 统一请求函数
export const request = (options: RequestOptions) => {
  const token = getToken()
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // token失效，跳转到登录页
          wx.navigateTo({
            url: '/pages/login/login'
          })
          reject(new Error('未授权'))
        } else {
          reject(new Error(res.data.error || '请求失败'))
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}