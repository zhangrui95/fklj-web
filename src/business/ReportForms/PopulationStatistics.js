/**
 *呼市统计报表-管控人员统计
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

import {
    fetchDistributeChartsData,
    postOriginalChartsData,
    postLiveChartsData,
    postSexChartsData,
    postObtainEmploymentChartsData,
    fetchAgeChartsData,
    postTotalAttentionData,
    postAgeChartsData,
    postDistributeChartsData
} from "../../actions/ReportForms"
import EchartsReact from 'echarts-for-react';
require("echarts/map/js/province/heilongjiang.js");
require("echarts/map/js/province/neimenggu.js");
require("echarts/map/js/province/guangxi.js");
require("echarts/map/js/province/xinjiang.js");
require("echarts/map/js/province/shandong.js");
require("echarts/map/js/province/liaoning.js");
require("echarts/map/js/province/jilin.js");
// require("echarts/map/js/city/huhehaote.js");
require("../../components/map/city/huhehaote.js");
import {
    DatePicker,
    Spin,
    message
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



class PopulationStatistics extends Component {

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
        store.dispatch(postTotalAttentionData(creds));
        store.dispatch(postOriginalChartsData(creds));
        store.dispatch(postLiveChartsData(creds));
        store.dispatch(postObtainEmploymentChartsData(creds));
        store.dispatch(postSexChartsData(creds));
        store.dispatch(postAgeChartsData(creds));

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
        store.dispatch(postTotalAttentionData(creds));
        store.dispatch(postOriginalChartsData(creds));
        store.dispatch(postLiveChartsData(creds));
        store.dispatch(postObtainEmploymentChartsData(creds));
        store.dispatch(postSexChartsData(creds));
        store.dispatch(postAgeChartsData(creds));
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
        store.dispatch(postTotalAttentionData(creds));
        store.dispatch(postOriginalChartsData(creds));
        store.dispatch(postLiveChartsData(creds));
        store.dispatch(postObtainEmploymentChartsData(creds));
        store.dispatch(postSexChartsData(creds));
        store.dispatch(postAgeChartsData(creds));

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
        store.dispatch(postTotalAttentionData(creds));
        store.dispatch(postOriginalChartsData(creds));
        store.dispatch(postLiveChartsData(creds));
        store.dispatch(postObtainEmploymentChartsData(creds));
        store.dispatch(postSexChartsData(creds));
        store.dispatch(postAgeChartsData(creds));

    }
    //生命周期  实例化期 真实的dom被渲染出来之后调用
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
        store.dispatch(postTotalAttentionData(creds));
    }
    //接收到新的propos state 后进行渲染之前调用
    // componentWillUpdate(nextProps, nextState) {
    //     let isTrue = Compare(this.state.dateSet, nextState.dateSet);
    //     if (isTrue === false) {
    //         let creds = {
    //             currentPage: 1,
    //             entityOrField: true,
    //             pd: {
    //                 beginTime: nextState.dateSet.beginTimeSet,
    //                 endTime: nextState.dateSet.endTimeSet,
    //             },
    //             showCount: constants.pageSize
    //         }
    //         store.dispatch(postTotalAttentionData(creds));
    //     }
    // }


    render() {
        let dateSet = {
            beginTimeSet: this.state.beginTimeSet,
            endTimeSet: this.state.endTimeSet
        };
        let totalAttention = store.getState().ReportForms.data.totalAttention.result.list;
        let queryType = this.state.queryType;
        let begin = this.state.beginDate;
        let end = this.state.endDate;
        let beginDateValue = '';
        let beginPicker = '';
        if (begin === '') {
            beginPicker = (
                <DatePicker placeholder="" onChange={this.handleBeginDeteClick}  format={dateFormat} allowClear={false} style={{marginRight:"10px"}}/>
            )
        } else {
            beginDateValue = moment(begin, dateFormat);
            beginPicker = (
                <DatePicker placeholder="" onChange={this.handleBeginDeteClick}  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue}/>
            )
        }
        let endDateValue = '';
        let endPicker = '';
        if (end === '') {
            endPicker = (
                <DatePicker placeholder="" onChange={this.handleEndDeteClick} format={dateFormat} allowClear={false} style={{marginRight:"10px"}}/>
            )
        } else {
            endDateValue = moment(end, dateFormat);
            endPicker = (
                <DatePicker placeholder="" onChange={this.handleEndDeteClick} format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue}/>
            )
        }
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }

        return (

            <div className="sliderWrap" style={{borderBottom: "0", height: 'auto'}}>
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <p style={{fontSize: "18px", color: "#fff", float: "left", marginRight: "50px"}}>在呼管控人员总数：
                            <span
                                style={{
                                    width: "80px",
                                    display: "inline-block",
                                    _display: "inline",
                                    zoom: "1"
                                }}
                            >{totalAttention}</span>
                        </p>
                        {queryType === "day" ? <ul style={smallIcon}>
                            <li style={IconLiActive} onClick={(event) => this.handleDayClick(event)} >本日</li>
                            <li style={IconLi} onClick={(event) => this.handleWeekClick(event)} >本周</li>
                            <li style={IconLinoborder} onClick={(event) => this.handleYearClick(event)}>本年</li>
                            <div style={clear}></div>
                        </ul>: queryType === "week" ? <ul style={smallIcon}>
                            <li style={IconLi} onClick={(event) => this.handleDayClick(event)} >本日</li>
                            <li style={IconLiActive} onClick={(event) => this.handleWeekClick(event)} >本周</li>
                            <li style={IconLinoborder} onClick={(event) => this.handleYearClick(event)}>本年</li>
                            <div style={clear}></div>
                        </ul> : queryType === "year" ? <ul style={smallIcon}>
                                <li style={IconLi} onClick={(event) => this.handleDayClick(event)} >本日</li>
                                <li style={IconLi} onClick={(event) => this.handleWeekClick(event)} >本周</li>
                                <li style={IconLinoborderActive} onClick={(event) => this.handleYearClick(event)}>本年</li>
                                <div style={clear}></div>
                            </ul>
                            :<ul style={smallIcon}>
                                <li style={IconLi} onClick={(event) => this.handleDayClick(event)} >本日</li>
                                <li style={IconLi} onClick={(event) => this.handleWeekClick(event)} >本周</li>
                                <li style={IconLinoborder} onClick={(event) => this.handleYearClick(event)}>本年</li>
                                <div style={clear}></div></ul>
                        }
                        <div style={{float: "left", marginLeft: "50px"}}>
                            <label htmlFor="" style={labelStyle2}>其他时间：</label>
                            {/* <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                        value={beginDateValue}  onChange={this.handleBeginDeteClick}/>*/}
                            { beginPicker }
                            <span className="font14" style={{marginRight: "10px"}}>至</span>
                            {/* <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                        value={endDateValue}  onChange={this.handleEndDeteClick}/>*/}
                            { endPicker }
                            <ShallowBlueBtn text="查询" margin="0 0 0 20px" width="60px"  onClick={this.handleQueryClick}/>

                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*统计内容*/}
                    {/*第一行*/}
                    <div style={{background: "rgba(25,41,85,0.5)"}}>
                        <div style={{
                            float: "left",
                            borderRight: "1px solid #0C5F93",
                            borderBottom: '1px solid #0C5F93',
                            width: "50%",
                            height: "43%"
                        }}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>管控情况</p>C
                            {/*添加图表*/}
                            <div>
                                <ControlCharts  dateSet={dateSet}/>
                            </div>
                        </div>
                        <div style={{float: "left", borderBottom: '1px solid #0C5F93', width: "50%", height: "43%"}}>
                            <p style = {
                                {
                                    fontSize: "16px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    paddingLeft: "20px",
                                    margin: "20px 0"
                                }
                            } > 拟来呼人员</p> { /*添加图表*/ }
                            <div>
                                <ComeInCharts  dateSet={dateSet}/>
                            </div>
                        </div>
                        <div style={clear}></div>
                    </div> { /*第二行*/ }
                    <div style={{background: "rgba(25,41,85,0.5)", marginBottom: "20px"}}>
                        <div style={{
                            float: "left",
                            borderRight: "1px solid #0C5F93",
                            borderBottom: '1px solid #0C5F93',
                            width: "50%",
                            height: "43%"
                        }}>
                            <p style={{
                                fontSize: "16px",
                                color: "#fff",
                                fontWeight: "bold",
                                paddingLeft: "20px",
                                margin: "20px 0"
                            }}>居住情况</p>
                            {/*添加图表*/}
                            <LiveCharts  dateSet={dateSet}/>
                        </div> <div style = {
                        {
                            float: "left",
                            borderRight: "1px solid #0C5F93",
                            borderBottom: '1px solid #0C5F93',
                            width: "50%",
                            height: "43%"
                        }
                    } >
                        <p style={{
                            fontSize: "16px",
                            color: "#fff",
                            fontWeight: "bold",
                            paddingLeft: "20px",
                            margin: "20px 0"
                        }}>人员来源</p>
                        {/*添加图表*/}
                        <div>
                            <PersonFromCharts  dateSet={dateSet}/>
                        </div>
                    </div> <div style = {
                        clear
                    } > </div> </div> </div>


            </div>
        );
    }
}


//分布情况图表
class DistributeCharts extends Component {
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
        store.dispatch(postDistributeChartsData(creds));
    }
    //组件props发生变化，更新state
    componentWillReceiveProps(nextProps) {
        /* let isTrue = Compare(this.props.dateSet,nextProps.dateSet);
         if(isTrue === false){
             let creds = {
                 currentPage:1,
                 entityOrField:true,
                 pd:{
                     beginTime:nextProps.dateSet.beginTimeSet,
                     endTime:nextProps.dateSet.endTimeSet,
                 },
                 showCount: constants.pageSize
             }
             store.dispatch(postDistributeChartsData(creds));
         }*/
    }
    render() {

        // let distributeChartsList = store.getState().ReportForms.data.distributeChartsList.result.list;
        let distributeChartsList = [{name: "呼和浩特市", value: 2},{name: "包头市", value: 0},{name: "乌海市", value: 0},{name: "赤峰市", value: 0},{name: "呼伦贝尔市", value: 0},{name: "兴安盟", value: 0}];
        // let isFetching = store.getState().ReportForms.data.distributeChartsList.isFetching;
        let isFetching = false;
        let numData = [];
        for (var i = 0; i < distributeChartsList.length; i++) {
            var distribute = distributeChartsList[i];
            var number = distribute.value;
            var num = parseInt(number);
            numData.push(
                num
            );
            //var maxInNumbers = Math.max.apply(Math, number);
            // console.log('original',number);
        }
        var maxInNumbers = Math.max.apply(Math, numData);
        let maxNum = maxInNumbers * constants.doubleNum;
        let optionMap = {
            // title: {
            //     text: 'iphone销量',
            //     subtext: '纯属虚构',
            //     left: 'center'
            // },
            // textStyle:{
            //     color:"#fff",
            //     fontSize:8
            // },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (人)'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data:['iphone3']
            // },
            // visualMap: {
            //     min: 0,
            //     max: 210,
            //     left: 'left',
            //     top: 'bottom',
            //     text: ['高', '低'],           // 文本，默认为数值文本
            //     calculable: true
            // },
            visualMap: {
                min: 0,
                max: maxNum,
                top: '120px',
                text: ['高', '低'],
                show: true,
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['#00ACEE', '#F88A6F']
                },
                outOfRange: { //范围外颜色
                    color: ['#F5F5DC']
                },
                textStyle: {
                    color: "#fff"
                }
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [{
                name: '人数',
                type: 'map',
                mapType: global.configUrl.clientArea,
                roam: false,
                top: '0px',
                label: {
                    normal: {
                        show: false,
                        formatter: '{c}',
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                data: distributeChartsList
            }]
        };
        return (
            <div style={{position:"relative",height:"99%"}}>
                {isFetching ===  true?
                    <div style={{textAlign:"center",position:"absolute",left:"45%",top:"30%"}}>
                        <Spin size="large" />
                    </div>:
                    <EchartsReact
                        option={optionMap}
                        style={{height: '90%', width: '100%'}}
                    />}
            </div>
        );
    }
}


//原籍地图表
class OriginalCharts extends Component {

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
        store.dispatch(postOriginalChartsData(creds));
    }
    //组件props发生变化，更新state
    // componentWillReceiveProps(nextProps) {
    //     //下一个类型
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
    //         store.dispatch(postOriginalChartsData(creds));
    //     }
    // }


    render() {
        let originalChartsList = [{name:'乌鲁木齐市',value:'2'}]
        // let originalChartsList = store.getState().ReportForms.data.originalChartsList.result.list;
        // let isFetching = store.getState().ReportForms.data.originalChartsList.isFetching;
        let isFetching = false;
        let numData = [];
        for (var i = 0; i < originalChartsList.length; i++) {
            var original = originalChartsList[i];
            var number = original.value;
            var num = parseInt(number);
            numData.push(
                num
            );
            //var maxInNumbers = Math.max.apply(Math, number);
            // console.log('original',number);
        }
        var maxInNumbers = Math.max.apply(Math, numData);
        let maxNum = maxInNumbers * constants.doubleNum;
        let optionMap = {
            // title: {
            //     text: 'iphone销量',
            //     subtext: '纯属虚构',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (人)'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data:[
            //         {
            //             name:'居住人数',
            //             textStyle: {
            //                 color: '#FFCE44'
            //             }
            //         }
            //     ]
            // },
            visualMap: {
                min: 0,
                max: maxNum,
                top: "120px",
                show: true,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['#00ACEE', '#F88A6F']
                },
                outOfRange: { //范围外颜色
                    color: ['#F5F5DC']
                },
                textStyle: {
                    color: "#fff"
                }
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [{
                name: '居住人数',
                type: 'map',
                mapType: '新疆',
                roam: false,
                top: '0px',
                label: {
                    normal: {
                        show: false,
                        position: 'bottom',
                        formatter: '{c}',

                        textStyle: {
                            color: "#fff"
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                data: originalChartsList

            }]
        };

        return (
            <div style={{position:"relative",height:"99%"}}>
                {isFetching ===  true?
                    <div style={{textAlign:"center",position:"absolute",left:"45%",top:"30%"}}>
                        <Spin size="large" />
                    </div>:
                    <EchartsReact
                        option={optionMap}
                        style={{height: '90%', width: '100%',}}
                    />}
            </div>
        );
    }
}

//居住情况图表
class LiveCharts extends Component {


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
        store.dispatch(postLiveChartsData(creds));
    }
    //组件props发生变化，更新state
    // componentWillReceiveProps(nextProps) {
    //     //下一个类型
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
    //         store.dispatch(postLiveChartsData(creds));
    //     }
    // }

    render() {
        // let liveChartsList = store.getState().ReportForms.data.liveChartsList.result.list;
        let liveChartsList = [{name: "常住人员", value: 12}, {name: "流动人员", value: 26}, {name: "暂住人员", value: 5}];
        // let isFetching = store.getState().ReportForms.data.liveChartsList.isFetching;
        let isFetching = false;
        var liveOption = {
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
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['暂住人员','暂住关注人员','常住关注人员'],

            // },
            color: ['#3dc7d1', '#00acee', '#f88a6f'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '居住情况',
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

                data: liveChartsList,
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
//年龄构成
class ComeInCharts extends Component {

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
        store.dispatch(postAgeChartsData(creds));
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
    //         store.dispatch(postAgeChartsData(creds));
    //     }
    // }
    render() {
        // let ageChartsList = store.getState().ReportForms.data.ageChartsList.result.list;
        let ageChartsList = [{name: "河北", value: "7"}, {name: "新疆", value: "13"}, {name: "吉林", value: "55"},{name: "北京", value: "9"},{name: "内蒙古", value: "20"},{name: "黑龙江", value: "3"}];
        // let obj=[]
        // for(var i = 0;i<ageChartsList.length;i++){
        //     let abjName = ageChartsList[i].name;
        //     obj.push(
        //      abjName
        //  );
        // }
        // let isFetching = store.getState().ReportForms.data.ageChartsList.isFetching;
        let isFetching = false;
        var ageOption = {
            color: ['#00ACEE'],
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
                data: ['河北', '新疆', '吉林', '北京', '内蒙古', '黑龙江'],
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
                data: ageChartsList,
                itemStyle: {
                    normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                "#3DC7D1", '#F88A6F', '#00ACEE', "#3DC7D1", '#F88A6F', '#00ACEE', "#3DC7D1"
                            ];
                            return colorList[params.dataIndex]
                        }
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
                        option={ageOption}
                        style={{height: '90%', width: '98%',margin:"0 auto"}}
                    />}
            </div>
        );
    }
}


//管控情况图表
class ControlCharts extends Component {
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
        store.dispatch(postSexChartsData(creds));
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
    //         store.dispatch(postSexChartsData(creds));
    //     }
    // }
    render() {
        // let sexChartsList = store.getState().ReportForms.data.sexChartsList.result.list;
        let sexChartsList = [{name: "未管控", value: "15"}, {name: "已管控", value: "28"}, {name: "失控", value: "9"}, {name: "离开责任区", value: "32"}];
        // let isFetching = store.getState().ReportForms.data.sexChartsList.isFetching;
        let isFetching = false;
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
                    name: '失控',
                    textStyle: {
                        color: '#fff'
                    }
                }, {
                    name: '未管控',
                    textStyle: {
                        color: '#fff'
                    }
                }, {
                    name: '已管控',
                    textStyle: {
                        color: '#fff'
                    }
                }, {
                    name: '离开责任区',
                    textStyle: {
                        color: '#fff'
                    }
                }]
            },
            color: ['#39a0ff', '#37cbcb', '#fad336', '#f2627b'],
            series: [{
                name: '管控情况',
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
                data: sexChartsList,
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
//人员来源
class PersonFromCharts extends Component {
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
        store.dispatch(postSexChartsData(creds));
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
    //         store.dispatch(postSexChartsData(creds));
    //     }
    // }
    render() {
        // let sexChartsList = store.getState().ReportForms.data.sexChartsList.result.list;
        let sexChartsList = [{name: "导入", value: "75"}, {name: "新增", value: "38"}];
        // let isFetching = store.getState().ReportForms.data.sexChartsList.isFetching;
        let isFetching = false;
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
                    name: '导入',
                    textStyle: {
                        color: '#fff'
                    }
                }, {
                    name: '新增',
                    textStyle: {
                        color: '#fff'
                    }
                }]
            },
            color: ['#39a0ff', '#fad336'],
            series: [{
                name: '人员来源',
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
                data: sexChartsList,
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
    overflow: "hidden"
}
const clear = {
    clear: "both"
}
export default connect(mainReducer)(PopulationStatistics);