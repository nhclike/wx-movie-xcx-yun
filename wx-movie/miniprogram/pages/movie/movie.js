// miniprogram/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList();
  },
  getMovieList:function(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "movielist",
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      console.log(res)
      this.setData({
        page:this.data.page++
      })
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      })
      wx.hideLoading()
      console.log(this.data.movieList)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  toComment:function(event){
    wx.navigateTo({
      url: `./../comment/comment?movie=${event.target.dataset.movieid}`,
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
    this.getMovieList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMovieList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})