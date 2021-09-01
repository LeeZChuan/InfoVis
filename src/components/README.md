# component组件用途

## 组件方向
1.  dataValidity 数据有效性--真实数据对接
2.  dataTimeSeries 数据时效性--真实数据对接
3.  dataIntegrity 数据完整性
4.  dataTemporal_Effect数据时序性
5.  online 实时在线率--真实数据对接
6.  Map地图方向可视化-暂时没有进行数据对接
7.  Table 表格数据展示与下载
8.  Topnavigation 顶部导航栏

## 组件代码层级结构
```
master
│
├── 
│ 
├── 
│ 
├── 
│ 
├── dataValidity 数据有效性
│   ├── index 数据有效性南丁格尔图
│   ├── linechart 数据有效性时序折线图
│   └── router # Page Vue routing management for web page links
│
│ 
├── dataIntegrity 数据完整性
│   ├── index 数据有效性南丁格尔图
│   ├── linechart 数据有效性时序折线图
│   └── router # Page Vue routing management for web page links
│
│ 
├── dataTimeliness 数据时效性
│   ├── index 数据时效性排行条形柱状图
│   ├── linechart 组合图
│   └── router # Page Vue routing management for web page links
│
│
│
│
└── README.md 
```