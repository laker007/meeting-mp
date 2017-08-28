var app = getApp();
Page({
    data: {

    },
    onLoad: function () {
        wx.request({
            url: 'http://localhost:3000/api/v1/userinfo',
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