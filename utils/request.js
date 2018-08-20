// export const BaseURL = 'https://dsabc.dev.sudaotech.com';
export const BaseURL = 'http://changyingyule.cn';
import { $wuxDialog, $wuxLoading, $wuxToptips } from '../templates/index';
import { pageTo } from '../utils/utils';



Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

class RequestApiHandler {

  baseURL = BaseURL;   // 基地址
  method = "GET"; // 请求方式
  data = {};      // 请求参数
  path = "";      // 请求路径

  constructor(path, baseURL = BaseURL) {
    this.path = path;
    this.baseURL = baseURL;
  };

  paramters(data = {}) {
    this.data = data;
    return this;
  };

  /*执行网络请求*/
  send(isLogin = false) {
    
    let path = this.path;
    // if (!path.startsWith('/api/') && !path.startsWith('api/')) {
    //   path = path.startsWith('/') ? `/api/mall${path}` : `/api/mall/${path}`;
    // }
    // let joinPath = path.startsWith('/') ? '' : '/';
    let requestURL = `${this.baseURL}/gateway/mobile/` +path;

    // let requestURL = `${this.baseURL}`

    let token = wx.getStorageSync('token');
    console.log(token)
    return new Promise((resolve, reject) => {
      wx.request({
        url: requestURL,
        method: this.method,
        data: this.data,
        header: {
            'Content-Type': 'application/json',
            'x-auth-token': token||'' 
        },
        success(result) {
          wx.hideNavigationBarLoading();
          let data = result.data;
          console.log(result)
          if (result.statusCode == 200) {
            if (isLogin) {
              let tokens = result.header['x-auth-token'];
              wx.setStorageSync('userInfo', data);
              wx.setStorageSync('token', tokens);
            }
            resolve(data);
          } else {
            if (result.statusCode == 401){
              console.log(result)
              $wuxDialog.show({
                content: '您还没有登录,请先登录', onCancel() {
                  $wuxDialog.hide()
                }, onConfirm() {
                  $wuxDialog.hide() 
                  pageTo('../login/login', {}, true)
                }
              })
            }
            else{
              console.log(result.data)
              $wuxToptips.error({ text: result.data})
            }
        
              reject(result);
          }

        },
        fail(error) {
          reject(error);
        }
      })
    });
  };

  get() {
    this.method = "GET";
    return this.send();
  }

  post(isLogin = false) {
    this.method = "POST";
    return this.send(isLogin);
  }

  login() {
    this.method = "put";
    return this.send(true);
  }

  delete() {
    this.method = "DELETE";
    return this.send();
  }

  put() {
    this.method = "PUT";
    return this.send();
  }
}

export default function ajax(url) {

  let sendUrl = url;

  for (let i = 1; i < arguments.length; i++) {
    sendUrl = sendUrl.replace(/{\w*}/, arguments[i]);
  }

  return new RequestApiHandler(sendUrl)
}
