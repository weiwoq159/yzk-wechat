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
    pageIndex: {            // 属性名
      type: Number,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },
  methods: {
    switchTab(e) {
      console.log(e)
      wx.reLaunch({
        url: e.currentTarget.dataset.path,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
})