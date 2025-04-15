// utils/api.ts
import { request } from './request'

// API基础URL
const BASE_URL = 'http://localhost:8000'

// 获取推荐短剧列表
export const getRecommendedDramas = () => {
  return request({
    url: `${BASE_URL}/api/dramas/recommended/`,
    method: 'GET'
  })
}

// 设置推荐短剧
export const setRecommendedDramas = (dramaIds: number[]) => {
  return request({
    url: `${BASE_URL}/api/dramas/recommended/`,
    method: 'POST',
    data: { drama_ids: dramaIds }
  })
}

// 获取分类短剧列表
export const getCategoryDramas = (categoryName: string) => {
  return request({
    url: `${BASE_URL}/api/dramas/category/${categoryName}/`,
    method: 'GET'
  })
}

// 获取短剧分类列表
export const getCategories = () => {
  return request({
    url: `${BASE_URL}/api/categories/`,
    method: 'GET'
  })
}