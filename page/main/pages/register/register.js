//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},

        countries: ["中国", "美国", "英国"],
        countryIndex: 0,

    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        wx.request({
            url: 'http://localhost:3001/api/meeting', //仅为示例，并非真实的接口地址
            data: {
                topic:'移动开发',
                name:'haha'
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
            }
        })
    }
})