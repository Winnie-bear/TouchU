// pages/loveletter/loveletter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgSrc: app.globalData.bgImgSrc,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  redirectToWrite:function(){
    wx.redirectTo({
      url: '/pages/write/write',
    })
  },
  navigateToLoveBox:function(){
    wx.navigateTo({
      url: '/pages/lovebox/lovebox',
    })
  }
})