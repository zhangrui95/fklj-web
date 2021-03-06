/**
 * 系统管理流入地联系人
 */
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    mainReducer
} from "../../reducers/reducers";
import {
    PostPlaceOfInfluxPersonData,
    addPlaceOfInfluxPersonData,
    updatePlaceOfInfluxPersonData,
    DeletePlaceOfInfluxPersonData,
    postPlaceProvinceData
} from "../../actions/SystemManagement";
import {
    changeShade
} from "../../actions/actions";
import {
    FileInput
} from "../../components/fileInput";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    Spin,
    Table,
    message,
    Select,
    Input,
    Modal,
    Button,
    Form,
    Upload,
    Icon,
    Row,
    Col,
    TreeSelect,
    Collapse
} from 'antd';

import {
    monthFormat,
    dateFormat,
    serverUrl
} from '../../utils/';
import moment from 'moment';
moment.locale('zh-cn');

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const Panel = Collapse.Panel;

//表格样式
const tableStyle = {
    width: "98%",
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
    // borderRight:"1px solid rgb(12, 95, 147)",
    // borderBottom:"1px solid rgb(12, 95, 147)"
    // background:"rgba(37, 51, 100, 0.8)"
}

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}
function getNewTreeData(treeData, curKey) {
    let provinceTempTreeList = store.getState().SystemManagement.data.provinceTempTreeList.result.list;//当前的省

    console.log('TreeList===', provinceTempTreeList);
    const loopTest = (data) => {//循环出第一级 省
        console.log('jiedao date', data);
        data.forEach((item) => {
            //  console.log('(item.key).toString()',(TreeList.pid).toString()); 
            if (curKey === item.key) {//对比点击的节点和循环出来的树的id是否相同
                item.children = provinceTempTreeList;
            }
            else {
                if (item.children) {
                    loopTest(item.children);
                }
            }
        });
    };
    loopTest(treeData);
}

export class PlaceOfInfluxPerson extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            lineId: '',
            highRiskLine: null,
            police_name: '',
            placeOfInfluxPersonList_idNumber: '',
            placeOfInfluxPersonList_dateBegin: '',
            placeOfInfluxPersonList_dateEnd: '',
            selectedRowsId: [],
            personInfo: '',
            modalKey: 0,
            modalType: '',
            provinceTreeList: [],
            citycode: '',
            unitName: '',
            selectcitycode: '',
            bordercolor: '1px solid #0C5F93',
            treeDisplay:'none',
            panlkey:'1'

        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        // this.props.dispatch(fetchHorrorSoftwareData('/getHorrorSoftware'));
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                type: "1"
            },
            showCount: 10
        }
        store.dispatch(PostPlaceOfInfluxPersonData(creds));
        store.dispatch(postPlaceProvinceData('0'));
    }
    //修改弹出框展示状态
    handChangeModalDialogueShow = (value) => {
        this.setState({
            ModalDialogueShow: value,
        });
    }
    //选中表格行详情lineId变更方法
    handleLineIdChange = (value, highRiskLine = null) => { // 白名单ID    白名单对象
        this.setState({
            lineId: value, //id
            ModalDialogueType: 'add',
            ModalDialogueShow: 'block',
            highRiskLine: highRiskLine, //对象
        });
        //打开遮罩
        store.dispatch(changeShade("block"));
    }
    handleClickAdd = () => {
        this.setState({
            ModalDialogueType: 'add',
        });
        this.handChangeModalDialogueShow("block");
        store.dispatch(changeShade('block'));

    }
    
    serchChange = (police_name, placeOfInfluxPersonList_dateBegin, placeOfInfluxPersonList_dateEnd, selectcitycode) => {
        this.setState({
            nowPage: 1,
            police_name: police_name,
            placeOfInfluxPersonList_dateBegin: placeOfInfluxPersonList_dateBegin,
            placeOfInfluxPersonList_dateEnd: placeOfInfluxPersonList_dateEnd,
            selectcitycode: selectcitycode
        });
    }
    citycodeChange = (citycode, unitName,bordercolor,treeDisplay) => {
        if(this.state.modalType === "edit"){
            this.setState({
                citycode: citycode,
                unitName: unitName,
                bordercolor:bordercolor,
                treeDisplay:treeDisplay,
            });
        }else{
            this.setState({
                citycode: citycode,
                unitName: '',
                bordercolor:bordercolor,
                treeDisplay:treeDisplay,
            });
        }
        
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        // var search='nowPage';
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                beginTime: this.state.placeOfInfluxPersonList_dateBegin,
                endTime: this.state.placeOfInfluxPersonList_dateEnd,
                policename: this.state.police_name,
                citycode: this.state.selectcitycode,
                type: '1'
            },
            showCount: 10
        }
        store.dispatch(PostPlaceOfInfluxPersonData(creds));
    }
    //删除按钮点击
    handleDelete = () => {
        let crads = {
            currentPage: 1,
            pd: {
                id: this.state.selectedRowsId,
            },
            showCount: 10
        };
        let params = {
            currentPage: this.state.nowPage,
            entityOrField: true,
            pd: {
                beginTime: this.state.placeOfInfluxPersonList_dateBegin,
                endTime: this.state.placeOfInfluxPersonList_dateEnd,
                policename: this.state.police_name,
                citycode:  this.state.selectcitycode,
                type: '1'
            },
            showCount: 10
        }
        store.dispatch(DeletePlaceOfInfluxPersonData(crads,params));


        this.setState({
            selectedRowsId: [],
           // nowPage: 1
        });


    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            personInfo: record,
            modalType: 'edit',

        });
       // store.dispatch(postPlaceProvinceData('0'));
    }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
       // store.dispatch(postPlaceProvinceData('0'));
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1,
            bordercolor: '1px solid #0C5F93',
            treeDisplay:'none',
            citycode:'',
        });
    }
    handleOk = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    saveModel = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if(err){
                if (this.state.citycode === undefined || this.state.citycode === null || this.state.citycode === '') {
                    this.setState({
                        bordercolor:'1px solid #f04134',
                        treeDisplay:'block'
                    });
                    
                    //  return;
                 }
                 return;
            }
            else {
                if (this.state.modalType === "edit") {
                    values.id = this.state.personInfo.id;//让表单数据带上id  后台好进行操作
                    this.setState({
                        citycode:''
                    });
                    let creds = {

                        pd: {
                            policename: values.police_name ? values.police_name : '',
                            policepost: values.policepost ? values.policepost : '',
                            tel: values.tel ? values.tel : '',
                            telbak: values.tel_bak ? values.tel_bak : '',
                            areacode: this.state.citycode === '' ? this.state.personInfo.area_code : this.state.citycode,
                            id: values.id.toString(),
                            createuser: userItem.user.name,
                            unitname: values.unit_name ? values.unit_name : '',

                        },

                    }
                    let params = {
                        currentPage: 1,
                        entityOrField: true,
                        pd: {
                            beginTime: this.state.placeOfInfluxPersonList_dateBegin,
                            endTime: this.state.placeOfInfluxPersonList_dateEnd,
                            policename: this.state.police_name,
                            citycode:  this.state.selectcitycode,
                            type: "1"
                        },
                        showCount: 10
                    }
                    store.dispatch(updatePlaceOfInfluxPersonData(creds, params));
                    this.setState({
                        unitName: ''
                    })
                } else if (this.state.modalType === "add") {
                        if (this.state.citycode === undefined || this.state.citycode === null || this.state.citycode === '') {
                            this.setState({
                                bordercolor:'1px solid #f04134',
                                treeDisplay:'block'
                            });
                            
                             return;
                         }
                    
                    
                    let creds = {
                        pd: {
                            police_name: values.police_name ? values.police_name : '',
                            policepost: values.policepost ? values.policepost : '',
                            tel: values.tel ? values.tel : '',
                            tel_bak: values.tel_bak ? values.tel_bak : '',
                            unit_code: this.state.citycode,
                            createuser: userItem.user.name,
                            unit_name: values.unit_name ? values.unit_name : '',
                            type: "1"
                        }
                    }
                    let params = {
                        currentPage: 1,
                        entityOrField: true,
                        pd: {
                            beginTime: this.state.placeOfInfluxPersonList_dateBegin,
                            endTime: this.state.placeOfInfluxPersonList_dateEnd,
                            policename: this.state.police_name,
                            citycode:  this.state.selectcitycode,
                            type: "1"
                        },
                        showCount: 10
                    }
                    store.dispatch(addPlaceOfInfluxPersonData(creds, params));

                }
                this.handleCancel();
                this.setState({
                    nowPage: 1
                });
            }

        })
    }
    
    render() {
        console.log('this.state.unitName',this.state.unitName);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14
            }
        };
        let placeOfInfluxPersonList = store.getState().SystemManagement.data.placeOfInfluxPersonList.result.list;
        let nowPage = this.state.nowPage;
        let provinceTreeList = store.getState().SystemManagement.data.provinceTreeList.result.list;
        // let Table;
        // Table= <PlaceOfInfluxPersonTable  placeOfInfluxPersonList={placeOfInfluxPersonList} nowPage={nowPage} lineIdChange={this.handleLineIdChange}/>
        let totalRecord = store.getState().SystemManagement.data.placeOfInfluxPersonList.result.total;
        let isFetching = store.getState().SystemManagement.isFetching;

        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '民警姓名',
            dataIndex: 'police_name',
        }, {
            title: '联系方式',
            dataIndex: 'tel'
        }, {
            title: '备用联系方式',
            dataIndex: 'tel_bak',
        },
        {
            title: '区域',
            dataIndex: 'cityname'
        }, {
            title: '单位',
            dataIndex: 'unit_name',
        },
        {
            title: '更新时间',
            dataIndex: 'updatetime',
            width:180,
        },
        {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                    <span onClick={onClickEdit => this.editShowModal(record)} style={{ cursor: 'pointer' }}>编辑</span>
                </span>
            ),

        }];
        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < placeOfInfluxPersonList.length; i++) {
            var placeOfInfluxPersonData = placeOfInfluxPersonList[i];
            let serial = recordNumber + i + 1;
            data.push({
                key: i,
                serial: serial,
                police_name: placeOfInfluxPersonData.police_name,
                tel: placeOfInfluxPersonData.tel,
                tel_bak: placeOfInfluxPersonData.tel_bak,
                cityname: placeOfInfluxPersonData.cityname,
                area_code: placeOfInfluxPersonData.area_code,
                policepost: placeOfInfluxPersonData.policepost,
                unit_name: placeOfInfluxPersonData.unit_name,
                updatetime: placeOfInfluxPersonData.updatetime,
                id: placeOfInfluxPersonData.id,

            });


        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var selectedRow = selectedRows[i];
                    ids.push(selectedRow.id);
                }
                this.setState({
                    selectedRowsId: ids
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        //省数据
        // let provinceList = store.getState().SystemManagement.data.province.result.list;
        // console.log('provinceList',provinceList);
        //  let provinceListOptions=[];
        // for(var i=0;i<provinceList.length;i++){
        //     var provinceTag=provinceList[i];
        //     provinceListOptions.push(
        //         <Option key={provinceTag.code}>{provinceTag.text}</Option>
        //     )
        // }
        //市数据
        // let cityList = store.getState().SystemManagement.data.city.result.list;
        // console.log('cityList',cityList);
        //  let cityListOptions=[];
        // for(var i=0;i<cityList.length;i++){
        //     var cityTag=cityList[i];
        //     cityListOptions.push(
        //         <Option key={cityTag.code}>{cityTag.name}</Option>
        //     )
        // }
        const pagination = {
            onChange: (page) =>{
                this.setState({
                    nowPage: page,
                });
                this.pageChange(page)
            },
            showQuickJumper:'true',
            total: totalRecord,
            current: this.state.nowPage,
        }
        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea
                            dispatch={this.props.dispatch}
                            lineId={this.state.lineId}
                            highRiskLine={this.state.highRiskLine}
                            lineIdChange={this.handleLineIdChange}
                            createClick={this.handChangeModalDialogueShow}
                            handleClickAdd={this.addShowModal}
                            handleDelete={this.handleDelete}
                            serchChange={this.serchChange}
                            provinceTreeList={provinceTreeList}
                            selectedRowsId = {this.state.selectedRowsId}
                        />

                        <div className="clear"></div>
                    </div>
                </div>
                {/*表格*/}
                <div className="z_slderRightBody sys_overflow">
                    {isFetching === true ?
                        <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                            <Spin size="large" />
                        </div> :
                        <div style={{ padding: '0 15px' }}>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered pagination={pagination} />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                {/*<Pag pageSize={10} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />*/}
                {/*<ModalDialogue 
                width="562px" 
                isShow={this.state.ModalDialogueShow} 
                lineId={this.state.lineId} 
                highRiskLine={this.state.highRiskLine} 
                lineIdChange={this.handleLineIdChange} 
                changeStatus={this.handChangeModalDialogueShow}
                />*/}
                <Modal
                    title="流入地"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Form onSubmit={this.saveModel}>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="民警姓名"
                            // hasFeedback
                            >
                                {getFieldDecorator('police_name', {
                                    rules: [{
                                         required: true, message: '请输入民警姓名!',      
                                    },{max:50,message:'最多输入五十个字符!',}],
                                    initialValue: this.state.modalType === 'edit' ? this.state.personInfo.police_name : '',
                                    validateFirst: true
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </div>
                        {/* <div className="formItemLeft">
                        <FormItem
                        {...formItemLayout}
                        label="职务"
                        hasFeedback
                        >
                        {getFieldDecorator('policepost', {
                            
                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.policepost : '',
                            validateFirst:true
                        })(
                            <Input />
                        )}
                        </FormItem>
                    </div> */}

                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="联系方式"
                            // hasFeedback
                            >
                                {getFieldDecorator('tel', {
                                    rules: [{
                                        required: true, message: '请输入联系方式!',
                                        
                                    },{
                                        max:20,message:'最多输入二十个字符!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.personInfo.tel : '',
                                    validateFirst: true
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="备用联系方式"
                            >
                                {getFieldDecorator('tel_bak', {
                                    rules:[{
                                        max:20,message:'最多输入二十个字符!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.personInfo.tel_bak : '',
                                    validateFirst: true
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="单位"
                            >
                                {getFieldDecorator('unit_name', {
                                    rules: [{
                                        required: true, message: '请输入单位!',
                                        
                                        },{
                                            max:50,message:'最多输入五十个字符!',
                                        }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.personInfo.unit_name : '',
                                    validateFirst: true
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem

                            >
                                <div className="ant-col-6 ant-form-item-label"><label for="tel" className="ant-form-item-required" title="区域">区域</label></div>
                                <div className="ant-col-14 ant-form-item-control-wrapper">
                                    {this.state.modalType === 'edit' ?
                                        <div  className="proviceAreaCollapse" style={{ position: "relative" }}>
                                            <Input value={this.state.unitName === '' ? this.state.personInfo.cityname : this.state.unitName} readOnly />
                                            <Collapse bordered={false} onChange={this.callback}>
                                                <Panel header='编辑区域' key='1' >
                                                    <p><Tree treeData={provinceTreeList} citycodeChange={this.citycodeChange} /></p>
                                                </Panel>
                                            </Collapse>
                                        </div> :
                                        <div id='treeStyle'>

                                            <Tree treeData={provinceTreeList} citycodeChange={this.citycodeChange}  bordercolor={this.state.bordercolor} treeDisplay={this.state.treeDisplay}/>
                                            <p style={{fontSize:"12px",color:"#f04134",padding:'0',height:8,lineHeight:'19px', fontFamily: "Microsoft YaHei",display:this.state.treeDisplay}}>请选择区域!</p>
                                        </div>
                                    }
                                </div>
                            </FormItem>
                        </div>
                        <Row>
                            <Col span={16} style={{ textAlign: 'right' }}>
                                <Button htmlType="submit" className="btn_ok">保存</Button>
                                <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>

                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>


        );

    }
};

//树形选择器
class Tree extends Component {
    state = {
        citycode: undefined,
    }
    constructor(props) {  //初始化nowPage为1
        console.log('props',props);
        super(props);
        this.state = {

            
            treeData: props.treeData,
           
           
        };
    }
    componentDidMount() {
    }
    //接收到新的propos state 后进行渲染之前调用
    componentWillReceiveProps(nextProps) {
        if (this.props.treeData !== nextProps.treeData) {
            this.state = {
                treeData: nextProps.treeData,

            };
        }
    }


    load = (node) => {

        store.dispatch(postPlaceProvinceData(node.props.eventKey));//点击的节点id
        return new Promise((resolve) => {//es6 异步
            setTimeout(() => {//定时器
                let treeData = [...this.state.treeData];
                //let a = fetchUnitTree();
                //console.info('a',a);
                console.info('treeData:', treeData);
                getNewTreeData(treeData, node.props.eventKey);
                this.setState({ treeData });
                resolve();
            }, 500);
        });
    }
    onChange = (value, title) => {
        let panlkey = this.props.panlkey;
        return new Promise((resolve) => {
            setTimeout(() => {
                this.setState({
                    citycode: value,
                    unitName: title,
                    bordercolor:'1px solid #0C5F93',
                    treeDisplay:'none',
                   
                });
                console.log('this.state.citycode', this.state.citycode);
                this.props.citycodeChange(this.state.citycode, this.state.unitName,this.state.bordercolor,this.state.treeDisplay);

            }, 500)
        })


    }
    render() {

        const tProps = {
            treeData: this.state.treeData,
            value: this.state.citycode,
            title: this.state.title,
            onChange: this.onChange,
            multiple: false,
            treeCheckable: false,
            dropdownStyle: { maxHeight: 500, overflow: 'auto', position: "fixed" },
            dropdownMatchSelectWidth: false,
            showCheckedStrategy: SHOW_PARENT,
            loadData: this.load,
            searchPlaceholder: 'Please select',
            style: {
                width: 274,
                border: this.props.bordercolor,
            },
        };
        return <TreeSelect placeholder="请选择区域" {...tProps} />;

    }
}



//姓名
let police_name, selectcitycode,
    placeOfInfluxPersonList_dateBegin,
    placeOfInfluxPersonList_dateEnd;
//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function () {
        return {
            police_name: '',
            placeOfInfluxPersonList_dateBegin: '',
            placeOfInfluxPersonList_dateEnd: '',
            selectcitycode: '',
            nameClear:'',
            dateBeginClear:'',
            dateEndClear:'',
            citycodeClear:'',
        };
    },
   
    onChildChanged: function (id, value) {
        if (id === 'police_name') {
            police_name = value;
        } else if (id === 'placeOfInfluxPersonList_dateBegin') {
            placeOfInfluxPersonList_dateBegin = value;
        } else if (id === 'placeOfInfluxPersonList_dateEnd') {
            placeOfInfluxPersonList_dateEnd = value;
        }
        this.setState({
            police_name: police_name,
            placeOfInfluxPersonList_dateBegin: placeOfInfluxPersonList_dateBegin,
            placeOfInfluxPersonList_dateEnd: placeOfInfluxPersonList_dateEnd
        });
    },
    handleClick: function () { //点击查询
        police_name = this.state.police_name;
        placeOfInfluxPersonList_dateBegin = this.state.placeOfInfluxPersonList_dateBegin;
        placeOfInfluxPersonList_dateEnd = this.state.placeOfInfluxPersonList_dateEnd;
        if ( this.state.placeOfInfluxPersonList_dateBegin!= "" && this.state.placeOfInfluxPersonList_dateEnd!= "" && this.state.placeOfInfluxPersonList_dateBegin > this.state.placeOfInfluxPersonList_dateEnd) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        } else {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    beginTime: this.state.placeOfInfluxPersonList_dateBegin,
                    endTime: this.state.placeOfInfluxPersonList_dateEnd,
                    policename: this.state.police_name,
                    citycode: this.state.selectcitycode,
                    type: '1'
                },
                showCount: 10
            }
            store.dispatch(PostPlaceOfInfluxPersonData(creds));
            console.log('this.state.selectcitycode chaxun',this.state.selectcitycode);
            this.props.serchChange(
                this.state.police_name,
                this.state.placeOfInfluxPersonList_dateBegin, this.state.placeOfInfluxPersonList_dateEnd, this.state.selectcitycode)
        }
    },
    clear:function(){
        let nameClear = this.state.police_name;
        let dateBeginClear = this.state.placeOfInfluxPersonList_dateBegin;
        let dateEndClear = this.state.placeOfInfluxPersonList_dateEnd;
        let citycodeClear = this.state.citycodeClear;
        this.setState({
            police_name: '',
            placeOfInfluxPersonList_dateBegin: '',
            placeOfInfluxPersonList_dateEnd: '',
            selectcitycode: '',
            nameClear: '',
            dateBeginClear: '',
            dateEndClear: '',
            citycodeClear: ''

        });
        store.dispatch(postPlaceProvinceData('0'));
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: '',
                endTime: '',
                policename: '',
                citycode: '',
                type: '1'
            },
            showCount: 10
        }
        store.dispatch(PostPlaceOfInfluxPersonData(creds));
        this.props.serchChange(
            this.state.nameClear,
            this.state.dateBeginClear, this.state.dateEndClear, this.state.citycodeClear)
    },
    handleClickClear: function () { //点击创建
        store.dispatch(changeShade('block'));
        this.props.createClick("block");

    },
    handleNameChange: function (e) {
        this.setState({
            police_name: e.target.value
        });
    },
    handleIdNumberChange: function (e) {
        this.setState({
            placeOfInfluxPersonList_idNumber: e.target.value
        });
    },
    handleBeginDeteClick: function (date, dateString) {
        this.setState({
            placeOfInfluxPersonList_dateBegin: dateString,
        });
    },
    handleEndDeteClick: function (date, dateString) {
        this.setState({
            placeOfInfluxPersonList_dateEnd: dateString,
        });
    },
    showModal: function () {
        if (this.props.selectedRowsId.length === 0) {
            message.error('请选择要删除的项！');
            return;
        }else{
            this.setState({
                visible: true,
            });
        }
    },
    hideModalOk: function () {
        this.setState({
            visible: false,
        });
        this.props.handleDelete();

    },
    hideModal: function () {
        this.setState({
            visible: false,
        });
    },
    citycodeChange: function (selectcitycode,unitName,bordercolor,treeDisplay) {
        this.setState({
            selectcitycode: selectcitycode,
        });
    },
    render() {
        let police_name = this.state.police_name;
        let placeOfInfluxPersonList_dateBegin = this.state.placeOfInfluxPersonList_dateBegin;
        let placeOfInfluxPersonList_dateEnd = this.state.placeOfInfluxPersonList_dateEnd;
        let beginDateValue = '';
        if (placeOfInfluxPersonList_dateBegin === '') { } else {
            beginDateValue = moment(placeOfInfluxPersonList_dateBegin, dateFormat);
        }
        let endDateValue = '';
        if (placeOfInfluxPersonList_dateEnd === '') { } else {
            endDateValue = moment(placeOfInfluxPersonList_dateEnd, dateFormat);
        }
        if ( this.state.placeOfInfluxPersonList_dateBegin!= "" && this.state.placeOfInfluxPersonList_dateEnd!= "" && this.state.placeOfInfluxPersonList_dateBegin > this.state.placeOfInfluxPersonList_dateEnd) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
                <Input style={{ width: "130px", margin: "0 10px 0 0" }} type="text" id='police_name' placeholder='请输入姓名' value={police_name} onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">更新时间：</label>
                <DatePicker format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue} placeholder="请选择日期" onChange={this.handleBeginDeteClick} />
                <span className="font14" style={{ margin: "0 10px 0 0" }}>至</span>
                <DatePicker format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} placeholder="请选择日期" onChange={this.handleEndDeteClick} />
                <label htmlFor="" className="font14">区域：</label>
                <Tree treeData={this.props.provinceTreeList} citycodeChange={this.citycodeChange} style={{ margin: "0 10px 0 0" }} />
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 10px" onClick={this.handleClick} />
                <ShallowBlueBtn width="82" text="创建" margin="0 10px 0 0" onClick={this.props.handleClickAdd} />
                <DeepRedBtn  margin="0 10px 0 0" width="82" text="清除" onClick={this.clear} />
                <DeepRedBtn  width="82" text="删除" onClick={this.showModal} />
                {/* <Button style={{ margin: '0 0 0 0', width: "80px" }} onClick={this.showModal} className="btn_delete">
                    删除
                </Button> */}
                <Modal style={{ top: "38%" }}
                    title="提示"
                    visible={this.state.visible}
                    footer={null}
                    maskClosable={false}
                    closable={false}
                >
                    <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                        <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.hideModalOk} className="btn_ok">
                            确定
                        </Button>
                        <Button style={{ margin: '', width: "80px" }} onClick={this.hideModal} className="btn_delete">
                            取消
                        </Button>
                    </p>

                </Modal>
            </div>
        );
    }
})
//模态框组件
export class ModalDialogue extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            imgPath: "",
            name: '',
            fixedPhoneNumber: "",
            phoneNumber: "",
            city: '',
            department: '',
            img: null
        };
    }
    clear() {
        //清楚回调函数时间
        this.props.lineIdChange('');
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.setState({
            imgPath: "",
            name: '',
            fixedPhoneNumber: "",
            phoneNumber: "",
            city: '',
            department: '',
            img: null
        });
    }
    componentWillReceiveProps(nextProps) {
        //获取白名单对象
        let highRiskLine = nextProps.highRiskLine;
        if (highRiskLine !== null) {
            this.setState({
                id: highRiskLine.id,
                name: highRiskLine.name,
                fixedPhoneNumber: highRiskLine.fixedPhoneNumber,
                phoneNumber: highRiskLine.phoneNumber,
                city: highRiskLine.city,
                department: highRiskLine.department
            })
        }
    }
    //创建事件
    handleCreate = () => {

        const name = this.state.name;
        const fixedPhoneNumber = this.state.fixedPhoneNumber;
        const phoneNumber = this.state.phoneNumber;
        const city = this.state.city;
        const department = this.state.department;
        const img = this.state.img;
        if (this.props.modalDialogueType === 'add') {
            const creds = {
                name: name,
                img: img,
                fixedPhoneNumber: fixedPhoneNumber,
                phoneNumber: phoneNumber,
                city: city,
                department: department,
                source: '901002',
                userName: sessionStorage.getItem('userName') || ''
            }
            store.dispatch(addPlaceOfInfluxPersonData(creds));
        } else if (this.props.modalDialogueType === 'edit') {
            const creds = {
                name: name,
                img: img,
                fixedPhoneNumber: fixedPhoneNumber,
                phoneNumber: phoneNumber,
                id: this.state.id,
                city: city,
                department: department,
                source: '901002',
                userName: sessionStorage.getItem('userName') || ''
            }
            store.dispatch(updatePlaceOfInfluxPersonData(creds));
        }
        // if(this.props.lineId === ''){
        // //保存
        // store.dispatch(addPlaceOfInfluxPersonData(creds));
        // }else{

        //     store.dispatch(updatePlaceOfInfluxPersonData(creds));
        // }
        // //刷新页面
        // store.dispatch(PostPlaceOfInfluxPersonData('/getPlaceOfInfluxPerson'));
        // this.clear();
    }
    //关闭事件
    handleClose = () => {
        this.clear();
    }
    //图片改变事件
    handleChangeImg = (files, event) => {
        //获取图片对象
        let img = files[0];
        this.setState({
            imgPath: img.thumb,
            img: img
        });
    }
    //名称
    nameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    //固定电话
    fixedPhoneNumberChange = (e) => {
        this.setState({
            fixedPhoneNumber: e.target.value
        });
    }
    //移动电话
    phoneNumberChange = (e) => {
        this.setState({
            phoneNumber: e.target.value
        });
    }
    handleCityChange = (value) => {
        this.setState({
            city: value
        });
    }
    handleDepartmentChange = (value) => {
        this.setState({
            department: value
        });
    }
    render() {
        let mdisplay = this.props.isShow;
        let name = this.state.name;
        let fixedPhoneNumber = this.state.fixedPhoneNumber;
        let phoneNumber = this.state.phoneNumber;
        let city = this.state.city;
        let department = this.state.department;

        //线路ID
        let lineId = this.props.lineId;
        let buttonText;
        (lineId === "") ? buttonText = "创建" : buttonText = "保存";
        let statusList = [{
            "key": "是",
            "value": '1'
        }, {
            "key": "否",
            "value": '0'
        }];
        let cityOptions = [];
        for (var i = 0; i < statusList.length; i++) {
            var statusUnit = statusList[i];
            cityOptions.push(
                <Option key={statusUnit.key} value={statusUnit.value}>{statusUnit.key}</Option>
            )
        }
        let departmentOptions = [];
        for (var i = 0; i < statusList.length; i++) {
            var statusUnit = statusList[i];
            departmentOptions.push(
                <Option key={statusUnit.key} value={statusUnit.value}>{statusUnit.key}</Option>
            )
        }
        return (
            <div style={{ width: this.props.width, height: this.props.height, border: "1px solid #0C5F93", position: "fixed", left: "34%", top: '35%', zIndex: "9999", display: mdisplay }}>
                {/*头部*/}
                <div style={{ background: "rgba(2, 24, 85, 0.9)", padding: "5px" }}>
                    <span style={{ float: "left", fontSize: "16px", color: "#fff" }}>创建</span><img src="/images/guanbi.png" style={{ float: "right", marginTop: "5px", cursor: "pointer" }} onClick={this.handleClose} />
                    <div style={{ clear: "both" }}></div>
                </div>
                {/*内容部分*/}
                <div style={{ padding: "20px", background: "rgba(37, 51, 100, 0.9)" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">姓名</label><Input style={{ width: "372px" }} onChange={this.nameChange} value={name} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">所属机构</label>
                        <Select key='city'
                            style={{ width: 180, margin: "0 10px 0 10px" }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.handleCityChange}
                            value={city}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option key="all" value="">全部</Option>
                            {cityOptions}
                        </Select>
                        <Select key='department'
                            style={{ width: 180, margin: "0 10px 0 10px" }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.handleDepartmentChange}
                            value={department}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option key="all" value="">全部</Option>
                            {departmentOptions}
                        </Select>
                    </div>
                    <div style={{ marginBottom: "20px", position: "relative" }}>
                        <span style={mStyle}>照片</span>
                        {/*<div style={{background: "rgba(37, 51, 100,0.8)",opacity: 0.8,border: "1px solid #0C5F93",color:"#fff",float:"left",width:"50px",height:"50px",textAlign:"center"}}>
                            <span style={{fontSize:"30px",color:"#0C5F93"}}>+</span>
                        </div>*/}
                        <img src={this.state.imgPath === '' ? '/images/addp.png' : this.state.imgPath} alt="" ref="img" width={'60px'} height={'60px'} />
                        <FileInput btnValue="上传" type="image" maxFileSize={3} multiple={false} onChange={this.handleChangeImg} width="60px" height="60px" left="50px" />
                        <div style={{ clear: "both" }}></div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">固定电话</label><Input style={{ width: "372px" }} onChange={this.fixedPhoneNumberChange} value={fixedPhoneNumber} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">移动电话</label><Input style={{ width: "372px" }} onChange={this.phoneNumberChange} value={phoneNumber} />
                    </div>

                    <div>
                        <ShallowBlueBtn width="40px" text={buttonText} margin="0 80px 0 180px" onClick={this.handleCreate} />
                        <DeepRedBtn width="40px" text="删除" onClick={this.handleClose} />
                    </div>
                </div>
            </div>
        );
    }
}
const mStyle = {
    fontSize: "14px",
    color: "#fff",
    marginRight: "20px",
    width: "56px",
    float: "left",
    textAlign: "right"
}


PlaceOfInfluxPerson = Form.create()(PlaceOfInfluxPerson);
export default connect(mainReducer)(PlaceOfInfluxPerson);