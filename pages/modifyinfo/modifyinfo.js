// pages/modifyinfo/modifyinfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady(){
    this.setData({
      userSrc: app.globalData.femaleAvatarSrc,
      userName: app.globalData.femaleName,
    })
  },
  modifyImg: function () {
    let self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        self.setData({
          userSrc: res.tempFilePaths[0],
        })
        app.globalData.femaleAvatarSrc = res.tempFilePaths[0]
      }
    })
  },
  modifyName: function () {
    let self = this;
    if (self.data.isHide == true) {
      self.setData({
        isHide: false
      })
    }
    else {
      self.setData({
        isHide: true
      })
    }

  },
  getValue: function (e) {
    let self = this;
    console.log(e.detail.value);
    if (e.detail.value) {
      self.setData({
        userName: e.detail.value,
        isHide: true,
      })
    }
    else {//用户输入为空时，默认继续使用原来的用户名
      self.setData({
        userName: app.globalData.femaleName,
        isHide: true,
      })
    }
    app.globalData.femaleName = self.data.userName;
  },
  hideInput: function () {
    let self = this;
    self.setData({
      isHide: true
    })
  },
  showInput: function () {
    let self = this;
    self.setData({
      isHide: false
    })
  }
})