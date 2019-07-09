const app = getApp()
Component({
  data: {
    selected: 0,
    color: "#333",
    selectedColor: "#c40000",
    backgroundColor: "#f8f8f8",
    list: [{
      text: '人力资源',
      pagePath: '../../pages/ManpowerResource/ManpowerResource'
    }, {
      text: '社会保障',
      pagePath: '../../pages/Social/Social'
    }, {
      text: '财务税收',
      pagePath: '../../pages/Taxation/Taxation'
    }, {
      text: '公积金',
      pagePath: '../../pages/ReservedFunds/ReservedFunds'
    }, {
      text: '燚精选',
      pagePath: '../../pages/Choiceness/Choiceness'
    }]
  },
  properties: {
    pageIndex: { // 属性名
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0 // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    hierarchy: {
      type: Number,
      value: 0
    }
  },
  methods: {
    switchTab(e) {
      console.log(this)
      console.log(e)
      wx.reLaunch({
        url: e.currentTarget.dataset.path,
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
    }
  },
  ready: function () {
    let custom = this.selectComponent('#searchinput')
    if (this.data.hierarchy === 1) {
      custom.getAddress()
    } else if (this.data.hierarchy === 2) {
      let options = ''
      if (app.globalData.category === '1' || app.globalData.category === '2') {
        options = [{
          id: '1',
          name: '权威解读'
        }, {
          id: '2',
          name: '法律法规'
        }, {
          id: '3',
          name: '劳动关系案例'
        }, {
          id: '4',
          name: '服务之窗'
        }]
      } else if (app.globalData.category === '3') {
        options = [{
          id: '1',
          name: '办税服务'
        }, {
          id: '2',
          name: '办税指南'
        }, {
          id: '3',
          name: '财税学堂'
        }, {
          id: '4',
          name: '政策解读'
        }, {
          id: '5',
          name: '税收法规库'
        }]
      } else if (app.globalData.category === '4') {
        options = [{
          id: '1',
          name: '政策法规'
        }, {
          id: '2',
          name: '业务指南'
        }, {
          id: '3',
          name: '公积金学堂'
        }]
      }
      custom.setData({
        options
      })
    }
  }
})