// pages/game/game-detail.js
import ajax from '../../utils/request';
import { BaseURL } from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      code:'',
      firstLoading:false,
      detail:{},
      bannerList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title//页面标题为路由参数
    })
    this.setData({
      code: options.code
    })
    this.getDetail()
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
  getDetail()
  {
    ajax('game/entity/{code}',this.data.code).get().then(res=>{
      this.setData({detail:res})
         var imgPrifex = BaseURL;
         var bannerList = [];
         bannerList = res.banners.split(',').filter(item => item.length).map(item => {
           return imgPrifex+ item
         })
       this.setData({
         bannerList: bannerList
       })
    })
  }
})