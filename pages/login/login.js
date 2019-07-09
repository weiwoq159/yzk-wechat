//index.js
//获取应用实例
const app = getApp();
import * as http from '../../http'
Page({
  data: {
      userId:"",
      fontShow:false,
      timeShow:true,
      show: true,
      timer: '',//定时器名字
      countDownNum: '60',//倒计时初始值
      FnAlert:true,
      loginName: '',//用户名
      loginImgCode: '',//图验证码
      loginPhoneCode:"",//手机号
      checkbox:true,
      getImgCodeResults:"",//图验证码返回值
      // loginPhoneCode:"",
      goLogin:"",
      height:"",
      keyResults:"",
  },

    //手机号
    loginName(e){
      this.setData({
          loginName:e.detail.value
      })
    },
    //图验证码
    loginImgCode(e){
        this.setData({
            loginImgCode:e.detail.value
        })
    },
    //手机验证码
    loginPhoneCode(e){
        this.setData({
            loginPhoneCode:e.detail.value
        })
    },
    //获取图形验证码
    getImgCode(){
        let param={};
        let that = this;
        http.postReq2("web/api/validate/get", param, function (res) {
            if (res.code == '1') {
                that.setData({
                    getImgCodeResults:'data:image/png;base64,'+ res.data.base64ValidateImg,
                    keyResults: res.data.validateKey
                })
            }
        })

    },

    //更新图形验证码
    editCaptcha () {
        this.getImgCode();
    },

    //清除手机号码
    LoginTelCancel:function(){
        this.loginForm.loginName="";
    },

    // 点击获取手机验证码
    getCode(){
        let reg=11 && /^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/;
        if (!this.data.loginName) {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 1500,
            })
            return;
        }
        if ((!reg.test(this.data.loginName))) {
            wx.showToast({
                title: '请输入正确手机号',
                icon: 'none',
                duration: 1500,
            })
            return;
        }
        if (!this.data.loginImgCode) {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 1500,
            })

            return;
        }
        else{
            let that = this;
            // 获取手机验证码
            let param={
                phone: this.data.loginName,
                validateKey:this.data.keyResults,
                validateCode:this.data.loginImgCode,
            };
            that.countDown();
            http.postReq2("web/api/login/verification", param, function (res) {
                if (res.code == '1') {
                    that.setData({
                        show:false,
                    });
                    wx.showToast({
                        title:res.msg,
                        icon: 'none',
                        duration: 1000,
                    })
                }else {
                    that.getImgCode();
                    wx.showToast({
                        title:res.msg,
                        icon: 'none',
                        duration: 1000,
                    })
                }
            })
        }
    },

    // 点击登录
    loginSubmit(e){
        console.log(" ---e=" + JSON.stringify(e));
      
        let reg=11 && /^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/;

        if (!this.data.loginName) {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 1000,
            })
            return;
        }
        if ((!reg.test(this.data.loginName))) {
            wx.showToast({
                title: '请输入正确手机号',
                icon: 'none',
                duration: 1000,
            })
            return;
        }
        if (!this.data.loginImgCode) {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 1000,
            })
            return;
        }
        if (!this.data.loginPhoneCode) {
            wx.showToast({
                title: '请输入手机验证码',
                icon: 'none',
                duration: 1000,
            })
            return;
        }
        if (!this.data.checkbox) {
            wx.showToast({
                title: '请选择同意协议',
                icon: 'none',
                duration: 1000,
            })
            return;
        }
        else {
          
          var nickName = e.detail.userInfo.nickName;
          var avatarUrl = e.detail.userInfo.avatarUrl;
          console.log("---nickName=" + nickName + "  =avatarUrl=" + avatarUrl);
            let that=this;
          wx.login({
            success: function (res) {
              console.log(" ---res.code=" + res.code);
              let param = {
                jscode: res.code,
                phone: that.data.loginName,//手机号
                validateKey: that.data.keyResults,//图形验证码
                validateCode: that.data.loginImgCode,//图形验证码
                code: that.data.loginPhoneCode,//手机验证码
                fromUid:app.globalData.fromUid,
                type: 5
              };
              console.log("--param=" + JSON.stringify(param));
              http.postReq2("web/api/mp/login", param, function (res) {
                console.log("--res=" + JSON.stringify(res));
                if (res.code == 1) {
                  that.setData({
                    userId: res.data.id,
                    token: res.data.token,
                  })
                  // wx.setStorageSync('XMDADMINTOKEN',res.data.token)
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('userId', res.data.id)
                  wx.reLaunch({
                    url: '../index/index'
                  })
                }
                else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000,
                  })
                }
              })
            }
          });
            

            
        }
    },

    //弹窗
    ShowAgreement(){
        this.setData({
            FnAlert:false,
        })
    },

    //弹窗取消
    cancelBtn(){
        this.setData({
            FnAlert:true,
        })
    },

    //弹窗同意
    sureBtn(){
      this.setData({
          FnAlert:true,
          checkbox:true
      })
        console.log(this.data.checkbox)
    },

    //倒计时
    countDown () {
        let that = this;
        let countDownNum = that.data.countDownNum;//获取倒计时初始值
        that.setData({
            timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
                countDownNum--;
                that.setData({
                    countDownNum: countDownNum
                })
                if (countDownNum == 0) {
                  clearInterval(that.data.timer);
                    that.setData({
                        show:true,
                        timer:null,
                        countDownNum:60
                    })
                }
            }, 1000)
        })
    },

    //复选框
    checkboxChange(e){
        if (e.detail.value =='') {
          this.setData({
              checkbox:false
          })
        }
        else {
            this.setData({
                checkbox:true
            })
        }
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      if (options.scene) {
        app.globalData.fromUid = options.scene
      }
      this.getImgCode();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
