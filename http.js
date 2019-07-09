let basePath = 'https://zk.1boyun.com/book/';
let header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'x-authentication-token': wx.getStorageSync('token'),
}

// let token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMDU1MTAyMTM5MzMwNTYwIiwic3QiOiIyIiwibG4iOiI3NSIsInBoIjoiMTM3MTc2NzI3MjUiLCJybiI6IumXriIsImV4cCI6MTU1MjAxMDYwM30.llORy0R2W1M-EHIbKDUfqW2er5a1rzHl4hiCLA2W3KQ";
function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })

  wx.request({
    url: basePath + url,
    method: 'get',
    header: {
    'Accept': 'application/json',
    'content-type': 'application/json',
    'x-authentication-token': wx.getStorageSync('token'),
  },
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  let token = wx.getStorageSync('token');
 //console.log("---token==" + token),
    wx.request({
    url: basePath + url,
    header: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      'x-authentication-token': token,
    },
      data: data,
      method: 'post',
      success: function (res) {
          wx.hideLoading();
          return typeof cb == "function" && cb(res.data)
          // if(token==""){
          //     wx.navigateTo({
          //         url: '/pages/home/login/login'
          //     })
          // }
          // else {
          //     wx.hideLoading();
          //     return typeof cb == "function" && cb(res.data)
          // }
         if (res.statusCode == 401) {
          wx.setStorageSync('token','');
          wx.setStorageSync('phone','')
          wx.navigateTo({
            url: '/pages/home/login/login'
          })
        }else{
          wx.hideLoading();
          return typeof cb == "function" && cb(res.data)
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}

//不带加载
function postReq2(url, data, cb) {
  let token = wx.getStorageSync('token');
 //console.log("---token==" + token),
    wx.request({
      url: basePath + url,
      header: {
        'Accept': 'application/json',
        'content-type': 'application/json',
        'x-authentication-token': token,
      },
      data: data,
      method: 'post',
      success: function (res) {
          if (res.statusCode == 401) {
              wx.setStorageSync('token','');
              wx.setStorageSync('phone','')
              wx.navigateTo({
                  url: '/pages/home/login/login'
              })
          }else{
              wx.hideLoading();
              return typeof cb == "function" && cb(res.data)
          }
      },
      fail: function () {
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}

module.exports = {
  getReq: getReq,
  postReq: postReq,
  postReq2: postReq2,
  header: header,
}
