import Okr from './../../models/okr.js';

Page({
  data: {
    objective: '',
    keyresults: [{
      content:'',
    }],
  },
  onLoad: function () {
  },
  itemAdd:function(){
    let keyresults = this.data.keyresults;
    keyresults.push({content:'',})
    this.setData({ keyresults })
  },
  itemWipe: function(e){
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
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
    let title = e.detail.value;
    this.setData({ objective: title })
    
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
    console.log(title,content)
    if(!title || !content.length){
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 1000
      })
      return
    }
    let data = {title,content};
    Okr.insert(data).then((res)=>{
      console.log(res)
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
