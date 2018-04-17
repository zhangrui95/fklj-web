/**
 * 研判报告研判分析
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainReducer } from "../../reducers/reducers";
import { Link, browserHistory } from "react-router";
import {
    FileInput
} from "../../components/fileInput";
import { store } from '../../index.js';
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade,
    FileBtn,
    SelectModel
} from "../generalPurposeModule";
import {
    DatePicker,
    Spin,
    Table,
    message,
    Input,
    Select,
    Modal,
    Button,
    Form,
    Upload,
    Icon,
    Row,
    Col,
    Radio
} from 'antd';
import { fetchDict, postDispositionlData, postTerrortypeData, postjudmentlevelData } from "../../actions/actions";
import {
    updateAuditReportHead, saveAuditReportData, editJudgmentLevelData, editTerrorTypeData, editSourceData, editConclusionData, editDispositionlData,
    editUploadurlData, editUploadnameData, edisaveDisableData
} from "../../actions/AuditReport";
import * as constants from "../../utils/Constants";
import { serverUrl } from "../../utils/Configuration";
import {
    api
} from '../../actions/actions';
require('../../utils/Utils');

const FormItem = Form.Item;
const { TextArea } = Input;

export class JudgmentAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPath: "",
            img: "",
            judgmentAnalysis: store.getState().AuditReport.data.judgmentAnalysis,
            judgmentLevel: store.getState().AuditReport.data.judgmentAnalysis.judgmentLevel,
            terrorType: store.getState().AuditReport.data.judgmentAnalysis.terrorType,
            dispositionl: store.getState().AuditReport.data.judgmentAnalysis.dispositionl,
            files: [],
            docurlSrc: '',
            docName: '',
            toConfigure: store.getState().AuditReport.data.toConfigure,
            saveDisable: store.getState().AuditReport.data.saveDisable,
        }
    }
    componentDidMount() {
        //获取下拉框
        let judgmentAnalysis = store.getState().AuditReport.data.judgmentAnalysis;


        let credsjud = {
            pd: {
                code: "203"
            }
        }
        store.dispatch(postjudmentlevelData(credsjud));


        let credsterr = {
            pd: {
                code: "202"
            }
        }
        store.dispatch(postTerrortypeData(credsterr));


        let credsdis = {
            pd: {
                pid: "126"
            }
        }
        store.dispatch(postDispositionlData(credsdis));


        this.setState({
            judgmentAnalysis: judgmentAnalysis
        });
    }
    componentWillReceiveProps(nextProps) {
        let judgmentAnalysis = nextProps.AuditReport.data.judgmentAnalysis;
        let toConfigure = nextProps.AuditReport.data.toConfigure;
        let saveDisable = nextProps.AuditReport.data.saveDisable;
        this.setState({
            judgmentAnalysis: judgmentAnalysis,
            toConfigure: toConfigure,
            saveDisable: saveDisable,
        });
    }
    //判断附件是否上传成功
    normFilefile = (e) => {
        if (e.file.status === 'done') {
            message.success(`附件上传成功!`);
            return e.file.response.result;
        }
        else if (!e.file.status) {
            return this.state.docurlSrc;
        }


    }
    //判断附件上传类型
    beforeUploadfile = (file) => {
        if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type !== 'application/msword') {
            message.error('请上传类型是.doc或.docx的附件');
            return false;
        } if (file.size > 52428800) {
            message.error(`文件上传不能超过50M`);
            return false;
        }

    }
    //判断附件改变时间
    docurlChange = (info) => {
        console.log('info', info);
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name}文件上传成功`);
            let reader = new FileReader();
            reader.addEventListener('load',
                () => {
                    this.setState({
                        // docurlSrc:reader.result ,
                        docurlSrc: info.file.response.result,
                        docName: info.file.name,
                    });
                });

            reader.readAsDataURL(info.file.originFileObj);
            store.dispatch(editUploadurlData(info.file.response.result));
            store.dispatch(editUploadnameData(info.file.name));
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name}文件上传失败`);
        }
    }
    //删除附件
    deleteFile = (file) => {
        this.state.files.remove(file);
        this.forceUpdate();
    }
    // 在保存成功的时候的回调函数，根据他返回状态判断按钮是否可点击
    disabledChange = () => {
        store.dispatch(edisaveDisableData());
    }
    // 保存研判报告
    saveJson = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let userItem = JSON.parse(sessionStorage.getItem('user'));
                let data = {
                    JudgeId: store.getState().AuditReport.data.judgeCode.result,
                    username: userItem.user.name,
                    Head: store.getState().AuditReport.data.head,
                    JudgeBase: store.getState().AuditReport.data.basicInformation,
                    JudgeNetInfo: store.getState().AuditReport.data.onlineInformationList,
                    JudgeBank: store.getState().AuditReport.data.bankInformationList,
                    JudgeBackInfo: {
                        JudgeSamedoor: store.getState().AuditReport.data.bgInformation.householdInformationList,
                        JudgeFugitive: store.getState().AuditReport.data.bgInformation.criminalList,
                        JudgeDrug: store.getState().AuditReport.data.bgInformation.drugList,
                        JudgeCriminal: store.getState().AuditReport.data.bgInformation.illegalCrimeList,
                    },
                    JudgeTrack: store.getState().AuditReport.data.trajectoryInformationList.result.list,
                    JudgeTerristRelation: store.getState().AuditReport.data.relatedPersonList,
                    JudgeResult: {
                        judge_level: store.getState().AuditReport.data.judgmentAnalysis.judgmentLevel,
                        terris_type: store.getState().AuditReport.data.judgmentAnalysis.terrorType,
                        dispose_code: store.getState().AuditReport.data.judgmentAnalysis.dispositionl,
                        result_content: store.getState().AuditReport.data.judgmentAnalysis.conclusion,
                        clue_source: store.getState().AuditReport.data.judgmentAnalysis.source,
                        stage: '1',
                        uploadurl: store.getState().AuditReport.data.judgmentAnalysis.uploadurl,
                        uploadname: store.getState().AuditReport.data.judgmentAnalysis.uploadname,
                    }
                }
                store.dispatch(saveAuditReportData(data, this.disabledChange));
                store.getState().AuditReport.data.judgeCode.result
            }
        })
    }
    render() {
        let judgmentAnalysis = this.state.judgmentAnalysis;
        let terrorTypeList = store.getState().root.data.terrorTypeList;
        let judgmentLevelList = store.getState().root.data.judgmentLevelList;
        let dispositionlList = store.getState().root.data.dispositionlList;
        let toConfigure = this.state.toConfigure;
        let judgeId = store.getState().AuditReport.data.judgeCode.result;
        const user = JSON.parse(sessionStorage.getItem('user'));
        let href = `${serverUrl}/data/htmlJudgeAllJson/${judgeId}/${user.token}`;
        let uploadurl = store.getState().AuditReport.data.judgmentAnalysis.uploadurl;
        let uploadname = store.getState().AuditReport.data.judgmentAnalysis.uploadname;
        let saveDisable = this.state.saveDisable;
        console.log('saveDisable', saveDisable);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };

        //附件展示
        let files = this.state.files;
        let filesDiv = [];
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                filesDiv.push(
                    <div>
                        <span style={{ float: "left", fontSize: "14px" }}>{file.name}</span>
                        <span style={{ float: "right", fontSize: "14px" }}><div onClick={deleteFile => this.deleteFile(file)} >删除</div></span>
                    </div>
                )
            }
        } else {
            filesDiv.push(<div><span style={{ float: "left", fontSize: "14px" }}>暂无附件</span></div>);
        }
        //模拟下拉列表的值
        //研判级别
        let judgmentLevelOptions = [];
        for (var i = 0; i < judgmentLevelList.length; i++) {
            let statusUnit = judgmentLevelList[i];
            judgmentLevelOptions.push(
                <Option key={statusUnit.label} value={statusUnit.value}>{statusUnit.label}</Option>
            );
        }
        //涉恐类别
        let terrorTypeOptions = [];
        for (var i = 0; i < terrorTypeList.length; i++) {
            var statusUnit = terrorTypeList[i];
            terrorTypeOptions.push(
                <Option key={statusUnit.label} value={statusUnit.value}>{statusUnit.label}</Option>
            )
        }
        //建议处置措施 dispositionlList
        let tdispositionlOptions = [];
        for (var i = 0; i < dispositionlList.length; i++) {
            var statusUnit = dispositionlList[i];
            tdispositionlOptions.push(
                <Option key={statusUnit.label} value={statusUnit.value}>{statusUnit.label}</Option>
            )
        }
        return (
            <div style={{ width: "790px", margin: "0 auto", marginTop: "50px" }}>
                <div className="judgmentStyle">
                    <Form onSubmit={this.saveModel}>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="研判级别"
                                hasFeedback
                            >
                                {getFieldDecorator('judgmentLevel', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                    initialValue: this.state.judgmentLevel,
                                    validateFirst: true
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        // value={judgmentAnalysis.judgmentLevel}
                                        onChange={this.handleJudgmentLeveChange}
                                        disabled={toConfigure === 'JudgeHistory' ? true : false}
                                    >
                                        {/* {statusOptions} */}
                                        {judgmentLevelOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="涉恐类别"
                                hasFeedback
                            >
                                {getFieldDecorator('terrorType', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                    initialValue: this.state.terrorType,
                                    validateFirst: true
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={this.handleTerrorTypeChange}
                                        disabled={toConfigure === 'JudgeHistory' ? true : false}
                                    >
                                        {terrorTypeOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="建议处置措施"
                                hasFeedback
                            >
                                {getFieldDecorator('dispositionl', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                    initialValue: this.state.dispositionl,
                                    validateFirst: true
                                })(
                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={this.handleDispositionlChange}
                                        disabled={toConfigure === 'JudgeHistory' ? true : false}
                                    >
                                        {tdispositionlOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="线索来源"
                                hasFeedback
                            >
                                {getFieldDecorator('source', {
                                    rules: [{
                                        required: true, message: '请输入!',
                                    }],
                                    initialValue: judgmentAnalysis.source,
                                    validateFirst: true
                                })(
                                    <Input onChange={this.handleSourceChange} disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="研判结论"
                                hasFeedback
                            >
                                {getFieldDecorator('conclusion', {
                                    rules: [{
                                        required: true, message: '请输入!',
                                    }],
                                    initialValue: judgmentAnalysis.conclusion,
                                    validateFirst: true
                                })(
                                    <TextArea style={{ height: 80, resize: 'none' }} onChange={this.handleConclusionlChange} disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="添加附件"

                            >
                                {getFieldDecorator('file', {

                                    // getValueFromEvent: this.normFilefile
                                })(
                                    <div>
                                        {toConfigure === 'JudgeHistory' ?
                                            <a target="_black" href={uploadurl}>{uploadname}</a>
                                            :
                                            <div>
                                                <Upload name="file"
                                                    //listType='text'
                                                    showUploadList={false}
                                                    action={api + '/data/FilePicupload'}
                                                    beforeUpload={this.beforeUploadfile}
                                                    onChange={this.docurlChange}
                                                >
                                                    <Button className="btn_ok">
                                                        <Icon type="upload" /> 上传附件
                                                </Button>
                                                </Upload>
                                                {uploadurl ?
                                                    this.state.docurlSrc ?
                                                        <div style={{ color: "#fff" }}><a target="_black" href={uploadurl}>{this.state.docName}</a></div> :
                                                        <div style={{ color: "#fff" }}><a target="_black" href={uploadurl}>{uploadname}</a></div> : ""
                                                }
                                            </div>
                                        }
                                        {/* {
                                                this.state.docurlSrc ?
                                                    <div style={{ color: "#fff" }}>{this.state.docName}</div> :
                                                    ''
                                            } */}

                                    </div>

                                    )}
                            </FormItem>
                        </div>
                        <Row>
                            {toConfigure === 'JudgeHistory' ?
                                <Col span={15} style={{ textAlign: 'right' }}>
                                    <Link target="_black" href={href}><Button className="btn_ok">预览</Button></Link>
                                </Col> :
                                <Col span={16} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit"
                                        className="btn_ok" onClick={this.saveJson}
                                        style={{ marginRight: 30 }}
                                    // disabled={saveDisable === true ? false : true}
                                    >
                                        保存
                                    </Button>
                                    <Link target="_black" href={href}><Button disabled={toConfigure ==='personCenterJudge'?false: saveDisable === true ? true : false} className="btn_ok">预览</Button></Link>
                                </Col>}
                        </Row>
                    </Form>
                </div>

            </div>
        );
    }



    //研判级别下拉框改变事件
    handleJudgmentLeveChange = (value) => {
        let judgmentAnalysis = this.state.judgmentAnalysis;
        store.dispatch(editJudgmentLevelData(value));
    }
    //涉恐类别下拉框改变事件
    handleTerrorTypeChange = (value) => {
        let judgmentAnalysis = this.state.judgmentAnalysis;
        store.dispatch(editTerrorTypeData(value));
    }
    //处置措施下拉框改变事件
    handleDispositionlChange = (value) => {
        let judgmentAnalysis = this.state.judgmentAnalysis;
        store.dispatch(editDispositionlData(value));
    }
    //线索来源文本框改变事件
    handleSourceChange = (e) => {
        let judgmentAnalysis = this.state.judgmentAnalysis;
        store.dispatch(editSourceData(e.target.value));
    }
    //研判结论文本框改变事件
    handleConclusionlChange = (e) => {
        let judgmentAnalysis = this.state.judgmentAnalysis;
        store.dispatch(editConclusionData(e.target.value));
    }
};
const wrap = {
    width: "300px",
    border: "1px solid #0C5F93",
    background: "rgba(25,41,85,0.5)",
    marginBottom: "20px",
}
const titlediv = {
    background: "rgba(2, 24, 85, 0.5)",
    height: "40px",
    lineHeight: "40px",
    color: "#fff",
    padding: "0 15px",

}
const clear = {
    clear: "both"
}
const key = {
    color: "red",
    marginRight: "5px"
}
const labelStyle = {
    fontSize: "14px",
    color: "#fff",
    width: "70px",
    display: "inline-block",
}
const labelStyle2 = {
    fontSize: "14px",
    color: "#fff",
    width: "85px",
    display: "inline-block",
    textAlign: "right",
    marginRight: "10px"
}
const borderDiv = {
    float: "left",
    width: "578px",
    background: "rgba(37, 51, 100,0.8)",
    opacity: 0.8,
    border: "1px solid #0C5F93",
    color: "#fff",
    padding: "10px"
}

JudgmentAnalysis = Form.create()(JudgmentAnalysis);
export default connect(mainReducer)(JudgmentAnalysis);