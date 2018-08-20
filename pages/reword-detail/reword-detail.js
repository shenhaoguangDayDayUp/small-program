// pages/reword-detail/reword-detail.js
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoading:true,
    code:'',
    bannerList:[],
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    this.setData({ code: options.code})
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
  rightChange(){
    var productList = [{ product: { code: this.data.code }, quantity: 1 }]
    var personalInfo = {
      items: productList
    }
    var productInfo = JSON.stringify({ personalInfo: personalInfo });
pageTo('../convert/convert', { productList: productInfo }, true)
  },
  addCart(){
    var obj = { product: { code: this.data.code }, quantity: 1 };
    ajax('store/cart/item').paramters(obj).post().then(res=>{
      this.show('加入成功');
    }).catch((error) => {
      // this.show(error.message);
    }).finally(() => {
      this.setData({
        // btnIsLoading: false,
      });
    });
  },
  getDetail(){
    console.log(this.code)
    var that = this;
    ajax('store/product/entity/{code}',this.data.code).get().then(res=>{
      var bannerList = res.banners.split(',').map(item => {
        return item
      })
      this.setData({ firstLoading: false })
      this.setData({ bannerList: bannerList })
      this.setData({ detail: res})
      var insertData = res.detail
      WxParse.wxParse('insertData', 'html', insertData, that);
    })
  }
})