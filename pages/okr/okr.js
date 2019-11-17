import Okr from './../../models/okr.js';
import Objective from './../../models/objective.js';
Page({
  data: {
    objectives: []
  },
  onShow: function () {
    Okr.index({}).then((res)=>{
      console.log(res.objectives)
      this.setData({ objectives: res.objectives })
    })

  },
  hadnButton:function(event){
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let status = event.currentTarget.dataset.state;
    let state = status  ? 0 : 1;
    let isAccomplish = status ? '未完成' : '已完成';
    wx.showActionSheet({
      itemList:['查看','编辑',isAccomplish,'删除'],
      itemColor: '#ff6700',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
            wx.navigateTo({url:'/pages/okr_detail/okr_detail?id=' + id })
          break;
          case 1:
            wx.navigateTo({url:'/pages/okr_edit/okr_edit?id=' + id })
          break;
          case 2:
            this.handleChangeObjective(id,index,state)
          break;
          case 3:
             wx.showModal({
              title: '删除',
              content: '是否确定要删除该 OKR',
              success:(res)=> {
                if (res.confirm) {
                  this.handleDeleteObjective(id,index)
                }
              }
            })
          break;

        }
        
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  handleChangeObjective: function(id,index,state) {
    console.log(id,'id')
    console.log(index,'index')
    console.log(state,'state')
    Objective.update(id, { state }).then(res => {
      let objectives = this.data.objectives;
      objectives[index].state = state;
      this.setData({ objectives })
    })
  },
  handleDeleteObjective: function(id,index) {
    Objective.delete(id).then( res => {
      let objectives = this.data.objectives;
      objectives.splice(index,1)
      this.setData({ objectives })
    })
  },
})
