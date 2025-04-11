// pages/fuli/fuli.ts
Page({
  data: {
    // 导航栏数据
    navItems: [
      { id: 1, name: 'VIP专属', active: true },
      { id: 2, name: '免费领', active: false },
      { id: 3, name: '福利社', active: false }
    ],
    // VIP独享剧目数据
    vipDramas: [
      {
        id: 1,
        title: '契约圣女',
        desc: '飞羽阁最一场突如其来的疾病所苦，恰逢师傅闭关天。在飞羽生死存亡之际，龙虎山男子张伯尘...',
        cover: '/images/drama1.png'
      },
      {
        id: 2,
        title: '绝世小狂妃',
        desc: '女主蓉今月从小被给牙婆子，受尽了屈辱。好不容易逃出来后，却又被人杀害。然而幸运的是，她意外重生到了南莫国公府...',
        cover: '/images/drama2.png'
      },
      {
        id: 3,
        title: '女总裁的同居男友',
        desc: '女主戴安娜为了避免以后再被安排相亲，参加了商务酒局，结果喝得酩酊大醉，不省人事的她先意...',
        cover: '/images/drama3.png'
      }
    ],
    // 今日星选数据
    todayPick: {
      id: 2,
      title: '绝世小狂妃',
      desc: '女主蓉今月从小被给牙婆子，受尽了屈辱。好不容易逃出来后，却又被人杀害。然而幸运的是，她意外重生到了南莫国公府...'
    }
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