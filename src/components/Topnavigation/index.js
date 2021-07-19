//顶部导航栏目设计
import React from 'react';
import Clock from '../TimeShow/index'
import { Layout, Row, Col } from 'antd';
import { Select } from 'antd';
const { Header } = Layout;

const style = { background: '#0092ff', padding: '0px 0px', heigh: '500px' };
const title = { background: '#0092ff', height: '60px', width: '100%', position: 'fixd' };
const titlestyle = { margin: '0px  0px 50px 50px' }
// const titlestyle1 = { height: '50px', width: '100%', left:'850px', position: 'fixed', color: '#fff', }
const titlestyle1 = { margin: '0px 0px 600px 600px', color: '#fff', font: 300 }
// const titlestyle2 = { height: '50px', width: '100%', left:'1500px', position: 'fixed', }
const titlestyle2 = { margin: '0px 0px 450px 450px' }


const Topnav = () => {
    <Header style={style}>
        <Row>
            <div style={titlestyle}>
                <Clock />
            </div>
            <h1 style={titlestyle1}>
                数据质量分析平台
            </h1>
            <div style={titlestyle2}>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询品牌"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询机型"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询终端"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询时间"
                >
                </Select>
            </div>
        </Row>
    </Header>
}


export default Topnav;