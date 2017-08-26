//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},

        companies: [],
        companyIndex: -1,

        departments: [],
        departmentIndex: -1,

        teams: [],
        teamIndex: -1,
        _userRegisterInfo: {}
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this;
        // var companies = [];
        //调用应用实例的方法获取全局数据
        that.setData({
            userInfo: app.globalData.userInfo
        })

        // 获取公司
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
            }
        })
    },
    bindCompanyChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            companyIndex: e.detail.value,
            departmentIndex: -1, // 当公司选择变动时，将部门和团队的选择清空
            teamIndex: -1,
        })
        this.getDepartmentByCompanyIndex(this.data.companyIndex);
    },
    bindDepartmentChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            departmentIndex: e.detail.value,
            teamIndex: -1, // 当部门选择变动时，将团队的选择清空
        })
        this.getTeamByDepartmentIndex(this.data.departmentIndex);
    },
    bindTeamChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            teamIndex: e.detail.value
        })
    },
    getDepartmentByCompanyIndex: function (companyIndex) {
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
                CompanyID: that.data.companies[companyIndex]._id,
            },
            success: function (res) {
                console.log(res);
                if (res.data.length) {
                    that.setData({
                        departments: res.data
                    })
                }
            }
        })
    },
    getTeamByDepartmentIndex: function (departmentIndex) {
        var that = this;
        console.log(departmentIndex);
        console.log(that.data);
        wx.request({
            url: 'http://localhost:3000/api/v1/register/team',
            method: 'GET',
            header: {
                'conetent-type': 'application/json'
            },
            data: {
                DepartmentID: that.data.departments[departmentIndex]._id,
            },
            success: function (res) {
                console.log(res);
                if (res.data.length) {
                    that.setData({
                        teams: res.data
                    })
                }
            }
        })
    },
    register: function () {
        var that = this;

        console.log('register');

        // 用户同时选择 公司 部门 团队 才能注册
        if ((that.data.companyIndex) >= 0 && (that.data.departmentIndex) >= 0 && (that.data.teamIndex) >= 0) {
            wx.request({
                url: 'http://localhost:3000/api/v1/register',
                method: 'POST',
                header: {
                    'conetent-type': 'application/json'
                },
                data: {
                    CompanyID: that.data.companies[that.data.companyIndex]._id,
                    DepartmentID: that.data.departments[that.data.departmentIndex]._id,
                    TeamID: that.data.teams[that.data.teamIndex]._id,
                    OpenID: app.globalData.openid,
                    UserName: that.data.userInfo.nickName,
                },
                success: function (res) {
                    console.log(res);
                    wx.reLaunch({
                        url:'../../pages/temp/temp'
                    })
                }
            })
           
        } else {
            // 弹出提示 -> 让用户三个都进行选择
            wx.showModal({
                content: "请填写公司、部门和团队再进行注册",
                showCancel: false,
                confirmText: "确定",
            })
        }
    }
})