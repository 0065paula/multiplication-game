// app.js
App({
  onLaunch(options) {
    console.log('小程序启动', options);
    
    // 获取系统信息
    try {
      const systemInfo = wx.getSystemInfoSync();
      console.log('系统信息:', systemInfo);
      this.globalData.systemInfo = systemInfo;
    } catch (e) {
      console.error('获取系统信息失败:', e);
    }
    
    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          console.log('有新版本可用');
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
          
          updateManager.onUpdateFailed(function () {
            console.log('新版本下载失败');
          });
        }
      });
    }
    
    // 初始化页面路由
    this.initPageRoutes();
  },
  
  onShow(options) {
    console.log('小程序显示', options);
  },
  
  onHide() {
    console.log('小程序隐藏');
  },
  
  onError(error) {
    console.error('小程序错误:', error);
    // 尝试恢复
    this.handleError(error);
  },
  
  onPageNotFound(res) {
    console.error('页面不存在:', res);
    // 如果是专项练习页面不存在，则跳转到首页
    if (res.path.indexOf('practiceChallenge') !== -1) {
      wx.redirectTo({
        url: 'pages/index/index'
      });
    } else {
      wx.redirectTo({
        url: 'pages/index/index'
      });
    }
  },
  
  // 初始化页面路由
  initPageRoutes() {
    // 预加载页面
    const pages = [
      'pages/index/index',
      'pages/practiceChallenge/practiceChallenge',
      'pages/freeExploration/freeExploration',
      'pages/visualChallenge/visualChallenge'
    ];
    
    console.log('初始化页面路由:', pages);
  },
  
  // 处理错误
  handleError(error) {
    console.log('尝试恢复错误:', error);
    // 可以在这里添加错误恢复逻辑
  },
  
  globalData: {
    systemInfo: null,
    // 其他全局数据
    version: '1.0.0'
  }
})
