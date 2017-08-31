var config = require('../../../../config.js')
var app = getApp();
Page({
    data: {
        userInfo: {},
        registerUserInfo: {},
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: config.host + '/api/v1/userinfo',
            data: {
                OpenID: app.globalData.OpenID,
            },
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.setData({
                    userInfo: app.globalData.userInfo,
                    registerUserInfo: res.data,
                })
            }
        })
    }
})