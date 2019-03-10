// components/achieveTime/achieveTime.js
Component({
  options:{
    multipleSlots:true //在组件定义时的选项中启用多slot支持
  },
  //组件的属性列表
  properties:{
    // month:{
    //    type:Number,
    //    value:12
    // }
  },
  data:{
     month:12
  },
  methods:{
    _reduce:function(){
      this.data.month--;
      this.setData({
        month:this.data.month,
      })
      var lessMonth=this.data.month;
      var EventDetail = {lessMonth} // detail对象，提供给事件监听函数
      var EventOption = {} // 触发事件的选项
      this.triggerEvent('lessMonth', EventDetail, EventOption);//触发lessMonth事件
      this.triggerEvent('achieveTime', EventDetail, EventOption);//触发预计完成时间事件
      this.triggerEvent('transfer', EventDetail, EventOption);//触发转账事件
    },
    _add:function(){
      var self=this;
      self.data.month++;
      self.setData({
       month:self.data.month
      });
      var moreMonth = this.data.month;
      var EventDetail = { moreMonth } // detail对象，提供给事件监听函数
      var EventOption = {} // 触发事件的选项
      this.triggerEvent('moreMonth', EventDetail, EventOption);//触发moreMonth事件
      this.triggerEvent('achieveTime', EventDetail, EventOption);//触发预计完成时间事件
      this.triggerEvent('transfer', EventDetail, EventOption);//触发转账事件
    }
  }

})