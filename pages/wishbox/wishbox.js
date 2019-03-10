// pages/wishbox/wishbox.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgSrc:app.globalData.bgImgSrc,
    num:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self=this;
    let arrWish = [{
      id: 1,
      wishImgSrc: "../../imgs/addWish.png",
      wishText: "快来添加专属于你们的心愿吧~"
    }]
      let a = app.globalData.wishArray[0];
      let b = arrWish[0];
      if (this.isObjectValueEqual(a,b))//对象（Date,Array）及普通对象通过指针指向的内存中的地址来做比较,this不能掉
      {
        app.globalData.wishArray.splice(0, 1);//执行删除操作后，a,b相等，删除全局变量的第一个，否则在arrWish.concat(app.globalData.wishArray)中,第一个会被重复连接
      }
      console.log(app.globalData.wishArray);
      let newWishArr = arrWish.concat(app.globalData.wishArray);
     console.log(newWishArr);
      self.setData({
        arrWish: newWishArr
      })
    // if (options.wishArr)
    // {
    //   let wishArr = JSON.parse(options.wishArr);
    //   let newWishArr = self.data.arrWish.concat(wishArr);
    //   console.log(newWishArr);
    //   self.setData({
    //     arrWish: newWishArr
    // })
    // }
  },
isObjectValueEqual:function(a,b)
{
  //Object.getOwnPropertyNames(obj),在给定对象上找到的属性对应的字符串数组
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];//获取单个属性名
    if (a[propName] !== b[propName]) {//判断属性名对应的属性值是否相等，如果b没有这个属性也返回false
      return false;
    }
  }
  return true;
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  addWishOrDel:function(e){
    let self=this;
    let curNum = e.target.dataset.num;
    if (curNum==0)
    {
      wx.redirectTo({
        url: "/pages/editwish/editwish",
      })
    }
    else
    {
      if(self.data.num==-1)
      {
        self.setData({
          num: e.target.dataset.num,
        }) 
      }
      else 
      {
        self.setData({
          num: -1
        }) 
      }
    }
    //console.log(e.target.dataset.num);
  },
  delWish: function (e) {
    let self = this;
    let index = e.target.dataset.num;
    console.log(self.data.arrWish);
    console.log("下标"+index);
    self.data.arrWish.splice(index, 1);//splice的返回值是包含已删除元素的数组
    console.log(self.data.arrWish);
    self.setData({
      arrWish: self.data.arrWish
    });
    app.globalData.wishArray = self.data.arrWish;//删除以后的数组要保存到全局变量
    self.setData({
      num: -1
    }) 
  },
  //轮播改变
  swiperChange:function(e){
    let self=this;
    console.log(e.detail.current);
    self.setData({
      num: -1
    }) 
  }
})