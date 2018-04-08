// 手机盘查详情
import React, {
    Component
} from 'react';
import {
    connect
} from "react-redux";
import {
    mainReducer
} from "../../reducers/reducers";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";

import {
    DatePicker,
    Spin,
    Table,
    Input,
    Modal,
    Button,
    message,
    Pagination,
} from 'antd';
import reqwest from 'reqwest';
import {
    api
} from '../../actions/actions';
import {
    post,
    get,
    put
} from "../../actions/request";
import {
    PhoneDetailsItem,
    TextArea
} from "../../business/generalPurposeModule";
import {
    Header
} from "../Header";
import {
    browserHistory
} from 'react-router';

const mStyle = {
    fontSize: "14px",
    color: "#fff",
    marginRight: "20px",
    width: "104px",
    float: "left",
    textAlign: "right"
}
const p = {
    fontSize: "16px",
    color: "#fff",
    marginBottom: "10px"
}
export class PhoneDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            color: "#fff"
        }
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            phoneId: this.props.params.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getPhoneOs1', params).then((data) => {
            this.setState({
                loading: false,
                data: data.result.list,
            });

        }).catch((e) => {});
    }
    componentDidMount() {


        this.fetch();
    }
    handleMouseOver = () => {
        this.setState({
            color: "#56B5ff"
        });
    }
    handleMouseOut = () => {
        this.setState({
            color: "#fff"
        });
    }
    handleClickGoBack = () => {
        window.history.go(-1);
    }

    render() {
        let phoneLists = [];
        let data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            var dataList = data[i];
            phoneLists.push(
                <PhoneDetailsItem dataList={dataList}/>
            )
        }
        // let  recordId= this.props.recordId;
        // let personId =  this.props.personId;
        let phoneId = this.props.params.phoneId;
        let color = this.state.color;
        return (
            <div> 
                <Header />
                <div style={{padding:"18px"}}> 
                    <div style={{margin:"20px",cursor:"pointer"}}>
                        {/*<img src="/images/back1.png" alt="" style={{float:"left",marginTop:"3px"}}/>*/}
                        <span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={{fontSize:"18px",color:color,marginLeft:"10px"}} onClick={this.handleClickGoBack}>
                            &lt;&nbsp;&nbsp;返回
                        </span>
                    </div>
                    {/*详情信息*/}
                    <div style={{marginBottom:"40px"}}>
                        {phoneLists}
                    </div>
                    {/*手机信息的表格*/}
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>通话记录</p>
                        <CallLogTable phoneId={phoneId}/>
                    </div>
                    <div>
                        <p style={p}>短信记录</p>
                        <MessageTable phoneId={phoneId}/>
                    </div>
                    <div>
                        <p style={p}>安装软件</p>
                        <InstallationSoftwareTable phoneId={phoneId}/>
                    </div>
                </div>
          </div>
        );
    }
}
//分页配置文件
const pagination = {
    size: 'small',
    pageSize: constants.recordPageSize,
    showTotal(total) {
        return `合计 ${total} 条记录`;
    },
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>上一页</a>;
        } else if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }
};

//盘查数据的通话记录数据
class CallLogTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => { //下一页方法
        console.log('pagination',pagination);
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        console.info('pager', pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                // recordId: this.props.recordId, 
                // personId: this.props.personId,
                phoneId: this.props.phoneId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            phoneId: this.props.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getContactinfoPhone', params).then((data) => {
            const pagination = {...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.list,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        console.info(record);
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '主叫号码',
            dataIndex: 'callingNumber',
        }, {
            title: '被叫号码',
            dataIndex: 'calldeNumber',
        }, {
            title: '呼叫时间',
            dataIndex: 'time',
        }, {
            title: '是主/被叫',
            dataIndex: 'type',
        }, {
            title: '通话时长(秒)',
            dataIndex: 'voicelen',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
                </span>
            ),

        }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                       locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="通话记录信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">主叫号码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.callingNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">被叫号码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.calldeNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">呼叫时间：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.time:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">是主/被叫：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.type:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">通话时长：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.voicelen:''} readOnly="readOnly"/>
                    </div>
                    
                </Modal>
            </div>
        );
    }
};

//短信记录
class MessageTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        console.info('pager', pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                phoneId: this.props.phoneId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            phoneId: this.props.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getSmsRecordlistPage', params).then((data) => {
            console.info('data', data);
            const pagination = {...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.list,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        console.info(record);
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '来往号码',
            dataIndex: 'callno',
        }, {
            title: '短信内容',
            dataIndex: 'content',
            render: (text, record) => (
                <span title={text} style={{cursor:"pointer"}}>
                    {
                        text.length <= 30?
                        text.slice(0,29):text.slice(0,29)+"..."

                    }
                </span>
            )
        }, {
            title: '发送时间',
            dataIndex: 'time',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
                </span>
            ),

        }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                       locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="短信记录信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">来往号码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.callno:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">短信内容：</label>
                        <TextArea width="60%"  height='120px'  value={this.state.record!==null?this.state.record.content:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">发送时间：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.time:''} readOnly="readOnly"/>
                    </div>
                    
                </Modal>
            </div>
        );
    }
};

//盘查数据的安装软件记
class InstallationSoftwareTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        console.info('pager', pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                phoneId: this.props.phoneId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            phoneId: this.props.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getPhoneApplistPage', params).then((data) => {
            console.info('data', data);
            const pagination = {...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.list,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        console.info(record);
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '软件名称',
            dataIndex: 'name',
        }, {
            title: '安装包名称',
            dataIndex: 'pkg',
        }, {
            title: '版本号',
            dataIndex: 'version',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
                </span>
            ),

        }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                       locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="安装软件记录信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">软件名称：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.name:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">安装包名称：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.pkg:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">版本号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.version:''} readOnly="readOnly"/>
                    </div>
                    
                </Modal>
            </div>
        );
    }
};
export default connect(mainReducer)(PhoneDetails);