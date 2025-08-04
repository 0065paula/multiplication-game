# 乘法精灵大挑战

## 项目说明
这是一个微信小程序项目，帮助儿童学习乘法表。

## 问题排查记录

### 2023-08-04 路由错误修复
- 问题：真机调试时无法渲染内容，出现路由错误 `routeDone with a webviewId 19 is not found`
- 解决方案：
  1. 统一项目配置：确保`project.config.json`和`project.private.config.json`中的项目名称和基础库版本一致
  2. 移除组件按需注入配置：从`project.config.json`和`app.json`中移除`lazyCodeLoading`配置
  3. 为所有页面添加`.json`配置文件
  4. 在`app.json`中添加`debug: true`以启用调试模式