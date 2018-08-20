/** 微信登录失败 */
const ERROR_CODE_LOGIN = 1001;
/** 获取设置 */
const ERROR_CODE_GET_SETTING = 1002;
/** 打开用户设置失败 */
const ERROR_CODE_OPEN_SETTING = 1003;
/** 获取用户位置信息失败 */
const ERROR_CODE_GET_LOCATION = 1004;
/** 获取用户信息失败 */
const ERROR_CODE_GET_USER_INFO = 1005;

/** 封装微信小程序原生部分接口 */

/** 微信登录 */
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res);
      },
      fail() {
        reject({
          code: ERROR_CODE_LOGIN,
          message: '微信登录失败',
        });
      }
    })
  });
};

/** 获取设置 */
const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        resolve(res);
      },
      fail() {
        reject({
          code: ERROR_CODE_GET_SETTING,
          message: '获取微信设置失败',
        });
      }
    })
  });
}

/** 打开用户设置失败 */
const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(res) {
        resolve(res);
      },
      fail() {
        reject({
          code: ERROR_CODE_OPEN_SETTING,
          message: '打开微信授权失败',
        });
      }
    })
  });
}

/** 获取用户位置信息 */
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success(res) {
        resolve(res);
      },
      fail() {
        reject({
          code: ERROR_CODE_GET_LOCATION,
          message: '获取用户位置信息失败',
        });
      }
    })
  });
};

/** 获取用户信息失败 */
const getUserInfo = (withCredentials) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: withCredentials,
      lang: 'zh_CN',
      success(res) {
        resolve(res);
      },
      fail() {
        reject({
          code: ERROR_CODE_GET_USER_INFO,
          message: '获取用户信息失败',
        });
      }
    })
  });
}

const chooseImage = (count = 1) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      success(res) {
        console.log(res)
        resolve(res.tempFilePaths);
      },
    })
  });
};

const showModal = (content, title = '温馨提示', cancelText = '取消', confirmText = '确定') => {
  return new Promise((resolve, reject) => {
    if (cancelText.length > 0) {
      wx.showModal({
        title: title,
        content: content,
        cancelText: cancelText,
        cancelColor: '#000000',
        confirmText: confirmText,
        confirmColor: '#934900',
        success(res) {
          resolve(res.confirm);
        }
      });
    } else {
      wx.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        confirmColor: '#934900',
        success(res) {
          resolve(res.confirm);
        }
      });
    }

  });
}

module.exports = {

  ERROR_CODE_LOGIN: ERROR_CODE_LOGIN,   // 登录失败的code
  ERROR_CODE_GET_SETTING: ERROR_CODE_GET_SETTING, // 获取设置的code
  ERROR_CODE_OPEN_SETTING: ERROR_CODE_OPEN_SETTING, // 打开设置的code
  ERROR_CODE_GET_LOCATION: ERROR_CODE_GET_LOCATION, // 获取未知信息失败的code
  ERROR_CODE_GET_USER_INFO: ERROR_CODE_GET_USER_INFO, // 获取用户信息失败

  getSetting: getSetting,
  openSetting: openSetting,
  login: login,
  getLocation: getLocation,
  getUserInfo: getUserInfo,
  showModal: showModal,
  chooseImage: chooseImage,
}