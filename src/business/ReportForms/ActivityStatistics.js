/**
 *呼市统计报表-盘查统计
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
    fetchInflowChartsData,
    fetchFlowoutChartsData,
    fetchActivePersonnelChartsData,
    postActivityInflowData,
    postActivityOutflowData,
    postInflowChartsData,
    postFlowoutChartsData,
    postDataSourcesChartsData,
    postActivePersonnelChartsData
} from "../../actions/ReportForms"
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
import Spare from '../Spare';
moment.locale('zh-cn');


class ActivityStatistics extends Component {
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
            entityOrField: true,
            pd: {
                beginTime: nowTImes,
                endTime: nowTImes,
            },
        };
        // let params ={
        //     entityOrField: true,
        //     pd: {
        //     },
        // }
        store.dispatch(postActivityInflowData(creds));
        store.dispatch(postActivityOutflowData(creds));
        store.dispatch(postInflowChartsData(creds));
        store.dispatch(postDataSourcesChartsData(creds));
        store.dispatch(postFlowoutChartsData(creds));
       // store.dispatch(postActivePersonnelChartsData(creds));
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
            entityOrField: true,
            pd: {
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
        };
        // let params ={
        //     entityOrField: true,
        //     pd: {
        //     },
        // }
        store.dispatch(postActivityInflowData(creds));
        store.dispatch(postActivityOutflowData(creds));
        store.dispatch(postInflowChartsData(creds));
        store.dispatch(postDataSourcesChartsData(creds));
        store.dispatch(postFlowoutChartsData(creds));
        //store.dispatch(postActivePersonnelChartsData(creds));
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
            entityOrField: true,
            pd: {
                beginTime: getMondayTime(),
                endTime: getSundayTime(),
            },
        };
        // let params ={
        //     entityOrField: true,
        //     pd: {
        //     },
        // }
        store.dispatch(postActivityInflowData(creds));
        store.dispatch(postActivityOutflowData(creds));
        store.dispatch(postInflowChartsData(creds));
        store.dispatch(postDataSourcesChartsData(creds));
        store.dispatch(postFlowoutChartsData(creds));
      // store.dispatch(postActivePersonnelChartsData(creds));
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
        // let begin = this.state.beginDate;
        // let end = this.state.endDate;
        // let nowPage = this.props.nowPage;
        this.setState({
            beginTimeSet: this.state.beginDate,
            endTimeSet: this.state.endDate,
        });
        let creds = {
            entityOrField: true,
            pd: {
                beginTime: this.state.beginDate,
                endTime: this.state.endDate,
            },
        }
        store.dispatch(postActivityInflowData(creds));
        store.dispatch(postActivityOutflowData(creds));
        store.dispatch(postInflowChartsData(creds));
        store.dispatch(postDataSourcesChartsData(creds));
        store.dispatch(postFlowoutChartsData(creds));
        //  let params ={
        //     entityOrField: true,
        //     pd: {
        //     },
        // }
       // store.dispatch(postActivePersonnelChartsData(creds));
    }
    onBeginDateChanged = (id, value) => {
        this.setState({
            beginDate: value
        });
    }
    onEndDateChanged = (id, value) => {
        this.setState({
            endDate: value
        });
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
        store.dispatch(postActivityInflowData(creds));
        store.dispatch(postActivityOutflowData(creds));
    }
    componentWillUpdate(nextProps, nextState) { //不能没有 nextProps

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
            store.dispatch(postActivityInflowData(creds));
            store.dispatch(postActivityOutflowData(creds));
        }
    }
    render() {
        let dateSet = {
            beginTimeSet: this.state.beginTimeSet,
            endTimeSet: this.state.endTimeSet
        };
        let activityInflow = store.getState().ReportForms.data.activityInflow.result.list;
        let activityOutflow = store.getState().ReportForms.data.activityOutflow.result.list;
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
        return (
            <div className="sliderWrap" style={{borderBottom:"0",height:'auto'}}>
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <p style={{fontSize:"18px",color:"#fff",float:"left",marginRight:"50px"}}>流入人员总数：<span style={{width:"80px",display:"inline-block",_display:"inline",zoom:"1"}}>{activityInflow}</span></p>
                        <p style={{fontSize:"18px",color:"#fff",float:"left",marginRight:"50px"}}>流出人员总数：<span style={{width:"80px",display:"inline-block",_display:"inline",zoom:"1"}}>{activityOutflow}</span></p>
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
                            <DatePicker placeholder="" format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                        value={beginDateValue} onChange={this.handleBeginDeteClick}/>
                            <span className="font14" style={{marginRight: "10px"}}>至</span>
                            <DatePicker placeholder="" format={dateFormat} allowClear={false} style={{marginRight: "10px"}}
                                        value={endDateValue} onChange={this.handleEndDeteClick}/>
                            <ShallowBlueBtn text="查询" margin="0 0 0 20px" width="60px"  onClick={this.handleQueryClick}/>

                        </div>
                        {/*<div style={{float:"right",marginRight:"20px"}}>
                            <ShallowBlueBtn text="数据表格" margin="0 0 0 20px" width="100px"/>
                            <ShallowBlueBtn text="重置" margin="0 0 0 20px" width="60px"/>
                            
                        </div>*/}
                        <div style={clear}></div>
                    </div>
                    {/*统计内容*/}
                    {/*第一行*/}
                    <div style={{background:"rgba(25,41,85,0.5)"}}>
                        <div style={{float:"left",borderRight:"1px solid #0C5F93",borderBottom:'1px solid #0C5F93',width:"49.9%",height:"43%"}}>
                           <p style={{fontSize:"16px",color:"#fff",fontWeight:"bold",paddingLeft:"20px",margin:"20px 0"}}>流入方式</p>
                           {/*添加图表*/}
                           <div>
                               <InflowCharts dateSet={dateSet}/>
                           </div>
                        </div>
                        <div style={{float:"left",borderBottom:'1px solid #0C5F93',width:"49.9%",height:"43%",}}>
                            <p style={{color:'rgb(231, 231, 231)',fontSize:'30px',marginTop:"25%",textAlign:"center"}}>功能开发中...</p>
                            {/*<Spare />*/}
                            <div className="clear"></div>
                           {/*<p style={{fontSize:"16px",color:"#fff",fontWeight:"bold",paddingLeft:"20px",margin:"20px 0"}}>数据来源</p>
                           添加图表
                           <div>
                            <DataSourcesCharts dateSet={dateSet}/>
                           </div>*/}
                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*第二行*/}
                    <div style={{background:"rgba(25,41,85,0.5)",marginBottom:"20px"}}>
                        <div style={{float:"left",borderRight:"1px solid #0C5F93",borderBottom:'1px solid #0C5F93',width:"49.9%",height:"43%"}}>
                           <p style={{fontSize:"16px",color:"#fff",fontWeight:"bold",paddingLeft:"20px",margin:"20px 0"}}>流出方式</p>
                           {/*添加图表*/}
                           <div>
                               <FlowOutCharts dateSet={dateSet}/>
                           </div>
                        </div>
                        <div style={{float:"left",borderBottom:'1px solid #0C5F93',width:"49.9%",height:"43%"}}>
                           <p style={{fontSize:"16px",color:"#fff",fontWeight:"bold",paddingLeft:"20px",margin:"20px 0"}}>收藏人员</p>
                           {/*添加图表*/}
                           <div>
                               <ActivePersonnelCharts dateSet={dateSet}/>
                           </div>
                        </div>
                        <div style={clear}></div>
                    </div>
                </div>
               
                
            </div>
        );
    }
}

//流入方式
class InflowCharts extends Component {
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
            store.dispatch(postInflowChartsData(creds));
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
    //         store.dispatch(postInflowChartsData(creds));
    //     }
    // }
    render() {
        let inflowList = store.getState().ReportForms.data.inflowList.result.list;
        let isFetching = store.getState().ReportForms.data.inflowList.isFetching;
        var InflowOption = {
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
            //     bottom:"0",
            //     data: ['民航','铁路','公路','航运'],
            //     textStyle:{
            //         color:"#fff"
            //     }
            // },
            color: ['#AAE8FF', '#79D9F1', '#00ACEE', '#4ECDED'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '流入方式',
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                data: inflowList,
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
            <div style={{position:"relative",height:"99%"}}>
                {isFetching ===  true?
                        <div style={{textAlign:"center",position:"absolute",left:"45%",top:"30%"}}>
                            <Spin size="large" />
                        </div>:
                <EchartsReact
                    option={InflowOption}
                    style={{height: '80%', width: '100%'}}
                />}
            </div>
        );
    }
}
//数据来源
class DataSourcesCharts extends Component {
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
            store.dispatch(postDataSourcesChartsData(creds));
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
    //         store.dispatch(postDataSourcesChartsData(creds));
    //     }
    // }

    render() {
        let dataSourcesList = store.getState().ReportForms.data.dataSourcesList.result.list;
        let isFetching = store.getState().ReportForms.data.dataSourcesList.isFetching;
        var sourcesOption = {
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
            //  legend: {
            //     orient: 'horizontal',
            //     bottom:"0",
            //     data: ['航路获取','铁路获取','民航获取','公路卡口获取','巡逻获取','宾馆获取','网吧获取'],
            //     textStyle:{
            //         color:"#fff"
            //     }
            // },
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
                data: ['航路获取', '铁路获取', '民航获取', '公路卡口获取', '巡逻获取', '宾馆获取', '网吧获取'],
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
                data: dataSourcesList,
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
                    option={sourcesOption}
                    style={{height: '90%', width: '98%',margin:"0 auto"}}
                />}
            </div>
        );
    }
}
//流出方式
class FlowOutCharts extends Component {
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
            store.dispatch(postFlowoutChartsData(creds));
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
    //         store.dispatch(postFlowoutChartsData(creds));
    //     }
    // }

    render() {
        let flowOutList = store.getState().ReportForms.data.flowOutList.result.list;
        let isFetching = store.getState().ReportForms.data.flowOutList.isFetching;
        var FlowOutOption = {
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
            //     bottom:"0",
            //     data: ['民航','铁路','公路','航运'],
            //     textStyle:{
            //         color:"#fff"
            //     }
            // },
            color: ['#F88A71', '#3DC7D1', '#D184D4', '#00ACEC'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '流出方式',
                type: 'pie',
                radius: '70%',
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
                data: flowOutList,
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
                    option={FlowOutOption}
                    style={{height: '80%', width: '100%'}}
                />}
            </div>
        );
    }
}
//收藏人员
class ActivePersonnelCharts extends Component {

    componentDidMount() {
            var myDate = new Date();
            let NowYEAR = myDate.getFullYear();
            let creds = {
                entityOrField: true,
                pd: {
                    //  beginTime: NowYEAR + '-01' + '-01',
                    // endTime: NowYEAR + '-12' + '-31',
                },
            }
            store.dispatch(postActivePersonnelChartsData(creds));
        }
        //组件props发生变化，更新state
    componentWillReceiveProps(nextProps) {
        //下一个类型
        //  let isTrue = Compare(this.props.dateSet,nextProps.dateSet);
        // if(isTrue === false){
        //       let creds = {
        //         currentPage:1,
        //         entityOrField:true,
        //         pd:{
        //         beginTime:nextProps.dateSet.beginTimeSet,
        //         endTime:nextProps.dateSet.endTimeSet,
        //         },
        //         showCount: constants.pageSize
        //       }
        //      store.dispatch(postActivePersonnelChartsData(creds));
        // }
    }

    render() {
        let activePersonnelList = store.getState().ReportForms.data.activePersonnelList.result.list;
        let isFetching = store.getState().ReportForms.data.activePersonnelList.isFetching;
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            // legend: {
            //     orient: 'horizontal',
            //     left: 'center',
            //     top:"bottom",
            //     data:[
            //         {
            //             name: '关注人员',
            //             textStyle:{color: '#46C2CB'}
            //         },
            //         {
            //             name: '未关注人员',
            //             textStyle:{color: '#F27E69'}
            //         }
            //     ]
            // },
            color: ['#3DC7D1', '#F88A6F'],
            series: [{
                    name: '收藏人员',
                    type: 'pie',
                    radius: ['50%', '70%'],
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
                    data: activePersonnelList

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
                    style={{height: '80%', width: '100%'}}
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
export default connect(mainReducer)(ActivityStatistics);