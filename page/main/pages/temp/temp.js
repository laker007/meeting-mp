//index.js
//获取应用实例
var app = getApp()
Page({
    data: {

    },

    onLoad: function () {
        console.log('onLoad');
        app.getUserInfo(function (userInfo) {})
        wx.redirectTo({
            url: '../../index',
        })
        console.log(app.globalData.register);
    },
})