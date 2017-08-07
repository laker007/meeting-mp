//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World Laker',
    userInfo: {},
    icons:{
      "reserve":"../../../image/icon_me_reserve.png",
      "meeting":"../../../image/icon_me_meeting.png",
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  login: function() {
    wx.navigateTo({
      url: './pages/register/register',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
