//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},

        companies: [],
        companyIndex: 0,

        departments: [],
        departmentIndex: 0,

        teams: [],
        teamIndex: 0,
        _userRegisterInfo: {}
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this;
        var companies = [];
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        // 获取公司名字
        wx.request({
            url: 'http://localhost:3000/api/v1/register/company',
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                if (res.data.length) {
                    that.setData({
                        companies: res.data
                    })
                }
                that.getDepartmentAndTeamByCompanyIndex(that.data.companyIndex);
            }
        })

    },
    bindCompanyChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            companyIndex: e.detail.value
        })
        this.getDepartmentAndTeamByCompanyIndex(this.data.companyIndex);
    },
    getDepartmentAndTeamByCompanyIndex: function (companyIndex) {
        var that = this;
        console.log(companyIndex);
        console.log(that.data);
        wx.request({
            url: 'http://localhost:3000/api/v1/register/department',
            method: 'GET',
            header: {
                'conetent-type': 'application/json'
            },
            data: {
                Company: that.data.companies[companyIndex],
            },
            success: function (res) {
                console.log(res);
            }
        })

        wx.request({
            url: 'http://localhost:3000/api/v1/register/team',
            method: 'GET',
            header: {
                'conetent-type': 'application/json'
            },
            data: {
                Company: that.data.companies[companyIndex],
            },
            success: function (res) {
                console.log(res);
            }
        })
    }
})