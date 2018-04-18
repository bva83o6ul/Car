import React from 'react';
import {connect} from "dva";
import classnames from "classnames";
// andt组件的引入
import { Tabs , Row , Col , Slider ,Checkbox , DatePicker ,Menu , Dropdown , Button , Icon , message , Tag } from 'antd';
// 车辆品牌和车系列的数据
import carBrandAndSeries from "./util/carBrandAndSeries.js";
// 两个组件
import Duoxuan from "./Duoxuan.js"
import Dangqian from "./Dangqian.js"
// 组件的应用前的定义
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

class FilterBox extends React.Component {

    constructor(props) {
        super(props);
        // 自己的state
        this.state = {
            // 你当前选择的是哪一个字母
            "brandChar":"A",
            "price":[0,100],
            "km":[0,100]
        }
    }
    setPrice(price){
        this.setState({
            ...this.state,
            price
        })
    };
    setKm(km){
        this.setState({
            ...this.state,
            km
        })
    };
    render() {
        // 定义各种复选框的值
        const typeOptions = ["A级轿车","B级轿车","C级轿车","D级轿车","货车","跑车","面包车","大型SUV","中型SUV","小型SUV"];
        const colorOptions = ["红","绿","黄","橙","粉","白","黑","咖啡","银灰","其它","宝蓝"];
        const engineOptions = ["1.0L","2.0","2.0L","2.0T","2.5","3.0","3.0L","5.0L","10.0T","50T"];
        const seatOptions = ["2","3","4","5","7","9","11","68","更多"];
        var brand , series ,type=[],color=[] , engine = [] ,seat =[] ,buydata = [2000,2018], pai= "无所谓",local="无所谓";
        // 得到props全局的所有的量
        this.props.filters.forEach((item)=>{ item.filter_name == "brand" && (brand = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "series" && (series = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "type" && (type = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "color" && (color = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "engine" && (engine = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "seat" && (seat = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "buydata" && (buydata = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "pai" && (pai = item.value)});
        this.props.filters.forEach((item)=>{ item.filter_name == "local" && (local = item.value)});

        // 定义下拉菜单的配置项
        const menu1 = (
          <Menu onClick={({key,item})=>{
                this.props.dispatch({
                    "type":"carlist/addOrchangeFilter",
                    "value":key,
                    "filter_name":"pai"
                })
          }}>
            <Menu.Item key="无所谓">无所谓</Menu.Item>
            <Menu.Item key="是">是</Menu.Item>
            <Menu.Item key="否">否</Menu.Item>
          </Menu>
        );
        const menu2 = (
          <Menu onClick={({key,item})=>{
                this.props.dispatch({
                    "type":"carlist/addOrchangeFilter",
                    "value":key,
                    "filter_name":"local"
                })
          }}>
            <Menu.Item key="无所谓">无所谓</Menu.Item>
            <Menu.Item key="是">是</Menu.Item>
            <Menu.Item key="否">否</Menu.Item>
          </Menu>
        );
        return (
            <div>
                <Row>
                    <Col span={2}>品牌</Col>
                    <Col span={22}>
                        <Tabs defaultActiveKey="A">
                            {
                                Object.keys(carBrandAndSeries).map(item=>{
                                    return <TabPane
                                        key={item}
                                        tab={item}
                                    >
                                    {carBrandAndSeries[item].map(_item=>{
                                        return <a
                                                href="javascript:void(0);"
                                                key={_item.brand}
                                                className = {classnames({
                                                    "lineA":true,
                                                    "cur":_item.brand == brand
                                                })}
                                                onClick={()=>{
                                                    // 改变moduls中的brand的value值
                                                    this.props.dispatch({
                                                        "type":"carlist/addOrchangeFilter",
                                                        "filter_name":"brand",
                                                        "value":_item.brand
                                                    });
                                                    this.setState({"brandChar":item})
                                                }}
                                            >
                                            {_item.brand}
                                        </a>
                                    })}
                                    </TabPane>
                                })
                            }

                         </Tabs>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>车系</Col>
                    <Col span={22}>
                            {

                               brand
                               ?
                               <div>
                                    <a
                                        href="javascript:void(0)"
                                        className="lineA"
                                        onClick = {()=>{
                                            this.props.dispatch({"type":"carlist/removeFilter","filter_name":"series"})
                                        }}
                                        >
                                        全部
                                    </a>
                                    {
                                        carBrandAndSeries[this.state.brandChar].filter(item=>item.brand==brand)[0].series.map(item=>{
                                            return <a
                                                href="javascript:void(0);"
                                                key={item}
                                                className = {classnames({
                                                    "lineA":true,
                                                    "cur":item == series
                                                })}
                                                onClick = {()=>{
                                                    this.props.dispatch({
                                                        "type":"carlist/addOrchangeFilter","filter_name":"series","value":item
                                                    })
                                                }}
                                                >
                                                {item}
                                            </a>
                                        })
                                    }
                               </div>
                               :
                               null
                            }
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>售价<small>（万元）</small></Col>
                    <Col span={12}>
                        <Slider
                            range
                            defaultValue={[0, 100]}
                            value ={this.state.price}
                            onChange = {(value)=>{
                                   this.setState({
                                        ...this.state,
                                        price:value
                                   })
                            }}
                            onAfterChange ={(value)=>{
                                // 鼠标抬起的时候，dispatch
                                this.props.dispatch({"type":"carlist/addOrchangeFilter","filter_name":"price","value":value})
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>公里数 <small>（万公里）</small></Col>
                    <Col span={12}>
                        <Slider
                            range
                            defaultValue={[0, 100]}
                            value={this.state.km}
                            onChange={(value)=>{
                                this.setState({
                                    ...this.state,
                                    km:value
                                })
                            }}
                            onAfterChange ={(value)=>{
                                // 鼠标抬起的时候，dispatch
                                this.props.dispatch({"type":"carlist/addOrchangeFilter","filter_name":"km","value":value})
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>车型</Col>
                    <Col span={22}>
                        <Duoxuan
                            value={type}
                            filter_name="type"
                            options = {typeOptions}
                        >
                        </Duoxuan>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>颜色</Col>
                    <Col span={22}>
                        <Duoxuan
                            value={color}
                            filter_name="color"
                            options = {colorOptions}
                        >
                        </Duoxuan>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>发动机</Col>
                    <Col span={22}>
                        <Duoxuan
                            value={engine}
                            filter_name="engine"
                            options = {engineOptions}
                        >
                        </Duoxuan>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>座位数</Col>
                    <Col span={22}>
                       <Duoxuan
                           value={seat}
                           filter_name="seat"
                           options = {seatOptions}
                       >
                       </Duoxuan>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>购买年限</Col>
                    <Col span={22}>
                        <RangePicker
                              allowClear = {false}
                              placeholder={['最早年限', '最晚年限']}
                              onChange ={value=>{

                                    this.props.dispatch({
                                        "type":"carlist/addOrchangeFilter",
                                        "filter_name":"buydata",
                                        "value":[value[0].format("YYYY-MM-DD"),value[1].format("YYYY-MM-DD")]
                                    })
                              }}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>杂项</Col>
                    <Col span={22}>
                        <Dropdown.Button
                        overlay={menu1}
                        style={{ marginLeft: 10 }}
                        >
                          是否上牌：{pai}
                        </Dropdown.Button>

                        <Dropdown.Button
                        onClick={()=>{}}
                        overlay={menu2}
                        style={{ marginLeft: 10 }}
                        >
                          是否是本地车：{local}
                        </Dropdown.Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>当前</Col>
                    <Col span={22}>
                       <Dangqian
                        setPrice ={this.setPrice.bind(this)}
                        setKm ={this.setKm.bind(this)}
                       >
                       </Dangqian>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        filters:carlist.filters
    })
)(FilterBox);