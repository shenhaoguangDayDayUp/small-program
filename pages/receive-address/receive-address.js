// pages/receive-address/receive-address.js
import { pageTo } from '../../utils/utils';
import ajax from '../../utils/request';
import { $wuxDialog, $wuxLoading } from '../../templates/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoading:false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoEdit(value){
    pageTo('../add-address/add-address', { eidt: true, code: value.detail.code}, true)
  },
  addAddress(){
    pageTo('../add-address/add-address',{},true)
  },
  deleteAddress(value){
    $wuxDialog.show({
      title: '提示', content: '是否删除?', rightBtnText: '确定', leftBtnText: '取消', onCancel() {
        $wuxDialog.hide()
      }, onConfirm() {
        $wuxDialog.hide()
        ajax('member/receivers').paramters( { code: value.detail.code } ).delete().then(() => {
          this.getList()

          this.show('删除成功')

        }).catch(err => {
          this.show(err);
        })

      }
    })
  },
  setDefault(value){
    console.log(value)
    ajax('member/receivers/favorite/{code}', value.detail.code).put().then(res => {
      this.show('修改成功')
      this.getList()
    })

  },
  getList(){
    ajax('member/receivers').get().then(res=>{
      this.setData({
        'list':res
      })
    })
  }
})