import Component from '../third/component'

export default {
	/**
	 * 默认参数
	 */
  setDefaults() {
    return {
      title: `提示`,
      content:'',
      rightBtnText:'确定',
      leftBtnText: '取消',
     
   
      
    }
  },
	/**
	 * 显示loading组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.text 提示文本
	 */
  show(opts = {}) {
    const options = Object.assign({}, this.setDefaults(), opts)
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    var page = curPage;
    Object.assign(curPage, options);
 
    // 附加到page上，方便访问
    // curPage.toast = this;
    // // 把组件的数据合并到页面的data对象中
    // curPage.setData(_compData);
    // 实例化组件
    this.component = new Component({
      scope: `$wux.dialog`,
      data: options,
      methods: {
				/**
				 * 隐藏
				 */
        hide() {
          if (this.removed) return !1
          this.removed = !0
          this.setHidden()

        },
				/**
				 * 显示
				 */
        show() {
          if (this.removed) return !1
          this.setVisible()
  
        },
      },
    })

    this.component.show()
  },
	/**
	 * 隐藏loading组件
	 */
  hide() {
    try {
      if (this.component) {
        this.component.hide()
      }
    } catch (e) { }
  },
  preventD(){

  }
}