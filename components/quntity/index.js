
Component({

  properties: {
    value: {
      type: [String, Number],
      default: ''
    },
    index: {
      type: [String, Number],
    },
    max: {
      type: [String, Number],
      value: -1,
    }
  },

  data: {

  },

  methods: {
    doPlus: function(){
      let value = parseInt(this.data.value);
      value = isNaN(value) ? 0 : value;
      value += 1;
      if(this.data.max > 0 && value > this.data.max){
        return;
      }
      this.setData({
        value: value,
      });
      this.triggerEvent('valuechange', { value: value, index: this.data.index ,type:1});
    },
    doMinus: function(){
      let value = parseInt(this.data.value);
      value = isNaN(value) ? 0 : value;
      value -= 1;
      if(value <= 0){
        value = 1;
      }
      this.setData({
        value: value,
      });
      this.triggerEvent('valuechange', { value: value, index: this.data.index,type:-1});
    },
    onInputChange: function(e) {
      let value = parseInt(e.detail.value);
      value = isNaN(value) ? this.data.value : value;
      if (value <= 0){
        value = 1;
      }
      if(this.data.max > 0 && value > this.data.max) {
        value = this.data.max;
      }
      this.setData({
        value: value,
      });
      this.triggerEvent('valuechange', { value: value, index: this.data.index });
    },
  }
})
