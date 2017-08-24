//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (data) {
          console.log(data.errMsg);
          console.log(data.code);

          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log(that.globalData);

              wx.request({
                url: 'http://localhost:3000/api/v1/login',
                method: 'POST',
                data: {
                  js_code: data.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res)
                }
              })

            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})