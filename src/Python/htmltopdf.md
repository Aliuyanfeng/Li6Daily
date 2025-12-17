---
date: 2024-11-15 11:29:26
title: htmltopdf
permalink: /pages/34ddaa
top: true
categories:
  - Python
---
# Python使用wkhtmltopdf 进行PDF的生成

---

#### 概述


本文简要介绍了 Python环境下如何进行HTML-->PDF的转换，以及遇到的问题及解决方案



> 摘自官网![](https://wkhtmltopdf.org/images/banner.jpg)
>



官方网站：[点击跳转](https://wkhtmltopdf.org/)



Github：[点击跳转](https://github.com/wkhtmltopdf/wkhtmltopdf)



#### 1.  功能优势


此方案是后端异步方案，相较于前端对用户体验更好，节省前端资源，使用 wkhtmltopdf 的最终目的是依赖其自身功能将HTML模板转换为PDF，转化步骤大体分为三部分：



+ 后端查询出要展示的报告数据并写入前端可用的JavaScript文件中
+ 绘制报告样式模板及其数据引用
+ 后端通过工具将渲染好的HTML模板转化为PDF文件



#### 2.  转化过程遇到的问题


+  设置强制分页问题，该属性同样适用于需要强制分页的模块 
    - 例如echarts图表当前页展示不下，默认会分割，导致图表分布在两页，显示不完整

```css
div {
    page-break-inside: avoid !important;
}
```

+  表格分页时禁止表头与内容重叠 



```css
tr {
    page-break-before: always;
    page-break-after: always;
    page-break-inside: avoid;
}
```



+  charts图表不渲染 
    -  避免使用动画  增加属性 animation: false 
    -  wkhtmltopdf配置增加 javascript-delay：10000  （适当增加时间） 
+  导出PDF空白 
    - 避免使用ES6、CSS3等较新的语法和属性，例如对flex支持性为0
+  导出PDF，图表不清晰，二种解决方案 
    -  渲染图表的时候可以选择SVG渲染，更加轻量和清晰，但是支持性不够，故采用第二条方案 
    -  导出配置参数提高PDF分辨率（dpi）,例如： 

```python
 # 启动参数
wkhtmltopdf_options = {
    'enable-local-file-access': '--enable-local-file-access',
    'encoding': "utf-8",
    'javascript-delay': '10000',
    'header-left': '视频监控系统安全评估报告-[date] [time]',
    'header-font-size': 8,
    'header-spacing': 5,
    'footer-center': '第[page] / [topage]页',
    'footer-font-size': 8,
    'margin-top': 10,
    'dpi': 300
}
```



#### 4.  关于HTML模板


对于HTML模板的绘制，只要能确保最终渲染的页面能被工具识别到即可，这里分别列举了几种预设方案



+  原生html+JavaScript+css，可适当引入js文件，例如jquery等依赖库简化开发 
+  vue框架 
    -  vue2.x版本（这里实验了version@2.7.15），可以正常使用 
    -  vue3.x版本（这里实验了version@3.2.47），由于vue3对于响应式的原理实现有了变更，故导致转过化成并不顺利 
    -  所能配套使用的UI库试验了对应版本的element-ui和element-plus，由于UI库用了大量的较新语法，所以只支持较为简单的组件，且样式渲染度不完善，故不建议使用 
    -  预期通过babel-polyfill等垫片将其转化低阶语法可以使用上述2，3条 



最终确定方案：



1. 引入框架vue@2.7.15，简化JavaScript开发；
2. JavaScript开发和CSS样式使用低阶语法；
3. 表格采用原生table绘制
4. 图表采用echarts



#### 5. 附件


使用示例  
[https://github.com/Aliuyanfeng/wkhtmltopdf-example.git](https://github.com/Aliuyanfeng/wkhtmltopdf-example.git)

