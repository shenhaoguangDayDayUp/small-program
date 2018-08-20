// pages/change-detail/change-detail.js
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../templates/index';
import WxNotificationCenter from '../../utils/wxnotification';
import { format } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoading: true,
    page: 1,
    list: [],
    count: 0,
    remaind: 0,
    isLoading: false,
    hasMore: true,
    hasData: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxNotificationCenter.addNotification('LOGINGSUCCESS', this.getData, this);
    this.getList();
    this.getRemaind()

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
  gotoDetail(e){
    console.log(e)
    var index = e.target.dataset.index
    pageTo('../message-detail/message',{code:index},true)
  },
  getRemaind() {
    ajax('account/balance/CRD').get().then(res => {
      this.setData({ remaind: res })
    })
  },
  getData() {
    this.setData({
      isLoading: false
    })
    this.getList()
  },
  getList() {
    if (this.data.isLoading || (this.data.page != 1 && !this.data.hasMore) || (this.data.page != 1 && !this.data.hasData)) {
      // 正在加载中，没有更多数据， 没有数据都不在请求
      return;
    }
    this.setData({
      isLoading: true,
    })
    ajax('message/list/{page}', this.data.page).get().then(res => {
      var list = this.data.list;
      res.records = res.records.map(item => {
        return { ...item, readAt: item.readAt ? format(item.readAt, 'yyyy-MM-dd HH:mm:ss') : '', sendAt: item.sendAt ? format(item.sendAt, 'yyyy-MM-dd HH:mm:ss') : '' }
      })
      list = list.concat(res.records || [])

      this.setData({
        isLoading: false,
        hasMore: list.length < res.count,
        hasData: res.count > 0,
        firstLoading: false,
        list: list,
        count: res.count
      })

    }).catch(response => {
      if (response.status == 401) {

      }
      console.log(131131313131311)
      console.log(response)
    })

  }
})