//index.js
//获取应用实例
var app = getApp()
Page({
    onLoad: function () {
        app.getUserInfo(function (userInfo) {})
        wx.redirectTo({
            url: '../../index',
        })
    },
})