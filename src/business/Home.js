/*
 首页
 */
import React, {
    Component
} from 'react'
import {
    mainReducer
} from "../reducers/reducers";
import {
    connect
} from "react-redux";
import {
    Header
} from "../components/Header";
import EchartsReact from 'echarts-for-react';
//import {fetchUsersData} from "../actions/actions";
import {
    store
} from '../index.js';
import {
    DeepBlueBtnY,
} from "./generalPurposeModule";
import {
    Link,
    browserHistory
} from "react-router";
import {
    postTaskStatisticsData,
    postInventoryTotalData,
    postPopulationData,
    postConcernTotalData,
    postInflowTotalData,
    postOutflowTotalData,
    postActivityStatisticsData,
    postPersonnelListData,
    postDistributeMapData,
    postAirportCoordMapData
} from "../actions/Home"
import {
    monthFormat,
    dateFormat,
    serverUrl,
    getYmd,
    getNowFormatDate,
    getSundayTime,
    getMondayTime,
    getLastDay,
    Compare,
    geoCoordMap
} from '../utils/';
import {
    Spin,
    Carousel
} from 'antd';

import'../resources/main.less';
import '../resources/slider.less';
import * as constants from "../utils/Constants";
require("echarts/map/js/china.js");
require("echarts/map/js/province/guangxi.js");
require("echarts/map/js/province/shandong.js");
require("echarts/map/js/province/liaoning.js");
require("echarts/map/js/province/jilin.js");
// 样式
const p16 = {
    fontSize: "16px",
    color: "#fff",
    marginBottom: "10px",
    textAlign: "center"
}
const p25 = {
    fontSize: "25px",
    color: "#fff",
    marginBottom: "10px",
    textAlign: "center"
}
const fl = {
    float: "left"
}
const fr = {
    float: "right"
}
const p14 = {
    fontSize: "14px",
    color: "#fff",
    fontFamliy: "微软雅黑",
    marginBottom: "10px"
}
const titleP = {
  float: "left",
    color: "#fff",
    fontSize: "18px",
}
const IconLi = {
    width: "50px",
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
    width: "50px",
    borderRight: "1px solid #0C5F93",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    background: "rgb(10, 119, 174)"
}
const IconLinoborderActive = {
    width: "50px",
    background: "rgb(10, 119, 174)",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left"
}
const IconLinoborder = {
    width: "50px",

    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    cursor: "pointer"
}
const smallIcon = {
    width: "152px",
    border: "1px solid #0C5F93",
    height: "30px",
    borderRadius: "3px",
    float: "right",
    overflow: "hidden",
}
const smallIcon2 = {
    width: "102px",
    border: "1px solid #0C5F93",
    height: "30px",
    borderRadius: "3px",
    float: "right",
    overflow: "hidden",
}
const clear = {
    clear: "both"
}



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapType: "china",
            queryType: "year",
            dateSet: {
                beginTimeSet: '',
                endTimeSet: ''
            },
            beginTimeSet: '',
            endTimeSet: ''
        }
    }

    handleMonthClickMap = (event) => {
        let oldQueryType = this.state.queryType;
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear()
        var month = myDate.getMonth();
        let monthlastDay = getLastDay(NowYEAR, month);
        var nowMonth = month + 1;
        var MonthDate = (nowMonth < 10 ? "0" + nowMonth : nowMonth);
        var nowMonthOneDay = NowYEAR + '-' + MonthDate + '-01';
        var nowMonthLastDay = NowYEAR + '-' + MonthDate + '-' + monthlastDay;
        this.setState({
            queryType: "month",
            beginTimeSet: nowMonthOneDay,
            endTimeSet: nowMonthLastDay,
            dateSet: {
                beginTimeSet: nowMonthOneDay,
                endTimeSet: nowMonthLastDay
            },
        });
    }

    handleYearClickMap = (event) => {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        this.setState({
            queryType: "year",
            beginTimeSet: NowYEAR + '-01' + '-01',
            endTimeSet: NowYEAR + '-12' + '-31',
            dateSet: {
                beginTimeSet: NowYEAR + '-01' + '-01',
                endTimeSet: NowYEAR + '-12' + '-31'
            },
        });

    }

    handleWeekClickMap = (event) => {
        this.setState({
            queryType: "week",
            beginTimeSet: getMondayTime(),
            endTimeSet: getSundayTime(),
            dateSet: {
                beginTimeSet: getMondayTime(),
                endTimeSet: getSundayTime()
            },
        });
    }
    handleChinaMap = (event) => {
        this.setState({
            mapType: "china",
        });


    }

    handleMigrateMap = (event) => {
        this.setState({
            mapType: "migrate",
        });
    }

    componentDidMount() {

            var myDate = new Date();
            let NowYEAR = myDate.getFullYear();
            let creds = {
                entityOrField: true,
                pd: {
                    beginTime: NowYEAR + '-01' + '-01',
                    endTime: NowYEAR + '-12' + '-31'
                },
            }
            store.dispatch(postDistributeMapData(creds));
            store.dispatch(postAirportCoordMapData(creds));

        }
        //更新状态时候调用
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
                //showCount: constants.pageSize
            }
            store.dispatch(postAirportCoordMapData(creds));
        }


    }
    render() {
        let mapType = this.state.mapType;
        let distributeMapData = store.getState().Home.data.distributeMapData.result.list;
        let airportCoordMapData = store.getState().Home.data.airportCoordMapData.result.list;
        let queryType = this.state.queryType;
        let dateSet = {
            beginTimeSet: this.state.beginTimeSet,
            endTimeSet: this.state.endTimeSet
        };

        return (
            <div style={{overflow:"hidden",width:"100%"}}>
                <Header />
                {/*内容*/}
                <div>
                    <div>
                        <div style={{position:"relative"}}>
                            {mapType === "migrate"?<div>
                                <div style={{width:"40%",margin:"0 auto",paddingTop:"15px",paddingBottom:"20px",position:"absolute",left:"30%",top:"0",zIndex:'99999'}}>
                                    <div style={{float:"left"}}>
                                        <ul style={smallIcon2}>
                                            <li style={IconLi} onClick={(event) => this.handleChinaMap(event)}>分布图</li>
                                            <li style={IconLinoborderActive} onClick={(event)=>this.handleMigrateMap(event)}>流动图</li>
                                        </ul>
                                        <div style={clear}></div>
                                    </div>
                                    <div style={{float:"right"}}>
                                        { queryType === "week" ? <ul style={smallIcon}>
                                            <li style={IconLiActive} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                            <li style={IconLi} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                            <li style={IconLinoborder} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                            <div style={clear}></div>
                                        </ul> : queryType === "month" ? <ul style={smallIcon}>
                                            <li style={IconLi} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                            <li style={IconLiActive} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                            <li style={IconLinoborder} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                            <div style={clear}></div>
                                        </ul> : queryType === "year" ? <ul style={smallIcon}>
                                            <li style={IconLi} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                            <li style={IconLi} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                            <li style={IconLinoborderActive} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                            <div style={clear}></div>
                                        </ul>
                                            :<ul style={smallIcon}>
                                                <li style={IconLi} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                                <li style={IconLi} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                                <li style={IconLinoborder} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                                <div style={clear}></div></ul>
                                        }
                                        <div style={clear}></div>
                                    </div>
                                    <div style={clear}></div>
                                </div>
                                {/*地图*/}
                                {/*<ChinaMap />*/}

                                <AirportCoordComponent airportCoordMapData={airportCoordMapData} dateSet={dateSet}/>
                            </div>:<div>
                                <div style={{width:"40%",margin:"0 auto",paddingTop:"15px",paddingBottom:"20px",position:"absolute",left:"30%",top:"0",zIndex:'99999'}}>
                                    <div style={{float:"left"}}>
                                        <ul style={smallIcon2}>
                                            <li style={IconLiActive} onClick={(event)=>this.handleChinaMap(event)}>分布图</li>
                                            <li style={IconLinoborder} onClick={(event)=>this.handleMigrateMap(event)}>流动图</li>
                                        </ul>
                                        <div style={clear}></div>
                                    </div>
                                    <div style={{float:"right"}}>
                                        { queryType === "week" ? <ul style={smallIcon}>
                                            <li style={IconLiActive} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                            <li style={IconLi} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                            <li style={IconLinoborder} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                            <div style={clear}></div>
                                        </ul> : queryType === "month" ? <ul style={smallIcon}>
                                            <li style={IconLi} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                            <li style={IconLiActive} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                            <li style={IconLinoborder} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                            <div style={clear}></div>
                                        </ul> : queryType === "year" ? <ul style={smallIcon}>
                                            <li style={IconLi} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                            <li style={IconLi} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                            <li style={IconLinoborderActive} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                            <div style={clear}></div>
                                        </ul>
                                            :<ul style={smallIcon}>
                                                <li style={IconLi} onClick={(event) => this.handleWeekClickMap(event)} >本周</li>
                                                <li style={IconLi} onClick={(event) => this.handleMonthClickMap(event)} >本月</li>
                                                <li style={IconLinoborder} onClick={(event) => this.handleYearClickMap(event)}>本年</li>
                                                <div style={clear}></div></ul>
                                        }
                                        <div style={clear}></div>
                                    </div>
                                    <div style={clear}></div>
                                </div>
                                {/*地图*/}
                                <ChinaMap distributeMapData={distributeMapData} dateSet={dateSet}/>
                                {/*<AirportCoordComponent />*/}
                            </div>
                            }

                            {/*任务数据统计*/}
                            <TaskStatistics dateSet={dateSet} />

                            {/*三个人员*/}
                            <div style={{position:"absolute",bottom:"15px",left:"15px",width:"73%"}}>
                                {/*重点关注人员*/}
                                <Personnel text="重点关注人员"   personType='zdgz' code='201001'  dateSet={dateSet}/>
                                {/*未落地人员*/}
                                <Personnel text="未落地人员" personType='wld'  dateSet={dateSet}/>
                                {/*失踪人员*/}
                                <Personnel text="失踪人员" personType='szry'  dateSet={dateSet}/>
                                <div style={clear}></div>
                            </div>
                            {/*总体和活动统计*/}
                            {/*<div style={{position:"absolute",top:"15px",right:"15px",width:"25%",height:"44%"}}>*/}
                            {/*总体统计*/}
                            <PopulationStatistics dateSet={dateSet}/>
                            {/*活动统计*/}
                            <ActiveDataStatistics dateSet={dateSet}/>
                            {/*</div>*/}
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}
// 地图
class ChinaMap extends Component {


    render() {

        let distributeMapData = this.props.distributeMapData;
        let numData = [];
        for (var i = 0; i < distributeMapData.length; i++) {
            var distribute = distributeMapData[i];
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
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (人)'
            },
            visualMap: {
                min: 0,
                max: maxNum,
                top: "120px",
                text: ['高', '低'],
                show: false,
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['#00ACEE', '#F88A6F']
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
                name: '数据',
                type: 'map',
                mapType: global.configUrl.clientArea,
                roam: true,
                left: "26%",
                top: '20px',
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}\n{c} (人)',
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    emphasis: {
                        show: true,
                    }
                },
                itemStyle: {

                    emphasis: {
                        areaColor: '#eee'

                    }
                },
                data: distributeMapData,
                silent: false
            }]
        };
        return (
            <div style={{width:"100%"}}>
                <div>
                    <EchartsReact
                        option={optionMap}
                        style={{height: '84%', width: '100%'}}
                    />
                </div>
            </div>

        );
    }
}

//迁徙图
class AirportCoordComponent extends Component {
    componentDidMount() {

        // var myDate = new Date();
        // let NowYEAR = myDate.getFullYear();
        // let creds = {
        //     entityOrField: true,
        //     pd: {
        //         beginTime: NowYEAR + '-01' + '-01',
        //         endTime: NowYEAR + '-12' + '-31',
        //     },
        // }
        // store.dispatch(postAirportCoordMapData(creds));

    }
    // componentWillReceiveProps(nextProps) {
    //     let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
    //     if (isTrue === false) {
    //         let creds = {
    //             pd: {
    //                 beginTime: nextProps.dateSet.beginTimeSet,
    //                 endTime: nextProps.dateSet.endTimeSet,
    //             },
    //         }
    //         store.dispatch(postAirportCoordMapData(creds));
    //     }
    // }

    getOtion = () => {
        let airportCoordMapData = this.props.airportCoordMapData;

        var MAPData =
            airportCoordMapData;
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        name: dataItem[0].name + '->' + dataItem[1].name + '-数据：' + dataItem[0].value,
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],

                    });
                }
            }
            return res;
        };

        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];
        [
            ['', MAPData],
        ].forEach(function(item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0], //可以写数值的位置
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: false,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1, //线的粗细
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: false, //终点的城市名是否显示
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function(val) {
                    return val[2] / 8;
                },

                //图形样式
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        var option = {
            backgroundColor: 'transparent',
            title: {

                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                // data:['哈尔滨',],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            geo: {
                map: 'china',
                left: "24%",
                top: '2px',
                label: {
                    normal: {
                        show: true,
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
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: 'transparent',
                        borderColor: '#6DC2D1'
                    },
                    emphasis: {
                        areaColor: 'transparent'
                    }
                }
            },
            series: series
        };
        return option;
    }
    render() {
        let isFetching = store.getState().Home.data.airportCoordMapData.isFetching;
        return (
            <div>

                <div style={{height:'84%'}}>
                    {isFetching ===  true? <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                        <Spin size="large" />
                    </div>:
                        <EchartsReact
                            option={this.getOtion()}
                            style={{height: '100%', width: '100%'}}
                        />}
                </div>
            </div>
        );
    }
};

//任务数据统计
class TaskStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBtn: "none",
            isShowDiv: "block",

        }
    }
    componentDidMount() {
            //当前传过来的类型
            let queryType = this.props.queryType;
            let search = 'type=' + queryType;
            var myDate = new Date();
            let NowYEAR = myDate.getFullYear();
            let creds = {
                entityOrField: true,
                pd: {
                    beginTime: NowYEAR + '-01' + '-01',
                    endTime: NowYEAR + '-12' + '-31',
                },
            }
            store.dispatch(postTaskStatisticsData(creds));
            //盘查人数总和
            store.dispatch(postInventoryTotalData(creds));
        }
        //接收到新的propos state 后进行渲染之前调用
    componentWillReceiveProps(nextProps) {
        let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
        if (isTrue === false) {
            let creds = {
                pd: {
                    beginTime: nextProps.dateSet.beginTimeSet,
                    endTime: nextProps.dateSet.endTimeSet,
                },
            }
            store.dispatch(postTaskStatisticsData(creds));
            store.dispatch(postInventoryTotalData(creds));
        }
    }

    chartsClick = () => {
        this.setState({
            isShowBtn: "block",
            isShowDiv: "none"
        });
    }
    BtnClick = () => {
        this.setState({
            isShowBtn: "none",
            isShowDiv: "block"
        });
    }
    render() {
        let taskStatisticsList = store.getState().Home.data.taskStatistics.result.list;
        let inventoryTotalData = store.getState().Home.data.inventoryTotalData.result.list;
        let data = [0, 0, 0, 0, 0, 0];
        if (taskStatisticsList.length > 0) {
            data = [taskStatisticsList[5].value, taskStatisticsList[4].value, taskStatisticsList[3].value, taskStatisticsList[2].value, taskStatisticsList[1].value, taskStatisticsList[0].value];
        }
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
                data: ['流出人员', '流入人员', '在侦在控', '临控对象', '重点人员', '盘查异常'],
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
                        show: false,
                        position: 'inside'
                    }
                },

                barWidth: "50%",
                data: data,
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

        let isShowBtn = this.state.isShowBtn;
        let isShowDiv = this.state.isShowDiv;
        // let queryType = this.state.queryType
        let isFetching = store.getState().Home.data.taskStatistics.isFetching;
        return (

            <div style={{position:"absolute",top:"15px",left:"15px",width:"25%",height:"65%",}}>
                {/*隐藏的按钮状态*/}
                <DeepBlueBtnY width="25px" text="动态管控统计" borderRight="2px solid #0C1CD8" borderLeft="0" borderTop="0" display={isShowBtn} onClick={this.BtnClick}/>
                <div style={{padding:"10px 15px",background:"rgba(25,41,85,0.5)",display:isShowDiv,height:'99.9%'}}>

                    {/*标题*/}
                    <div>
                        <p style={titleP}>动态管控统计</p>
                        <img src="/images/guanbi.png" alt="" style={{float:"right",marginLeft:"20px",cursor:"pointer"}} onClick={this.chartsClick}/>
                        <div style={clear}></div>
                    </div>
                    {/*图表*/}
                    {isFetching ===  true? <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                        <Spin size="large" />
                    </div>:
                        <div style={{position:"relative"}}>
                            <EchartsReact
                                option={sourcesOption}
                                style={{height: '98%', width: '100%',margin:"0 auto"}}
                            />
                            {/*盘查人员总数*/}
                            <div style={{position:"absolute",top:"0px",right:"20px"}}>
                                <p style={p16}>
                                    <span>盘查人次总数</span>
                                </p>
                                {/*<Link to='/DynamicControl'>*/}
                                    <p style={p25}>
                                        <span>{inventoryTotalData}</span>
                                    </p>
                                {/*</Link>*/}
                            </div>
                        </div>}
                </div>
            </div>

        );
    }
}
//总体统计
class PopulationStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBtn: "none",
            isShowDiv: "block",
            // queryType:"year"
        }
    }
    componentDidMount() {
        //当前传过来的类型
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            pd: {
                //  code:this.props.type
                beginTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },

        }
        store.dispatch(postPopulationData(creds));
        store.dispatch(postConcernTotalData(creds));

    }

    componentWillReceiveProps(nextProps) {
        let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
        if (isTrue === false) {
            let creds = {
                pd: {
                    beginTime: nextProps.dateSet.beginTimeSet,
                    endTime: nextProps.dateSet.endTimeSet,
                },
            }
            store.dispatch(postPopulationData(creds));
            store.dispatch(postConcernTotalData(creds));
        }
    }

    chartsClick = () => {
        this.setState({
            isShowBtn: "block",
            isShowDiv: "none"
        });
    }
    BtnClick = () => {
        this.setState({
            isShowBtn: "none",
            isShowDiv: "block"
        });
    }
    render() {
        let populationDataList = store.getState().Home.data.populationData.result.list;


        let isFetching = store.getState().Home.data.populationData.isFetching;
        let concernTotalData = store.getState().Home.data.concernTotalData.result.list;
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
            color: ['#AAE8FF', '#79D9F1', '#00ACEE'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '数据',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
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

                data: populationDataList,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        let isShowBtn = this.state.isShowBtn;
        let isShowDiv = this.state.isShowDiv;
        let queryType = this.state.queryType;
        let type = 'follow';
        // let isFetching = store.getState().Home.data.populationData.isFetching;
        return (

            <div style={{position:"absolute",top:"15px",right:"15px",width:"25%",height:"45%"}}>
                <DeepBlueBtnY width="25px" text="总体数据统计" borderLeft="2px solid #0C1CD8" borderRight="0" borderTop="0" float="right" display={isShowBtn} onClick={this.BtnClick}/>
                <div style={{padding:"10px 15px",background:"rgba(25,41,85,0.5)",position:"relative",display:isShowDiv,height:"99.9%"}}>

                    {/*标题*/}
                    <div>
                        <img src="/images/guanbi.png" alt="" style={{float:"left",marginRight:"20px"}} onClick={this.chartsClick}/>
                        <p style={titleP}>总体数据统计</p>

                        <div style={clear}></div>
                    </div>
                    {/*图表*/}
                    {isFetching ===  true? <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                        <Spin size="large" />
                    </div>:
                        <div>
                            <div>
                                <EchartsReact
                                    option={liveOption}
                                    style={{height: '90%', width: '100%'}}
                                />
                            </div>
                            {/*关注人员总数*/}
                            <div style={{position:"absolute",top:"30px",right:"20px"}}>
                                <p style={p16}>
                                    <span>关注人员总数</span>
                                </p>
                                <Link to={'/DynamicControl'}>
                                    <p style={p25}>
                                        <span>{concernTotalData}</span>
                                    </p>
                                </Link>
                            </div>
                        </div>}

                </div>
            </div>



        );
    }
}
//活动数据统计
class ActiveDataStatistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowBtn: "none",
            isShowDiv: "block",
        }
    }
    componentDidMount() {
            //当前传过来的类型
            var myDate = new Date();
            let NowYEAR = myDate.getFullYear();
            let creds = {
                pd: {
                    //  code:this.props.type
                    beginTime: NowYEAR + '-01' + '-01',
                    endTime: NowYEAR + '-12' + '-31',
                },
            }
            store.dispatch(postActivityStatisticsData(creds));
            store.dispatch(postInflowTotalData(creds));
            store.dispatch(postOutflowTotalData(creds));
        }
        //子组件时候
    componentWillReceiveProps(nextProps) {
        let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
        if (isTrue === false) {
            let creds = {
                pd: {
                    beginTime: nextProps.dateSet.beginTimeSet,
                    endTime: nextProps.dateSet.endTimeSet,
                },
            }
            store.dispatch(postActivityStatisticsData(creds));
            store.dispatch(postInflowTotalData(creds));
            store.dispatch(postOutflowTotalData(creds));
        }
    }
    chartsClick = () => {
        this.setState({
            isShowBtn: "block",
            isShowDiv: "none"
        });
    }
    BtnClick = () => {
            this.setState({
                isShowBtn: "none",
                isShowDiv: "block"
            });
        }
        //跳转到动态管控的方法

    clickInflow = () => {
        let hrefInflow = store.getState().users.uiData.menus;
        let selectIn = hrefInflow[1].isSelect;
        let selectAll = hrefInflow[0].isSelect;
        this.setState({
            selectIn: !this.state.selectIn
        });
        // browserHistory.push('/DynamicControl');
    }
    render() {

// let active = {in: {lch: "0", gl: "1", tl: "1", mh: "0"}, out: {lch: "1", gl: "1", tl: "1", mh: "2"}}
        let activityStatisticsListIn = store.getState().Home.data.activityStatistics.result.in;
        let activityStatisticsListOut = store.getState().Home.data.activityStatistics.result.out;
        let inflowTotalData = store.getState().Home.data.inflowTotalData.result.list;
        let outflowTotalData = store.getState().Home.data.outflowTotalData.result.list;

        let mhData = [];
        let tlData = [];
        let glData = [];
        let lchData = [];

        mhData.push(activityStatisticsListIn.mh);
        mhData.push(activityStatisticsListOut.mh);
        tlData.push(activityStatisticsListIn.tl);
        tlData.push(activityStatisticsListOut.tl);
        glData.push(activityStatisticsListIn.gl);
        glData.push(activityStatisticsListOut.gl);
        lchData.push(activityStatisticsListIn.lch);
        lchData.push(activityStatisticsListOut.lch);
        console.log('glData',glData);


        let activeoption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['民航', '铁路', '公路','轮船'],
                textStyle: {
                    color: "#fff"
                },
                orient: "horizontal",

            },
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '0%',
            //     containLabel: true
            // },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#FFFAF0', //Y轴线条颜色
                        width: 1
                    }
                },

            },
            xAxis: {
                type: 'category',
                data: ['流入人员', '流出人员'],
                axisLine: {
                    lineStyle: {
                        color: '#FFFAF0', //Y轴线条颜色
                        width: 1
                    }
                },

            },

            color: ["#3DC7D1", '#F88A6F', '#00ACEE','#D184D4'],
            textStyle: {
                color: "#fff"
            },
            series: [{
                name: '民航',
                type: 'bar',
                stack: '总量',

                barWidth: '50%',
                data: mhData,
                label: {
                    normal: {
                        show:false ,
                        position: 'inside',
                    }
                },

            }, {
                name: '铁路',
                type: 'bar',
                stack: '总量',
                data: tlData,
                label: {
                    normal: {
                        show:  false,
                        position: 'inside',
                    }
                },
            }, {
                name: '公路',
                type: 'bar',
                stack: '总量',
                data: glData,
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                    }
                },
            }, {
                name: '轮船',
                type: 'bar',
                stack: '总量',
                data: lchData,
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                    }
                },
            }]
        };
        let isShowBtn = this.state.isShowBtn;
        let isShowDiv = this.state.isShowDiv;
        let isFetching = store.getState().Home.data.activityStatistics.isFetching;
        let type = 'flowIn';
        return (
            <div style={{position:"absolute",bottom:"15px",right:"15px",width:"25%",height:"45%"}}>
                <DeepBlueBtnY width="25px" text="活动数据统计" borderLeft="2px solid #0C1CD8" borderRight="0" borderTop="0" float="right" display={isShowBtn} onClick={this.BtnClick}/>
                <div style={{padding:"10px 15px",background:"rgba(25,41,85,0.5)",display:isShowDiv,height:'99.9%'}}>
                    {/*标题*/}
                    <div>
                        <img src="/images/guanbi.png" alt="" style={{float:"left",marginRight:"20px"}} onClick={this.chartsClick}/>
                        <p style={titleP}>活动数据统计</p>

                        <div style={clear}></div>
                    </div>
                    {/*图表*/}
                    {isFetching ===  true? <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                        <Spin size="large" />
                    </div>:
                        <div>
                            <EchartsReact
                                option={activeoption}
                                style={{height: '95%', width: '60%',float:"left"}}
                            />
                            <div style={{float:"right",marginTop:"10px",marginRight:"20px"}}>
                                <p style={p16}>
                                    <span>流入人员总数</span>
                                </p>
                                <Link to={'/DynamicControl'}>
                                    <p style={p25} onClick={this.clickInflow}>
                                        <span>{inflowTotalData}</span>
                                    </p>
                                </Link>
                                <p style={p16}>
                                    <span>流出人员总数</span>
                                </p>
                                <p style={p25}>
                                    <span>{outflowTotalData}</span>
                                </p>
                            </div>
                            <div style={clear}></div>
                        </div>}
                </div>
            </div>


        );
    }
}

//人员
class Personnel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBtn: "none",
            isShowDiv: "block",
        }
    }

    componentDidMount() {
            let personType = this.props.personType;
            var myDate = new Date();
            let NowYEAR = myDate.getFullYear();
            let creds = {
                pd: {
                    code: this.props.code
                        // beginTime: NowYEAR + '-01' + '-01',
                        // endTime: NowYEAR + '-12' + '-31',
                },
                showCount: 6
            }
            store.dispatch(postPersonnelListData(creds, personType));
            // this.Marquee();
        }
        //子组件时候
    componentWillReceiveProps(nextProps) {
        let personType = nextProps.personType;
        let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
        if (isTrue === false) {
            let creds = {
                pd: {
                    // beginTime:nextProps.dateSet.beginTimeSet,
                    // endTime:nextProps.dateSet.endTimeSet,
                },
                showCount: 8
            }

        }
    }


    chartsClick = () => {
        this.setState({
            isShowBtn: "block",
            isShowDiv: "none"
        });
    }
    BtnClick = () => {
        this.setState({
            isShowBtn: "none",
            isShowDiv: "block"
        });

    }
    afterChange = () => {
        this.forceFun();
    }
    forceFun = () => {
        this.forceUpdate();
    }

    render() {
        let isShowBtn = this.state.isShowBtn;
        let isShowDiv = this.state.isShowDiv;
        let personType = this.props.personType;
        let personnelList = [];
        let isFetching;
        if (personType === "zdgz") {
            //alert(111);
            personnelList = store.getState().Home.data.personnelKeyList.result.list;
            isFetching = store.getState().Home.data.personnelKeyList.isFetching;

        } else if (personType === "wld") {
            //alert(22);
            personnelList = store.getState().Home.data.personnelNotList.result.list;
            isFetching = store.getState().Home.data.personnelNotList.isFetching;
        } else if (personType === "szry") {
            //alert(33);
            personnelList = store.getState().Home.data.personnelMissingList.result.list;
            isFetching = store.getState().Home.data.personnelMissingList.isFetching;
        }

        /*let personDivList=[];


         if(personnelList.length == 0){
         personDivList.push(
         <div style={{marginTop:"50px",}}>
         <p style={{fontSize:"20px",color:"#fff",textAlign:"center"}}>暂无人员</p>
         </div>
         );
         }else{
         for(var i=0;i<personnelList.length;i++){
         var person = personnelList[i];
         if((i+1)%2==0){
         personDivList.push(
         <div>
         <PersonnelLst personIndex={personnelList[i-1]}/>
         <PersonnelLst personIndex={personnelList[i]}/>
         </div>
         )
         }
         }
         }*/
        let Lists = [];
        let isNull = true;
        if (personnelList.length == 0) {} else {
            isNull = false;
        }
        let zmdDiv = [];
        // for (var i = 0; i < personnelList.length; i++) {

        //     if (i  % 2 == 0) {
        //         zmdDiv.push(

        //             <div key={i}>
        //                 <PersonnelLst personIndex={personnelList[i-1]} />
        //                 <PersonnelLst personIndex={personnelList[i]} />
        //             </div>

        //         )
        //     }
        // }
        for(var i = 0; i < personnelList.length; i++){
            zmdDiv.push(
                <div key={i}>
                    <PersonnelLst personIndex={personnelList[i]} />
                </div>

            )
        }

        return (
            <div style={{width:"27%",float:"left",height:"161px",position:"relative",zIndex:'99'}}>
                <DeepBlueBtnY width="100px" height="30px" text={this.props.text} borderTop="2px solid #0C1CD8" borderRight="0" borderLeft="0" margin="150px 0 0 0"  display={isShowBtn} onClick={this.BtnClick}/>
                <div style={{padding:"10px 10px",background:"rgba(25,41,85,0.5)",height:"100%",marginRight:"20px",display:isShowDiv}}>
                    {/*标题*/}
                    <div style={{borderBottom:"1px solid #1C3495"}}>
                        <p style={titleP}>{this.props.text}</p>
                        <img src="/images/guanbi.png" alt="" style={{float:"right",marginLeft:"20px"}} onClick={this.chartsClick}/>
                        {/*<span style={{float:"right",color:"#cacaca",}}>更多>></span>*/}
                        <div style={clear}></div>
                    </div>
                    {/*内容*/}

                    <div>
                        {isNull === true ?
                            <div style={{marginTop:"40px",}}>
                                <p style={{fontSize:"20px",color:"#fff",textAlign:"center"}}>暂无人员</p>
                            </div>
                            :

                            <Carousel autoplay vertical autoplaySpeed={1200}  afterChange={this.afterChange} >
                              {zmdDiv}
                            </Carousel>

                        }

                    </div>

                </div>
            </div>

        );
    }
}
class PersonnelLst extends Component {
    render() {
        let personIndex = this.props.personIndex;
        let toElectronicArchivesUrl = '/ElectronicArchives/' + personIndex.idcard;
        return (
            <div style={{marginTop:"10px",height:106,}}>
                <Link to={toElectronicArchivesUrl}>
                <div style={{height:103}}>
                  {personIndex.zpurl !== '' ? <img src={personIndex.zpurl} alt="" style={{width:"16%",height:"auto",float:"left",marginTop:15}}/>:
                    <img src='../images/zanwu.png' alt="" style={{width:"16%",height:"auto",float:"left",marginTop:15}}/>
                  }
                    <div style={{float:"left",marginLeft:"5%",marginTop:20,width:'75%'}}>
                        <p style={{
                            fontSize:14,color:"#fff",marginBottom:15,width:'98%',overflow:'hidden',
                            textOverflow:'ellipsis',whiteSpace:'nowrap',
                            }}
                            title={personIndex.name === '' ? '暂无姓名': personIndex.name}
                        >
                        {personIndex.name === '' ? '暂无姓名': personIndex.name}
                        </p>
                        <p style={{fontSize:14,color:"#fff"}}>{personIndex.idcard}</p>
                    </div>
                    <div style={clear}></div>
                </div>
                </Link>
            </div>
        );
    }
}



export default connect(mainReducer)(Home);