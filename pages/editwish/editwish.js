// pages/editwish/editwish.js
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
   wishContent:"",
   imgSrc:"",
   i:app.globalData.wishId
  },
  onLoad:function(){
    this.setData({
      i: app.globalData.wishId
    })
    //console.log(this.data.i)
  },
  onUnload:function(){
  },
  getInputValue:function(e){
    let self = this;
    self.setData({
      wishContent: e.detail.value
    })
    //console.log(self.data.wishContent);
  },
  uploadImgs: function () {
    let self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        self.setData({
          imgSrc: res.tempFilePaths[0],
        })
        //console.log(self.data.arrImgs);
      }
    })
  },
  redirectToWishBox:function()
  {
    //要保存没添加新心愿之前的数据，要不然心愿盒页面没有数据渲染，因为渲染的数据不是全局变量
   // let wishArr = JSON.stringify(app.globalData.wishArray);
    wx.redirectTo({
      url: '/pages/wishbox/wishbox',
    })
  },
  redirectToWishBoxWithData:function(){
    let self=this;
    let newArrWish = app.globalData.wishArray.reverse();
    let arrWishItem = {
      id:self.data.i,
      wishImgSrc: self.data.imgSrc,
      wishText: self.data.wishContent
    }
    newArrWish.push(arrWishItem);
    app.globalData.wishArray=newArrWish.reverse();
    //app.globalData.wishArray = newArrWish;
    //let wishArr = JSON.stringify(app.globalData.wishArray);
    wx.redirectTo({
      url: '/pages/wishbox/wishbox',
    })    
    let j = app.globalData.wishId + 1;
    app.globalData.wishId = j;
    //console.log(this.data.i);
    //console.log(app.globalData.wishId);
  }
})