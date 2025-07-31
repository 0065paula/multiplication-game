// freeExploration.js
Page({
  data: {
    appleMatrix: [],
    formulaText: '点击或滑动探索乘法表格'
  },
  
  onLoad: function() {
    // 初始化苹果矩阵
    this.initAppleMatrix();
  },
  
  // 初始化10x10的苹果矩阵
  initAppleMatrix: function() {
    let matrix = [];
    for (let row = 0; row < 10; row++) {
      let rowData = [];
      for (let col = 0; col < 10; col++) {
        rowData.push({
          highlighted: false
        });
      }
      matrix.push(rowData);
    }
    
    this.setData({
      appleMatrix: matrix
    });
  },
  
  // 处理单元格点击
  handleCellTap: function(e) {
    const row = e.currentTarget.dataset.row;
    const col = e.currentTarget.dataset.col;
    this.highlightCells(row, col);
  },
  
  // 处理单元格滑动
  handleCellMove: function(e) {
    // 获取触摸点在页面中的位置
    const touch = e.touches[0];
    // 获取所有苹果单元格
    const query = wx.createSelectorQuery();
    query.selectAll('.apple-cell').boundingClientRect();
    query.exec(res => {
      if (!res || !res[0]) return;
      
      const cells = res[0];
      // 找到触摸点所在的单元格
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (
          touch.clientX >= cell.left && 
          touch.clientX <= cell.right && 
          touch.clientY >= cell.top && 
          touch.clientY <= cell.bottom
        ) {
          // 计算行列
          const row = Math.floor(i / 10);
          const col = i % 10;
          this.highlightCells(row, col);
          break;
        }
      }
    });
  },
  
  // 高亮单元格
  highlightCells: function(row, col) {
    let matrix = this.data.appleMatrix;
    
    // 重置所有单元格
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        matrix[r][c].highlighted = (r <= row && c <= col);
      }
    }
    
    // 更新公式显示
    const num1 = row + 1;
    const num2 = col + 1;
    const result = num1 * num2;
    
    this.setData({
      appleMatrix: matrix,
      formulaText: `${num1} × ${num2} = ${result}`
    });
  }
})