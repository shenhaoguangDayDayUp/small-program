Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    content:{
      type: String,
      default: '',
    },
    hidearrow:{
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    hideline: {
      type: Boolean
    }
  },

  data: {

  },
  
  methods: {

  },

})
