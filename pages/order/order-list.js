
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import { format } from '../../utils/util';

import { $wuxDialog, $wuxLoading } from '../../templates/index';
import WxNotificationCenter from '../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    hasMore: true,
    hasData: true,
    tabbarIndex:0,
    firstLoading:false,
    allOrderData:[],
    scrollTop: 0,
    orderData:{
      orderList:[],
      count:0,
    
      
    },
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxNotificationCenter.addNotification('LOGINGSUCCESS', this.getData, this);
    let _ = new getApp().Toast();
    let index = options.index || 0;
    const width = 33.3333;
    const move = width * index;
    this.setData({
      tabbarIndex: index,
      width: width,
      move: move,
    });
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
    WxNotificationCenter.removeNotification('LOGINGSUCCESS',this)
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
    if ((this.data.orderData.orderList.length >= this.data.orderData.count) || this.data.isLoading) {
      // this.loading = false;
      // this.noMoreData = true;
      return;
    }
    var page = this.data.page + 1
    this.setData({
      page: page
    })
    this.getList(this.data.tabbarIndex);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoDetail(e){
    var list = this.data.orderData.orderList
    var index = e.currentTarget.dataset.index
    var obj = list[index]
    pageTo('../order-detail/order-detail',{code:obj.code},true)
  },
  getData() {
    this.setData({
      isLoading: false
    })
    this.getList()
  },
  getList(index=0){
    let page = this.data.page;
    if (this.data.isLoading || (this.data.page != 1 && !this.data.hasMore) || (this.data.page != 1 && !this.data.hasData)) {
      // 正在加载中，没有更多数据， 没有数据都不在请求
      return;
    }
    this.setData({
      isLoading: true,
    })
    if(index==0){
      ajax('store/order/list/unpaid/{id}', page).get().then(res => {
        var list = this.data.orderData.orderList;
        res.records = res.records.map(item => {
          return { ...item, placeAt: format(item.placeAt, 'yyyy-MM-dd HH:mm:ss') }
        })
         list = list.concat(res.records || [])
     
        this.setData({
          'orderData.orderList': list,
          'orderData.count': res.count,
          hasMore: list.length < res.count,
          hasData: res.count > 0,
          isLoading:false
        })
        // console.log(this.data.allOrderData)
      })
    }else if(index==1){
      ajax('store/order/list/unreceived/{id}', page).get().then(res => {
        var list = this.data.orderData.orderList;
        res.records = res.records.map(item => {
          return { ...item, placeAt: format(item.placeAt, 'yyyy-MM-dd HH:mm:ss') }
        })
        list = list.concat(res.records || [])
    
        this.setData({
          'orderData.orderList': list,
          'orderData.count': res.count,
          hasMore: list.length < res.count,
          hasData: res.count > 0,
          isLoading: false
        })
        // console.log(this.data.allOrderData)
      })
    }else{
      ajax('store/order/list/all/{id}', page).get().then(res => {
        var list = this.data.orderData.orderList;
        res.records = res.records.map(item => {
          return { ...item, placeAt: format(item.placeAt, 'yyyy-MM-dd HH:mm:ss') }
        })
        list = list.concat(res.records || [])
        this.setData({
          'orderData.orderList': list,
          'orderData.count':res.count,
          hasMore: list.length < res.count,
          hasData: res.count > 0,
           isLoading: false
          
        })
        // console.log(this.data.allOrderData)
      })
    }
  
  },
  switchTabbar: function (e) {
    let index = e.currentTarget.dataset.index;
    let tabbarIndex = this.data.tabbarIndex;
    if (tabbarIndex == index) {
      return;
    }
    const width = 33.33333;
    const move = width * index;
    this.setData({
      isLoading:false,
      tabbarIndex: index,
      width: width,
      move: move,
      page:1,
      'orderData.orderList':[],
      'orderData.count': 0,
      hasMore: true,
      hasData: true,
      scrollTop:0
    });
    this.getList(index);
  },
})