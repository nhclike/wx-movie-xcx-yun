// pages/comment/comment.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    comment:'',
    rate:5,
    imageUrls:[],
    fileIds:[],
    movieId:-1
  },
  submit:function(){
    wx.showLoading({
      title: '提交中',
    })
    console.log(this.data.comment+this.data.rate);
    let promiseAll=[];
    //图片循环上传到云存储
    for (var i = 0; i < this.data.imageUrls.length; i++) {
      promiseAll.push(new Promise((reslove, reject) => {
        let item=this.data.imageUrls[i];

        let suffix=/\.\w+$/.exec(item)[0]
        console.log("suffix"+suffix);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
            filePath: item, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          this.setData({
            fileIds:this.data.fileIds.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log(error)
          // handle error
        })
      }))
    }
    Promise.all(promiseAll).then(res=>{
      db.collection("comment").add({
        data:{
          context:this.data.comment,
          rate:this.data.rate,
          movieId:this.data.movieId,
          fileIds: this.data.fileIds
        }
      }).then(res=>{
        console.log(res)
        wx.showModal({
          title: '系统提示',
          content: '评价成功',
        })
        wx.hideLoading()
      }).catch(err=>{
        console.log(err)
        wx.hideLoading()
      })
    })
  },
  uploadImage:function(){
    let _this=this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          imageUrls:_this.data.imageUrls.concat(tempFilePaths)
        })
      }
    })
  },
  onCommentChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      comment:event.detail
    })
  },
  onRateChange(event){
    this.setData({
      rate:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.movieId=options.movie;
    wx.cloud.callFunction({
      name:'getDetail',
      data:{
        movieid:options.movie
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        movie:JSON.parse(res.result)
      })
    }).catch(err=>{
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})