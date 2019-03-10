var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSetGoalShow:true,
    isGoalContentShow:false,
    bgImgSrc: app.globalData.bgImgSrc,
    goalAmount:0,
    saveAmount:0,
    achieveYear:0,
    achieveMonth:0,
    achieveDay:0,
    imgSrc:"../../imgs/savedefault.png",
    encourageText:"心愿太多？快来立个小目标，一起实现你们的心愿~"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self=this;
    let goal = self.data.goalAmount ;
    if(options.monthsave==undefined)
    {
      self.setData({
        goalAmount: options.goal,
        saveAmount: options.weeksave,
        achieveYear: options.year,
        achieveMonth: options.month,
        achieveDay: options.day
      })
    }
    else
    {
      self.setData({
        goalAmount: options.goal,
        saveAmount: options.monthsave,
        achieveYear: options.year,
        achieveMonth: options.month,
        achieveDay: options.day
      })
    }
    console.log(self.data.goalAmount);
    if (self.data.goalAmount!=undefined){
      self.setData({
        isSetGoalShow: false,
        isGoalContentShow: true,
      })
    }   
  },
  onShow:function()
  {
    let self=this;
    self.setting();
  },
  //设置基金下面图片和句子的显示
 setting:function(){
   let self = this;
   let goal = self.data.goalAmount 
   if (goal > 0 & goal <= 200) {
     self.setData({
       imgSrc: "../../imgs/200.png",
       encourageText: "你快有0.02万了，那就买瓶水吧，浇灌我们的爱情~"
     })
   }
   else if (goal > 200 & goal <= 400)
   {
     self.setData({
       imgSrc: "../../imgs/400.png",
       encourageText: "你快有0.04万了，那就买束花吧，浪漫我们的爱情~"
     })
   }
   else if(goal>400 & goal<=600)
   {
     self.setData({
       imgSrc: "../../imgs/600.png",
       encourageText: "你快有0.06万了，那就买套情侣装吧，见证我们的爱情~"
     })
   }
   else if(goal>600&goal<=800)
   {
     self.setData({
       imgSrc: "../../imgs/800.png",
       encourageText: "你快有0.08万了，那就去郊游吧，放飞我们的爱情~"
     })
   }
   else if(goal>800){
     self.setData({
       imgSrc: "../../imgs/1000.png",
       encourageText: "如果你有足够的钱，买套房吧，收藏我们的爱情~"
     })
   }
  },
  // backToHome:function(){
  // wx.switchTab({
  //   url: '/pages/home/home',
  // })
  // },
  navigateToGoal:function(){
    wx.navigateTo({
      url: '/pages/goal/goal',
    })
  }
})