import Todo from './../../models/todo.js';
import { formatTime } from './../../utils/util.js';
Page({
  data: {
    todos: [],
  },
  onShow: function() {
    Todo.index({state: 0}).then(res => {
      this.setData({todos: res.todos})
    })
  },
  handInput:function(event){
    let content = event.detail.value;
    let start_at = formatTime(new Date());
    Todo.insert({content,start_at}).then(res=>{
      let id = res.id;
      let todos = this.data.todos;
      todos.push({id, content,start_at});
      this.setData({todos})
    })
  },
  hadnButton:function(event){
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList:['关联','完成','删除'],
      itemColor: '#ff6700',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        if(tapIndex == 0){
          wx.navigateTo({url:'/pages/todo_keyresult/todo_keyresult?id=' + id })
        }else if(tapIndex == 1){
          let end_at = formatTime(new Date())
          console.log(end_at)
          Todo.update(id,{state:1,end_at:end_at}).then(res=>{
            let todos = this.data.todos;
            todos.splice(index,1)
            this.setData({ todos })
          })
        }else if(tapIndex == 2){
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

  
})
