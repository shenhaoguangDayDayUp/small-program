// components/receive-address/index.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    setDefault(e) {
      this.triggerEvent('setDefault', { code: this.data.item.code });
    },
    deleteAddress() {
      this.triggerEvent('deleteDefault', { code: this.data.item.code });

    },
    gotoEdit() {
      this.triggerEvent('gotoEdit', { code: this.data.item.code });
    },
    selectDetail(){
      this.triggerEvent('selectEdit', { code: this.data.item.code });

    }
  
  }
})
