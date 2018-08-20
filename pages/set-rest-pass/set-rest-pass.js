// pages/set-rest-pass/set-rest-pass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarIndex: 0,
    currentTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    const width = 50;
    const move = width * 0;
    this.setData({
      tabbarIndex: 0,
      width: width,
      move: move,
    });
  },
  bindChange(e){
    var that = this;
    that.setData({ currentTab: e.detail.current }); 
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

    switchTabbar: function (e) {
    let index = e.currentTarget.dataset.index;
    let tabbarIndex = this.data.tabbarIndex;
    if (tabbarIndex == index) {
      return;
    }
    const width = 50;
    const move = width * index;
    console.log(move)
    this.setData({
      tabbarIndex: index,
      width: width,
      move: move,
      currentTab: index
    });

  },
})