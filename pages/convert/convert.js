// pages/convert/convert.js
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import { $wuxDialog, $wuxLoading } from '../../templates/index';
import WxNotificationCenter from '../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoading:true,
    defaultAddress:{},
    productInfo:{},
    receiver:{},
    goodsItem:{},
    productList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    if (options.productList){
      var productInfo = JSON.parse(options.productList);
      this.setData({
        productInfo: productInfo.personalInfo,
        productList: options.productList
      })
    }

  this.getDefault()
    // WxNotificationCenter.addNotification('ADDRESSUPDAT', this.getDefault, this);
  
  
   
   
    
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
  gotoAddress() {
    pageTo('../address-list/address', { productList:this.data. productList})
  },
  getDefault()
  {
    this.getDefaultAddress().then(() => {
      this.getInfo()
    })
  },
  gotoSubmit(){

    var personalInfo = {
      receiverName: this.data.defaultAddress.name,
      receiverMobileNumber: this.data.defaultAddress.mobileNumber,
      receiverProvince: this.data.defaultAddress.provinceID,
      receiverCity: this.data.defaultAddress.cityID,
      receiverDistrict: this.data.defaultAddress.districtID,
      receiverStreet: this.data.defaultAddress.street,
      items: []
    };
    var productList = [...this.data.detail.items];
    productList = productList.map(item => {
      return {
        product: { code: item.product.code },
        quantity: item.quantity
      };
    });
    personalInfo.items = productList;
    ajax('store/order/place').paramters(personalInfo).post().then(res => {
      pageTo('../order-detail/order-detail',{code:res.code});
    })
  },
  getInfo(){
    var productInfo = this.data.productInfo
    var receiver = {
      receiverName: this.data.defaultAddress.name,
      receiverMobileNumber: this.data.defaultAddress.mobileNumber,
      receiverProvince: this.data.defaultAddress.provinceID,
      receiverCity: this.data.defaultAddress.cityID,
      receiverDistrict: this.data.defaultAddress.districtID,
      receiverStreet: this.data.defaultAddress.street,
    }
    var data = Object.assign({}, productInfo, receiver)
    ajax('store/order/checkout').paramters(data).post().then(res => {
      this.setData({
        goodsItem:res.items,
        detail:res
      })
    })
  },
  getDefaultAddress(){
  return  ajax('member/receivers/favorite').get().then(res => {
        this.setData({
          firstLoading:false,
          defaultAddress:res,
        })
    })
  }
})