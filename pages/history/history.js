import Todo from './../../models/todo.js';
import { formatTime } from './../../utils/util.js';
Page({
  data: {
    todos:[],
  },
  onShow: function() {
    Todo.index({state: 1}).then(res => {
      this.setData({todos: res.todos})
    })
  },
  handButton:function(event){
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList:['标记未未完成','删除'],
      itemColor: '#ff6700',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        if(tapIndex == 0){
          Todo.update(id,{state:0,}).then(res=>{
            let todos = this.data.todos;
            console.log(this.data)
            todos.splice(index,1)
            this.setData({ todos })
          })
        }else if(tapIndex == 1){
          console.log(1)
          wx.showModal({
            title:'删除',
            content:'是否删除这个todo',
            showCancel: true,
            success:(res)=>{
              if(res.confirm == true){
                console.log(index)
                Todo.delete(id).then(res=>{
                  let todos = this.data.todos;
                  todos.splice(index,1)
                  this.setData({ todos })
                }) 
              }
            }
          })
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  // handSplice:function(id,index){
  //   console.log(id,index)
  // },
})
