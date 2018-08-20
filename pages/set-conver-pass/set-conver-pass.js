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
    payTitle:'',
    show:false,
    disabled: true,
    isPassword: true,
    firstValue:'',
    form: {
      password: ''
    },
    rule: {
      password: {
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
      password: {
        required: true,
        minlength: 6,
        maxlength: 6,
        number:true
      },

    }, {
        password: {
          required: '请输入用户昵称',
          minlength: '最少6个字符',
          maxlength: '最多6个字符',
          number:'请输入数字'


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
  nicknameInput(e) {
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
    if (dataList.length == 1) {
      return false
    } else {
      return true
    }

  },
  close(){
    this.setData({
      payTitle:'请输入兑换码'
    })
  },
  passend(value){
    var val = value.detail.value
  
     if (this.data.payTitle == '请再次输入兑换密码'){
       if (val == this.data.firstValue ){
         var form = Object.assign({}, this.data.form, {passwordRedeem:''})
         form.password = sha1(form.password)
         form.passwordRedeem = sha1(val)
         ajax('member/password/redeem').paramters(form).put().then(res=>{

         this.setData({
           show:false,
           payTitle:'请输入兑换码'
         })
         wx.navigateBack({
           
         })

         })
       }
     }
     this.setData({
       payTitle: '请再次输入兑换密码',
       firstValue: val
     })
  },
  submitForm(e) {
    var form = Object.assign({}, this.data.form)
    form.password = sha1(form.password)
    ajax('member/password/validate').paramters(form).put().then(res => {
      this.setData({ show: true,'payTitle':'请输入兑换密码'})
      this.show('验证成功')
      



    }).catch(err=>{
      this.show('验证失败')
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