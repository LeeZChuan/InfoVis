[TOC]

# InfoVis

[![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen.svg?style=flat)	]()[![Release](https://img.shields.io/badge/realease-latest-brightgreen.svg)	]()[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)	![React](https://img.shields.io/badge/React-17.x.x-blue.svg)

## 简介 | Introduction

infovis模块

提供对产品和文档本身的总体的、扼要的说明

基于antd、echarts、d3的可视化单页面数据监控平台

## 快速上手 | Getting Started

### Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn start
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
- 本项目初始使用js编写，后期使用ts重构代码


## API | Reference

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
│   ├── utils # Tools that may be needed for the page
│   ├── pages # File saved by page jump
│   ├── serive 
│   ├── hooks
│   └── 
│
├── static # Files in this directory will not be processed by WebPack: they will be copied directly to the final packaging directory (absolute path)
│   ├── data  # Contains the data used by the visualization page
│   │    |──  Forecast # Order forecast
│   │    |──  ForecastPointChart # Data source for order forecast results-scatterplot
│   │    |──  StartHeatMapChart # Heat map of distribution of starting orders
│   ├── img # The background image required by the page
│   ├── script # Code required for data processing
│   └── js # Library files required for drawing
│
│
│
└── README.md 
