// components/date-label/index.js
import { format } from '../../utils/util';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      format:{
        type:String,
        default:'yyyy-MM-dd HH:mm'
      },
      value:{
        type:[Number,String,Object],
        default:'',
        observer: function (newVal, oldVal) {
          newVal = newVal + '';
          let fmt = this.data.format || 'yyyy-MM-dd HH:mm';
          let reg = /([yMdHhmsS]+)/g;//日期格式中的字符
          let key = {};
          let tmpkeys = fmt.match(reg);
          for (let i = 0; i < tmpkeys.length; i++) {
            key[tmpkeys[i].substr(0, 1)] = i + 1;
          }
          let r = newVal.match(fmt.replace(reg, "(\\d+)"));
          if (!r) {
            let val = undefined;
            if (/^\d+$/.test(newVal)) {
              val = parseInt(newVal);
            }
            val = new Date(val);

            if (val) {
              this.setData({
                value: format(val, fmt),
              });
            }
          }
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

  }
})
