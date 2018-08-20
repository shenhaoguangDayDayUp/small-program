// pages/convert/convert.js
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../templates/index';
import { sha1 } from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:{},
    firstLoading: true,
    defaultAddress: {},
    productInfo: {},
    receiver: {},
    goodsItem: {},
    show:false,
    ishow:false,
    payTitle:'请输入兑换密码',
    passwordRedeem:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
   
    this.setData({
      code: options
    })
    this.getDefaultAddress().then(() => {
      this.getInfo()
    })





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
  close(){

  },
  passend(value){
    var val = value.detail.value;
    // val =   Number(val);
    this.setData({ passwordRedeem:val})
    var form = {}
    form.passwordRedeem = sha1(this.data.passwordRedeem)
    ajax('store/order/redeem/{code}', this.data.code.code).paramters(form).put().then(res => {
      this.show('购买成功')
      wx.switchTab('../reward/reward')
      this.setData({
        ishow: false
      })
    }).catch(err=>{
      this.setData({
        ishow: false
      })

    })
  },
  gotoPayment(){

    ajax('member/password/redeem').get().then(res=>{
       this.setData({
         ishow:true
       })

    })

  },
  gotoCancel(){
    ajax('store/order/cancel/{code}', this.data.code.code).put().then(res => {
      this.show('取消成功')
      wx.switchTab('../reward/reward')
    })
  },
  getInfo() {
    ajax('store/order/entity/{code}',this.data.code.code).get().then(res => {
      console.log(res)
      this.setData({
        goodsItem: res.items,
        detail: res
      })
    })
  },
  getDefaultAddress() {
    return ajax('member/receivers/favorite').get().then(res => {
      this.setData({
        firstLoading: false,
        defaultAddress: res,
      })
    })
  }
})