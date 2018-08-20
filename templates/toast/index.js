// Toast 组件内容
let _compData = {
  '_toast_.isHide': true, // Toast组件是否隐藏
  '_toast_.tips': '',      // Toast组件展示的内容
  '_toast_.contentShow': true, // Toast内容是否展示
};

let toastObj = {
  show(tips, duration = 1000) {
    let toastIsHide = (this.data._toast_ || {}).isHide;
    if (!toastIsHide){
      return;
    }
    this.setData({
       '_toast_.isHide': false, 
       '_toast_.tips': tips || '服务器繁忙，请稍后重试', 
       '_toast_.contentShow': true
    });
    setTimeout(()=>{
      try{
        this.setData({
          '_toast_.contentShow': false
        });
        setTimeout(() => {
          this.setData({
            '_toast_.isHide': true,
            '_toast_.tips': '',
            '_toast_.contentShow': false
          });
        }, 350);
      }catch(e){}

    }, duration);
  }
};

export default function ToastObj(){
  // 拿到当前页面对象

  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;
  Object.assign(curPage, toastObj);
  // 附加到page上，方便访问
  curPage.toast = this;
  // 把组件的数据合并到页面的data对象中
  curPage.setData(_compData);
  console.log(curPage)
  return this;
}