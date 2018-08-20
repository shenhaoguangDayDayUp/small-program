// components/payment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    payTitle: {
      type: String,
      value: "请输入兑换密码"
    },
    pasDigits: {
      // 密码位数
      type: Number,
      value: 6
    },
    isPay: {
      type: Boolean,
      value: true,
      observer:function(n,o){
      
      }

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    keyShow: true,
    lodingShow: false,
    paySuc: false,
    val: [],
    keyList: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    payStatus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputStart(e){
      var val = e.target.dataset.index;
      var list =[];
      if (this.data.val.length < this.data.pasDigits) {
        list = list.concat(this.data.val || [])
        list.push(val)
        this.setData({
          val: list
        })
        if (this.data.val.length === this.data.pasDigits) {
          // 密码输入完毕
          // this.$emit("input", this.val.join("")); //传给父组件
    
          // this.setData({ keyShow: false, isPay:false})
          // this.lodingShow = true;
          // this.$refs.loading.classList.add("loading-ani");
          // this.$emit("pas-end", this.val.join(""));
          console.log(this.data.val.join(""))
          this.triggerEvent('pasend', { value: this.data.val.join("")} );
          this.setData({
            val:[]
          })
 
        }
      } else {
        this.triggerEvent("pasend", { value: this.data.val.join("") });
      }
    },
    inputEnd(e){

    },
    close(){
      this.setData({
        isPay:false
      })
      this.triggerEvent("close");

    },
    del(){
      if (this.data.val.length > 0) {
        var list = this.data.val
        list.pop();
        this.setData({
          val:list
        })
      }
    }
  }
})
