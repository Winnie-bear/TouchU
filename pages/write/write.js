// pages/write/write.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEditHide:true,
    isVideoHide:true,
    bgColor:"rgb(255,255,255)",
    fontSize:"",
    fontColor:"",
    arrImgs:[],
    arrBgColors:[],
    arrFontColors:[],
    videoSrc:'',
    bottomWrapper:"hide-edit-bottom-wrapper"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arrBgColors = [];
    var arrFontColors=[];
    for(let i=0;i<20;i++)
    {
      var r=Math.floor(Math.random()*256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      arrBgColors.push("rgb("+r+','+g+','+b+")");
      arrFontColors.push('#' + Math.floor(Math.random() * 0xffffff).toString(16));

    }
    console.log(arrBgColors);
    console.log(arrFontColors);
    this.setData({
      arrBgColors:arrBgColors,
      arrFontColors:arrFontColors
    })
  },

  //上传图片
  uploadImgs:function(){
    let self=this;
    wx.chooseImage({
      count:9,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
      self.setData({
        arrImgs:res.tempFilePaths,
      })
      app.globalData.arrLoveDetailImgs = self.data.arrImgs;
      console.log(app.globalData.arrLoveDetailImgs);
      }
    })
  },
  //上传视频
  uploadVideo:function(){
    var self = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        if(self.data.isVideoHide==true){
          self.setData({
            isVideoHide: false,
            videoSrc: res.tempFilePath
          })
        }
        else
        {
          wx.showModal({
            title: '温馨提示',
            content: '视频文件最多只能添加一个哦~',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  //录音
  record:function(){
    const recorderManager = wx.getRecorderManager()
    //console.log("llllll");
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    recorderManager.start(options);
  },
  //编辑
  edit:function(){
    let self=this;
    if(self.data.isEditHide==true)
    {
      self.setData({
        isEditHide: false,
        bottomWrapper: "bottom-wrapper"
      })
    }
    else{
      self.setData({
        isEditHide: true,
        bottomWrapper: "hide-edit-bottom-wrapper"
      })
    }

  },
  //上传音乐
  uploadMusic:function(e){
    var oname = this.data.keyboard[e.target.dataset.index].id;
    // var onames = "/music/" + oname + ".mp3";
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    // innerAudioContext.src = onames;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  changeFontSize: function (e) {
    let self = this;
    self.setData({
      fontSize: e.target.dataset.size,
    })
    console.log(self.data.fontSize);
    console.log(e.target.dataset.size);
  },
  changeBgColor:function(e){
    let self=this;
    self.setData({
      bgColor: e.target.dataset.rgb,
    })
    console.log(self.data.bgColor);
    console.log(e.target.dataset.rgb);
  },
  changeFontColor:function(e){
    let self=this;
    self.setData({
      fontColor: e.target.dataset.color,
    })
    console.log(self.data.fontColor);
    console.log(e.target.dataset.color);
  },
  //获取情书输入的内容并存入全局变量
  getValue:function(e){
   let self=this;
   self.setData({
     sendItem : e.detail.value
   })
  },
  redirectToLoveLetter:function(){
    wx.redirectTo({
      url: '/pages/loveletter/loveletter',
    })
  },
  redirectToLoveBox:function(){
    let self=this;
    wx.redirectTo({
      url: '/pages/lovebox/lovebox',
    })
    app.globalData.arrSend.push(self.data.sendItem);
  }
})