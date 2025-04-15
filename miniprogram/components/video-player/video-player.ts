// components/video-player/video-player.ts
Component({
  properties: {
    videoUrl: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    coverUrl: {
      type: String,
      value: ''
    },
    tags: {
      type: String,
      value: ''
    }
  },

  data: {
    currentTime: 0
  },

  methods: {
    onPlay() {
      this.triggerEvent('play')
    },

    onPause() {
      this.triggerEvent('pause')
    },

    onEnded() {
      this.triggerEvent('ended')
    },

    onTimeUpdate(e: any) {
      this.setData({
        currentTime: e.detail.currentTime
      })
      this.triggerEvent('timeupdate', {
        currentTime: e.detail.currentTime
      })
    },

    // 保存播放进度
    savePlayProgress() {
      const videoInfo = {
        videoUrl: this.properties.videoUrl,
        title: this.properties.title,
        currentTime: this.data.currentTime
      }
      wx.setStorageSync('lastPlayInfo', videoInfo)
    }
  }
})