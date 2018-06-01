/*
 首页 呼市反恐
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
import WebSocket from './WebSocket';
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
    postAirportCoordMapData,
    postHomeControlPeson_hushi_Data,//呼市反恐 管控人员
    postPoliceStation_hushi_Data,//呼市反恐 派出所统计
    postHaveBeenchecked_hushi_Data,//已完成任务 最新盘查
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
    geoCoordMap,
    getMyDate
} from '../utils/';
import {
    Spin,
    Carousel,
    Table,
    Tag
} from 'antd';
import Websocket from './WebSocket/index';
import '../resources/main.less';
import '../resources/slider.less';
import * as constants from "../utils/Constants";
require("echarts/map/js/china.js");
require("echarts/map/js/province/guangxi.js");
require("echarts/map/js/province/shandong.js");
require("echarts/map/js/province/liaoning.js");
require("echarts/map/js/province/jilin.js");
require("../components/map/city/huhehaote.js");
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
            endTimeSet: '',

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
    handleData(data) {
        console.log('data===>', data)
        // let result = JSON.parse(data);
        // that.setState({
        //     data: result,
        //     show: true
        // });
        let param = {
            pd: {}
        }
        store.dispatch(postHaveBeenchecked_hushi_Data(param));
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
            <div style={{ overflow: "hidden", width: "100%" }}>
                <Header homeType="hs_fklj_sys" />
                {/*内容*/}
                <div>
                    <div>
                        <div style={{ position: "relative" }}>

                            {/*地图*/}
                            {/*<ChinaMap />*/}

                            <AirportCoordComponent airportCoordMapData={airportCoordMapData} dateSet={dateSet} />



                            {/*任务数据统计*/}
                            <TaskStatistics dateSet={dateSet} />
                            <div style={{ position: "absolute", bottom: "15px", right: "15px", width: "25%", height: "40%", minHeight: "270px" }}>
                                <Personnel text="最新盘查人员" personType='ypcrw' code='201001' dateSet={dateSet} />
                                <div style={clear}></div>
                            </div>
                            {/*总体和活动统计*/}
                            {/*<div style={{position:"absolute",top:"15px",right:"15px",width:"25%",height:"44%"}}>*/}
                            {/*管控人员*/}
                            <PopulationStatistics dateSet={dateSet} />
                            {/*活动统计*/}
                            <ActiveDataStatistics dateSet={dateSet} />
                            {/*</div>*/}
                            <Websocket url={global.configUrl.messageQueue} onMessage={this.handleData} />
                        </div>

                    </div>

                </div>
                <WebSocket />
            </div>

        );
    }
}
// 地图
class ChinaMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapType: "china",
            distributeMapData: [{ name: '内蒙古', value: '2' }]
        }
    }

    mapCity = (e) => {
        if (e.name.length > 0) {
            this.setState({
                mapType: e.name.toString(),
                distributeMapData: [{ name: '呼和浩特市', value: '2' }]
            });
        } else {
            this.setState({
                mapType: "china",
                distributeMapData: [{ name: '内蒙古', value: '2' }]
            });
        }
    }
    render() {

        let numData = [];
        for (var i = 0; i < this.state.distributeMapData.length; i++) {
            var distribute = this.state.distributeMapData[i];
            var number = distribute.value;
            var num = parseInt(number);
            numData.push(
                num
            );
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
                mapType: this.state.mapType,
                roam: false,
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
                data: this.state.distributeMapData,
                silent: false
            }]
        };
        let onEvents = {
            'click': this.mapCity,
        }
        return (
            <div style={{ width: "50%", margin: "0 25%" }}>
                <div>
                    <EchartsReact
                        option={optionMap}
                        style={{ height: '84%', width: '100%' }}
                        onEvents={onEvents}
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
        var convertData = function (data) {
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
        ].forEach(function (item, i) {
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
                    symbolSize: function (val) {
                        return val[2] / 8;
                    },

                    //图形样式
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    data: item[1].map(function (dataItem) {
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

                <div style={{ height: '84%' }}>
                    {isFetching === true ? <div style={{ textAlign: "center", position: "absolute", left: "47%", top: "50%" }}>
                        <Spin size="large" />
                    </div> :
                        <EchartsReact
                            option={this.getOtion()}
                            style={{ height: '100%', width: '110%', paddingTop: '5%' }}
                        />}
                </div>
            </div>
        );
    }
};

//拟来呼人员
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
        // let queryType = this.props.queryType;
        // let search = 'type=' + queryType;
        // var myDate = new Date();
        // let NowYEAR = myDate.getFullYear();
        // let creds = {
        //     entityOrField: true,
        //     pd: {
        //         beginTime: NowYEAR + '-01' + '-01',
        //         endTime: NowYEAR + '-12' + '-31',
        //     },
        // }
        // store.dispatch(postTaskStatisticsData(creds));
        //盘查人数总和
        // store.dispatch(postInventoryTotalData(creds));
    }
    //接收到新的propos state 后进行渲染之前调用
    componentWillReceiveProps(nextProps) {
        let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
        if (isTrue === false) {
            // let creds = {
            //     pd: {
            //         beginTime: nextProps.dateSet.beginTimeSet,
            //         endTime: nextProps.dateSet.endTimeSet,
            //     },
            // }
            // store.dispatch(postTaskStatisticsData(creds));
            // store.dispatch(postInventoryTotalData(creds));
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
        // if (taskStatisticsList.length > 0) {
        //     data = [taskStatisticsList[5].value, taskStatisticsList[4].value, taskStatisticsList[3].value, taskStatisticsList[2].value, taskStatisticsList[1].value, taskStatisticsList[0].value];
        // }
        // data = [7, 17, 27, 3, 12, 9]
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
                data: ['北京', '新疆', '西藏', '山东', '广西', '湖北'],
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
                        color: function (params) {
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
        // let isFetching = store.getState().Home.data.taskStatistics.isFetching;
        let isFetching = false;
        return (

            <div style={{ position: "absolute", top: "15px", left: "15px", width: "25%", height: "50%", }}>
                {/*隐藏的按钮状态*/}
                <DeepBlueBtnY width="25px" text={global.configUrl.configureRegionText} borderRight="2px solid #0C1CD8" borderLeft="0" borderTop="0" display={isShowBtn} onClick={this.BtnClick} />
                <div style={{ padding: "10px 15px", background: "rgba(25,41,85,0.5)", display: isShowDiv, height: '99.9%' }}>

                    {/*标题*/}
                    <div>
                        <p style={titleP}>{global.configUrl.configureRegionText}</p>
                        <img src="/images/guanbi.png" alt="" style={{ float: "right", marginLeft: "20px", cursor: "pointer" }} onClick={this.chartsClick} />
                        <div style={clear}></div>
                    </div>
                    {/*图表*/}
                    {isFetching === true ? <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                        <Spin size="large" />
                    </div> :
                        <div style={{ position: "relative" }}>
                            <EchartsReact
                                option={sourcesOption}
                                style={{ height: '98%', width: '100%', margin: "0 auto" }}
                            />
                            {/*盘查人员总数*/}
                            <div style={{ position: "absolute", top: "0px", right: "20px" }}>
                                <p style={p16}>
                                    <span>人员总数</span>
                                </p>
                                {/*<Link to='/DynamicControl'>*/}
                                <p style={p25}>
                                    {/*<span>{inventoryTotalData}</span>*/}
                                    <span>0</span>
                                </p>
                                {/*</Link>*/}
                            </div>
                        </div>}
                </div>
            </div>

        );
    }
}
//管控人员
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
        let param = {
            pd: {}
        }
        store.dispatch(postHomeControlPeson_hushi_Data(param));

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
        // let populationDataList = store.getState().Home.data.populationData.result.list;
        // let populationDataList = [{name: "流动人员", value: 18},{name: "常住人员", value: 5},{name: "暂住人员", value:60}];


        // let isFetching = store.getState().Home.data.populationData.isFetching;
        // let isFetching = false;
        let homecontrolpersonhushiDataList = store.getState().Home.data.homecontrolpersonhushiData.result.list;
        let isFetching = store.getState().Home.data.homecontrolpersonhushiData.isFetching;
        let dataList = [];
        for (let i = 0; i < homecontrolpersonhushiDataList.length; i++) {
            let item = homecontrolpersonhushiDataList[i];
            if (item.name === 0) {
                let obj = {
                    name: '常住',
                    value: item.value
                };
                dataList.push(obj);
            } else if (item.name === 1) {
                let obj = {
                    name: '暂住',
                    value: item.value
                };
                dataList.push(obj);
            } else if (item.name === 2) {
                let obj = {
                    name: '流动',
                    value: item.value
                };
                dataList.push(obj);
            }
        }
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

                data: dataList,
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

        return (

            <div style={{ position: "absolute", bottom: "15px", left: "15px", width: "25%", height: "40%" }}>
                <DeepBlueBtnY width="25px" text="管控人员" borderRight="2px solid #0C1CD8" borderLeft="0" borderTop="0" display={isShowBtn} onClick={this.BtnClick} />
                <div style={{ padding: "10px 15px", background: "rgba(25,41,85,0.5)", position: "relative", display: isShowDiv, height: "99.9%", position: 'relative' }}>

                    {/*标题*/}
                    <div>
                        <img src="/images/guanbi.png" alt="" style={{ float: "right", marginLeft: "20px", cursor: "pointer" }} onClick={this.chartsClick} />
                        <p style={titleP}>管控人员</p>

                        <div style={clear}></div>
                    </div>
                    {/*图表*/}
                    {isFetching === true ? <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                        <Spin size="large" />
                    </div> :
                        <div>
                            <div>
                                <EchartsReact
                                    option={liveOption}
                                    style={{ height: '87%', width: '89%', position: 'absolute', top: 8 }}
                                />
                            </div>
                            {/*关注人员总数*/}
                            {/*<div style={{position:"absolute",top:"30px",right:"20px"}}>*/}
                            {/*<p style={p16}>*/}
                            {/*<span>管控人员总数</span>*/}
                            {/*</p>*/}
                            {/*<Link to={'/DynamicControl'}>*/}
                            {/*<p style={p25}>*/}
                            {/*<span>{concernTotalData}</span>*/}
                            {/*</p>*/}
                            {/*</Link>*/}
                            {/*</div>*/}
                        </div>}
                </div>
            </div>



        );
    }
}
//派出所任务统计
class ActiveDataStatistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowBtn: "none",
            isShowDiv: "block",
            policeNowPage: 1,
        }
    }
    componentDidMount() {
        let param = {
            currentPage: 1,
            entityOrField: true,
            pd: {
            },
            showCount: 6
        }
        store.dispatch(postPoliceStation_hushi_Data(param));
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
        let policeStationDataList = store.getState().Home.data.policeStationData.result.list;
        let page = store.getState().Home.data.policeStationData.result.page;
        let isShowBtn = this.state.isShowBtn;
        let isShowDiv = this.state.isShowDiv;
        let isFetching = store.getState().Home.data.policeStationData.isFetching;
        let policeNowPage = this.state.policeNowPage;
        let recordNumber = parseInt((policeNowPage - 1) * 6);
        let dataList = [];
        for (let i = 0; i < policeStationDataList.length; i++) {
            let item = policeStationDataList[i];
            let serial = recordNumber + i + 1;
            dataList.push({
                serial: serial,
                police_unit_name: item.police_unit_name,
                count: item.count,

            });
        }
        let type = 'flowIn';
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            key: 'serial',
        }, {
            title: '单位',
            dataIndex: 'police_unit_name',
            key: 'police_unit_name',
            render: (text, record) => (
                <span title={text} style={{ cursor: "pointer" }}>
                    {
                        text.length <= 10 ?
                            text.slice(0, 9) : text.slice(0, 9) + "..."

                    }
                </span>
            ),
        }, {
            title: '管控人员',
            dataIndex: 'count',
            key: 'count',
        }];
        const pagination = {
            onChange: (page) => {
                this.setState({
                    policeNowPage: page,
                });
                let creds = {
                    currentPage: page,
                    entityOrField: true,
                    pd: {
                    },
                    showCount: 6
                }
                store.dispatch(postPoliceStation_hushi_Data(creds));
            },
            current: page.currentPage,
            total: page.totalResult,
            pageSize: page.showCount,
        };
        return (
            <div style={{ position: "absolute", top: "15px", right: "15px", width: "25%", height: "50%", minHeight: '340px' }}>
                <DeepBlueBtnY width="25px" text="责任单位" borderLeft="2px solid #0C1CD8" borderRight="0" borderTop="0" float="right" display={isShowBtn} onClick={this.BtnClick} />
                <div style={{ padding: "10px 15px", background: "rgba(25,41,85,0.5)", display: isShowDiv, height: '99.9%', position: 'relative' }}>
                    {/*标题*/}
                    <div>
                        <img src="/images/guanbi.png" alt="" style={{ float: "left", marginRight: "20px", cursor: "pointer" }} onClick={this.chartsClick} />
                        <p style={titleP}>责任单位</p>
                        <div style={clear}></div>
                    </div>
                    <div className="home-table" style={{ padding: "0 15px" }}>
                        {isFetching ?
                            <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                                <Spin size="large" />
                            </div> :
                            <Table locale={{ emptyText: '暂无数据' }} columns={columns} dataSource={dataList} size="small" pagination={pagination} />
                        }

                    </div>
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
        let param = {
            pd: {}
        }
        store.dispatch(postHaveBeenchecked_hushi_Data(param));
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
        if (personType === "ypcrw") {
            //alert(111);
            // personnelList = store.getState().Home.data.personnelKeyList.result.list;
            personnelList = [{ address: "玉泉区兴隆巷1012单元104", birth: "1987-11-21 00:00:00", check_exception: 0, gzzt: 0, idcard: "450102198711210265", name: "流出人员", nation: "汉族", personId: "6bb9b08102434a9f8511440382b19679", recordId: "23012419800101005520180125150933078", sex: "女", visibale: 1, zpurl: "" }, { address: "玉泉区兴隆巷1012单元104", birth: "1987-11-21 00:00:00", check_exception: 0, gzzt: 0, idcard: "450102198711210265", name: "流出人员", nation: "汉族", personId: "6bb9b08102434a9f8511440382b19679", recordId: "23012419800101005520180125150933078", sex: "女", visibale: 1, zpurl: "" }, { address: "玉泉区兴隆巷1012单元104", birth: "1987-11-21 00:00:00", check_exception: 0, gzzt: 0, idcard: "450102198711210265", name: "流出人员", nation: "汉族", personId: "6bb9b08102434a9f8511440382b19679", recordId: "23012419800101005520180125150933078", sex: "女", visibale: 1, zpurl: "" }];
        }
        let Lists = [];
        let isNull = true;
        if (personnelList.length == 0) { } else {
            isNull = false;
        }
        let zmdDiv = [];
        for (var i = 0; i < personnelList.length; i++) {
            zmdDiv.push(
                <div key={i}>
                    <PersonnelLst personIndex={personnelList[i]} />
                </div>

            )
        }
        // 已完成任务
        let data = store.getState().Home.data.haveBeenCheckedData.result;
        let isFetching = store.getState().Home.data.haveBeenCheckedData.isFetching;
        return (
            <div>
                <DeepBlueBtnY width="25" text={this.props.text} borderLeft="2px solid #0C1CD8" borderRight="0" borderTop="0" float="right" display={isShowBtn} onClick={this.BtnClick} />
                <div style={{ padding: "10px 10px", background: "rgba(25,41,85,0.5)", height: "100%", display: isShowDiv, position: 'relative' }}>
                    {/*标题*/}
                    <div style={{ borderBottom: "1px solid #585c77" }}>
                        <img src="/images/guanbi.png" alt="" style={{ float: 'left', marginRight: "20px", cursor: "pointer" }} onClick={this.chartsClick} />
                        <p style={titleP}>{this.props.text}</p>
                        {/*<span style={{float:"right",color:"#cacaca",}}>更多>></span>*/}
                        <div style={clear}></div>
                    </div>
                    {/*内容*/}

                    <div>
                        {/* {isNull === true ?
                            <div style={{ marginTop: "40px", }}>
                                <p style={{ fontSize: "20px", color: "#fff", textAlign: "center" }}>暂无任务</p>
                            </div>
                            :

                            <Carousel autoplay vertical autoplaySpeed={1200} afterChange={this.afterChange} >
                                {zmdDiv}
                            </Carousel>

                        } */}
                        {isFetching ?
                            <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                                <Spin size="large" />
                            </div> :
                            <PersonnelLst personIndex={data} />
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
            <div style={{ marginTop: "10px", height: "200", padding: "0 16px" }}>
                {/*<Link to={toElectronicArchivesUrl}>*/}
                <div >
                    {personIndex ? personIndex.zpurl !== '' ? <img src={personIndex.zpurl} alt="" style={{ width: "80px", height: "110px", float: "left", marginTop: 15 }} /> :
                        <img src='../images/zanwu.png' alt="" style={{ width: "80px", height: "110px", float: "left", marginTop: 15 }} /> :
                        <img src='../images/zanwu.png' alt="" style={{ width: "80px", height: "110px", float: "left", marginTop: 15 }} />
                    }
                    <div style={{ float: "left", marginLeft: "5%", marginTop: 20, }}>
                        <p style={{
                            fontSize: 14, color: "#fff", width: '98%', overflow: 'hidden',
                            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}
                            title={personIndex ? personIndex.name === '' ? '暂无姓名' : personIndex.name : '暂无姓名'}
                        >
                            {personIndex ? personIndex.name === '' ? '暂无姓名' : personIndex.name : '暂无姓名'}<Tag style={{ marginLeft: '16px', color: '#f6c094', background: 'none' }} color="volcano">
                                {personIndex ? personIndex.address_type ? personIndex.address_type === 0 ? '常住' : personIndex.address_type === 1 ? "暂住" : '流动' : '暂无居住类型' : '暂无居住类型'}
                            </Tag>
                        </p>
                        <p style={{ fontSize: 14, color: "#fff" }}>{personIndex ? personIndex.idcard : ''}</p>
                        <p style={{ fontSize: 14, color: "#fff" }}>{personIndex ? personIndex.now_address : ''}</p>
                    </div>
                    <div style={clear}></div>
                </div>
                <div style={{ color: '#f89448', marginTop: '16px' }}>
                    <div>由 {personIndex ? personIndex.police_unit : '派出所'}，{personIndex ? personIndex.police_name : '警员'}，于{personIndex ? getMyDate(personIndex.checktime) : ''} 盘查</div>
                </div>
                {/*</Link>*/}
            </div>
        );
    }
}



export default connect(mainReducer)(Home);