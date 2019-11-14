import Okr from './../../models/okr.js';
import Objective from './../../models/objective.js';
Page({
  data: {
    objectives: []
  },
  onShow: function () {
    Okr.index({}).then((res)=>{
      this.setData({ objectives: res.objectives })
    })
    console.log(this.data.objectives)
  },
  hadnButton:function(event){
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList:['查看','编辑','已完成','删除'],
      itemColor: '#ff6700',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        if(tapIndex == 0){
          // wx.navigateTo({url:'/pages/todo_keyresult/todo_keyresult?id=' + id })
        }else if(tapIndex == 1){
          
        }else if(tapIndex == 2){
          
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })


  },
})
