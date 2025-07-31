// index.js
Page({
  data: {
    // 页面的初始数据
  },
  
  onLoad: function() {
    // 页面加载时执行的逻辑
  },
  
  // 跳转到自由探索模式
  startFreeExploration: function() {
    wx.navigateTo({
      url: '/pages/freeExploration/freeExploration'
    });
  },
  
  // 跳转到视觉理解模式
  startVisualChallenge: function() {
    wx.navigateTo({
      url: '/pages/visualChallenge/visualChallenge'
    });
  },
  
  // 跳转到专项练习模式
  showPracticeSelection: function() {
    wx.navigateTo({
      url: '/pages/practiceChallenge/practiceChallenge'
    });
  }
})