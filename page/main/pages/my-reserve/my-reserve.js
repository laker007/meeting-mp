var app = getApp()
Page({
    data: {
        meetings: [],
        meeting_rooms: [],
    },
    onLoad: function () {
        console.log('my-reserve onLoad');
        var that = this;

        // 获取预定记录
        wx.request({
            url: 'http://localhost:3000/api/v1/reserve',
            data: {
                OpenID: app.globalData.OpenID
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success
                console.log(res);
                if (res.data.length) {
                    that.setData({
                        meetings: res.data
                    })
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
        // 获取会议室
        wx.request({
            url: 'http://localhost:3000/api/v1/reserve/meeting_room',
            data: {
                OpenID: app.globalData.OpenID,
            },
            method: 'GET',
            success: function (res) {
                if (res.data.length) {
                    that.setData({
                        meeting_rooms: res.data
                    })
                }
            },
        })
        // that.data.meetings.forEach(function(element) {
        //     element.MeetingRoom
        // }, this);
    },
    cancelMeeting: function (e) {
        console.log(e.target.dataset.meetingid);
        console.log('cancel meeting')
        var that = this;
        wx.showModal({
            content: '是否取消预定？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: 'http://localhost:3000/api/v1/reserve',
                        data: {
                            MeetingID: e.target.dataset.meetingid
                        },
                        method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        header: {
                            'conetent-type': 'application/json'
                        },
                        success: function (res) {
                            // success
                            console.log(res);
                            that.onLoad();
                        },
                        fail: function () {
                            // fail
                        },
                        complete: function () {
                            // complete
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})