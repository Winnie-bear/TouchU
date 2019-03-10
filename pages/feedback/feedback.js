// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  switchToOur:function(){
    wx.switchTab({
      url: '/pages/our/our',
    })
  },
  successToOur:function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 10000,
      success:function(){
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/our/our',
          },10000)
        })   
      }
    })
  }
})