/** 首屏加载时的loading处理 */
Component({
  
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

  data: {

  },

  methods: {
    _onBtnClick: function(){
      this.triggerEvent('btntap', {});
    },
  }
})
