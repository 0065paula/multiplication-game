// practiceChallenge.js
Page({
  data: {
    selectedNumber: null,
    currentQuestion: null,
    showFeedback: false,
    feedbackIcon: '',
    feedbackText: '',
    isCorrect: false,
    animationClass: 'fade-in'
  },
  
  onLoad: function(options) {
    console.log('页面加载成功', options);
    // 初始化页面数据
    this.setData({
      selectedNumber: null,
      currentQuestion: null,
      showFeedback: false
    });
  },
  
  onReady: function() {
    console.log('页面初次渲染完成');
  },
  
  onShow: function() {
    console.log('页面显示');
  },
  
  onHide: function() {
    console.log('页面隐藏');
  },
  
  onUnload: function() {
    console.log('页面卸载');
  },
  
  onPullDownRefresh: function() {
    console.log('用户下拉刷新');
    wx.stopPullDownRefresh();
  },
  
  onShareAppMessage: function() {
    return {
      title: '乘法精灵大挑战 - 专项练习',
      path: '/pages/practiceChallenge/practiceChallenge'
    };
  },
  
  onPageScroll: function(obj) {
    // console.log('页面滚动', obj);
  },
  
  onError: function(err) {
    console.error('页面错误', err);
  },
  
  // 选择要练习的数字
  selectNumber: function(e) {
    const number = parseInt(e.currentTarget.dataset.number);
    console.log('选择数字:', number);
    this.setData({
      selectedNumber: number
    });
    this.generateQuestion();
  },
  
  // 生成新问题
  generateQuestion: function() {
    if (!this.data.selectedNumber) return;
    
    // 固定第一个数字为选择的数字，第二个数字随机1-9
    const num1 = this.data.selectedNumber;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const correctAnswer = num1 * num2;
    
    // 生成选项（包括正确答案）
    const options = this.generateOptions(correctAnswer);
    
    console.log('生成问题:', num1, 'x', num2, '=', correctAnswer);
    
    this.setData({
      currentQuestion: {
        num1: num1,
        num2: num2,
        correctAnswer: correctAnswer,
        options: options
      },
      showFeedback: false,
      animationClass: 'fade-in'
    });
  },
  
  // 生成选项
  generateOptions: function(correctAnswer) {
    const options = new Set([correctAnswer]);
    
    // 生成3个不同的错误选项
    while (options.size < 4) {
      const range = Math.max(10, correctAnswer * 0.5);
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * range) - Math.floor(range / 2);
      
      if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
        options.add(wrongAnswer);
      }
    }
    
    // 转换为数组并随机排序
    return Array.from(options).sort(() => Math.random() - 0.5);
  },
  
  // 检查答案
  checkAnswer: function(e) {
    const userAnswer = parseInt(e.currentTarget.dataset.answer);
    const isCorrect = userAnswer === this.data.currentQuestion.correctAnswer;
    
    console.log('用户答案:', userAnswer, '正确答案:', this.data.currentQuestion.correctAnswer, '是否正确:', isCorrect);
    
    let feedbackIcon, feedbackText, animationClass;
    
    if (isCorrect) {
      feedbackIcon = '🎉';
      feedbackText = '太棒了，回答正确！';
      animationClass = 'celebrate';
    } else {
      feedbackIcon = '😥';
      const q = this.data.currentQuestion;
      feedbackText = `再想想哦~\n正确答案是: ${q.num1} × ${q.num2} = ${q.correctAnswer}`;
      animationClass = 'shake';
    }
    
    this.setData({
      showFeedback: true,
      feedbackIcon: feedbackIcon,
      feedbackText: feedbackText,
      isCorrect: isCorrect,
      animationClass: animationClass
    });
  },
  
  // 下一题
  nextQuestion: function() {
    this.generateQuestion();
  },
  
  // 返回数字选择
  backToSelection: function() {
    this.setData({
      selectedNumber: null,
      currentQuestion: null
    });
  }
})