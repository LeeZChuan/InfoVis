[TOC]

# InfoVis

[![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen.svg?style=flat)	](https://gitee.com/chu_shen/bdvis-cluster/tree/master/docs)[![Release](https://img.shields.io/badge/realease-latest-brightgreen.svg)	](https://gitee.com/chu_shen/bdvis-cluster/releases)[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)	![React](https://img.shields.io/badge/React-x.x.x-blue.svg)

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

#### doc

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
### 环境准备 | Prerequisite

环境需求，如：vue版本，cli版本，node版本，npm版本等

软件使用需要满足的前置条件

#### 编辑器配置

- 开启nodejs自带核心模块提示
- 开启eslint提示，`Automatic Eslint Configuration`按项目配置(Webstorm)

### 安装 | Installation

软件的安装方法

### 设置 | Configuration

软件的设置

## 开发篇 | Advanced

提供中高级的开发教程

### 注意事项

- 项目默认采用了careate-react-app开发的react工程项目
- 开发时需自行修改`src/config/index.ts`文件内的后端网关前缀`apiPrefix`，此样板代码为`audit`的api前缀
- 若启用了`UAC登录逻辑`，会自动引入`dva`相关，用于存储全局状态，比如当前用户信息
- 若启用了`侧边栏和头部`，需在`src/config/menu.ts`文件中配置菜单，`iconfont`自行引入和配置即可显示侧边栏菜单icon

### 预设Hooks

- `useRequest`，大部分获取数据场景使用
- `usePageMenuInfo`，获取页面路由层级信息，基于此可实现`面包屑`或`路由重定向组件`等

## API | Reference

[API](./docs/API.md)

## 疑难解答 | FAQ

Q:

A:

## 附录 | Appendix

### 名词解释 | Glossary

名词解释

### 最佳实践 | Recipes

最佳实践

### 故障处理 | Troubleshooting

故障处理

### 版本说明 | ChangeLog

版本说明

### 反馈 | Feedback

**下方留言** OR **站内私信** OR **PR**

## 参与贡献 | Join Us

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 开源协议 | License

[![LICENSE](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](./LICENSE)	[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)