var app = getApp();
Page(
  {
    data:{
      x: 0,
      y: 0,
      scale:1,
      bgImgSrc: app.globalData.bgImgSrc,
      isHide:true,
    },
    onLoad:function(){
      let self=this;
      //查看用户是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {//已授权就不显示授权按钮
            self.setData({
              authorizedLogin: false
            })
            wx.showModal({
              title: 'TouchU',
              content: '热烈欢迎小主回来~',
              success: function (res) {
                if (res.confirm) {
                   wx.getUserInfo({
                     success: function (res) {
                       console.log(res.userInfo);
                       app.globalData.femaleName = res.userInfo.nickName;
                       app.globalData.femaleAvatarSrc = res.userInfo.avatarUrl;
                     }
                   })
                } else if (res.cancel) {
                  app.globalData.femaleName = res.userInfo.nickName;
                  app.globalData.femaleAvatarSrc = res.userInfo.avatarUrl;
                }
              }
            })//end modal
          }
          else
          {
            //未授权就要显示授权按钮
            console.log("true");
            //模拟微信授权登录
            wx.showModal({
              title: '授权登录',
              content: '请问小主是否微信授权登录？',
              success: function (res) {
                if (res.confirm) {//确定以后显示授权按钮
                  self.setData({
                    authorizedLogin: true
                  })
                } else if (res.cancel) {
                  self.setData({
                    authorizedLogin: false
                  });
                  app.globalData.femaleName = "李宇冬";
                  app.globalData.femaleAvatarSrc = "../../imgs/femaleavatar.png";
                }
              }
            })
          } 
       }  
    });
  },
    onReady:function(){
      let self = this;
      self.setData({
        loginDay: app.globalData.loginDays,
      });
      setInterval(function () {
        self.setData({
          scale: 1
        })
      }, 500);
      setInterval(function () {
        self.setData({
          scale: 0.7
        })
      }, 1000);
    },
    onShow:function(){
    },
    showMoreBtns:function(e){
      let self=this;
      if(self.data.isHide==true)
      {
        self.setData({
          isHide: false
        })
      }
      else{
        self.setData({
          isHide: true
        })
      }
    },
    hideMoreBtns:function(){
      let self=this;
      self.setData({
        isHide:true
      })
    },
    navigateToWishBox:function(){
      wx.navigateTo({
        url: '/pages/wishbox/wishbox',
      })
    },
    changeWallPaper: function () {
      let self = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          app.globalData.bgImgSrc = res.tempFilePaths[0];
          self.setData({
            bgImgSrc: app.globalData.bgImgSrc,
          })
        }
      })
    },
    navigateToFinger:function(){
      wx.navigateTo({
        url: '/pages/finger/finger',
      })
    },
    navigateToSave:function(){
      wx.navigateTo({
        url: '/pages/save/save',
      })
    },
    navigateTLoveLetter:function(){
      wx.navigateTo({
        url: '/pages/loveletter/loveletter',
      })
    },
    navigateToCalendar:function(){
      wx.navigateTo({
        url: '/pages/calendar/calendar',
      })
    },
    bindGetUserInfo: function (e) {//点击授权按钮以后按钮消失并获取头像和昵称
      let self=this;
      self.setData({
        authorizedLogin: false
      })
      app.globalData.femaleName = e.detail.userInfo.nickName;
      app.globalData.femaleAvatarSrc = e.detail.userInfo.avatarUrl;
      // console.log(app.globalData.femaleName);
      // console.log(app.globalData.femaleAvatarSrc);
    }
  }
)
