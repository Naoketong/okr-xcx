import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';

Page({
  data: {
    objective: '',
    keyresults: [{
      content:'',
    }],
  },
  onLoad: function (opt) {
    let id = opt.id;
    console.log(id)
    Okr.show(id).then(res => {
      console.log(res)
      let objective = res.objective;
      let keyresults = res.keyresults;
      this.setData({ objective,keyresults, id })
    })
  },
  itemAdd:function(){
    let keyresults = this.data.keyresults;
    keyresults.push({content:'',})
    this.setData({ keyresults })
  },
  itemWipe: function(e){
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    let id = e.currentTarget.dataset.id;
    Keyresult.delete(id).then((res)=>{
      keyresults.splice(index,1)
      this.setData({ keyresults })
    })

    if(keyresults.length > 1){
      keyresults.splice(index,1)
    }else{
      wx.showToast({
        title:'不能没有成果选项',
        icon: 'none',
        mask: true,
        duration: 1000
      })
      return
    }
    this.setData({ keyresults })
  },

  titleInput:function(e){
    let value = e.detail.value;
    this.setData({ objective: value })
    // console.log(title)
  },
  contentInput:function(e){
    let content = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    keyresults[index].content = content
    this.setData({ keyresults})
  },
  handleSubmit:function(){
    let title = this.data.objective;
    let content = this.data.keyresults;
    if(!title || !content.length){
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 1000
      })
      return
    }

    let id = this.data.id;
    let data = { title: title}
    data.content = content;
    console.log(data)
     Okr.update(id, data).then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      setTimeout(()=>{
        wx.switchTab({ url: '/pages/okr/okr' })
      },1000)
    })
  },

  
})
