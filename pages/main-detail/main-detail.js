// pages/main-detail/main-detail.js
import { pageTo } from '../../utils/utils';
import ajax from '../../utils/request';
import wxApi from '../../utils/native';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLoading:false,
    user:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  gotoNext(e){
    console.log(e)
    var index = e.target.dataset.index
    if(index == 1) {
      pageTo('../nick-name/nick-name',{},true)
    }else if(index == 2){
      pageTo('../receive-address/receive-address', {}, true)
    } else if (index == 3){
      pageTo('../set-pass/set-pass', {}, true)
    }
  },
  choosePhoto(){
    wxApi.chooseImage().then((res) => {
      console.log(res)
      this.upload_file('http://changyingyule.cn/gateway/mobile/member/avatar', res[0])
      // console.log(res)
      // let profileInfo = this.data.user;
      // profileInfo.avatar = res[0];
      // this.setData({
      //   user: profileInfo,
      // });
    });
  },
  upload_file: function (url, filePath) {
    // console.log(filePath.substr(filePath.lastIndexOf('/') + 1))
    var name = filePath.substr(filePath.lastIndexOf('/') + 1)
    var that = this;
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'avatar',
      header: {
        'content-type': 'multipart/form-data',
        'x-auth-token': wx.getStorageSync('token')
      }, // 设置请求的 header
      formData: { 'name': 'avatar', 'filename':"123313dd1.png" }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        wx.showToast({
          title: "图片修改成功",
          icon: 'success',
          duration: 700
        })
      },
      fail: function (res) {
      }
    })
  },
  getUser(){
    ajax('member/entity/session').get().then(res=>{
        this.setData({
          user:res
        })
    })
  }

})