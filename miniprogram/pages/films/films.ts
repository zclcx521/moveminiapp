// films.ts
Page({
  data: {
    activeTab: 'recommend', // 默认选中推荐标签
    // 第一个剧集区块数据
    filmSection1: [
      {
        id: 1,
        title: '拾个乞丐做夫君',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '爱情·古装·琼瑶'
      },
      {
        id: 2,
        title: '我在地府开当铺',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '鬼怪·道士·奇幻'
      },
      {
        id: 3,
        title: '青丝动',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '爱情·古代·架空'
      },
      {
        id: 4,
        title: '呆宠',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '民国·战争·谍战'
      }
    ],
    // 第二个剧集区块数据
    filmSection2: [
      {
        id: 1,
        title: '待千千万',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '传奇·前世·爱情'
      },
      {
        id: 2,
        title: '新双世宠妃',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '穿越·宫斗·奇幻'
      },
      {
        id: 3,
        title: '双世萌妃2',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '穿越·宫斗·甜蜜'
      },
      {
        id: 4,
        title: '我叫圣途',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '历史·穿门·守护'
      }
    ],
    // 第三个剧集区块数据
    filmSection3: [
      {
        id: 1,
        title: '遇见特别的你',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '遇见·特别·相遇'
      },
      {
        id: 2,
        title: '穿越生存攻略',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '穿越·生存·攻略'
      },
      {
        id: 3,
        title: '王牌宫女',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '宫廷·宫女·宫斗'
      },
      {
        id: 4,
        title: '梦中抱个国民老公',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '女婿·相亲·甜蜜'
      }
    ],
    // 第四个剧集区块数据
    filmSection4: [
      {
        id: 1,
        title: '先婚后爱',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '先婚·后爱·豪门'
      },
      {
        id: 2,
        title: '闪婚老公是豪门',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '闪婚·豪门·爱情'
      },
      {
        id: 3,
        title: '总裁的替身前妻',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '总裁·替身·前妻'
      },
      {
        id: 4,
        title: '霸道总裁爱上我',
        coverUrl: 'https://img2.baidu.com/it/u=3193539374,2270567607&fm=253&fmt=auto&app=138&f=JPEG?w=608&h=1081',
        tags: '霸道·总裁·爱情'
      }
    ]
  },
  // 切换标签
  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  }
})