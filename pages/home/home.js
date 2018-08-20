// pages/home/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {          // 是否正在加载中
      type: Boolean,
      default: false,
    },
    nodata: {           // 是否没有数据
      type: Boolean,
      default: false,
    },
    haserror: {         // 是否出错
      type: Boolean,
      default: false,
    },
    emptyicon: {
      type: String,
    },
    emptytips: {
      type: String,
    },
    btntitle: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData:{}
  },
  attached() {
    setTimeout(()=>{
      this.rotateAndScale()
    },2000)
   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _onBtnClick: function () {
      this.triggerEvent('btnclick', {});
    },
    rotateAndScale: function () {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation.scale(2, 2).rotate(45).step()

      // this.animation = animation

      this.setData({
        animationData: animation.export()
      })
    },
  }
})
