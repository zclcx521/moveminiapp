// index.ts
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
    // 视频数据
    videoList: [
      {
        id: 1,
        title: '迈特科技专注做短剧的公司',
        subtitle: 'IAA&IAP',
        coverUrl: 'https://picsum.photos/300/400',
        tags: ['海外', '抖音', '快手', '微信'],
        adTags: ['秒杀广告', '版权交易']
      }
    ],
    // 热门榜单数据
    trendingList: [
      { rank: 1, name: '王爷的贴身女刺客', views: '482.5w', trending: 'up' },
      { rank: 2, name: '总裁老婆', views: '471.6w', trending: 'up' },
      { rank: 3, name: '我叫叶婆婆', views: '431.7w', trending: 'up' },
      { rank: 4, name: '我在地府开当铺', views: '214.5w', trending: 'up' },
      { rank: 5, name: '双世萌妃2', views: '172.5w', trending: 'up' }
    ],
    // 分类标签
    categories: ['推荐', '古装', '重生', '恋爱', '职场', '复仇', '都市'],
    activeCategory: '推荐',
  },
  methods: {
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
