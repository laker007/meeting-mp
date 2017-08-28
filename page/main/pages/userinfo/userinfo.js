var config = require('../../../../config.js')
var app = getApp();
Page({
    data: {

    },
    onLoad: function () {
        wx.request({
            url: config.host + '/api/v1/userinfo',
            data: {
                OpenID: app.globalData.OpenID,
            },
            method: 'GET',
            success: function (res) {
                console.log(res);
            }
        })
    }
})