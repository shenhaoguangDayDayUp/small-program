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
    mycode:'',
    disabled: true,
    isPassword: true,
    codeDisabled: false,
    codename: "发送验证码",
    form: {
      mobileNumber: '',
      password: '',
      note: '',
      code: ''
    },
    rule: {
      name: {
        show: false,
        message: '',
        isActive: false
      },
      note: {
        show: false,
        message: '',
        isActive: false
      },
      phone: {
        show: false,
        message: '',
        isActive: false
      },
      password: {
        show: false,
        message: '',
        isActive: false
      },
      code: {
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
      mobileNumber: {
        required: true,
        tel: true,
        number: true
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 8,

      },
      note: {
        required: true,
        minlength: 4,
        maxlength: 4,
        number: true
      },
      code: {
        required: true,
        minlength: 6,
        maxlength: 8,
        equalTo: 123,
      }

    }, {
        mobileNumber: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
          number: '请输入数字'
        },
        password: {
          required: '请输入密码',
          number: '请输入数字'

        },
        note: {
          required: '请输入验证码',
          minlength: '最少4位验证码',
          maxlength: '最多4位验证码',
          number: '请输入数字'
        },
        code: {
          required: '请输入密码',
          number: '请输入数字',
          equalTo: '两次输入的不一致'
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
  getVerificationCode() {
    const e = { detail: { value: this.data.form.mobileNumber } }
    this.phoneBlur(e)
    if (!this.data.rule.phone.show && !this.data.codeDisabled) {
      var num = 61;
      var _this = this;
      ajax('sms/validationCode/{code}', this.data.form.mobileNumber).get().then(res => {
        this.show('发送成功')
        this.setData({mycode:res.data})
        console.log(res)
      })
      var timer = setInterval(function () {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.setData({
            codename: '重新发送',
            codeDisabled: false
          })

        } else {
          _this.setData({
            codename: num + "s后重发",
            codeDisabled: true
          })
        }
      }, 1000)
    }

  },

  codeBlur(e) {

    var code = {
      required: true,
      minlength: 6,
      maxlength: 8,
      equalTo: this.data.form.password,
    }
    if (!this.WxValidate.checkSigleForm('code', e, code)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.code.show': true, 'rule.code.message': error[0].msg, 'rule.code.isActive': true })
    } else {
      this.setData({ 'rule.code.show': false, 'rule.code.message': '', 'rule.code.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  codeInput(e) {
    this.setData({
      'form.code': e.detail.value
    })
  },
  noteBlur(e) {

    if (!this.WxValidate.checkSigleForm('note', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.note.show': true, 'rule.note.message': error[0].msg, 'rule.note.isActive': true })
    } else {
      this.setData({ 'rule.note.show': false, 'rule.note.message': '', 'rule.note.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  noteInput(e) {
    this.setData({
      'form.note': e.detail.value
    })
  },
  phoneBlur(e) {
    if (!this.WxValidate.checkSigleForm('mobileNumber', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.phone.show': true, 'rule.phone.message': error[0].msg, 'rule.phone.isActive': true })
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
    var dataList = list.filter(item => !item.show && item.isActive)
    if (dataList.length == 4) {
      return false
    } else {
      return true
    }

  },
  passwordBlur(e) {
    if (!this.WxValidate.checkSigleForm('password', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.password.show': true, 'rule.password.message': error[0].msg, 'rule.password.isActive': true })

    } else {
      this.setData({ 'rule.password.show': false, 'rule.password.message': '', 'rule.password.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  submitForm(e) {
    var form = Object.assign({}, this.data.form)
    delete form['password']
    form.code = sha1(form.code)
    ajax('member/password/reset').paramters(form).put().then(res => {
      this.show('修改成功')
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