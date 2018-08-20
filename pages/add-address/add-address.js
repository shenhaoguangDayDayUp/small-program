// pages/login/login.js

import WxValidate from '../../utils/validate.js';
import allAddress from '../../utils/address';
import { sha1 } from '../../utils/util';
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import WxNotificationCenter from '../../utils/wxnotification';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      city: '',
      province: '',
      district: ''
    },
    values: ['', '', ''],
    mycode: '',
    disabled: true,
    isPassword: true,
    codeDisabled: false,
    codename: "发送验证码",
    hasChooseRegion: false,
    form: {
      mobileNumber: '',
      name: '',
      street: "",
      favorite: true
    },
    rule: {
      name: {
        show: false,
        message: '',
        isActive: false
      },
      phone: {
        show: false,
        message: '',
        isActive: false
      },
      street: {
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
        tel: true,
        number: true
      },
      name: {
        required: true,
        minlength: 1,
        maxlength: 6,
      },
      street: {
        required: true,
        minlength: 1,
        maxlength: 20,
      }

    }, {
        mobileNumber: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
          number: '请输入数字'
        },
        name: {
          required: '请输入姓名',
          minlength: '最少1个字符',
          maxlength: '最多6个字符',
        },
        street: {
          required: '请输入街道',
          minlength: '最少1个字符',
          maxlength: '最多20个字符',
        },

      })
    if (options.eidt) {
      this.getDetail(options.code)
    }
    this.setData({
      edit: options.eidt
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
        console.log(res.data)
        this.setData({
          mycode: res.data
        })
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

  nameBlur(e) {
    console.log(e)
    if (!this.WxValidate.checkSigleForm('name', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.name.show': true, 'rule.name.message': error[0].msg, 'rule.name.isActive': true })
    } else {
      this.setData({ 'rule.name.show': false, 'rule.name.message': '', 'rule.name.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },
  nameInput(e) {
    this.setData({
      'form.name': e.detail.value
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
  streetInput(e) {
    this.setData({
      'form.street': e.detail.value
    })
  },
  streetBlur(e) {
    if (!this.WxValidate.checkSigleForm('street', e)) {
      const error = this.WxValidate.errorList
      this.setData({ 'rule.street.show': true, 'rule.street.message': error[0].msg, 'rule.street.isActive': true })
    } else {
      this.setData({ 'rule.street.show': false, 'rule.street.message': '', 'rule.street.isActive': true })
    }
    var flag = this.checkBtnDisabled();
    this.setData({
      disabled: flag
    })
  },

  checkBtnDisabled() {
    var rule = this.data.rule;
    var list = []
    for (var i in rule) {
      list.push(rule[i]);
    }
    var dataList = list.filter(item => !item.show && item.isActive)
    if (dataList.length == 3) {
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
  onRegionChange(e) {
    let values = e.detail.value;

    var address = {}
    address.province = values[0];
    address.city = values[1];
    address.district = values[2];
    this.setData({
      hasChooseRegion: true,
      address: address,
      values: values
    });
  },

  getDetail(code) {
    ajax('member/receivers/{code}', code).get().then(res => {
      this.setData({
        'form.name': res.name,
        'form.mobileNumber': res.mobileNumber,
        'form.city': res.city,
        'form.province': res.province,
        'form.district': res.district,
        'form.cityID': res.cityID,
        'form.provinceID': res.provinceID,
        'form.districtID': res.districtID,
        'form.street': res.street,
        'form.favorite': res.favorite,
        'form.code': res.code,
        // 'address.city': res.city,
        // 'address.province': res.province,
        // 'address.district': res.district

      

      })

      this.nameBlur({detail:{value:res.name}})
      this.phoneBlur({ detail: { value: res.mobileNumber } })
      this.streetBlur({ detail: { value: res.street } })
      var obj = {
        detail: { value: [res.province, res.city, res.district]}
      }
      this.onRegionChange(obj)
      var arr = res.favorite ? [''] : []
      var favorite = {
        detail:{
          value: arr
        }
      }
      // this.serviceValChange(favorite)

  })


  },
serviceValChange(value) {
  this.setData({
    'form.favorite': value.detail.value.length ? true : false
  })
},
submitForm(e) {
  var form = Object.assign({}, this.data.form)
  var address = allAddress.filter(item => item.name == this.data.values[0] || item.name == this.data.values[1] || item.name == this.data.values[2])
  console.log(address)
  form.province = address[0].name,
    form.provinceID = address[0].value,
    form.city = address[1].name,
    form.cityID = address[1].value,
    form.district = address[2] ? address[2].name : '',
    form.districtID = address[2] ? address[2].value : ''

    if(this.data.edit){
      ajax('member/receivers').paramters(form).put().then(res => {
        this.show('编辑成功')
        wx.navigateBack()

      })
    }else{
      ajax('member/receivers').paramters(form).post().then(res => {
        this.show('添加成功')
        wx.navigateBack()

      })
    }

  



}
})