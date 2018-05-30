import React, {Component} from 'react';
import {StylePage, ShallowBlueBtn} from "../generalPurposeModule";
import {store} from '../../index.js';
import {serverUrls, getLocalTime} from '../../utils/index';
import {monthFormat, dateFormat, serverUrl} from '../../utils/';
import {Table, message, Input, Modal, Button, Form, Select, DatePicker,Upload} from 'antd';
import {Regular} from '../../components/Regular'
import {getControlPersonList,getControlExport,getControlDownload,getCustomFiledList,insertOrUpdateCustomFiled,delCustomFiled,updateTaskModelControlPerson,getTaskModelList} from "../../actions/ControlPersonnel";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
//搜索区域内容组件
export  class SearchArea extends Component{
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            Tosk:'',
            begindate: '',
            enddate: '',
            cycle: '',
            zdyModal: false,
            zdyModals: false,
            wordType: '',
            showInput:{display:'none'},
            wordName:'',
            OptionWords:'',
            addModal: false,
            showDel:{display:'none'},
            prompt: false,
            promptText:'',
            prompType:'',
            wordId:'',
            ToskId:'请选择任务',
            ModalTitle:'',
            zdyType:''
        }
    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleCardChange = (e) => {
        this.setState({
            cardId: e.target.value
        });
    }
    statusChange = (value) =>{
        this.setState({
            status: value
        });
    }
    cycleChange = (value) => {
        this.setState({
            cycle: value
        });
    }
    ToskChange = (e) => {
        this.setState({
            Tosk: e.target.value
        });
    }
    handleClick = (props) =>  { //点击查询
        let controlType = this.props.controlType;
        let {name,cardId,status,Tosk,begindate,enddate} = this.state;
        let creds = ''
        if(controlType === 'GK_WGK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:0},showCount:10,currentPage:1}
        }else if(controlType === 'GK_YGK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:1},showCount:10,currentPage:1}
        }else if(controlType === 'GK_LKZRQ'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:2},showCount:10,currentPage:1}
        }else if(controlType === 'GK_SK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:3},showCount:10,currentPage:1}
        } else if(controlType === 'LY_DR'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,source:"901006"},showCount:10,currentPage:1}
        } else if(controlType === 'LY_XZ'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,source:"901001"},showCount:10,currentPage:1}
        } else {
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate},showCount:10,currentPage:1}
        }
        store.dispatch(getControlPersonList(creds))
        this.props.getSearch(name, cardId, status, Tosk, begindate, enddate);
        this.props.changeSelection([],1);
    }
    init = () => {
        this.setState({
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            Tosk:'',
            begindate: '',
            enddate: '',
        });
        this.props.getSearch('', '', '', '', '', '');
    }
    inits = () => {
        this.setState({
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            Tosk:'',
            begindate: '',
            enddate: '',
        });
        this.props.getSearch('', '', '', '', '', '');
        setTimeout(()=>{
            this.handleClick();
        },200)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    hideModalOk = () => {
        let id = this.state.wordId;
        store.dispatch(delCustomFiled({id:id}));
        setTimeout(()=>{
            let delCode = store.getState().ControlPersonnel.data.delCustomFiled.reason;
            if(delCode === null){
                message.success(`提示：字段删除成功`);
                this.getNewWords();
            }else{
                message.error(`提示：${store.getState().ControlPersonnel.data.delCustomFiled.reason.text}`);
            }
        },150)
        this.setState({
            visible: false,
            zdyModal:true
        });
    }
    handleBeginDeteClick = (date, dateString) => {
        this.setState({
            begindate: dateString,
        });
    }
    handleEndDeteClick = (date, dateString) => {
        this.setState({
            enddate: dateString,
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
            zdyModal: false,
            addModal:false,
            prompt: false
        });
    }
    hideDel = () => {
        this.setState({
            zdyModals: true,
            visible: false
        });
    }
    hideModals = () => {
        this.getNewWords();
        this.setState({
            zdyModals: false,
            zdyModal: true,
        });
    }
    getNewWords = () => {
        let creds = {}
        store.dispatch(getCustomFiledList(creds))
        this.setState({
            zdyModal: true,
            wordType: '',
            showInput:{display:'none'},
            wordName:''
        });
    }
    getSelects = (value) => {
        if(value=='0'){
            this.setState({
                showInput: {display:'none'},
                wordType:'文本'
            });
        }else if(value=='1'){
            this.setState({
                showInput: {display:'block'},
                wordType:'下拉框'
            });
        }
    }
    getOptions = (e) => {
        this.setState({
            OptionWords:e.target.value
        })
    }
    changeWordName = (e) => {
        this.setState({
            wordName:e.target.value
        });
    }
    saveNewWord = () => {
        let creds = ''
        let TorF = true;
        let strs=this.state.OptionWords.split(/[,，]/);
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(this.state.wordId === ''){
            if(this.state.wordType === '文本'){
                creds = {createuser:user.user.name,name:this.state.wordName,type:"0",updateuser:'',value:''}
                this.getZdy(creds);
            }else{
                if(this.state.OptionWords.trim()!==""){
                    strs.map((str)=>{
                        let reg = Regular('xlz').reg
                        if(!reg.test(str)){
                            message.error(Regular('xlz').msg);
                            TorF = false;
                            return;
                        }
                    })
                    if(TorF){
                        creds = {createuser:user.user.name,name:this.state.wordName,type:"1",updateuser:'',value:this.state.OptionWords}
                        this.getZdy(creds);
                    }
                }else{
                    message.error(`提示：下拉值不能为空`);
                    return;
                }
            }
        }else{
            if(this.state.wordType === '文本'){
                creds = {createuser:user.user.name,name:this.state.wordName,type:"0",value:'',id:this.state.wordId}
                this.getZdy(creds);
            }else{
                if(this.state.OptionWords.trim()!==""){
                    strs.map((str)=>{
                        let reg = Regular('xlz').reg
                        if(!reg.test(str)){
                            message.error(Regular('xlz').msg);
                            TorF = false;
                            return;
                        }
                    })
                    if(TorF){
                        creds = {createuser:user.user.name,name:this.state.wordName,type:"1",value:this.state.OptionWords,id:this.state.wordId}
                        this.getZdy(creds);
                    }
                }else{
                    message.error(`提示：下拉值不能为空`);
                    return;
                }
            }
        }
    }
    getZdy = (creds) => {
        if(this.state.wordName.trim()!==''){
            let reg = Regular('zdyName').reg
            if(!reg.test(this.state.wordName.trim())){
                message.error(Regular('zdyName').msg);
            }else{
                store.dispatch(insertOrUpdateCustomFiled(creds));
                setTimeout(()=>{
                    let delCode = store.getState().ControlPersonnel.data.CustomFiled.reason;
                    if(delCode === null){
                        message.success(`提示：自定义字段${this.state.zdyType === 'add' ? '新增':'修改'}成功`);
                        this.hideModals();
                        this.getNewWords();
                    }
                    // else{
                    //     message.error(`提示：${store.getState().ControlPersonnel.data.CustomFiled.reason.text}`);
                    // }
                },150)
            }
        }else{
            message.error(`提示：字段名称不能为空`);
        }
    }
    getAddModal = (type) => {
        if(type === 'add'){
            this.setState({
                ModalTitle:'添加到任务',
                ToskId:'请选择任务'
            })
        }else{
            this.setState({
                ModalTitle:'变更任务',
                ToskId:'请选择任务'
            })
        }
        if(this.props.selectedRowsId.length > 0){
            let creds = { taskswitch:'1',showCount:9999999}
            store.dispatch(getTaskModelList(creds));
            this.setState({
                addModal:true
            });
        }else{
            message.warning(`提示：请选择人员`);
        }
    }
    addNewsWord = (type, record) => {
        // record.id
        if(type === 'update'){
            this.setState({
                showDel:{margin:'0 0 0 30px'},
                wordName:record.name,
                wordType:record.type,
                OptionWords:record.value,
                wordId:record.id,
                zdyType:'update'
            })
            this.getSelects(record.type)
        }else if(type === 'add'){
            this.setState({
                showDel:{display:'none'},
                wordName:'',
                wordType:'',
                wordId:'',
                OptionWords:'',
                zdyType:'add'
            })
            this.getSelects('0')
        }
        this.setState({
            zdyModals:true,
            zdyModal:false
        });
    }
    getDelete = () => {
        this.setState({
            visible:true,
            zdyModals:false
        })
    }
    errorText = (path) => {
        let paths = serverUrls + path;
        window.open(paths);
        message.destroy();
    }
    getOnClose = () => {
        message.destroy();
    }
    importOnChange = (info) => {
        if(info.file.response.reason!==null){
            if(info.file.response.reason.code === ""){
                if(info.file.response.result.errorExcelPath === "" ||info.file.response.result.errorExcelPath === undefined){
                    message.success(`提示：${info.file.response.reason.text}`);
                }else{
                    message.warning(
                        <content>
                            <span>提示：{info.file.response.reason.text}</span>
                            <a onClick={()=>this.errorText(info.file.response.result.errorExcelPath)}> 下载失败数据明细 </a>
                            <a onClick={this.getOnClose}> 关闭 </a>
                        </content>,0
                    );
                }
            }else{
                message.error(`提示：${info.file.response.reason.text}`,5)
            }
        }
        if (info.file.status === 'uploading') {
            this.importEnterLoading();
        }
        if (info.file.status !== 'uploading') {

        }
        if (info.file.status === 'done') {
            let creds = '';
            let controlType = this.props.controlType
            if(controlType==='GK_WGK'){
                creds = {pd:{control_type:0},showCount:10,currentPage:1}
            }else if(controlType==='GK_YGK'){
                creds = {pd:{control_type:1},showCount:10,currentPage:1}
            }else if(controlType==='GK_LKZRQ') {
                creds = {pd:{control_type:2},showCount:10,currentPage:1}
            }else if(controlType==='GK_SK'){
                creds = {pd:{control_type:3},showCount:10,currentPage:1}
            }else if(controlType==='LY_DR'){
                creds = {pd:{source:'901006'},showCount:10,currentPage:1}
            }else if(controlType==='LY_XZ'){
                creds = {pd:{source:'901001'},showCount:10,currentPage:1}
            }else{
                creds = {}
            }
            store.dispatch(getControlPersonList(creds))
            this.setState({
                importLoading: false,
            });
            this.props.changeSelection([],1);
        } else if (info.file.status === 'error') {
            message.error(`提示：${info.file.name} 上传失败`);
            this.setState({
                importLoading: false,
            });
        }
    }
    beforeUpload = (file, fileList) => {
        var rag = /\.(xls|xlsx|XLS|XLSX)$/;
        if(!rag.test(file.name)){
            message.error('提示：请上传excel');
        }
        return;
    }
    getPrompt = (type) => {
        if(type === 'download'){
            this.setState({
                promptText:'是否确定下载导入模板？',
                prompType:'download'
            })
            store.dispatch(getControlDownload())
            this.setState({
                prompt:true,
            })
        }else if(type === 'export'){
            if(this.props.selectedRowsId.length > 0){
                this.setState({
                    promptText:'是否确定导出数据？',
                    prompType:'export'
                })
                let creds = {ids:this.props.selectedRowsId.toString()}
                store.dispatch(getControlExport(creds))
                this.setState({
                    prompt:true,
                })
            }else{
                message.warning('提示：请选择需导出的人员');
            }
        }
    }
    exportModal = () => {
        this.props.handleExport();
        setTimeout(()=>{
            this.hideModal();
            this.props.changeSelection([],1);
        },100)
    }
    downloadModal = () =>{
        let path = serverUrls + store.getState().ControlPersonnel.data.Download.result.path;
        window.open(path);
        setTimeout(()=>{
            this.hideModal();
        },100)
    }
    getNewsList = () => {
        let controlType = this.props.controlType;
        let cred = '';
        if(controlType==='GK_WGK'){
            cred = {pd:{control_type:0},showCount:10,currentPage:1}
        }else if(controlType==='GK_YGK'){
            cred = {pd:{control_type:1},showCount:10,currentPage:1}
        }else if(controlType==='GK_LKZRQ') {
            cred = {pd:{control_type:2},showCount:10,currentPage:1}
        }else if(controlType==='GK_SK'){
            cred = {pd:{control_type:3},showCount:10,currentPage:1}
        }else if(controlType==='LY_DR'){
            cred = {pd:{source:'901006'},showCount:10,currentPage:1}
        }else if(controlType==='LY_XZ'){
            cred = {pd:{source:'901001'},showCount:10,currentPage:1}
        }else{
            cred = {}
        }
        store.dispatch(getControlPersonList(cred))
        this.props.changeSelection([],1);
    }
    choiceTask = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let creds = {id:this.state.ToskId,personalid:this.props.selectedRowsId,updateuser:user.user.name}
        if(this.state.ToskId === '请选择任务'){
            message.warning(`提示：${this.state.ToskId}`);
        }else{
            store.dispatch(updateTaskModelControlPerson(creds))
            setTimeout(()=>{
                let delCode = store.getState().ControlPersonnel.data.TaskModelControlPerson.reason;
                if(delCode === null){
                    message.success(`提示：${this.state.ModalTitle}成功`);
                }else{
                    message.error(`提示：${store.getState().ControlPersonnel.data.TaskModelControlPerson.reason.text}`);
                }
            },200)
            setTimeout(()=>{
                this.getNewsList();
                this.props.changeSelection([],1);
            },200)
            this.setState({
                addModal:false
            });
        }
    }
    getSelectTosk = (e) => {
        this.setState({
            ToskId: e
        })
    }
    getSelectSearch = (e) => {
        let creds = { taskswitch:'1',showCount:9999999,pd:{name:e}}
        store.dispatch(getTaskModelList(creds));
    }
    render() {
        const {getFieldDecorator} = this.props.form
        let {name,cardId,status,Tosk, enddate, begindate,cycle,wordType,showInput,wordName,OptionWords,showDel} = this.state;
        let beginDateValue = '';
        if (begindate === '') {} else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') {} else {
            endDateValue = moment(enddate, dateFormat);
        }
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        let zdyStyle = {width:"110px", marginRight:"10px",display:'none'}
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        userItem.menu.map((menu)=>{
            if(menu.resourceCode === 'gkry_zdyzd_btn'){
                zdyStyle = {width:"110px", marginRight:"10px"}
            }
        })
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            width:80,
        },{
            title: '任务名称',
            dataIndex: 'name',
        },{
            title: '任务类别',
            dataIndex: 'type',
        },{
            title: '任务周期',
            dataIndex: 'cycle',
            width:80,
        }];
        const data = [
            {serial:'1',name:'玉泉区兴隆派出所按天盘查',type:'周期任务',cycle:'按天'},
            {serial:'2',name:'玉泉区兴隆派出所按周盘查',type:'周期任务',cycle:'按周'}
        ]
        let newWord = []
        for(let i in store.getState().ControlPersonnel.data.FiledList.result.list){
            if(i !== 'remove'){
                let list= store.getState().ControlPersonnel.data.FiledList.result.list
                newWord.push({name:list[i].name,key:i,id:list[i].id,type:list[i].type,value:list[i].value})
            }
        }
        const list = [{
            key: 'name',
            render: (text, record) => (
                <span onClick={(e)=>this.addNewsWord('update', record)} style={{cursor:'pointer'}}>{record.name}</span>
            ),
        }];
        //上传
        const upLoad = {
            name: 'file',
            action: serverUrls + '/data/importControlPersonExcel',
            headers: {
                Authorization: sessionStorage.getItem('id_token') || '',
            },
            data: {
                userName: sessionStorage.getItem('userName') || '',
            },
            showUploadList: false,
        };
        let btns = (
            <div style={{marginTop:"15px"}}>
                <Button style={{width:"110px", marginRight:"10px",float:'left'}} onClick={() => this.getAddModal('add')} className="btn_ok">添加到任务</Button>
                <div  style={{float:'left'}}>
                    <Upload {...upLoad} onChange={this.importOnChange} beforeUpload={this.beforeUpload} showUploadList={false}>
                        <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok">导入</Button>
                    </Upload>
                </div>
                <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                <Button style={{width:"110px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('download')}>模板下载</Button>
                <Button style={zdyStyle} className="btn_ok" onClick={this.getNewWords}>自定义字段</Button>
            </div>
        )
        let controlType = this.props.controlType
        if(controlType === 'GZ_NLHRY' || controlType === 'GZ_ZALY'){
            btns = ''
        }else if(controlType === 'GK_YGK'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} onClick={() => this.getAddModal('update')} className="btn_ok">变更任务</Button>
                    <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
        }else if(controlType === 'GK_LKZRQ' || controlType === 'GK_SK'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} onClick={() => this.getAddModal('add')} className="btn_ok">添加到任务</Button>
                    <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
        }else if(controlType === 'LY_DR' || controlType === 'LY_XZ'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
        }
        const children = [];
        let toskList = store.getState().ControlPersonnel.data.getTaskModelList.result.list
        for(let j in toskList){
            if(j!='remove'){
                children.push(<Option key={j} value={toskList[j].id}>{toskList[j].name}</Option>);
            }
        }
        const ToskSearch = (
            controlType==='GK_WGK' ?
                <span></span>:
                <span>
                <label htmlFor="" className="font14">隶属任务：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入隶属任务'  value={Tosk}  onChange={this.ToskChange}/>
            </span>
        )
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">身份证号：</label>
                <Input style={{width:'230px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入身份证号'  value={cardId} onChange={this.handleCardChange}/>
                <label htmlFor="" className="font14">姓名：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入人员姓名'  value={name}  onChange={this.handleNameChange}/>
                <label htmlFor="" className="font14">居住类型：</label>
                <Select value={status} style={{ width: 100 ,marginRight:"10px" }} onChange={this.statusChange} notFoundContent='暂无'>
                    <Option value="">全部</Option>
                    <Option value="0">常住</Option>
                    <Option value="1">暂住</Option>
                    <Option value="2">流动</Option>
                </Select>
                {ToskSearch}
                <label htmlFor="" className="font14">更新时间：</label>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} value={beginDateValue} placeholder="请选择日期" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} placeholder="请选择日期"  value={endDateValue} onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.inits} />
                <div>
                    {btns}
                    <Modal style={{top:"20%"}}
                           title={this.state.ModalTitle}
                           visible={this.state.addModal}
                           footer={null}
                           onCancel={this.hideModal}
                           width={600}
                           maskClosable={false}
                    >
                        <div style={{margin:'0 0 16px 0'}}>
                            <Select style={{width:'450px',marginRight:"10px"}} placeholder='请选择任务' value={this.state.ToskId} onChange={this.getSelectTosk} showSearch={true}  filterOption={false} onSearch={this.getSelectSearch}>
                                {children}
                            </Select>
                            <ShallowBlueBtn width="80px" text="确定" margin="0 0 0 10px" onClick={this.choiceTask} />
                            {/*<ShallowBlueBtn width="80px" text="取消" onClick={this.hideModal} />*/}
                        </div>
                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="提示"
                           visible={this.state.prompt}
                           footer={null}
                           maskClosable={false}
                           closable={false}
                    >
                        <p style={{fontSize:"16px",}}>{this.state.promptText}</p>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 20px 0 0 ',width:"80px"}} onClick={this.state.prompType==='export'? this.exportModal:this.downloadModal} className="btn_ok">
                                确定
                            </Button>
                            <Button style={{margin:'',width:"80px"}} onClick={this.hideModal} className="btn_delete">
                                取消
                            </Button>
                        </p>

                    </Modal>
                    <Modal style={{top:"20%"}}
                           title="自定义字段"
                           visible={this.state.zdyModal}
                           footer={null}
                           className="ModalList"
                           onCancel={this.hideModal}
                           maskClosable={false}
                    >
                        <Table className={newWord.length < 1 ? 'noneDiv': 'activeDiv'} columns={list} dataSource={newWord} bordered  pagination={false} showHeader={false} />
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 15px 0 0 ',width:'100%',fontSize:'30px',lineHeight:'0'}} onClick={() => this.addNewsWord('add')} className="btn_ok">
                                +
                            </Button>
                        </p>
                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="自定义字段"
                           visible={this.state.zdyModals}
                           footer={null}
                           onCancel={this.hideModals}
                           maskClosable={false}
                    >
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="字段名称"
                            >
                                <Input value={wordName} onChange={this.changeWordName}/>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="字段类型"
                            >
                                <Select value={wordType} onChange={this.getSelects}>
                                    <Option value="0">文本</Option>
                                    <Option value="1">下拉框</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="下拉值"
                                style={showInput}
                            >
                                <Input value={OptionWords} onChange={this.getOptions}/>
                            </FormItem>
                        </Form>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button htmlType="submit" onClick={this.saveNewWord} className="btn_ok">
                                保存
                            </Button>
                            <Button style={showDel} onClick={this.getDelete} className="btn_delete">
                                删除
                            </Button>
                        </p>
                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="提示"
                           visible={this.state.visible}
                           footer={null}
                           maskClosable={false}
                           closable={false}
                    >
                        <p style={{fontSize:"16px",}}>是否确定删除该自定义字段？</p>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 20px 0 0 ',width:"80px"}} onClick={this.hideModalOk} className="btn_ok">
                                确定
                            </Button>
                            <Button style={{margin:'',width:"80px"}} onClick={this.hideDel} className="btn_delete">
                                取消
                            </Button>
                        </p>
                    </Modal>
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
}