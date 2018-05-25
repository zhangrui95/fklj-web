/**
 * 呼市系统设置=>失控时间设置右侧
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
    StylePage,
    ShallowBlueBtn,
    Pag,
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    monthFormat,
    dateFormat,
    serverUrl
} from '../../utils/';
import {
    Form,
    Input,
    Select
} from 'antd';

import moment from 'moment';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const formItem = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 0 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
    },
};
export  class AddSystem extends Component{
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            HourStyle: "noneDiv"
        };
    }
    timeChange = (e) => {
        console.log(e)
        if(e === '0'){
            this.setState({
                HourStyle: "activeDiv"
            })
        } else {
            this.setState({
                HourStyle: "noneDiv"
            })
        }
    }
    cycleChange(){

    }
    getSave(){

    }
    render() {
        return(
            <div className="sliderWrap">
                <div style={{color:'#fff',padding:'16px 16px 0',fontSize:'16px'}}>
                    <Form onSubmit={this.saveModel}>
                        <FormItem
                            style={{width:'300px', float:'left'}}
                            {...formItemLayout}
                            label="失控时间设置"
                        >
                            <Select placeholder="请选择失控时间" onChange={this.timeChange}>
                                <Option key="1">离开责任区24小时</Option>
                                <Option key="2">离开责任区48小时</Option>
                                <Option key="3">离开责任区72小时</Option>
                                <Option key="0">自定义</Option>
                            </Select>
                        </FormItem>
                        <div className={this.state.HourStyle} style={{float:'left'}}>
                            <FormItem
                                style={{width:'100px', float:'left'}}
                                {...formItem}
                            >
                                <Input/>
                            </FormItem>
                            <span style={{color:'#fff', float:'left',lineHeight:'40px'}}>小时</span>
                        </div>
                        <FormItem
                            style={{width:'300px', float:'left'}}
                            {...formItemLayout}
                            label="默认周期设置"
                        >
                            <Select placeholder="请选择默认周期" onChange={this.cycleChange}>
                                <Option key="0">按天</Option>
                                <Option key="1">按月</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    <ShallowBlueBtn width="80px" text="确定" margin="5px 10px" onClick={this.getSave}/>
                </div>
            </div>
        )
    }
}
AddSystem = Form.create()(AddSystem);
export default connect(mainReducer)(AddSystem);