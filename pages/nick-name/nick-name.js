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
      nickname:''
    },
    rule: {
      nickname: {
        show: false,
        message: '',
        isActive: false
      },
 
  
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ = new getApp().Toast()
    this.WxValidate = new WxValidate({
      nickname: {
        required: true,
        minlength: 1,
        maxlength: 6,
      },
 
    }, {
        nickname: {
          required: '请输入用户昵称',
          minlength:'最少1个字符',
          maxlength: '最多6个字符'

        },

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
  forgetpass() {
    pageTo('../forget-password/forget-password', {}, true)
  },
  gotoRegister() {
    pageTo('../register/register', {}, true)
  },
  nicknameBlur(e) {
    if (!this.WxValidate.checkSigleForm('nickname', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.nickname.show': true, 'rule.nickname.message': error[0].msg, 'rule.nickname.isActive': true })
    } else {
      this.setData({ 'rule.nickname.show': false, 'rule.nickname.message': '', 'rule.nickname.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  nicknameInput(e) {
    this.setData({
      'form.nickname': e.detail.value
    })
  },

  checkBtnDisabled() {
    var rule = this.data.rule;
    var list = []
    for (var i in rule) {
      list.push(rule[i]);
    }
    var dataList = list.filter(item => !item.show && item.isActive)
    if (dataList.length == 1) {
      return false
    } else {
      return true
    }

  },

  submitForm(e) {
    var form = Object.assign({}, this.data.form)

    ajax('member/login').paramters(form).put().then(res => {
      this.show('修改成功')
      WxNotificationCenter.postNotificationName('LOGINGSUCCESS')


      wx.navigateBack()

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