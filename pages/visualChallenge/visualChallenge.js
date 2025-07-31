// visualChallenge.js
Page({
  data: {
    currentQuestion: null,
    showFeedback: false,
    feedbackIcon: '',
    feedbackText: '',
    isCorrect: false,
    animationClass: 'fade-in'
  },
  
  onLoad: function() {
    this.generateQuestion();
  },
  
  // 生成新问题
  generateQuestion: function() {
    // 随机生成1-9的两个数字
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const correctAnswer = num1 * num2;
    
    // 生成选项（包括正确答案）
    const options = this.generateOptions(correctAnswer);
    
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
    const userAnswer = e.currentTarget.dataset.answer;
    const isCorrect = userAnswer === this.data.currentQuestion.correctAnswer;
    
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
  }
})