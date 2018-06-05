/**
 * Created by ycj on 2017/4/6.
 */
//盘查详情页面盘查数据下所有表格
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
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    InterrogationDetailsItem,
    Tabs,
    TextArea
} from "../generalPurposeModule";
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
    Pagination
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
    Link
} from "react-router";
const thBg = {
    background: "rgba(2, 24, 85, 0.4)",
}
const mStyle = {
    fontSize: "14px",
    color: "#fff",
    marginRight: "20px",
    width: "104px",
    float: "left",
    textAlign: "right"
}

export class SwordData extends Component {
    componentDidMount() {

    }
    render() {
        console.log(2222,this.props);
        let recordId = this.props.recordId;
        let personId = this.props.personId;
        return (

            <div>
                
               <div style={{border:"1px solid rgb(12, 95, 147)",padding:"20px",background:"rgba(40,51,99,0.8)",zIndex:"3"}}>
{/*                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>基本信息</p>
                        <BasicInformationTable  recordId={recordId} personId={personId}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>车辆基本信息</p>
                        <VbiTable recordId={recordId} personId={personId}/>
                    </div>*/}
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>流入地对接信息</p>
                        <InfluxPlaceTable   recordId={recordId} personId={personId}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>手机信息</p>
                        <MobileDataTable   recordId={recordId} personId={personId}/>
                    </div>
                    
                </div>
            </div>
        )
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


//基本信息
class BasicInformationTable extends Component {
    state = {
        data: [],
        record: null,
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                recordId: this.props.recordId,
                personId: this.props.personId
            },
            showCount: pagination.pageSize
        });
    }
    showModal = (record) => {
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
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            recordId: this.props.recordId,
            personId: this.props.personId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getArcPersonsPhone', params).then((data) => {
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
    render() {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
        }, {
            title: '手机号',
            dataIndex: 'phoneNumber',
        }, {
            title: '性别',
            dataIndex: 'sex',
        }, {
            title: '操作',
            key: 'action',
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
                    title="基本信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">姓名：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.name:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份证号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcard:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">手机号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.phoneNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">性别：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.sex:''} readOnly="readOnly"/>
                    </div>

                </Modal>
            </div>
        );
    }
};

//车辆基本信息
class VbiTable extends Component {
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
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                recordId: this.props.recordId,
                personId: this.props.personId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            recordId: this.props.recordId,
            personId: this.props.personId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getCarRecord', params).then((data) => {
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
            title: '车牌号',
            dataIndex: 'license_plate_no',
            // sorter: true,
            // render: name => `${name.first} ${name.last}`,
            // width: '20%',
        }, {
            title: '车身颜色',
            dataIndex: 'car_color',
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
                    title="车辆基本信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车牌号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.license_plate_no:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车身颜色：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.car_color:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆所有人电话：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.car_owner_tel:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆所有人：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.car_owner:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">号牌类型：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.license_plate_type:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆品牌：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.car_brand:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆类型：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.car_model:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};
//流入地对接
class InfluxPlaceTable extends Component {
    state = {
        visible: false,
        record: null,
        // data: [],
        pagination: pagination,
        loading: false,
        data:[{
            fromProvince:'江苏',
            fromCity:'南京',
            toProvince:'福建省',
            toCity:'晋江市'
        }]
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                recordId: this.props.recordId,
                personId: this.props.personId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            recordId: this.props.recordId,
            personId: this.props.personId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getCity', params).then((data) => {
            const pagination = {...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                // data: data.result.list,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
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
            title: '来自的省',
            dataIndex: 'fromProvince',
        }, {
            title: '来自的市',
            dataIndex: 'fromCity',
        }, {
            title: '目的地省',
            dataIndex: 'toProvince',
        }, {
            title: '目的地市',
            dataIndex: 'toCity',
        }
        // , {
        //     title: '操作',
        //     key: 'action',
        //     // width: 30,
        //     render: (text, record) => (
        //         <span>
        //                 <span onClick={(e)=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
        //         </span>
        //     ),

        // }
    ];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={false}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                       locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="流入流出地信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">来自的省：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.fromProvince:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">来自的市：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.fromCity:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">目的地省：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.toProvince:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">目的地市：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.toCity:''} readOnly="readOnly"/>
                    </div>
                    
                </Modal>
            </div>
        );
    }
};

//手机基本数据
class MobileDataTable extends Component {
    state = {
        visible: false,
        record: null,
        // data: [],
        pagination: pagination,
        loading: false,
        data: [{
            phoneNumber:'13205051212',
            imei:'56656565',
            product:'OPPOR9s',
            os:'【安卓系统】'
        }],
    };
    handleTableChange = (pagination, filters, sorter) => {
            const pager = {...this.state.pagination
            };
            pager.current = pagination.current;
            this.setState({
                pagination: pager,
            });
            this.fetch({ //点击下一页的时候调取的参数
                currentPage: pagination.current,
                entityOrField: true,
                pd: {
                    recordId: this.props.recordId,
                    personId: this.props.personId
                },
                showCount: pagination.pageSize
            });
        }
        //params第一次掉的参数，是第一页，它也会判断是否在掉fetch的时候传参  没传就执行默认的这个第一页
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            recordId: this.props.recordId,
            personId: this.props.personId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getPhoneOs', params).then((data) => {
            const pagination = {...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                // data: data.result.list,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();

    }
    showModal = (record) => {
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
        //to={'/PhoneDetails/'+this.state.record.phoneId}
        const columns = [{
            title: '手机号',
            dataIndex: 'phoneNumber',
        }, {
            title: 'IMEI',
            dataIndex: 'imei',
        }, {
            title: '型号',
            dataIndex: 'product',
        }, {
            title: '系统',
            dataIndex: 'os',
            render: (text, record) => (
                <span title={text} style={{cursor:"pointer"}}>
                    {
                        text.length <= 75?
                        text.slice(0,74):text.slice(0,74)+"..."

                    }
                </span>
            )
        }
        // , {
        //     title: '操作',
        //     key: 'action',
        //     // width: 30,
        //     render: (text, record) => (
        //         <span>
        //                 <Link to={'/PhoneDetails/'+record.phoneId}>
        //                     <span style={{cursor:'pointer',color:'#fff'}}>详情</span>
        //                 </Link>
        //         </span>
        //     ),

        // }
    ];
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
                    title="手机型号信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">手机号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.phoneNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">系统：</label>
                        <TextArea width="60%"  height='120px' value={this.state.record!==null?this.state.record.os:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">型号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.product:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">IMEI：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.imei:''} readOnly="readOnly"/>
                    </div>
                    
                </Modal>
            </div>
        );
    }
};



//盘查数据的照片记录
class PhotorTable extends Component {
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
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch = (params = {}) => {
        let creds = {
            "currentPage": 1,
            "entityOrField": true,
            pd: {
                recordId: this.props.recordId,
                personId: this.props.personId
            },
            "showCount": constants.recordPageSize
        };
        post(api + '/data/getArcPersonlistPage', creds).then((data) => {
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
            title: '照片地址',
            dataIndex: 'photoAddress',
        }, {
            title: '照片大小',
            dataIndex: 'photoSize',
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
                        <label style={mStyle} htmlFor="">照片地址：</label>
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

//盘查数据的上网记录
class IrTable extends Component {
    state = {
        data: [],
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch = (params = {}) => {
        let creds = {
            "currentPage": 1,
            "entityOrField": true,
            pd: {
                "idcard": "2301821991032906151"
            },
            "showCount": 12
        };
        post(api + '/data/getArcPersonlistPage', creds).then((data) => {
            const pagination = {...this.state.pagination
            };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        const columns = [{
            title: '网页标题',
            dataIndex: 'webpageTitle',
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '网址',
            dataIndex: 'webUrl',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={onClickEdit=>this.handleLineIdChange(record.id,record)} style={{cursor:'pointer'}}>详情</span>
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
            </div>
        );
    }
};

//盘查数据的文件记录
class FrTable extends Component {
    state = {
        data: [],
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                recordId: this.props.recordId,
                personId: this.props.personId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {}) => {
        let creds = {
            "currentPage": 1,
            "entityOrField": true,
            pd: {
                "idcard": "2301821991032906151"
            },
            "showCount": 12
        };
        post(api + '/data/getArcPersonlistPage', creds).then((data) => {
            const pagination = {...this.state.pagination
            };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        }).catch((e) => {});
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        const columns = [{
            title: '音频、视频文件',
            dataIndex: 'audioVideoFile',
        }, {
            title: '文件大小',
            dataIndex: 'fileSize',
        }, {
            title: '文件类型',
            dataIndex: 'fileType',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={onClickEdit=>this.handleLineIdChange(record.id,record)} style={{cursor:'pointer'}}>详情</span>
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
            </div>
        );
    }
};


const tableStyle = {
    width: "100%",
    margin: "0 auto",
    border: "1px solid rgb(12, 95, 147)",
    // background:"rgba(12, 95, 147,0.4)"
    textAlign: "center",
    borderCollapse: "collapse",
    fontSize: "14px",
    color: "#fff"
}
const tdStyle = {
    border: "1px solid rgb(12, 95, 147)",
    height: "40px",
}
const tagDiv = {
    float: "left",
    width: "150px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    height: "40px",
    lineHeight: "40px",
    background: "rgba(14,33,86,0.8)",
    border: "1px solid rgb(12, 95, 147)",
    marginLeft: "20px",
    // borderBottom:"0",
    marginBottom: "-1px",
    zIndex: "1"
}
const p = {
    fontSize: "16px",
    color: "#fff",
    marginBottom: "10px"
}