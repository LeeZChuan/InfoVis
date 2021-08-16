//时间滚动组件模块


import React, { Component } from 'react'
import moment from 'moment';
import './index.less'

const style={color: 'aliceblue',}
export default class TimeShow extends Component {
    state = { date: moment().format('YYYY-MM-DD HH:mm:ss')  };
    //组件已经在渲染到DOM后运行
    componentDidMount() {
        this.thimerID = setInterval(
            //数据更新后并不会停止，而是继续更新直到清除计时器
            () => this.tick(),
            1000
        );
    }
    //生命周期方法中清除计时器
    componentWillUnmount() {
        clearInterval(this.thimerID);
    }

    tick() {
        this.setState({ date: moment().format('YYYY-MM-DD HH:mm:ss') });
    }
    render() {
        return (
            <div style={style}>
                当前时间：{this.state.date}
            </div>
        )
    }
}
