var app=getApp();
Page({
  data:{
    bgImgSrc: app.globalData.bgImgSrc,
    isHide:true,
    arrowSrc:'../../imgs/downward.png',
    push:[]
  },
  onLoad:function(options){
    // this.getMoviesData('https://douban.uieee.com/v2/movie/top250');
  },
  getMoviesData: function (url) {
    let self=this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/xml' },
      success: function (res) {
        let arrImgs = [];
        let recommendText = [];
        for (let i = 0; i < res.data.subjects.length;i++)
        {
          let textItem = "《" + res.data.subjects[i].title + "》" + res.data.subjects[i].genres[0] + res.data.subjects[i].genres[1] + "\n" + "豆瓣评分：" + res.data.subjects[i].rating.average + "时长：" + res.data.subjects[i].durations[0]+ "\n"+"上映时间：" + res.data.subjects[i].pubdates[0]  ;
          recommendText.push(textItem);
          for (let j = 0; j < res.data.subjects[i].casts.length;j++)
          {
            arrImgs.push(res.data.subjects[i].casts[j].avatars["medium"]);
          }
        }
        function sliceArray(array, childSize) {
          let result = [];
          for (let i = 0; i < Math.ceil(array.length / childSize); i++) {
            let start = i * childSize;
            let end = start + childSize;
            result.push(array.slice(start, end));
          }
          return result;
        }
        let newArr=sliceArray(arrImgs, 3);
        for (let i = 0; i < res.data.count;i++)
        {
          let pushItem = {
            imgArray: "",
            text: ""
          };
          self.data.push.push(pushItem);
        }
        console.log(self.data.push);
        for (let i = 0; i < newArr.length; i++) {
          let index = "push[" + i + "].imgArray";
          self.setData({
            [index]: newArr[i]             //用[]表示的变量
          });
        }
        for (let i = 0; i < recommendText.length; i++) {
          let index = "push[" + i + "].text";
          self.setData({
            [index]: recommendText[i]             //用[]表示的变量
          });
        }
        console.log(self.data.push);
      },
      fail: function () {
        console.log('fail')
      },
    })
  },
  showHideCategories:function(){
    var self=this;//保存Page对象
    if(self.data.isHide==true){
      self.setData({
        isHide: false,
        arrowSrc: '../../imgs/upward.png'
      })
    } else if (self.data.isHide == false)
    {
      self.setData({
        isHide: true,
        arrowSrc: '../../imgs/downward.png'
      })
    }
  },
  getBooksData: function (url) {
    let self = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: { 'content-type': 'application/xml' },
      success: function (res) {
        let imageSrc = [res.data.image];
        let content = "《" + res.data.title + "》\n" + "作者：" + res.data.author[0] + "\n" + "简介：" + res.data.summary;
        let pushItem = {
          imgArray: imageSrc,
          text: content
        };
        self.data.push.push(pushItem);
        self.setData({
          push:self.data.push
        })
        wx.hideLoading();
      },
      fail: function () {
        console.log('fail')
      },
    })
  },
  onReachBottom: function () {
    var self = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    self.getBooksData("https://douban.uieee.com/v2/book/17604305");
  }
})