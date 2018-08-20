// pages/reward/reward.js
import ajax from '../../utils/request';
import { pageTo} from '../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../templates/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoading: true,
    bannerList:[],
    newArrivalList:[],
    goodsList:[],
    count:0,
    page:1,
    isLoading: false,
    hasMore: true,
    hasData: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    this.getBanner()
    this.loadData(1)
    // $wuxDialog.show({ content:'请登录'})
    let token = wx.getStorageSync('token');
 
    

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
    $wuxDialog.hide()
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
    this.loadData(1);
    this.getBanner()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.goodsList.length >= this.data.count || this.data.isLoading) {
      // this.loading = false;
      // this.noMoreData = true;
      return;
    }
    var page = this.data.page +1
    this.setData({
      page: page
    })
    this.loadData(page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadData(page=1){
    wx.showNavigationBarLoading();
    let isLoading = this.data.isLoading;
    let hasMore = this.data.hasMore;
    let hasData = this.data.hasData;
    console.log(isLoading)
    console.log(this.data.page != 1 && !hasMore)
    console.log(this.data.page != 1 && !hasData)
    if (isLoading || (this.data.page != 1 && !hasMore) || (this.data.page != 1 && !hasData)) {
      // 正在加载中，没有更多数据， 没有数据都不在请求
      return;
    }
    let dataList = this.data.goodsList || [];
    if (page == 1) {
      dataList = []
      this.setData({
        page:1
      })
    }
    this.setData({ isLoading: true })
      ajax('store/product/list/all/{page}', page).get().then(res=>{
        dataList = dataList.concat(res.records || []);
        // console.log(dataList.length)
        // this.setData({ count: res.count })
        // this.setData({ goodsList: dataList})
        console.log(dataList.length )
        this.setData({
          count:res.count,
          goodsList: dataList,
          hasMore: dataList.length < res.count,
          hasData: res.count > 0,
          firstLoading: false,
          isLoading: false,
        });
        

      }).catch((error) => {
        this.show(error);
      }).finally(res=>{
        console.log(111111)
     
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    
    })
  },
  getBanner() {
    ajax('marketing/banners/MOBILE_STORE').get().then(res=>{
        this.setData({ firstLoading: false })
      // var imgPrifex = config.imgUrl[config.env.NODE_ENV]
      // var bannerList = res.split(',').map(item => {
      //   return item
      // })
        this.setData({ bannerList: res})
      return ajax('store/product/list/recommendation').get(); 
      // this.show('1111')
    }).then(res=>{
      this.setData({ newArrivalList: res})
      console.log(res)
    })
  },
  gotoGoodsDetail(e){
    var dataList = this.data.goodsList;
    var index = e.currentTarget.dataset.index
    var item = dataList[index]
    pageTo('../reword-detail/reword-detail',{ code: item.code},true)
    
  },
  gotoDetail(e){
    var dataList = this.data.newArrivalList;
    var index = e.currentTarget.dataset.index
    var item = dataList[index]
    pageTo('../reword-detail/reword-detail', { code: item.code }, true)
  },
  onConfirm(){
    $wuxDialog.hide()
  },
  onCancel(){
    $wuxDialog.hide()
  },
  preventD(){
 
  }


})