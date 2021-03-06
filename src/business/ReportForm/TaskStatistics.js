/**
 *统计报表-任务数据统计
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
    postAbnormalChartsData,
    postAttentionCategoryChartsData,
    postCompleteChartsData,
    postTaskTotalAttentionData,
} from "../../actions/ReportForm"
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
                beginTimeSet: '',
                endTimeSet: ''
            },
            beginTimeSet: '',
            endTimeSet: ''
        };

    }

    handleDayClick(event) {
        let nowTImes = getYmd(getNowFormatDate(), 'ymd');
        this.setState({
            queryType: "day",
            // beginTimeSet: nowTImes,
            // endTimeSet: nowTImes,
            // dateSet: {
            //     beginTimeSet: nowTImes,
            //     endTimeSet: nowTImes
            // },
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: nowTImes,
                endTime: nowTImes,
            },
            showCount: constants.pageSize

        }
        store.dispatch(postTaskTotalAttentionData(creds));
        store.dispatch(postAbnormalChartsData(creds));
        store.dispatch(postAttentionCategoryChartsData(creds));
        store.dispatch(postCompleteChartsData(creds));
    }

    handleYearClick(event) {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        this.setState({
            queryType: "year",
            // beginTimeSet: NowYEAR + '-01' + '-01',
            // endTimeSet: NowYEAR + '-12' + '-31',
            // dateSet: {
            //     beginTimeSet: NowYEAR + '-01' + '-01',
            //     endTimeSet: NowYEAR + '-12' + '-31'
            // },
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
            showCount: constants.pageSize

        }
        store.dispatch(postTaskTotalAttentionData(creds));
        store.dispatch(postAbnormalChartsData(creds));
        store.dispatch(postAttentionCategoryChartsData(creds));
        store.dispatch(postCompleteChartsData(creds));
    }

    handleWeekClick(event) {
        this.setState({
            queryType: "week",
            // beginTimeSet: getMondayTime(),
            // endTimeSet: getSundayTime(),
            // dateSet: {
            //     beginTimeSet: getMondayTime(),
            //     endTimeSet: getSundayTime()
            // },
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: getMondayTime(),
                endTime: getSundayTime(),
            },
            showCount: constants.pageSize

        }
        store.dispatch(postTaskTotalAttentionData(creds));
        store.dispatch(postAbnormalChartsData(creds));
        store.dispatch(postAttentionCategoryChartsData(creds));
        store.dispatch(postCompleteChartsData(creds));
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
            beginTimeSet: this.state.beginDate,
            endTimeSet: this.state.endDate,
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: this.state.beginDate,
                endTime: this.state.endDate,
            },
            showCount: constants.pageSize

        }
        store.dispatch(postTaskTotalAttentionData(creds));
        store.dispatch(postAbnormalChartsData(creds));
        store.dispatch(postAttentionCategoryChartsData(creds));
        store.dispatch(postCompleteChartsData(creds));
    }

    componentDidMount() {
        //当前传过来的类型
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            entityOrField: true,
            pd: {
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
        }
        store.dispatch(postTaskTotalAttentionData(creds));
    }

    //接收到新的propos state 后进行渲染之前调用
    componentWillUpdate(nextProps, nextState) {
        let isTrue = Compare(this.state.dateSet, nextState.dateSet);
        if (isTrue === false) {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    beginTime: nextState.dateSet.beginTimeSet,
                    endTime: nextState.dateSet.endTimeSet,
                },
                showCount: constants.pageSize
            }
            store.dispatch(postTaskTotalAttentionData(creds));
        }
    }

    render() {
        let dateSet = {
            beginTimeSet: this.state.beginTimeSet,
            endTimeSet: this.state.endTimeSet
        };
        let taskTotalAttention = store.getState().ReportForms.data.taskTotalAttention.result.list;
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
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }

        let dateSwitching;
        if (queryType === 'day') {
            dateSwitching = <ul style={smallIcon}>
                <li style={IconLiActive} onClick={(event) => this.handleDayClick(event)}>本日</li>
                <li style={IconLi} onClick={(event) => this.handleWeekClick(event)}>本周</li>
                <li style={IconLinoborder} onClick={(event) => this.handleYearClick(event)}>本年</li>
                <div style={clear}></div>
            </ul>;
        } else if (queryType === 'week') {
            dateSwitching = <ul style={smallIcon}>
                <li style={IconLi} onClick={(event) => this.handleDayClick(event)}>本日</li>
                <li style={IconLiActive} onClick={(event) => this.handleWeekClick(event)}>本周</li>
                <li style={IconLinoborder} onClick={(event) => this.handleYearClick(event)}>本年</li>
                <div style={clear}></div>
            </ul>;
        } else if (queryType === 'year') {
            dateSwitching = <ul style={smallIcon}>
                <li style={IconLi} onClick={(event) => this.handleDayClick(event)}>本日</li>
                <li style={IconLi} onClick={(event) => this.handleWeekClick(event)}>本周</li>
                <li style={IconLinoborderActive} onClick={(event) => this.handleYearClick(event)}>本年</li>
                <div style={clear}></div>
            </ul>;
        } else {
            dateSwitching = <ul style={smallIcon}>
                <li style={IconLi} onClick={(event) => this.handleDayClick(event)}>本日</li>
                <li style={IconLi} onClick={(event) => this.handleWeekClick(event)}>本周</li>
                <li style={IconLinoborder} onClick={(event) => this.handleYearClick(event)}>本年</li>
                <div style={clear}></div>
            </ul>;
        }

        return (
            <div className="sliderWrap" style={{borderBottom: "0", height: 'auto'}}>
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <p style={{fontSize: "18px", color: "#fff", float: "left", marginRight: "50px"}}>关注人员总数：
                            <span
                            style={{
                                width: "80px",
                                display: "inline-block",
                                _display: "inline",
                                zoom: "1"
                            }}>{taskTotalAttention}</span>
                        </p>
                        {dateSwitching}
                        <div style={{float: "left", marginLeft: "50px"}}>
                            <label htmlFor="" style={labelStyle2}>其他时间：</label>
                            <DatePicker  placeholder="" format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                        value={beginDateValue} onChange={this.handleBeginDeteClick}/>
                            <span className="font14" style={{marginRight: "10px"}}>至</span>
                            <DatePicker  placeholder="" format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                        value={endDateValue} onChange={this.handleEndDeteClick}/>
                            <ShallowBlueBtn text="查询" margin="0 0 0 20px" width="60px" onClick={this.handleQueryClick}/>

                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*统计内容*/}
                    {/*第一行*/}
                    <div style={{background: "rgba(25,41,85,0.5)"}}>
                        <div style={{borderBottom: '1px solid #0C5F93', width: "99.99%", height: "43%"}}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>异常人员</p>
                            {/*添加图表*/}
                            <div>
                                <AbnormalCharts dateSet={dateSet}/>
                            </div>
                        </div>

                    </div>
                    {/*第二行*/}
                    <div style={{background: "rgba(25,41,85,0.5)", marginBottom: "20px"}}>
                        <div style={{
                            float: "left",
                            borderRight: "1px solid #0C5F93",
                            borderBottom: '1px solid #0C5F93',
                            width: "49.9%",
                            height: "43%"
                        }}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>关注人员类别</p>
                            {/*添加图表*/}
                            <div>
                                <AttentionCategory dateSet={dateSet}/>
                            </div>
                        </div>
                        <div style={{float: "left", borderBottom: '1px solid #0C5F93', width: "49.9%", height: "43%"}}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>数据完整性</p>
                            {/*添加图表*/}
                            <div>
                                <CompleteCharts dateSet={dateSet}/>
                            </div>
                        </div>
                        <div style={clear}></div>
                    </div>
                </div>


            </div>
        );
    }
}
//异常人员图表
class AbnormalCharts extends Component {
    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                //  code:this.props.type
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
            showCount: constants.pageSize
        }
        store.dispatch(postAbnormalChartsData(creds));
    }

    //组件props发生变化，更新state
    // componentWillReceiveProps(nextProps) {
    //     let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
    //     if (isTrue === false) {
    //         let creds = {
    //             currentPage: 1,
    //             entityOrField: true,
    //             pd: {
    //                 beginTime: nextProps.dateSet.beginTimeSet,
    //                 endTime: nextProps.dateSet.endTimeSet,
    //             },
    //             showCount: constants.pageSize
    //         }
    //         store.dispatch(postAbnormalChartsData(creds));
    //     }
    // }

    render() {
        let AbnormalList = store.getState().ReportForms.data.AbnormalList.result.list;
        let isFetching = store.getState().ReportForms.data.AbnormalList.isFetching;
        var AbnormalOption = {
            color: ['#F88A6F'],
            textStyle: {
                color: "#fff"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            grid: {
                left: '3%',
                right: '4%',

                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine: {
                    lineStyle: {
                        color: '#FFFAF0', //Y轴线条颜色
                        width: 1
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: ['在逃人员', '违法犯罪', '吸贩毒人员', '涉恐背景人员', ],
                axisLine: {
                    lineStyle: {
                        color: '#FFFAF0', //Y轴线条颜色
                        width: 1
                    }
                },
            },
            series: [{
                name: '数据',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
                data: AbnormalList,
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                "#3DC7D1", '#F88A6F', '#00ACEE', "#3dc7d1"
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }]
        };
        return (
            <div style={{position: "relative", height: "99%"}}>
                {isFetching === true ?
                    <div style={{textAlign: "center", position: "absolute", left: "45%", top: "30%"}}>
                        <Spin size="large"/>
                    </div> :
                    <EchartsReact
                        option={AbnormalOption}
                        style={{height: '90%', width: '98%', margin: "0 auto"}}
                    />}
            </div>
        );
    }
}
//关注人员类别
class AttentionCategory extends Component {
    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            entityOrField: true,
            pd: {
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
        }
        store.dispatch(postAttentionCategoryChartsData(creds));
    }

    //组件props发生变化，更新state
    // componentWillReceiveProps(nextProps) {
    //     let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
    //     if (isTrue === false) {
    //         let creds = {
    //             currentPage: 1,
    //             entityOrField: true,
    //             pd: {
    //                 beginTime: nextProps.dateSet.beginTimeSet,
    //                 endTime: nextProps.dateSet.endTimeSet,
    //             },
    //             showCount: constants.pageSize
    //         }
    //         store.dispatch(postAttentionCategoryChartsData(creds));
    //     }
    // }

    render() {
        let AttentionCategoryList = store.getState().ReportForms.data.AttentionCategoryList.result.list;
        let isFetching = store.getState().ReportForms.data.AttentionCategoryList.isFetching;
        var AttentionOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            xAxis: [{
                type: 'category',
                data: [
                    '盘查异常', '重点人员', '临控对象', '在侦在控'
                ],
                axisLine: {
                    lineStyle: {
                        color: '#FFFAF0', //Y轴线条颜色
                        width: 1
                    }
                },
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLine: {
                    lineStyle: {
                        color: '#FFFAF0', //Y轴线条颜色
                        width: 1
                    }
                },
            }],
            textStyle: {
                color: "#fff"
            },

            series: [{
                name: '数据',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barWidth: '50%',
                data: AttentionCategoryList,
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                "#3DC7D1", '#F88A6F', '#00ACEE', "#3DC7D1"
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                }

            }]
        };
        return (
            <div style={{position: "relative", height: "99%"}}>
                {isFetching === true ?
                    <div style={{textAlign: "center", position: "absolute", left: "45%", top: "30%"}}>
                        <Spin size="large"/>
                    </div> :
                    <EchartsReact
                        option={AttentionOption}
                        style={{height: '90%', width: '100%',}}
                    />}
            </div>
        );
    }
}
//数据完整性
class CompleteCharts extends Component {
    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            entityOrField: true,
            pd: {
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
        }
        store.dispatch(postCompleteChartsData(creds));
    }

    //组件props发生变化，更新state
    // componentWillReceiveProps(nextProps) {
       
    //     let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
    //     if (isTrue === false) {
    //         let creds = {
    //             currentPage: 1,
    //             entityOrField: true,
    //             pd: {
    //                 beginTime: nextProps.dateSet.beginTimeSet,
    //                 endTime: nextProps.dateSet.endTimeSet,
    //             },
    //             showCount: constants.pageSize
    //         }
    //         store.dispatch(postCompleteChartsData(creds));
    //     }
    // }

    render() {
        let completeList = store.getState().ReportForms.data.completeList.result.list;
        let isFetching = store.getState().ReportForms.data.completeList.isFetching;
        var completeOption = {
            // title : {
            //     text: '某站点用户访问来源',
            //     subtext: '纯属虚构',
            //     x:'center'
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'horizontal',
            //     // left: 'left',
            //     data: ['数据完整','数据不完整'],
            //     textStyle:{
            //         color:"#fff"
            //     }
            // },
            color: ['#AAE8FF', '#00ACEE'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '数据完整性',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: completeList,
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
            <div style={{position: "relative", height: "99%"}}>
                {isFetching === true ?
                    <div style={{textAlign: "center", position: "absolute", left: "45%", top: "30%"}}>
                        <Spin size="large"/>
                    </div> :
                    <EchartsReact
                        option={completeOption}
                        style={{height: '90%', width: '100%',}}
                    />}
            </div>
        );
    }
}
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 10px",
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