import React from 'react';
import {connect} from "dva";
import { Table } from 'antd';
import moment from  "moment";

class TableBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          sorter:true
        }, {
          title: '图片',
          dataIndex: 'pic',
          key: 'pic',
          render:(text,record)=>{
            return <img
                      onClick={()=>{
                          this.props.setShowTanChuCeng(true);
                          this.props.dispatch({"type":"picshow/changeId","id":record.id})
                      }}
                      src={`/carimages_small/${record.id}/view/${record.pic}`}  />
          }
        },{
          title: '品牌',
          dataIndex: 'brand',
          key: 'brand',
        }, {
          title: '车系',
          dataIndex: 'series',
          key: 'series',
        },{
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          sorter:true

        }, {
          title: '公里数',
          dataIndex: 'km',
          key: 'km',
          sorter:true

        }, {
          title: '座位数',
          dataIndex: 'seat',
          key: 'seat',
          sorter:true

        },{
          title: '日期',
          dataIndex: 'buydata',
          key: 'buydata',
          render:function(text,record){
                return moment(record.buydata).format("YYYY-MM-DD")
          },
          sorter:true

        }, {
          title: '颜色',
          dataIndex: 'color',
          key: 'color',
        }, {
          title: '本地车',
          dataIndex: 'local',
          key: 'local',
          render:function(text,record){
                return record.local ? "是" :"否"
          }
        },{
          title: '上牌',
          dataIndex: 'pai',
          key: 'pai',
          render:function(text,record){
                return record.pai ? "是" :"否"
          }
        },{
          title: '排量',
          dataIndex: 'engine',
          key: 'engine',
          sorter:true

        },{
          title: '车型',
          dataIndex: 'type',
          key: 'type',
        },{
          title: '车主',
          dataIndex: 'owner',
          key: 'owner',
        }];
        const amount = this.props.amount;
        // pagesize 是一页是多少条目，amount是总条数
        const {page,pagesize} = this.props.pageandSizeAndSort;
        const pageamount = Math.ceil(amount/pagesize)
        return (
            <div className="tableBox">
              <h4>
                  共 {amount} 量车符合条件 当前 {page} / {pageamount} 页
              </h4>
                <Table
                    dataSource={this.props.results}
                    columns={columns}
                    rowKey={(record)=>record.id}
                    pagination={
                        {
                            "current":page,
                            "total":amount,
                            "pageSize":pagesize,
                            "pageSizeOptions":["3","5","10","20"],
                            "showSizeChanger":true
                        }
                    }
                    onChange = {({pageSize,current},b,{columnKey,order})=>{
                          this.props.dispatch({"type":"carlist/changePageAndSort",pageSize,current,columnKey,order})
                    }}
                    />

            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        results:carlist.results,
        amount:carlist.amount,
        pageandSizeAndSort:carlist.pageandSizeAndSort
    })
)(TableBox);