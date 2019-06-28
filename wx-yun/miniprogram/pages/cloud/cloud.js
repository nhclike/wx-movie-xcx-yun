const db = wx.cloud.database()
// miniprogram/pages/cloud/cloud.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[]
  },
  insert:function(){
    db.collection('user').add(
      {
        data:{
          name: "nhc",
          age:18
        }
      }
    ).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  update:function(){
    db.collection('user').doc('2f54b0685d1581be02311d073a61eeaf').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        age:20
      },
      success: function (res) {
        console.log(res)
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
  check:function(){
    db.collection("user").where({
      name:"nhc"
    }).get().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  delete:function(){
    db.collection("user").doc("2f54b0685d1581be02311d073a61eeaf").remove().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  sum:function(){
    wx.cloud.callFunction({
      name:"sum",
      data:{
        a:2,
        b:3
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  getOpenId:function(){
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  batchDelete:function(){
    wx.cloud.callFunction({
      name:"batchDelete"
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  upload:function(){
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png',
          filePath: tempFilePaths[0], // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          db.collection('image').add({
            data:{
              fileID:res.fileID
            }
          })
        }).catch(error => {
          console.log(err)
          // handle error
        })
      }
    })
  },
  getFile:function(){
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      var openId=res.result.openId
      db.collection("image").where({
        _openId:openId
      }).get().then(res2=>{
        console.log(res2)
        this.setData({
          images:res2.data
        })
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  downloadFile:function(event){
    console.log(event)
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath)
      wx.saveImageToPhotosAlbum({
        filePath:res.tempFilePath,
        success(res) {
          wx.showToast({
            title: '保存到相册成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }).catch(error => {
      // handle error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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