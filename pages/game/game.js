// pages/game/game.js
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../templates/index';
import WxNotificationCenter from '../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommond:[],
    firstLoading:true,
    page:1,
    isLoading: false,
    hasMore: true,
    hasData: true,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommond()
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
    if (this.data.list.length >= this.data.count || this.data.isLoading) {
      // this.loading = false;
      // this.noMoreData = true;
      return;
    }
    var page = this.data.page + 1
    this.setData({
      page: page
    })
    this.getList(page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getList() {
    if (this.data.isLoading || (this.data.page != 1 && !this.data.hasMore) || (this.data.page != 1 && !this.data.hasData)) {
      // 正在加载中，没有更多数据， 没有数据都不在请求
      return;
    }
    this.setData({
      isLoading: true,
    })
    ajax('game/list/all/{page}',this.data.page).get().then(res => {
      var list = this.data.list;
      list = list.concat(res.records || [])
      this.setData({
        isLoading: false,
        hasMore: list.length < res.count,
        hasData: res.count > 0,
        firstLoading: false,
        list: list,
        count: res.count })

    })
  },
  getRecommond(){
    ajax('game/list/recommendation').get().then(res=>{
      this.setData({ recommond: res, firstLoading:false})
      
    })
  }
})