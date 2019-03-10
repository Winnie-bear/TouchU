var app=getApp();
Page({
  data: {
    dailyEvents:app.globalData.timeData,
    arrEMonth : ["January", "February", " March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    arrCNMonth: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]
  },
  onLoad:function(options)
  {
    let self = this;
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth();
    self.setData({
      bgImgSrc: app.globalData.bgImgSrc,
      year: year,
      EMonth: self.data.arrEMonth[month],
      CNMonth:self.data.arrCNMonth[month],
      maleAvatar: app.globalData.maleAvatarSrc,
      femaleAvatar: app.globalData.femaleAvatarSrc,
    });

  },
  redirectToEdit:function(){;
    wx.redirectTo({
      url: "/pages/edit/edit",
    })
  },
  showDetail:function(){
    wx.navigateTo({
      url: '/pages/timedetail/timedetail',
    })
  }
})
