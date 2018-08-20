// components/address/address.js
import { pageTo } from '../../utils/utils';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      default: {},
    },
    show:{
      type:Boolean,
      value:true,
      observer(n,o){
   
  
      }
      
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
    gotoDetail(){
      if(this.data.show){
        this.triggerEvent('address',{})
        // pageTo('../address-list/address')
      }

    },

  }
})
