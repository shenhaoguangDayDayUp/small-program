// components/pass-check/index.js
import WxValidate from '../../utils/validate.js';
import { sha1 } from '../../utils/util';
import ajax from '../../utils/request';
import { pageTo } from '../../utils/utils';
import WxNotificationCenter from '../../utils/wxnotification';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mycode: '',
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
  
  attached(){
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({ 'form.mobileNumber': userInfo.mobileNumber})
    this.WxValidate = new WxValidate({
 
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
   * 组件的方法列表
   */
  methods: {
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
    getVerificationCode() {
      const e = { detail: { value: this.data.form.mobileNumber } }

      if (!this.data.codeDisabled) {
        var num = 61;
        var _this = this;
        ajax('sms/validationCode/{code}', this.data.form.mobileNumber).get().then(res => {
          let pages = getCurrentPages();
          let curPage = pages[pages.length - 1];
          curPage.show('发送成功')
          console.log(res.data)
          this.setData({
            'mycode': res.data
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
    submitForm(e) {
      var form = Object.assign({}, this.data.form)
      delete form['password']
      delete form['mobileNumber']
      form.code = sha1(form.code)
      ajax('member/password/update').paramters(form).put().then(res => {
   
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        curPage.show('修改成功')
        // pageTo('../reward/reward',{},true) 
        // wx.navigateBack()
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
  }
})
