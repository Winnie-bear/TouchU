var app=getApp();
Page(
{
  data:{
    bgImgSrc: app.globalData.bgImgSrc,
  },
  onLoad:function(){

  },
  //页面每次显示，包括页面切换以后的显示
  onShow(){
    this.setData({
      maleName: app.globalData.maleName,
      femaleName: app.globalData.femaleName,
      maleAvatar: app.globalData.maleAvatarSrc,
      femaleAvatar: app.globalData.femaleAvatarSrc,
    })
  },
  // onReady:function(){
  //   this.setData({
  //     maleName: app.globalData.maleName,
  //     femaleName: app.globalData.femaleName,
  //     maleAvatar: app.globalData.maleAvatarSrc,
  //     femaleAvatar: app.globalData.femaleAvatarSrc,
  //   })
  // },
  navigateToModify:function(){
    wx.navigateTo({
      url: '/pages/modifyinfo/modifyinfo',
    })
  },
  navigateToCal:function(){
    wx.navigateTo({
      url: "/pages/calendar/calendar",
    })
  },
  redirectToFeed:function(){
    wx.redirectTo({
      url: "/pages/feedback/feedback",
    })
  },
  onUnload:function(){
    // var pages=getCurrentPages();
    // console.log(pages);
    // if (app.globalData.flag) {//如果flag为true，退出  
    //   wx.navigateBack({
    //     delta: 2
    //   })
    //   console.log("true");
    // } else {
    //   console.log('这里是our')
    // }  
  },
  exit:function(){
    wx.showModal({
      title: '提示',
      content: '小主真的要离开了么？',
      success: function (res) {
        if (res.confirm) {
          app.globalData.flag = true;
          console.log(app.globalData.flag);
          // wx.switchTab({
          //   url: '/pages/home/home',
          // })
          wx.redirectTo({
            url: '/pages/save/save',
          })
          wx.navigateBack({
            delta: -100
          })       
         console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
}
)