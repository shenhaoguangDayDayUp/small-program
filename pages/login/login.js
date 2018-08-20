// pages/login/login.js

import WxValidate from '../../utils/validate.js';
import { sha1 } from '../../utils/util';
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import WxNotificationCenter from '../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    isPassword: true,
    form: {
      mobileNumber: '',
      password: '',
    },
    rule: {
      phone: {
        show: false,
        message: '',
        isActive:false
      },
      password: {
        show: false,
        message: '',
        isActive: false
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    this.WxValidate = new WxValidate({
      mobileNumber: {
        required: true,
        tel: true
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 8,
      }
    }, {
        mobileNumber: {
          required: '请输入手机号',
          tel: '请输入正确的手机号'

        },
        password: {
          required: '请输入密码',

        }
      })


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
    WxNotificationCenter.removeNotification('LOGINGSUCCESS', this);

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
  forgetpass(){
    pageTo('../forget-password/forget-password', {}, true)
  },
  gotoRegister() { 
    pageTo('../register/register', {}, true)
  },
  phoneBlur(e) {
    if (!this.WxValidate.checkSigleForm('mobileNumber', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.phone.show': true, 'rule.phone.message': error[0].msg, 'rule.phone.isActive': true})
    } else {
      this.setData({ 'rule.phone.show': false, 'rule.phone.message': '', 'rule.phone.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  phoneInput(e) {
    this.setData({
      'form.mobileNumber': e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      'form.password': e.detail.value
    })
  },
  checkBtnDisabled() {
    var rule = this.data.rule;
    var list = []
    for (var i in rule) {
      list.push(rule[i]);
    }
   var dataList = list.filter(item=>!item.show&&item.isActive)
   if (dataList.length == 2){
     return false
   }else{
     return true
   }
   
  },
  passwordBlur(e) {
    if (!this.WxValidate.checkSigleForm('password', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.password.show': true, 'rule.password.message': error[0].msg, 'rule.password.isActive': true  })

    } else {
      this.setData({ 'rule.password.show': false, 'rule.password.message': '', 'rule.password.isActive': true  })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  submitForm(e) {
    var form = Object.assign({}, this.data.form)
    form.password = sha1(form.password)
    ajax('member/login').paramters(form).login().then(res => {
      this.show('登录成功')
      WxNotificationCenter.postNotificationName('LOGINGSUCCESS')
      let pages = getCurrentPages();
      let curPage = pages[pages.length - 1];
      console.log(pages)
      // pageTo('../reward/reward',{},true) 
      wx.navigateBack()
      // wx.switchTab({
      //   url: '../reward/reward'
      // })
    })
    // console.log(e)
    //  var error = this.WxValidate.checkParam('phone',{
    //     phone: {
    //        required: true,
    //        phone: true
    //     },
    //   } , e)
    //  console.log(error)
    // if (!this.WxValidate.checkForm(e)) {
    //   const error = this.WxValidate.errorList
    //   console.log(error)
    //   return false
    // }

    
  }
})