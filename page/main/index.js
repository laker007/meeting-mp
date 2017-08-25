//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        register: false,
    },

    userinfo: function () {
        wx.navigateTo({
            url: './pages/userinfo/userinfo',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    register: function () {
        wx.navigateTo({
            url: './pages/register/register',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    avatar: function () {
        wx.navigateTo({
            url: 'String',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    onLoad: function () {
        console.log('onLoad');
        var that = this;
        // 调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo,
                register: app.globalData.register,
            })
            console.log(that);
        })
    },
    onReady: function() {
        console.log('onReady');
    }
})