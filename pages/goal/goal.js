// pages/goal/goal.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgSrc:app.globalData.bgImgSrc,
    isWeekTap: true,
    isMonthTap: false,
    isLastWeekHide:false,
    isLastMonthHide:true,
    isWeekPickerHide:false,
    isMonthPickerHide:true,
    weekTime:["每周一","每周二","每周三","每周四","每周五"],
    monthTime:[],
    weekIndex:0,
    monthIndex:0,
    goal:0,
    month:12,
    weekAmount:0,
    lastWeekAmount:0,
    monthAmount: 0,
    lastMonthAmount: 0,
    achieveYear:0,
    achieveMonth:0,
    achieveDay:0,
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    let arrMonthTime = this.data.monthTime;
    for (let i = 1; i <= 28; i++) {
      arrMonthTime.push("每月"+i+"号");
    }
    this.setData({
      monthTime: arrMonthTime,
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

    let date = new Date();//创建日期对象
    let curMonth = date.getMonth();//当前的月份
    let curDay = date.getDate();//当前几号
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let fullYear = date.getFullYear();
    if ((fullYear % 4 == 0 && fullYear % 100 != 0) || fullYear % 400 == 0)//判断闰年
    {
      days[1] = 29;
    }
    date.setMonth(curMonth + this.data.month);
    let newDay = date.getDate();
    if (curDay == days[curMonth]) {
      if (newDay != curDay) {
        date.setDate(-1);
      }
      //  else
      //  {
      //    d.setDate(1);
      //    d.setMonth(d.getMonth() + 1);
      //    d.setDate(0); 
      //  }
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.setData({
      achieveYear: year,
      achieveMonth: month,
      achieveDay: day,
    })
  },
  //每周几选择器
  bindWeekChange:function(e){
    this.setData({
      weekIndex: e.detail.value
    })
  },
  //每月几号选择器
  bindMonthChange:function(e){
    this.setData({
      monthIndex:e.detail.value
    })
  },
  //获取默认12个月完成时间，每周或每月应转入的金额
  getMoreInfo:function(e){
    var self=this;
    //目标金额
    self.setData({
      goal:e.detail.value
    })
    //每周或者每月应转入金额
    let userGoal = self.data.goal;
    let iMonth = self.data.month;//保存month对象
    let iWeek = Math.round((iMonth * 30.5) / 7);//周数
    //console.log(iWeek);
    let flWeekAmount = Math.ceil(userGoal / iWeek * 100) / 100;//每周应转入的金额
    let flLastWeekAmount = Math.round((userGoal - flWeekAmount * (iWeek - 1)) * 100) / 100;//最后一周应转入的金额
    let flMonthAmount = Math.ceil(userGoal / iMonth*100)/100;//每月应转入的金额
    let flLastMonthAmount = Math.round((userGoal - flMonthAmount * (iMonth - 1))*100)/100;
    self.setData({
      weekAmount: flWeekAmount,
      lastWeekAmount: flLastWeekAmount,
      monthAmount: flMonthAmount,
      lastMonthAmount: flLastMonthAmount,
    });
  },
  getLessMonth:function(e){
    var self=this;
    console.log(e);
    self.setData({
      month:e.detail.lessMonth
    })
   // console.log(self.data.month)
  },
  getMoreMonth: function (e) {
    var self = this;
    console.log(e);
    self.setData({
      month: e.detail.moreMonth
    })
   // console.log(self.data.month)
  },
  //计算转入钱
  calcTransfer:function(){
    let self=this;
    let userGoal = self.data.goal;
    let iMonth = self.data.month;//保存month对象
    let iWeek = Math.round((iMonth * 30.5) / 7);//周数
    console.log(iWeek);
    let flWeekAmount = Math.ceil(userGoal / iWeek * 100) / 100;//每周应转入的金额
    let flLastWeekAmount = Math.round((userGoal - flWeekAmount * (iWeek - 1)) * 100) / 100;//最后一周应转入的金额
    let flMonthAmount = Math.ceil(userGoal / iMonth * 100) / 100;//每月应转入的金额
    let flLastMonthAmount = Math.round((userGoal - flMonthAmount * (iMonth - 1)) * 100) / 100;
    self.setData({
      weekAmount: flWeekAmount,
      lastWeekAmount: flLastWeekAmount,
      monthAmount: flMonthAmount,
      lastMonthAmount: flLastMonthAmount,
    });
  },
  //获取完成时间
  getAchieveTime:function(){
   let self=this; 
   let date=new Date();//创建日期对象
   let curMonth=date.getMonth();//当前的月份
   let curDay=date.getDate();//当前几号
   let days=[31,28,31,30,31,30,31,31,30,31,30,31];
   let fullYear=date.getFullYear();
   if((fullYear%4==0&&fullYear%100!=0)||fullYear%400==0)//判断闰年
   {
     days[1]=29;
   }
   date.setMonth(curMonth+self.data.month);
   let newDay=date.getDate();
   if (curDay == days[curMonth])
   {
     if(newDay!=curDay){
       date.setDate(-1);
     }
    //  else
    //  {
    //    d.setDate(1);
    //    d.setMonth(d.getMonth() + 1);
    //    d.setDate(0); 
    //  }
   }
   let year=date.getFullYear();
   let month=date.getMonth()+1;
   let day=date.getDate();
   self.setData({
     achieveYear: year,
     achieveMonth: month,
     achieveDay: day,
   })
  },
  showLastWeekAmount:function(){
    let self=this;
    self.setData({
      isWeekTap: true,
      isMonthTap: false,
      isLastWeekHide: false,
      isLastMonthHide: true,
      isWeekPickerHide: false,
      isMonthPickerHide: true,
    })
  },
  showLastMonthAmount:function(){
    let self = this;
    self.setData({
      isWeekTap: false,
      isMonthTap: true,
      isLastWeekHide: true,
      isLastMonthHide: false,
      isWeekPickerHide: true,
      isMonthPickerHide: false,
    })
  },
  backToSave:function(){
    wx.redirectTo({
      url: '/pages/save/save',
    })
  },
  navigateToSave:function(){
    let self=this;
    let goal=self.data.goal;
    let weeksave=self.data.weekAmount;
    let monthsave=self.data.monthAmount;
    let year=self.data.achieveYear;
    let month=self.data.achieveMonth;
    let day=self.data.achieveDay;
    let isWeekTap=self.data.isWeekTap;
    let isMonthTap=self.data.isMonthTap;
    if (isWeekTap==true&&isMonthTap==false)
    {
      wx.redirectTo({
        url: '/pages/save/save?goal=' + goal + '&weeksave=' + weeksave +  '&year=' + year + '&month=' + month + '&day=' + day + '',
      })
    } else
    {
      wx.redirectTo({
        url: '/pages/save/save?goal=' + goal + '&monthsave=' + monthsave + '&year=' + year + '&month=' + month + '&day=' + day + '',
      })
    }

  }
})