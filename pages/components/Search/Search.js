// pages/components/Search/Search.js
const app = getApp()
Component({
  /**
   * 页面的初始数据
   */
  data: {
    options: [{
      id: '1',
      name: '人力资源'
    }, {
      id: '2',
      name: '社保公积金'
    }, {
      id: '3',
      name: '财务税收'
    }],
    name: '请选择',
    category: '',
    labelDis: false,
    searchKey:''
  },
  methods: {
    changeLab: function () {
      this.setData({
        labelDis: !this.data.labelDis
      })
    },
    searchword: function (e) {
      this.setData({
        searchKey:e.detail.value
      })
    },
    getAddress: function () {
      app.getAddress(res => {
        this.setData({
          options:res.data
        })
      })
    },
    changeChose: function (e) {
      this.setData({
        category: e.currentTarget.dataset.item.id,
        index: e.currentTarget.dataset.item.id - 1,
        name: e.currentTarget.dataset.item.name,
        labelDis: false
      })
    },
    SearchInput: function (e) {
      
      let $this = this
      let kind  = app.globalData.searchKind
      let global = app.globalData
      console.log(this.data)
      //1 首页搜索
      // 2 二级菜单搜索
      // 3 燚精选搜索
      if (kind === 2) {
        global.searchParams = {
          category: global.category,
          areaId:this.data.category,
          keyword: this.data.searchKey,
          pageNum: 1,
          pageSize: 5,
        }
      } else if (kind === 3){
        global.searchParams = {
          essence: 1,
          category: this.data.category,
          keyword: this.data.searchKey,
          pageNum: 1,
          pageSize: 5,
        }
        console.log(global.searchParams)
      } else if (kind === 4) {
        app.requested(app.globalData.searchParams, res => {
          this.setData({
            meta: res.data.meta,
            newsList: res.data.data
          })
        })
      } else if (kind === 5) {
        global.searchParams = {
          category: this.data.category,
          classify: this.data.name,
          keyword: this.data.searchKey,
          pageNum: 1,
          pageSize: 5
        }
      }
      wx.navigateTo({
        url: '../../pages/SearchResult/SearchResult'
      })
      console.log(global)
    },
  },
  ready:function () {
  }
})