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
    changeShade
} from "../../actions/actions";

import {
    ShallowBlueBtn,
    Pag,
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';

import {
    DatePicker,
    Spin,
    Table,
    Input,
    Modal,
    Button,
    Form,
    Row,
    Col,
    Upload,
    message,
    Icon
} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;

import {
    dateFormat
} from '../../utils/';

import {
    GetRedList,
    saveRedList,
    addRedList,
    delRedList
} from '../../actions/SystemManagement';

import {api} from "../../actions/actions";

import moment from 'moment';

moment.locale('zh-cn');

const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0"
}

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14
    }
};

export class RedList extends Component {

    constructor(props) { //初始化nowPage为1
        super(props);

        this.state = {
            nowPage: 1,

            visible: false,
            personInfo: '',
            modalKey: 0,
            modalType: '',
            selectedRowsId: [],

            avatarSrc: ''
        };
    }

    editShowModal = (data) => {
        this.setState({
            visible: true,
            personInfo: data,
            modalType: 'edit',
            avatarSrc: data.iconUrl
        });
    }

    addShowModal = () => {
        this.setState({
            visible: true,
            modalType: 'add',
            avatarSrc: ''
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    redSave = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.modalType === 'edit') {
                    values.id = this.state.personInfo.id
                    let creds = {
                        currentPage: this.state.nowPage,
                        pd: values,
                        showCount: 10
                    }
                    store.dispatch(saveRedList(creds, this.state.nowPage));
                }
                else if (this.state.modalType === 'add') {
                    let creds = {
                        name: values.name,
                        idcard: values.idcard,
                        remark: values.remark,
                        iconUrl: values.iconUrl,
                        work: '',
                        post: '',
                        person_id: ''
                    }

                    store.dispatch(addRedList(creds))
                    this.setState({
                        nowPage: 1
                    });
                }

                this.handleCancel();
            }
        });
    }

    //表格删除
    handleDelete = () => {
        if (this.state.selectedRowsId.length === 0) {
            message.error('请选择要删除的项！');
            return;
        }
        let param = {
            currentPage: 1,
            pd: {
                id: this.state.selectedRowsId,
            },
            showCount: 10
        }

        store.dispatch(delRedList(param));

        this.setState({
            selectedRowsId: [],
            nowPage: 1
        });

    }

    pageChange = (nowPage) => {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        /*     this.setState ({
                 nowPage: nowPage
             });*/

        let creds = {
            currentPage: nowPage,
            pd: {
                beginTime: this.state.redList_beginTime,
                endTime: this.state.redList_endTime,
                //根据接口修改相应的名称
                name: this.state.redList_name,
            },
            showCount: 10
        }

        store.dispatch(GetRedList(creds));
    }

    //可以把 onChange 的参数（如 event）转化为控件的值
    normFile =(e) => {
        if (e.file.status === 'done') {
            message.success(`头像上传成功!`);
            return e.file.response.result;
        }
        else if (!e.file.status) {
            return this.state.avatarSrc;
        }

    }

    beforeUpload = (file) => {
        if ( file.type !== 'image/jpeg' && file.type !== 'image/png'){
            message.error(`请上传图片`);
            return false;
        }
        else if (file.size > 10240) {
            message.error(`图片上传不能超过10M`);
            return false;
        }
    }

    avatarChange= (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ avatarSrc: reader.result})
            });

            reader.readAsDataURL(info.file.originFileObj);
        }
        else if(info.file.status === 'error') {
            message.error(`头像上传失败!`);
        }
    }
    render() {
        let redList = store.getState().SystemManagement.data.redList.result.list;
        let isFetching = store.getState().SystemManagement.isFetching;
        let nowPage = this.state.nowPage;
        let totalRecord = store.getState().SystemManagement.data.redList.result.total;

        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < redList.length; i++) {
            var redData = redList[i];
            let serial = recordNumber + i + 1;
            data.push({
                key: i,
                serial: serial,
                name: redData.name,
                iconUrl: redData.iconUrl,
                remark: redData.remark,
                id: redData.id,
            });
        }

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
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
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '姓名',
            dataIndex: 'name',
        },
         {
             title: '头像',
             render: (text, record) => {
                 if(text.iconUrl) {
                     return (
                         <img src={text.iconUrl} style={{width: "30px", height: "30px"}}/>
                     )
                 }

             },
         },
        {
            title: '备注',
            dataIndex: 'remark',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                    <span onClick={onClickEdit => this.editShowModal(record)} style={{cursor: 'pointer'}}>编辑</span>
                </span>
            ),
        }];

        const {
            getFieldDecorator
        } = this.props.form;

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
                        />
                        <div className="clear"></div>
                    </div>
                </div>
                {/*表格*/}
                <div className="z_slderRightBody sys_overflow">
                    {isFetching === true ?
                        <div style={{textAlign: "center", position: "absolute", left: "45%", top: "50%"}}>
                            <Spin size="large"/>
                        </div> :
                        <div style={{padding: "0 15px"}}>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered
                                   pagination={false}/>
                        </div>}
                    <div className="clear"></div>
                </div>
                <Pag pageSize={10} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange}/>

                {/*编辑模态框*/}
                {/*<Modal title="红名单" visible = {this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>*/}
                <Modal title="红名单" key={this.state.modalKey} visible={this.state.visible} footer={null}
                       onCancel={this.handleCancel}>
                    <Form onSubmit={this.redSave}>
                        <FormItem
                            {...formItemLayout} label={'名字'} hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请添加名字',
                                }],
                                initialValue: this.state.modalType === 'edit' ? this.state.personInfo.name : ''
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout} label='备注' hasFeedback>

                            {getFieldDecorator('remark', {

                                initialValue: this.state.modalType === 'edit' ? this.state.personInfo.remark : ''
                            })(
                                <TextArea rows={4} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout} label={'头像'} hasFeedback>
                            {getFieldDecorator('iconUrl', {
                                getValueFromEvent: this.normFile
                            })(
                                <Upload className="avatar-uploader" name="file" showUploadList={false}
                                action={api + '/data/FilePicupload' }
                                beforeUpload={this.beforeUpload}
                                onChange={this.avatarChange}
                                >
                                {
                                    this.state.avatarSrc ?
                                        <img src={this.state.avatarSrc} alt="" className="avatar" /> :
                                        <Icon style={{color:'#fff'}} type="plus" className="avatar-uploader-trigger" />
                                }
                                </Upload>
                            )}
                        </FormItem>
                        <Row>
                            <Col span={16} style={{textAlign: 'right'}}>
                                <Button htmlType="submit"  className="btn_ok">保存</Button>
                                <Button style={{marginLeft: 30}} onClick={this.handleCancel} className="btn_delete">取消</Button>

                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>

        );
    }
}


const SearchArea = React.createClass({
    getInitialState: function () {
        return {
            redList_name: '',
            redList_idcard: '',
            redList_beginTime: '',
            redList_endTime: ''
        };
    },
    handleNameChange: function (e) {
        this.setState({
            redList_name: e.target.value
        });
    },
    handleIdNumberChange: function (e) {
        this.setState({
            redList_idcard: e.target.value
        });
    },
    handleBeginDeteClick: function (date, dateString) {
        this.setState({
            redList_beginTime: dateString,
        });
    },
    handleEndDeteClick: function (date, dateString) {
        this.setState({
            redList_endTime: dateString,
        });
    },
    clickSearch: function () { //点击查询
        if (this.state.redList_endTime < this.state.redList_beginTime) {
            message.error('开始时间不能大于结束时间');
            return false;
        }
        let creds = {
            currentPage: 1,
            pd: {
                beginTime: this.state.redList_beginTime,
                endTime: this.state.redList_endTime,
                //根据接口修改相应的名称
                name: this.state.redList_name,
                idcard: this.state.redList_idcard,
            },
            showCount: 10
        }

        store.dispatch(GetRedList(creds));

    },
    handleClickClear: function () { //点击创建
        store.dispatch(changeShade('block'));
        this.props.createClick("block");

    },
    showModal: function () {
        this.setState({
            visible: true,
        });

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

    render() {

        let beginDateValue = '';
        let beginPicker = ''
        if (this.state.redList_beginTime === '') {
            beginPicker = (
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} defaultValue=""
                    onChange={this.handleBeginDeteClick}/>
            );
        } else {
            beginDateValue = moment(this.state.redList_beginTime, dateFormat);
            beginPicker = (
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} value={beginDateValue}
                    defaultValue="" onChange={this.handleBeginDeteClick}/>
            );
        }
        let endDateValue = '';
        let endPicker = '';
        if (this.state.redList_endTime === '') {
            endPicker = (
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                        defaultValue="" onChange={this.handleEndDeteClick}/>
            );
        } else {
            endDateValue = moment(this.state.redList_endTime, dateFormat);
            endPicker = (
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} value={endDateValue}
                        defaultValue="" onChange={this.handleEndDeteClick}/>
            );
        }


        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
                <Input style={{width: "111px", margin: "0 10px 0 0"}} type="text" id='blackList_softName' placeholder=''
                       value={this.state.redList_name} onChange={this.handleNameChange}/>
                <label htmlFor="" className="font14">身份证号</label>
                <Input style={{width: "202px", margin: "0 10px 0 0"}} type="text" id='blackList_idcard' placeholder=''
                       value={this.state.redList_idcard} onChange={this.handleIdNumberChange}/>
                <label htmlFor="" className="font14">创建时间：</label>
               {/* <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} value={beginDateValue}
                            defaultValue="" onChange={this.handleBeginDeteClick}/>*/}
                {beginPicker}
                <span className="font14" style={{margin: "0 10px 0 0"}}>至</span>
                {endPicker}
              {/*  <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} value={endDateValue}
                            defaultValue="" onChange={this.handleEndDeteClick}/>*/}
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.clickSearch}/>
                <ShallowBlueBtn width="82" text="创建" margin="0 10px 0 0" onClick={this.props.handleClickAdd}/>
                <ShallowBlueBtn width="82" text="导入"/>
                <Button style={{margin: '0 0 0 10px', width: "80px"}} onClick={this.showModal} className="btn_delete">
                    删除
                </Button>
                <Modal style={{top: "38%"}}
                       title="提示"
                       visible={this.state.visible}
                       footer={null}
                       maskClosable={false}
                       closable={false}
                >
                    <p style={{fontSize: "16px",}}>是否删除选中项？</p>
                    <p style={{marginTop: "20px", textAlign: "center"}}>
                        <Button style={{margin: '0 20px 0 0 ', width: "80px"}} onClick={this.hideModalOk}
                                className="btn_ok">
                            确定
                        </Button>
                        <Button style={{margin: '', width: "80px"}} onClick={this.hideModal} className="btn_delete">
                            取消
                        </Button>
                    </p>

                </Modal>
            </div>
        );
    }
})

RedList = Form.create()(RedList);

export default connect(mainReducer)(RedList);