// index.ts
import { request } from '../../utils/http'

// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    // 短剧列表数据
    dramaList: [],
    // 热门榜单数据
    trendingList: [
      { rank: 1, name: '王爷的贴身女刺客', views: '482.5w', trending: 'up' },
      { rank: 2, name: '总裁老婆', views: '471.6w', trending: 'up' },
      { rank: 3, name: '我叫叶婆婆', views: '431.7w', trending: 'up' },
      { rank: 4, name: '我在地府开当铺', views: '214.5w', trending: 'up' },
      { rank: 5, name: '双世萌妃2', views: '172.5w', trending: 'up' }
    ],
    // 分类标签
    categories: ['推荐'],
    activeCategory: '推荐',
  },
  lifetimes: {
    attached() {
      // 组件加载时获取分类数据和推荐短剧
      this.fetchCategories()
      this.fetchRecommendedDramas()
    }
  },

  methods: {
    // 获取推荐短剧数据
    async fetchRecommendedDramas() {
      try {
        const data = await request<any[]>({
          url: '/api/drama/recommended/',
          method: 'GET'
        })
        
        // 处理返回的短剧数据
        const formattedDramas = data.map(drama => ({
          id: drama.id,
          title: drama.title,
          coverUrl: drama.cover,
          description: drama.description,
          playCount: drama.play_count,
          categories: drama.categories,
          director: drama.director,
          totalEpisodes: drama.total_episodes
        }))
        
        this.setData({
          dramaList: formattedDramas
        })
      } catch (error) {
        console.error('获取推荐短剧失败：', error)
        wx.showToast({
          title: '获取推荐短剧失败',
          icon: 'error',
          duration: 2000
        })
      }
    },

    // 获取分类数据
    async fetchCategories() {
      try {
        const data = await request<any[]>({
          url: '/api/drama/categories/',
          method: 'GET'
        })
        
        // 从API响应中提取类别名称
        const apiCategories = data.map(category => category.name)
        // 确保"推荐"始终在第一位，并与API返回的类别合并
        const allCategories = ['推荐', ...apiCategories]
        
        this.setData({
          categories: allCategories,
          // 如果还没有选中的分类，默认选中"推荐"
          activeCategory: this.data.activeCategory || allCategories[0]
        })
      } catch (error) {
        console.error('请求分类接口失败：', error)
        wx.showToast({
          title: '获取分类失败',
          icon: 'error',
          duration: 2000
        })
      }
    },

    // 分类点击事件处理
    onCategoryTap(e: any) {
      const category = e.currentTarget.dataset.category
      this.setData({
        activeCategory: category
      })
      // TODO: 根据选中的分类加载对应的内容
      console.log('切换到分类：', category)
    },

    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
  },
})
