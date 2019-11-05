import Todo from './../../models/todo.js';

Page({
  data: {
    todos: [],
    value:'',
  },
  onShow: function() {
    Todo.index({status: 0}).then(res => {
      this.setData({todos: res.todos})
      
    })
  },
 
  handInput:function(event){
    console.log(event)
    let content = event.detail.value;
    console.log(content)
    let start_at = new Date();
    Todo.insert({content,start_at}).then(res=>{
      console.log(res)
    })
  },
  hadnButton:function(event){
    // console.log(event)
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList:['关联','完成','删除'],
      itemColor: '#ff6700',
      success:(res)=>{
        // console.log(res)
        let index = res.tapIndex;
        // console.log(index)
        if(index == 0){
          wx.navigateTo({url:'/pages/todo_keyresult/todo_keyresult?id=' + id })
        }else if(index == 1){
          Todo.update(id,{state:1}).then(res=>{
            console.log(res)
          })
        }else if(index == 2){
          // console.log(789)
           wx.showModal({
            title:'删除',
            content:'是否删除这个todo',
            showCancel: true,
            success:(res)=>{
              // console.log(res)
              if(res.confirm == true){
                // console.log(56465)
                Todo.delete(id).then(res=>{
                  console.log(res)
                  
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
