/**
 *呼市统计报表-任务统计
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
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    changeMenu
} from "../../actions/actions";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade,
    TextArea,
    FileBtn
} from "../generalPurposeModule";
import EchartsReact from 'echarts-for-react';
import {
    getSubtaskListGroupByType,
    getSubtaskListGroupByCycle,
    getSubtaskCount
} from "../../actions/ReportForms"
import {
    DatePicker,
    message,
    Spin
} from 'antd';
import {
    monthFormat,
    dateFormat,
    serverUrl,
    getYmd,
    getNowFormatDate,
    getSundayTime,
    getMondayTime,
    Compare
} from '../../utils/';
import moment from 'moment';
moment.locale('zh-cn');


class TaskStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryType: 'year',
            beginDate: '',
            endDate: '',
            dateSet: {
                startTimeSet: '',
                endTimeSet: ''
            },
            startTimeSet: '',
            endTimeSet: ''
        };

    }
    handleBeginDeteClick = (date, dateString) => {
        this.setState({
            beginDate: dateString,
        });

    }
    handleEndDeteClick = (date, dateString) => {
        this.setState({
            endDate: dateString,
        });
    }
    handleQueryClick = () => { //查询按钮点击事件
        this.setState({
            startTimeSet: this.state.beginDate,
            endTimeSet: this.state.endDate,
        });
        if ( this.state.beginDate!= "" && this.state.endDate != "" && this.state.beginDate > this.state.endDate) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }else{
            let creds = {startTime: this.state.beginDate, endTime: this.state.endDate,}
            store.dispatch(getSubtaskListGroupByType(creds));
            store.dispatch(getSubtaskListGroupByCycle(creds));
            store.dispatch(getSubtaskCount(creds));
        }
    }

    componentDidMount() {
        //当前传过来的类型
        let myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
                startTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getSubtaskCount(creds));
    }

    //接收到新的propos state 后进行渲染之前调用
    componentWillUpdate(nextProps, nextState) {
        let isTrue = Compare(this.state.dateSet, nextState.dateSet);
        if (isTrue === false) {
            let creds = {
                    startTime: nextState.dateSet.startTimeSet,
                    endTime: nextState.dateSet.endTimeSet,
            }
            // store.dispatch(postTaskTotalAttentionData(creds));
        }
    }
    inits = () => {
        this.setState({
            beginDate:'',
            endDate: '',
        });
        let myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            startTime: NowYEAR + '-01' + '-01',
            endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getSubtaskListGroupByType(creds));
        store.dispatch(getSubtaskListGroupByCycle(creds));
        store.dispatch(getSubtaskCount(creds));
    }
    render() {
        let dateSet = {
            startTimeSet: this.state.startTimeSet,
            endTimeSet: this.state.endTimeSet
        };
        let taskTotalAttention = store.getState().ReportForms.data.ToskCount.result.count;
        let queryType = this.state.queryType;
        let begin = this.state.beginDate;
        let end = this.state.endDate;
        let beginDateValue = '';
        if (begin === '') {} else {
            beginDateValue = moment(begin, dateFormat);
        }
        let endDateValue = '';
        if (end === '') {} else {
            endDateValue = moment(end, dateFormat);
        }
        return (
            <div className="sliderWrap" style={{borderBottom: "0", height: 'auto'}}>
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <p style={{fontSize: "18px", color: "#fff", float: "left", marginRight: "50px"}}>任务数量：
                            <span
                                style={{
                                    width: "80px",
                                    display: "inline-block",
                                    _display: "inline",
                                    zoom: "1"
                                }}>{taskTotalAttention}</span>
                        </p>
                        <div style={{float: "left", marginLeft: "50px"}}>
                            <label htmlFor="" style={labelStyle2}>统计时间：</label>
                            <DatePicker  placeholder="请选择日期" format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                         value={beginDateValue} onChange={this.handleBeginDeteClick}/>
                            <span className="font14" style={{marginRight: "10px"}}>至</span>
                            <DatePicker  placeholder="请选择日期" format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                         value={endDateValue} onChange={this.handleEndDeteClick}/>
                            <ShallowBlueBtn  width="80px" text="查询" margin="0 10px 0 10px" onClick={this.handleQueryClick}/>
                            <ShallowBlueBtn width="80px" text="重置" onClick={this.inits} />
                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*统计内容*/}
                    {/*第一行*/}
                    <div style={{background: "rgba(25,41,85,0.5)"}}>
                        <div style={{
                            float: "left",
                            borderRight: "1px solid #0C5F93",
                            // borderBottom: '1px solid #0C5F93',
                            width: "49.9%",
                            height: "633px"
                        }}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>任务完成情况</p>
                            {/*添加图表*/}
                            <div style={{height:'80%'}}>
                                <TaskDoneCharts dateSet={dateSet}/>
                            </div>
                        </div>
                        <div style={{float: "left", width: "49.9%", height: "633px"}}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>任务周期</p>
                            {/*添加图表*/}
                            <div style={{height:'80%'}}>
                                <TaskCycleCharts dateSet={dateSet}/>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
//任务完成情况图表
class TaskDoneCharts extends Component {
    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            startTime: NowYEAR + '-01' + '-01',
            endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getSubtaskListGroupByType(creds));
    }

    render() {
        const ToskChartsList = store.getState().ReportForms.data.getSubtaskListGroup.result.list;
        let ToskChartsLists = [];
        for(let i in ToskChartsList){
            if(i!=='remove'){
                ToskChartsLists.push({name:ToskChartsList[i].name == 0 ? '待办任务':(ToskChartsList[i].name === 1 ? '已完成任务' : '超期任务'),value:ToskChartsList[i].value})
            }
        }
        let isFetching = store.getState().ReportForms.data.getSubtaskListGroup.isFetching;
        var liveOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#3dc7d1', '#00acee', '#f88a6f'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '任务完成情况',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}\n{c}',
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },

                data: ToskChartsLists,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        return (
            <div style={{position:"relative",height:"99%"}}>
                {isFetching ===  true?
                    <div style={{textAlign:"center",position:"absolute",left:"45%",top:"30%"}}>
                        <Spin size="large" />
                    </div>:
                    <EchartsReact
                        option={liveOption}
                        style={{height: '90%', width: '100%'}}
                    />}
            </div>
        );
    }
}
//任务周期
class TaskCycleCharts extends Component {
    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            startTime: NowYEAR + '-01' + '-01',
            endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getSubtaskListGroupByCycle(creds));
    }
    render() {
        let List = store.getState().ReportForms.data.getSubtaskListGroupByCycle.result.list;
        let TostCycleChartsList = [];
        for(let i in List){
            if(i!=='remove'){
                TostCycleChartsList.push({name:List[i].name== 0 ? '按天':(List[i].name == 1 ? '按周' : '按月'),value:List[i].value})
            }
        }
        let isFetching = store.getState().ReportForms.data.getSubtaskListGroupByCycle.isFetching;
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: "bottom",
                data: [{
                    name: '按天任务',
                    textStyle: {
                        color: '#fff'
                    }
                }, {
                    name: '按周任务',
                    textStyle: {
                        color: '#fff'
                    }
                }]
            },
            color: ['#3dc7d1', '#00acee', '#fad336', '#f88a6f'],
            series: [{
                name: '任务周期',
                type: 'pie',
                radius: ['55%', '70%'],
                avoidLabelOverlap: false,

                top: 'top',

                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}\n{c}',
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                    }
                },
                data: TostCycleChartsList,
            },

            ]
        };
        return (
            <div style={{position:"relative",height:"99%"}}>
                {isFetching ===  true?
                    <div style={{textAlign:"center",position:"absolute",left:"45%",top:"30%"}}>
                        <Spin size="large" />
                    </div>:
                    <EchartsReact
                        option={option}
                        style={{height: '80%', width: '100%',}}
                    />}
            </div>
        );
    }
}
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 10px 2px",
    overflow: "hidden"
}
const labelStyle2 = {
    fontSize: "14px",
    color: "#fff",
    width: "85px",
    display: "inline-block",
    textAlign: "right",
    marginRight: "10px"
}
const IconLi = {
    width: "77px",
    borderRight: "1px solid #0C5F93",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    cursor: "pointer"
}
const IconLiActive = {
    width: "77px",
    borderRight: "1px solid #0C5F93",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    background: "rgb(10, 119, 174)",
    cursor: "pointer"
}
const IconLinoborderActive = {
    width: "77px",
    background: "rgb(10, 119, 174)",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    cursor: "pointer"
}
const IconLinoborder = {
    width: "77px",

    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    cursor: "pointer"
}
const smallIcon = {
    width: "233px",
    border: "1px solid #0C5F93",
    height: "30px",
    borderRadius: "3px",
    float: "left",
}
const clear = {
    clear: "both"
}
export default connect(mainReducer)(TaskStatistics);