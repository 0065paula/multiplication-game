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
      url: '../freeExploration/freeExploration',
      fail: function(res) {
        console.error('跳转失败:', res);
        // 尝试使用另一种跳转方式
        wx.redirectTo({
          url: '../freeExploration/freeExploration',
          fail: function(err) {
            console.error('重定向失败:', err);
          }
        });
      }
    });
  },
  
  // 跳转到视觉理解模式
  startVisualChallenge: function() {
    wx.navigateTo({
      url: '../visualChallenge/visualChallenge',
      fail: function(res) {
        console.error('跳转失败:', res);
        // 尝试使用另一种跳转方式
        wx.redirectTo({
          url: '../visualChallenge/visualChallenge',
          fail: function(err) {
            console.error('重定向失败:', err);
          }
        });
      }
    });
  },
  
  // 跳转到专项练习模式
  showPracticeSelection: function() {
    wx.navigateTo({
      url: '../practiceChallenge/practiceChallenge',
      fail: function(res) {
        console.error('跳转失败:', res);
        // 尝试使用另一种跳转方式
        wx.redirectTo({
          url: '../practiceChallenge/practiceChallenge',
          fail: function(err) {
            console.error('重定向失败:', err);
            // 最后尝试使用switchTab
            wx.switchTab({
              url: '../practiceChallenge/practiceChallenge',
              fail: function(error) {
                console.error('切换标签失败:', error);
              }
            });
          }
        });
      }
    });
  }
})