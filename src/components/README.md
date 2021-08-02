# component组件用途

1.  dataValidity 数据有效性
2.  dataTimeliness 数据时效性
3.  dataIntegrity 数据完整性

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
├── static # Files in this directory will not be processed by WebPack: they will be copied directly to the final packaging directory (absolute path)
│   ├── data  # Contains the data used by the visualization page
│   │    |──  Forecast # Order forecast
│   │    |──  ForecastPointChart # Data source for order forecast results-scatterplot
│   │    |──  StartHeatMapChart # Heat map of distribution of starting orders
│   │    |──  EndHeatMapChart # Heat map of end order distribution
│   │    |──  CalendarChart # Order status calendar heat map
│   │    |──  TadpoleChart # Street situation flow tadpole map
│   │    |──  multiputeMap # Order forecast results
│   │    |──  MoveToChart # Order situation overall regional migration map
│   │    |──  ChordChart # Order situation Overall street chord diagram (used in the pop-up window)
│   │    |──  RateLineChart # Line chart of the overall order change rate (used in the popup display section)
│   │    |──  OrderNumLineChart # Line chart of the combination of the travel distance of the order and the travel distance of the order (used in the pop-up window display section)
│   │    |──  LineCharts # Line chart of order changes
│   │    |──  PreBarChart # Histogram of overall order forecast
│   │    |──  wordCloud # Word Cloud Map of Popular Places for Orders
│   │    |──  DailyBarChart # Order forecast view, overall forecast histogram
│   ├── img # The background image required by the page
│   ├── script # Code required for data processing
│   └── js # Library files required for drawing
│
│
│
└── README.md 
