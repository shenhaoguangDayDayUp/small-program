// pages/heart/heart.js

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
    allSelected:false,
    totalPrice:0,
    amount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxNotificationCenter.addNotification('LOGINGSUCCESS', this.getList, this);
    let _ = new getApp().Toast()
     this.getList();
     console.log(this)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  selectClick(){
    let allSelected = this.data.allSelected;
    let dataList = this.data.dataList;
    dataList = dataList.map((item) => {
      item.isSelected = !allSelected;
      return item;
    });
    this.setData({
      allSelected: !allSelected,
      dataList: dataList,
    });
    this.calcPrice()
  },
  // 
  onCellTap: function (e) {
    console.log(111)
    // let index = e.detail.index;

  },
  // onQuantityCange(e){
  //   let index = e.detail.index;
  //   let value = e.detail.value;
  //   let dataList = this.data.dataList;
  //   let cartItem = dataList[index];
  //   cartItem.quantity = value;
  //   dataList[index] = cartItem;
  //   this.setData({
  //     dataList: dataList,
  //   });
  //   this.calcPrice();
  // },
  checkRadio: function (e) {
    let index = e.currentTarget.dataset.index;
    let dataList = this.data.dataList;
    let cartItem = dataList[index];
    cartItem.isSelected = !cartItem.isSelected;
    dataList[index] = cartItem;

    let selectedList = dataList.filter((item) => {
      return item.isSelected
    })

    this.setData({
      dataList: dataList,
      allSelected: dataList.length > 0 && dataList.length == selectedList.length,
    });
    console.log(this.data.allSelected)
    this.calcPrice();
  },
  onCellWillEdting(e){
     let index = e.detail.index;
    let comps = this.selectAllComponents('.cmp_cell');
    for (let i = 0; i < comps.length; i++) {
      comps[i].endEditing();
    }
    
  },
  onCellWillDelete(e){
    let index = e.detail.index;
    let comps = this.selectAllComponents('.cmp_cell');
    let com = comps[index];
    let dataList = this.data.dataList;
    let item = dataList[index];
    $wuxDialog.show({
      title: '提示', content: '是否删除?', rightBtnText: '确定', leftBtnText: '取消', onCancel() {
        $wuxDialog.hide()
      }, onConfirm() {
        $wuxDialog.hide()
        ajax('store/cart/item').paramters({ product: { code: item.product.code } }).delete().then(() => {
          dataList.splice(index, 1);
          com && com.endEditing();
          setTimeout(() => {
            this.setData({
              dataList: dataList
            });
          }, 350);

          this.show('删除成功')

        }).catch(err=>{
          com && com.endEditing();
          this.show(err);
        })

      }
    })
  },
  onQuantityCange(e){
    console.log(e)
    const product = this.data.dataList[e.detail.index];
    var obj = { product: { code: product.product.code }, quantity: e.detail.type }
    ajax('/store/cart/item').paramters(obj).post().then(res=>{
         product.quantity = res
         this.setData({
           dataList: this.data.dataList
         })
      this.calcPrice()
    }).catch(res=>{
      this.show(res)
    })

  },
  calcPrice: function () {
    let dataList = this.data.dataList;

    let selectedList = dataList.filter((item) => {
      return item.isSelected;
    });
    let totalPrice = 0;
    let amount = 0;
    // console.log(selectedList)
   
    selectedList.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
      amount += item.quantity
    });
    if (totalPrice == 0) {
      totalPrice = 0;
    }
    this.setData({
      amount: amount,
      totalPrice: totalPrice,
      allSelected: selectedList.length == dataList.length && dataList.length > 0
    });

  },
  gotoChange(item){
      if(!this.data.amount){
          return
      }
      var productList = [...this.data.dataList];
      productList = productList.filter(item => item.isSelected).map(item => {
        return { product: { code: item.product.code }, quantity: item.quantity };
      });
      var personalInfo = {
        items: productList
      }

      var productInfo = JSON.stringify({ personalInfo: personalInfo });
      pageTo('../convert/convert', { productList: productInfo }, true)

      
  },
  getList(){
    ajax('store/cart/entity').get().then(res => {
      let list = (res.records || []).map((item) => {
        item.isSelected = false;
        return item;
      });
      this.setData({
        firstLoading:false,
        dataList: list,
        count:res.count
      })
    }).catch(res=>{
      console.log(res)
    }).finally(res=>{
      console.log(res)
    })
  }
})