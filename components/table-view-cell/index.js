import { rpxToPx } from '../../utils/utils';
Component({
  
  properties: {
    index: {
      type: [String, Number],
    }
  },

  data: {
    isInEditing: false,
  },
  
  methods: {
    
    __touchStart: function(e){
      let isInEditing = this.data.isInEditing;
      
      if (isInEditing){
        this.endEditing();
      } else {
        this.triggerEvent('cellwillediting', { index: this.data.index});
        this.touchStartX = e.changedTouches[0].clientX;
        this.touchStartY = e.changedTouches[0].clientY;
      }
    },

    __touchEnd: function(e){
      let isInEditing = this.data.isInEditing;
      if (isInEditing) {
        return;
      }
      let x = e.changedTouches[0].clientX;
      let y = e.changedTouches[0].clientY;
      let touchStartX = this.touchStartX;
      let touchStartY = this.touchStartY;
      
      let deleteAnimator = this.deleteAnimator;
      if (touchStartX - x > 3 && Math.abs(touchStartY - y) < 20) {
        let animation = deleteAnimator.translateX(rpxToPx(-200)).step();
        this.setData({
          'deleteAnimation': animation.export(),
          "isInEditing": true,
        });
      } else if (touchStartX - x < -3 && Math.abs(touchStartY - y) < 20) {
        this.endEditing();
      } 
    },

    __itemDelete: function(e) {
      this.triggerEvent('cellwilldelete', { index: this.data.index });
    },

    __cellDidTap: function(){
      if (this.data.isInEditing){
        return;
      }
      this.triggerEvent('celldidtap', { index: this.data.index });
    },

    // 结束编辑模式
    endEditing: function(){
      if (!this.data.isInEditing){
        return;
      }
      let deleteAnimator = this.deleteAnimator;
      let animation = deleteAnimator.translateX(0).step();
      this.setData({
        'deleteAnimation': animation.export(),
      });
      
      setTimeout(() => {
        this.setData({
          'deleteAnimation': undefined,
          "isInEditing": false,
        });
      }, 350);
    },

  },
  attached: function(){
    // 删除动画器
    this.deleteAnimator = wx.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    // 是否处于编辑状态
    this.touchStartX = 0;
    this.touchStartY = 0;
  },

})
