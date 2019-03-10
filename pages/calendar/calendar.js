// pages/calendar/calendar.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    bgImgSrc: app.globalData.bgImgSrc,
    days_style: [],
    arrFir: ["不忘初心", "柔情似水", "微笑向暖", "望顶繁花", "时光不染", "一人一心", "静守时光"],
    arrSec: ["方得始终", "佳期如梦", "安之若素", "如水似流", "回忆不淡", "白首不离", "以待流年"],
    fingerDays: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let curDay = new Date().getDate();
    let weekDay = new Date().getDay();
    let days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (i == curDay) {
        days_style.push({
          month: 'current', day: i, color: 'white', background: '#FEAEB9'
        });
      } else {
        days_style.push({
          month: 'current', day: i, color: '#FEAEB9'
        });
      }
    }
    this.setData({
      days_style: days_style,
      sentenceFir: this.data.arrFir[weekDay],
      sentenceSec: this.data.arrSec[weekDay],
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      togetherDays: app.globalData.loginDays,
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  dayClick: function (e) {
    console.log(e);
  }
})