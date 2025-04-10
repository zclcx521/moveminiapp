// pages/fuli/fuli.ts
Page({
  data: {
    // 导航栏数据
    navItems: [
      { id: 1, name: 'VIP专属', active: false },
      { id: 2, name: '免费领', active: false },
      { id: 3, name: '福利社', active: true }
    ],
    // 活动卡片数据
    activityCards: [
      {
        id: 1,
        title: '砍剧大联盟',
        subtitle: '邀请好友一起砍剧',
        tag: '砍剧',
        type: 'blue'
      },
      {
        id: 2,
        title: 'N元任购',
        subtitle: '',
        tag: '9.9任购3部',
        type: 'yellow'
      }
    ]
  },
  
  onLoad() {
    // 页面加载时执行
  },
  
  onShow() {
    // 页面显示时执行
  },
  
  // 切换导航栏
  switchNav(e: any) {
    const id = e.currentTarget.dataset.id;
    const navItems = this.data.navItems.map((item: any) => {
      return {
        ...item,
        active: item.id === id
      };
    });
    
    this.setData({
      navItems
    });
  },
  
  // 点击活动卡片
  onCardTap(e: any) {
    const id = e.currentTarget.dataset.id;
    // 根据ID处理不同卡片的点击事件
    console.log('点击了活动卡片:', id);
  }
})