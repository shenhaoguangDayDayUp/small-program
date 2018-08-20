const pageTo = (url, param = {}, forceNav = false) => {
  let pageList = getCurrentPages();
  let realURL = url + '?';
  for (let k in param) {
    realURL += k + '=' + param[k] + '&';
  }
  realURL = realURL.substring(0, realURL.length - 1);
  if (pageList.length <= 4 && forceNav) {
    console.log(realURL)
    wx.navigateTo({
      url: realURL,
    })
  } else {
    wx.redirectTo({
      url: realURL,
    })
  }
};
const rpxToPx = (rpx) => {
  let windowWidth = wx.getSystemInfoSync().windowWidth;
  return parseInt(rpx / 750 * windowWidth);
};

module.exports = {
  pageTo: pageTo,
  rpxToPx:rpxToPx
}