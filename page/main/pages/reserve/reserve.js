var app = getApp();
var util = require('../../../../utils/util.js');
Page({
  data: {
    showTopTips: false,

    radioItems: [{
        name: 'cell standard',
        value: '0'
      },
      {
        name: 'cell standard',
        value: '1',
        checked: true
      }
    ],
    checkboxItems: [{
        name: 'standard is dealt for u.',
        value: '0',
        checked: true
      },
      {
        name: 'standard is dealicient for u.',
        value: '1'
      }
    ],

    date: null,
    dateStart: null,
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    meeting_rooms: [],
    meeting_roomIndex: -1,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
  },
  onLoad: function () {
    console.log('reserve onLoad');
    var that = this;

    // 加载会议室
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

    that.setData({
      dateStart: new Date(),
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
  openToast: function () {
    wx.showToast({
      title: '已完成',
      icon: 'success',
      duration: 3000
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});