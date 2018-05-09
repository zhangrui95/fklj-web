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
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
export  class AddSystem extends Component{
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <div className="sliderWrap">
                <div style={{color:'#fff',padding:'16px 16px 0',fontSize:'16px'}}>
                    <Form onSubmit={this.saveModel}>
                        <FormItem
                            style={{width:'400px'}}
                            {...formItemLayout}
                            label="失控时间设置"
                        >
                            <Select>
                                <Option key="1">离开责任区24小时</Option>
                                <Option key="2">自定义</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
AddSystem = Form.create()(AddSystem);
export default connect(mainReducer)(AddSystem);