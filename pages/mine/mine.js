// pages/mine/mine.js
import { pageTo } from '../../utils/utils';
import WxNotificationCenter from '../../utils/wxnotification';
import ajax from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:false,
    userInfo:{},
    user:{},
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxNotificationCenter.addNotification('LOGINGSUCCESS', this.getUserInfo, this);
    this.setData({ userInfo: wx.getStorageSync('userInfo')})
  


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
    this.setData({ isActive: false })
    this.getUser()
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
    WxNotificationCenter.removeNotification('LOGINGSUCCESS', this)
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
  onBannerImgTap(){
    if (this.data.isActive){
      pageTo('../main-detail/main-detail',{},true)
    }else{
      pageTo('../login/login', {}, true)
    }
   
  },
  gotoHeart(){
    pageTo('../heart/heart', { }, true)
  },
  gotoOrder(e){
    let index = e.currentTarget.dataset.index;
    pageTo('../order/order-list', { index: index}, true)
  },
  gotoRecharge(e) {
    pageTo('../recharge/recharge', {  }, true)
  },
  gotoChange(e){
    pageTo('../change-detail/change-detail', {}, true)
  },
  getUserInfo(){
    this.setData({ userInfo: wx.getStorageSync('userInfo') }) 
  },
  gotoNews(){
    pageTo('../message/message', {}, true)
  },
  getUser(){
    ajax('member/main').get().then(res => {
      this.setData({ 'user.amount': res['account.balance'],
        isActive:true })
      

    })
  }
})