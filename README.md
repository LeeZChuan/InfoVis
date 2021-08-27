# 📈InfoVis:数据传输过程信息可视化平台

[![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen.svg?style=flat)	]()
[![Release](https://img.shields.io/badge/realease-latest-brightgreen.svg)	]()
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)	
![React](https://img.shields.io/badge/React-17.x.x-blue.svg)

## 简介 | Introduction

infovis：数据传输过程信息可视化平台模块

提供对产品和文档本身的总体的、扼要的说明

基于react、antd、echarts、d3的可视化单页面数据监控下载平台

## 快速上手 | Getting Started

### Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn start 项目本地启动
```

### Compiles and minifies for production

```
yarn build 打包代码
```


## 入门篇 | Basics

### 目录说明

#### 文档 | doc

本次项目的图表解释与所需数据类型解释

#### assets
> 静态资源的存放
#### components
> 通用组件的存放
#### config
> 模块的引入与配置的存放
#### hooks
> 部分通用hooks的存放
#### layouts
> 布局文件的存放
#### pages
> 项目页面的划分，只存放页面的入口
#### service
> 接口调用的封装
#### utils
> 工具函数


### 注意事项

- 项目默认采用了careate-react-app开发的react工程项目
- 本项目初始使用js编写，后期计划使用ts与scss重构代码
- 计划使用[jest](https://github.com/facebook/jest)进行单元测试
- 格式化方面采用[ESlint](https://github.com/eslint/eslint)+prettier


## API | Reference

- 该项目使用了以下常用插件
- 1.css-react-seamless-scroll，用于滚动展示滑动栏目
- 2.react-router-dom，用于单页面模块跳转
- 3.antd，ui与排版设计

[API](./docs/API.md)


## 项目结构

INFOVIS-master
│
├── build  
│ 
├── config 
│ 
├── node_modules
│ 
├── src：# Here is the main directory we developed, which contains several directories and files:
│   ├── style  # Contains css page situation
│   ├── components # The various modules of the page are distributed, and their respective introductions are introduced in the README.md
│   │    |──  dataIntegrity # 数据准确性模块
│   │    |──  dataTemporal_Effect # 数据时效性模块
│   │    |──  dataTimeSeries # 数据连续性模块
│   │    |──  dataValidity # 数据有效性模块
│   │    |──  Table # 数据表格展示与下载
│   │    |──  TimeShow # 左上角时间滚动模块
│   │    |──  Topnavigation # 页面头顶整体导航栏目
│   │    |──  TypingCard # 动态滚动文字模块
│   ├── utils # Tools that may be needed for the page
│   ├── pages # File saved by page jump
│   ├── serive 
│   ├── hooks
│   └── 
│
├── static # Files in this directory will not be processed by WebPack: they will be copied directly to the final packaging directory (absolute path)
│   ├── data  # Contains the data used by the visualization page
│   ├── img # The background image required by the page
│   ├── script # Code required for data processing
│   └── js # Library files required for drawing
│
│
│
└── README.md 
