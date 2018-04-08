/**
 * 研判报告基础信息
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {FileInput
} from "../../components/fileInput";
import {postBasicInformationData,editBasicInformationData,editBasicNameData
} from "../../actions/AuditReport";
import {store} from '../../index.js';
import {RadioButtonList} from '../../components/RadioButtonList';
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
   
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade
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
import  * as constants from "../../utils/Constants";
import {changeMenu} from "../../actions/actions";
import {
    api
} from '../../actions/actions';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export class BasicInformation extends Component{
    constructor(props){
        super(props);
        this.state={ 
            avatarSrc: '',
            basicInformation:store.getState().AuditReport.data.basicInformation,
            name: "",
            idcard: "",
            sex: '',
            nation: "",
            birth: "",
            detailedAddress: "",
            photo_url: "",
            domicile_place: "",
            email: "",
            passport_number: "",
            car_number: "",
            from_place: "",
            to_place: "",
            for_what: "",
            for_whom: "",
            for_whom_phone: "",
            optuser: "",
            createuser: "",
            toConfigure:store.getState().AuditReport.data.toConfigure,
        }
    }
    componentDidMount() {
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let basicInformation = store.getState().AuditReport.data.basicInformation;
       
        if(basicInformation === null){
            let creds = {
                    pd: {
                        idcard:this.props.idcard,
                        personId:this.props.personId,
                    },
                    
                }
            store.dispatch(postBasicInformationData(creds));
            
        }
        // let photo_url = '';
       
        // if(basicInformation !==null && basicInformation.photo_url !==undefined ){
            
        //     photo_url = basicInformation.photo_url;
        // }
        if(basicInformation !==null && basicInformation.photo_url !==undefined ){
            this.setState({
                photo_url:basicInformation.photo_url
            });
        }
        this.setState({
            basicInformation: basicInformation, 
        });
       
    }

    componentWillMount(){
    }
    componentWillReceiveProps(nextProps){
    
    let  basicInformation  = nextProps.AuditReport.data.basicInformation;
    let toConfigure = nextProps.AuditReport.data.toConfigure;
    if(basicInformation !==null && basicInformation.photo_url !==undefined ){
        this.setState({
            photo_url:basicInformation.photo_url
        });
    }
    this.setState({
        basicInformation: basicInformation,
        toConfigure:toConfigure,
    });

    }
    normFile =(e) => {
        if (e.file.status === 'done') {
            message.success(`头像上传成功!`);
            return e.file.response.result;
        }
        else if (!e.file.status) {
            return this.state.avatarSrc;
        }

    }

    beforeUpload = (file) => {//文件上传前钩子  参数为上传的文件 
        if ( file.type !== 'image/jpeg' && file.type !== 'image/png'){
            message.error(`请上传图片`);
            return false;
        }
        else if (file.size > 10485760) {//判断图片的大小
            message.error(`图片上传不能超过10M`);
            return false;
        }
    }

    //回调函数
    avatarChange= (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();//允许web异步读取存储在用户计算机上的文件
            reader.addEventListener('load', () => {
                this.setState({ avatarSrc: info.file.response.result,})//result  读取到文件的内容 这个属性只在文件读取完 有效 格式由读取的哪个方法决定 只读
            console.log('info',info);
            });

            reader.readAsDataURL(info.file.originFileObj);//readAsDataURL 读取指定的blo对象或file对象中内容  originFileObj 文件对象
            //readAsDataURL 操作完成，readyState属性将成为done状态，如果设置了onLoad事件，则调用，同时result会存在一个data：URL格式的字符串，来表示所有文件内容
        }
        else if(info.file.status === 'error') {
            message.error(`头像上传失败!`);
        }
    }
  //性别函数
  onSexChange=(e)=>{
      this.setState({
        sex:e.target.value,
      });
    
  }
  onNameChange=(e)=>{
    //   store.dispatch(editBasicNameData(e.target.value));
    this.setState({
        name:e.target.value,
    });
   
};
 //改变民族文本框
 onNationChange=(e)=>{
    this.setState({
        nation:e.target.value,
    });

};
//改变身份证号文本框
onIdNumberChange=(e)=>{
    this.setState({
        idcard:e.target.value,
    });
};

//改变户籍地址文本框
onAddressChange=(e)=>{
    this.setState({
        domicile_place:e.target.value,
    });
};
//改变现住地址文本框
onNowAddressChange=(e)=>{
    this.setState({
        to_place:e.target.value,
    });
};
//改变邮箱文本框
onEmailChange=(e)=>{
    this.setState({
        email:e.target.value,
    });
};
//改变护照号码文本框
onPassportNumberChange=(e)=>{
    this.setState({
        passport_number:e.target.value,
    });
};
//改变车票号码文本框
onCarNumberChange=(e)=>{
    this.setState({
        car_number:e.target.value,
    });
};
//改变从哪里来文本框
onFromCityChange=(e)=>{
    this.setState({
        from_place:e.target.value,
    });
};
//改变来我省目的文本框
onPurposeChange=(e)=>{
    this.setState({
        for_what:e.target.value,
    });
};
//改变投奔人员文本框
onDefectedPersonnelChange=(e)=>{
    this.setState({
        for_whom:e.target.value,
    });
};
//改变联系电话文本框
onContactNumberChange=(e)=>{
    this.setState({
        for_whom_phone:e.target.value,
    });
};
    //点击下一步 改变选择样式
    handleNextClickClear = (e) =>{
        //改变选中样式
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           
           
            if (!err) {
                
                let menus = store.getState().AuditReport.uiData.menus;
                let isSelectMenu;
                for(let x in menus){
                    if(menus[x].isSelect === true){
                        isSelectMenu = menus[x];
                        break;
                    }
                }
                store.dispatch(changeMenu(menus[isSelectMenu.stage],'getData',constants.AUDIT_REPORT_MODULE)); 
                let userItem = JSON.parse(sessionStorage.getItem('user'));
               
                    let basic = this.state.basicInformation;
                    let creds = {
                        name:this.state.name?this.state.name:basic.name,
                        idcard:this.state.idcard?this.state.idcard:basic.idcard,
                        sex:this.state.sex?this.state.sex:basic.sex,
                        nation:this.state.nation?this.state.nation:basic.nation,
                        birth:this.state.birth?this.state.birth:basic.birth,
                        detailedAddress:this.state.detailedAddress?this.state.detailedAddress:basic.detailedAddress,
                        photo_url:this.state.avatarSrc?this.state.avatarSrc:basic.photo_url?basic.photo_url:'',
                        domicile_place:this.state.domicile_place?this.state.domicile_place:basic.domicile_place,
                        email:this.state.email?this.state.email:basic.email,
                        passport_number:this.state.passport_number?this.state.passport_number:basic.passport_number,
                        car_number:this.state.car_number?this.state.car_number:basic.car_number,
                        from_place:this.state.from_place?this.state.from_place:basic.from_place,
                        to_place:this.state.to_place?this.state.to_place:basic.to_place,
                        for_what:this.state.for_what?this.state.for_what:basic.for_what,
                        for_whom:this.state.for_whom?this.state.for_whom:basic.for_whom,
                        for_whom_phone:this.state.for_whom_phone?this.state.for_whom_phone:basic.for_whom_phone,
                        optuser:userItem.body.idcard,
                        createuser:userItem.body.idcard,
                    }
                    store.dispatch(editBasicInformationData(creds));
               

            }
        })
        
    };
//身份证校验
testid =(rule, value, callback)=> {
    let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if(!reg.test(value)){
        callback('身份证号码不合规', 'input Spaces, please check');
        return;
    }
    callback();
    return;
}
testPhone=(rule, value, callback)=>{
    const id = value;
    if(id){
        let myregPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!myregPhone.test(id)){
            callback('请输入正确的手机号码', 'input Spaces, please check');
            return;
        }
        // let myregTel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;  
        // if(!myregTel.test(id)){
        //     callback('请输入正确的电话号码', 'input Spaces, please check');
        //     return;
        // }
        callback();
        return;
    }
}
    render(){
        console.log('this.state.sex',this.state.sex);
        let toConfigure = this.state.toConfigure;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
           labelCol: {
               span: 4,
           },
           wrapperCol: {
               span: 20
           }
       };
            return(
                <div style={{width:"700px",margin:"0 auto",marginTop:"50px"}}>
                <Form>
                    <div>
                        <div style={{float:"left",position:"relative",marginRight:"20px"}}>
                        <FormItem
                                {...formItemLayout} >

                                {getFieldDecorator('photo_url', {
                                    getValueFromEvent: this.normFile
                                })(
                                    <Upload  name="file" 
                                        showUploadList={false} 
                                        action={api + '/data/FilePicupload' }
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.avatarChange}
                                       disabled= {toConfigure==='JudgeHistory'?true:false}
                                    >
                                    {
                                        this.state.avatarSrc ?
                                            <img src={this.state.avatarSrc} alt="" className="avatar" width="180px" height="213px"/> :
                                            <img src={this.state.photo_url?this.state.photo_url:'/images/basiczanwu.png'} alt=""  ref="img" width="180px" height="213px"/>
                                    }
                                </Upload>
                                )}
                            </FormItem>
                        </div>
                       <div style={{width:"500px",float:"left",marginTop:"15px"}}>
                           <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                        required: true, message: '请输入姓名!',
                                        }],
                                        initialValue:this.state.basicInformation === null ?'' : this.state.basicInformation.name ,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onNameChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                           </div>
                           <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="民族"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('nation', {
                                        rules: [{
                                        required: true, message: '请输入民族!',
                                        }],
                                        initialValue:this.state.basicInformation === null ?'' : this.state.basicInformation.nation,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onNationChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                            </div>
                           <div style={{marginBottom:"20px"}}>
                           {/* <span style={key}>*</span><label htmlFor="" style={labelStyle}>性别：</label>
                           <RadioGroup onChange={this.onSexChange} disabled = {toConfigure==='JudgeHistory'?true:false} 
                           value={this.state.sex}>
                                <Radio value='男' style={{color:"#fff"}}>男</Radio>
                                <Radio value='女' style={{color:"#fff"}}>女</Radio>
                            </RadioGroup> */}
                            <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('sex', {
                                        rules: [{
                                        required: true, message: '请输入性别!',
                                        }],
                                        initialValue:this.state.basicInformation === null ?'' : this.state.basicInformation.sex,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onSexChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                           </div>
                           <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('idcard', {
                                        rules: [{
                                            required: true,
                                            message: '请输入身份证号！',
                                      }, {
                                            validator: this.testid
                                      }],
                                        initialValue: this.state.basicInformation === null ?this.state.idcard : this.state.basicInformation.idcard,
                                        validateFirst:true,
                                       // validateTrigger:'onBlur'
                                    })(
                                        
                                        <Input  onChange={this.onIdNumberChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                        
                                    )}
                                </FormItem>
                           </div>
                       </div>
                       <div style={clear}></div>
                    </div>
                    <div>
                       <div style={{marginBottom:"20px",marginTop:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="户籍地址"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('domicile_place', {
                                        initialValue:this.state.basicInformation === null ?this.state.domicile_place : this.state.basicInformation.domicile_place,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onAddressChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="现住地址"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('to_place', {
                                        
                                        initialValue:this.state.basicInformation === null ?this.state.to_place : this.state.basicInformation.to_place,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onNowAddressChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="邮箱"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('email', {
                                        
                                        initialValue:this.state.basicInformation === null ?this.state.email : this.state.basicInformation.email,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onEmailChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                        
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="护照号码"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('passport_number', {
                                       
                                        initialValue:this.state.basicInformation === null ?this.state.passport_number : this.state.basicInformation.passport_number,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onPassportNumberChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="车牌号码"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('car_number', {
                                        
                                        initialValue:this.state.basicInformation === null ?this.state.car_number : this.state.basicInformation.car_number,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onCarNumberChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="从哪里来"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('from_place', {
                                        
                                        initialValue:this.state.basicInformation === null ?this.state.from_place : this.state.basicInformation.from_place,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onFromCityChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="来我省目的"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('for_what', {
                                       
                                        initialValue:this.state.basicInformation === null ?this.state.for_what : this.state.basicInformation.for_what,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onPurposeChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="投奔人员"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('for_whom', {
                                        
                                        initialValue:this.state.basicInformation === null ?this.state.for_whom : this.state.basicInformation.for_whom,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onDefectedPersonnelChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                       <div style={{marginBottom:"20px"}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="联系电话"
                                    hasFeedback
                                    >
                                    {getFieldDecorator('for_whom_phone', {
                                    //     rules: [{
                                    //         required: true,
                                    //         message: '请输入身份证号！',
                                    //   },{
                                    //         validator: this.testPhone
                                    //   }],
                                        initialValue:this.state.basicInformation === null ?this.state.for_whom_phone : this.state.basicInformation.for_whom_phone,
                                        validateFirst:true
                                    })(
                                        <Input onChange={this.onContactNumberChange} disabled = {toConfigure==='JudgeHistory'?true:false}/>
                                    )}
                                </FormItem>
                       </div>
                    </div>
                    <div style={{margin:"15px 0"}}>
                                {/* <ShallowBlueBtn text="下一步"  onClick={this.handleNextClickClear} width="80px" float="right"/>
                                <div style={clear}></div> */}
                            <Row>
                                <Col span={26} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit" onClick={this.handleNextClickClear} width="80px" className="btn_ok">下一步</Button>
                                
                                </Col>
                            </Row>
                    </div>
                </Form>
                </div>
            );
        }
};
const wrap = {
    width:"300px",
    border: "1px solid #0C5F93",
    background: "rgba(25,41,85,0.5)",
    marginBottom:"20px",
}
const titlediv = {
    background: "rgba(2, 24, 85, 0.5)",
    height:"40px",
    lineHeight:"40px",
    color:"#fff",
    padding:"0 15px",

}
const clear = {
    clear:"both"
}
const key = {
    color:"red",
    marginRight:"5px"
}
const labelStyle = {
    fontSize:"14px",
    color:"#fff",
    width:"70px",
    display:"inline-block",
}
const labelStyle2 = {
    fontSize:"14px",
    color:"#fff",
    width:"85px",
    display:"inline-block",
    textAlign:"right",
}
BasicInformation = Form.create()(BasicInformation);
export default connect(mainReducer)(BasicInformation);