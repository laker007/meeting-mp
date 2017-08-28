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

    onLoad: function () {
        console.log('onLoad');
        var that = this;
        that.setData({
            userInfo: app.globalData.userInfo,
            register: app.globalData.register,
        })
        console.log(app);
    },
    onReady: function() {
        console.log('onReady');
    }
})