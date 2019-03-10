// pages/edit/edit.js
var app=getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCameraHide:true,
    inputData:"",
    arrImgs:"",
    imageSrc:"",
    editContent:"",
    locationText:"甜蜜之地"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ctx = wx.createCameraContext();
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
  getInputValue: function (e) {
    let self=this;
    self.setData({
      editContent: e.detail.value
    })
    console.log(self.data.editContent);
  },
  switchToTime:function()
  {
    wx.switchTab({
      url: '/pages/time/time',
    })
  },
  switchToTimeWithData:function(){
    let self=this;
    wx.switchTab({
      url: '/pages/time/time',
    })
    let date = new Date();//创建日期对象
    let curMonth = date.getMonth() + 1;//当前的月份
    let curDay = date.getDate();//当前几号
    let timeDataItem = {
      time: curMonth + '.' + curDay,
      content:self.data.editContent
    }
    app.globalData.timeData.push(timeDataItem);
    console.log(app.globalData.timeData);
  },
  uploadImgs:function(){
    let self = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        self.setData({
          arrImgs: res.tempFilePaths,
        })
        //console.log(self.data.arrImgs);
      }
    })
  },
  showCamera:function(){
    let self = this;
    self.setData({
      isCameraHide: false,
    })
  },
  showCameraModal:function(){
    let self=this;
    self.setData({
      isCameraHide:false,
    })
    wx.showModal({
      title: '提示',
      content: '亲，目前相机拍照可拍照多次，但只能保存最后一次拍摄的图片哦，给您带来的不便，敬请谅解，点击拍摄好的图片可重新拍摄哦，快捕捉你眼中最美的景吧~',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  takePhoto() {
    let self=this;
    self.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        self.setData({
          imageSrc: res.tempImagePath,
          isCameraHide:true,
        })
        console.log(res.tempImagePath);
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  getLocation:function(){
    let self = this
    // 实例化腾讯地图API核心类
    let qqmapsdk = new QQMapWX({
      key: 'C3DBZ-ENCCG-LJYQW-IRLGL-6AD4T-PTBNM' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            let address = addressRes.result.formatted_addresses.recommend;
            self.setData({
              locationText: address
            })
              console.log(address);
          }
        })
      }
    })
  }
})