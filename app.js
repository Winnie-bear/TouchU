//app.js
App({
  onLaunch: function () {
    let self=this;
  //获取用户信息
    wx.login({
      success: function (res) {
          //发起网络请求
        console.log(res);
        if (res.code) {  
          wx.request({
            url: 'http://120.79.247.123/get_json/',
            data: {
              code: res.code
            },
            method: 'POST',
            header: { 'content-type': 'application/json' },
            success: function (res) {
              console.log(res.data);
              wx.setStorage({
                key: 'session_3rd',
                data: res.data.session_3rd,
              });
              // wx.setStorage({
              //   key: 'key',
              //   data: res.data.key,
              // });
              console.log("数据为"+self.globalData.session_3rd);
              wx.request({
                url: 'http://120.79.247.123/get_userinfo/',
                data: {
                  session_3rd: self.globalData.session_3rd,
                },
                method: 'POST',
                header: { 'content-type': 'application/json' },
                success: function (res) {
                  console.log(res.data);
                  wx.setStorage({
                    key: 'loginTime',
                    data: res.data,
                  });
                }
              });
              
            }
          })//end request
        }
      },
      fail: function () {

        console.log("启用wx.login函数，失败！");

      },
      complete: function () {

        console.log("已启用wx.login函数");

      }
    });
    wx.getStorage({
      key: 'session_3rd',
      success: function (res) {
        self.globalData.session_3rd = res.data;
      },
    });
    //获取用户登录时间
    wx.getStorage({
      key: 'loginTime',
      success: function (res) {
        self.globalData.loginTime = res.data.nowtime;
        self.globalData.loginDays = self.calcDateDiff(self.globalData.loginTime);
       // console.log(self.globalData.loginDays);
      },
    })
  },
  //计算登录时间
  calcDateDiff: function (date1) {
    let day = 24 * 60 * 60 * 1000;//将一天的时间换算成毫秒
    try {
      let dateArr = date1.split('-');//将字符串转化为数组
      let loginDate = new Date();
      let loginDateMsec = loginDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
      let curDate = new Date();
      let curDateMsec = curDate.getTime();
      let loginDays = Math.round((curDateMsec - loginDateMsec) / day + 1);
      return loginDays;
    } catch (e) {
      return false;
    }
  },
  globalData: {
    wishId:2,
    bgImgSrc: "../../imgs/background.jpg",
    maleAvatarSrc: "../../imgs/defaultavatar.png",
    femaleAvatarSrc: "",
    maleName:"",
    femaleName:"",
    timeData:[],
    wishArray: [],
    arrSend:[],
    arrLoveDetailImgs:[],
    session_3rd:"",
  },
})