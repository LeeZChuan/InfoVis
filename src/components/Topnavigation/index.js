//顶部导航栏目设计
import React from 'react';
import { Layout, Row, Col} from 'antd';
import { Select} from 'antd';
const { Header } = Layout;

const style = { background: '#0092ff', padding: '8px 0' };
const frontstyle = { background: '#fff', padding: '3px 0' };

const Topnav = () => {
    <Header style={style}>
        <Row justify="end">
            <Col span={3}>
                时间序列展示
            </Col>
            <Col span={12}>
                数据质量分析平台
            </Col>
            <Col span={9} justify="right">
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询机型"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询品牌"
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
            </Col>
        </Row>
    </Header>
}


export default Topnav;