var config = require('../../../../config.js')
var app = getApp();
Page({
  data: {
    topic: '',

    meeting_rooms: [],
    meeting_roomIndex: -1,

    date: '',
    dateStart: '',
    beginTimeStart: '',
    endTimeStart: '',

    contact: '',
  },
  onLoad: function () {
    console.log('reserve onLoad');
    var that = this;
    var date = new Date(); // 当前时间

    // 加载会议室
    wx.request({
      url: config.host + '/api/v1/reserve/meeting_room',
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

    that.setData({
      dateStart: date,
      beginTimeStart: date,
      endTimeStart: date,
    })

  },
  bindInputValue: function (e) {
    this.setData({
      topic: e.detail.value,
    })
  },
  bindMeetingRoomChange: function (e) {
    console.log('meeting_room发生change事件，携带value值为：', e.detail.value);
    this.setData({
      meeting_roomIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('date发生change事件，携带value值为：', e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  bindBeginTimeChange: function (e) {
    this.setData({
      beginTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindContact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  reserve: function () {
    var that = this;
    console.log('reserve');
    wx.request({
      url: config.host + '/api/v1/reserve',
      data: {
        OpenID: app.globalData.OpenID,
        Topic: that.data.topic,
        MeetingRoom: that.data.meeting_rooms[that.data.meeting_roomIndex]._id,
        Date: that.data.date,
        BeginTime: that.data.beginTime,
        EndTime: that.data.endTime,
        Contact: that.data.contact,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log(res);
        wx.showToast({
          title: '预定成功',
          icon: 'success',
          duration: 1000,
          complete: function () {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
});