// pages/components/go/go.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    abc: ''
  },
  properties: {
    category: {
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },
  methods: {
    goSpecialist: function(){
      console.log(this)
      wx.navigateTo({
        url: '../askExperts/askExperts?category=' + this.data.category
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
})