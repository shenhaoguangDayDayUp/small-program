// 价格组件
Component({

  properties: {
    active:{
      type: [Boolean],
      value:true,
    },
    value: {
      type: [String, Number],
      value: '0',
      observer: function(newValue, oldValue){
        if (!newValue) {
          this.setData({value:0})
          // newValue = 0;
        }else{
          this.setData({ value: newValue.toLocaleString() })
        
        }

        // let decimal = parseInt(this.data.decimal || 2);
        
        // let isEqual = (parseInt(oldValue) / 100).toFixed(decimal) == newValue;
        
        // newValue = newValue + '';
        // if (!isEqual){
        //   let value = newValue || 0;
        //   value = parseInt(value);
        //   value = isNaN(value) ? 0 : value;
        //   if(value == 0){
        //     this.setData({
        //       value: decimal == 2 ? '0.00' : '0.0',
        //     });
        //   } else {
        //     this.setData({
        //       value: (value / 100).toFixed(decimal),
        //     });
        //   }
        // } else if(newValue == '0'){
        //   this.setData({
        //     value: decimal == 2 ? '0.00' : '0.0',
        //   });
        // }
      }
    },
    decimal: {
      type: [String, Number],
      default: 2,
    },
    noicon: {
      type: Boolean,
      default: false,
    },

    linethrough: {
      type: Boolean,
      value: false,
    }
  },

  data: {

  },

  methods: {

  },

  ready: function(){
    
  }
})
