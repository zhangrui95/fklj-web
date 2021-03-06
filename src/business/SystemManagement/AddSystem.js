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
    Select,
    Spin,
    message,
    InputNumber
} from 'antd';
import {
    getControlTimeCycle,
    UpdateControlTimeCycle
} from "../../actions/SystemManagement";
import moment from 'moment';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
import { Regular } from '../../components/Regular'
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
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
export class AddSystem extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            HourStyle: "noneDiv",
            timeValue: '',
            cycle: '',
            zdyValue: ''
        };
    }
    componentDidMount() {
        store.dispatch(getControlTimeCycle({},this.getNewsTime))
    }
    getNewsTime = () => {
        let result = store.getState().SystemManagement.data.getControlTimeCycle.result;
        this.setState({
            timeValue: (result.outofcontroltime === 24 || result.outofcontroltime === 48 || result.outofcontroltime === 72) ? result.outofcontroltime.toString() : '0',
            HourStyle: (result.outofcontroltime === 24 || result.outofcontroltime === 48 || result.outofcontroltime === 72) ? "noneDiv" : "activeDiv",
            cycle: result.defaulttaskcycle,
            zdyValue: !(result.outofcontroltime === 24 || result.outofcontroltime === 48 || result.outofcontroltime === 72) ? result.outofcontroltime : ''
        })
    }
    timeChange = (e) => {
        if (e === '0') {
            this.setState({
                HourStyle: "activeDiv",
                timeValue: e,
            })
        } else {
            this.setState({
                HourStyle: "noneDiv",
                timeValue: e,
                zdyValue: ''
            })
        }
    }
    cycleChange = (e) => {
        this.setState({
            cycle: parseInt(e)
        })
    }
    zdyInput = (e) => {
        if (e !== '' && e !== undefined) {
            let reg = Regular('number').reg
            if (!reg.test(e)) {
                message.error(Regular('number').msg);
                this.setState({
                    zdyValue: this.state.zdyValue
                })
                return;
            } else {
                this.setState({
                    zdyValue: parseInt(e)
                })
            }
        }
    }
    getSave = () => {
        let core = {}
        if (this.state.timeValue != '0') {
            core = { defaulttaskcycle: this.state.cycle.toString(), outofcontroltime: this.state.timeValue }
        } else {
            if (this.state.zdyValue !== '') {
                core = { defaulttaskcycle: this.state.cycle.toString(), outofcontroltime: this.state.zdyValue }
            } else {
                message.error(Regular('number').msg);
                return
            }
        }
        store.dispatch(UpdateControlTimeCycle(core))
        // store.dispatch(getControlTimeCycle({},this.getNewsTime))
    }
    render() {
        let result = store.getState().SystemManagement.data.getControlTimeCycle.result;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="sliderWrap">
                <div style={{ color: '#fff', padding: '16px 16px 0', fontSize: '16px' }}>
                    <Form onSubmit={this.saveModel}>
                        <FormItem
                            style={{ width: '300px', float: 'left' }}
                            {...formItemLayout}
                            label="失控时间设置"
                        >
                            <Select value={this.state.timeValue} placeholder="请选择失控时间" onChange={this.timeChange}>
                                <Option key="24">离开责任区24小时</Option>
                                <Option key="48">离开责任区48小时</Option>
                                <Option key="72">离开责任区72小时</Option>
                                <Option key="0">自定义</Option>
                            </Select>
                        </FormItem>
                        <div className={this.state.HourStyle} style={{ float: 'left' }}>
                            <FormItem
                                style={{ width: '100px', float: 'left' }}
                                {...formItem}
                            >
                                <InputNumber min={0} value={this.state.zdyValue} onChange={this.zdyInput} />
                            </FormItem>
                            <span style={{ color: '#fff', float: 'left', lineHeight: '40px' }}>小时</span>
                        </div>
                        <FormItem
                            style={{ width: '300px', float: 'left' }}
                            {...formItemLayout}
                            label="新增管控到任务"
                        >
                            <Select placeholder="请选择新增管控到任务" value={this.state.cycle === 0 ? '按天' : (this.state.cycle === 1) ? '按周' : ''} onChange={this.cycleChange}>
                                <Option key="0">按天</Option>
                                <Option key="1">按周</Option>
                            </Select>
                        </FormItem>
                    </Form>
                    <ShallowBlueBtn width="80px" text="保存" margin="5px 10px" onClick={this.getSave} />
                </div>
                <div className="spin-loading-box">
                    <Spin size="large" spinning={store.getState().SystemManagement.data.getControlTimeCycle.loading} />
                </div>
            </div>
        )
    }
}
AddSystem = Form.create()(AddSystem);
export default connect(mainReducer)(AddSystem);