var config = require('../../../../config.js');
var app = getApp();

Page({
    data: {
        meetings:[],
        meeting_rooms: [],
        meeting_roomIndex: -1,
    },
    onLoad: function () {
        var that = this;
        console.log('meeting-room onLoad');
        wx.request({
            url: config.host + '/api/v1/meeting_room',
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
    },
    bindMeetingRoomChange: function (e) {
        var that = this;
        that.setData({
            meeting_roomIndex: e.detail.value
        })
        that.setData({
            meetings: null
        })
        wx.request({
            url: config.host + '/api/v1/reserve',
            data: {
                MeetingRoom: that.data.meeting_rooms[that.data.meeting_roomIndex]._id,
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

    }
})