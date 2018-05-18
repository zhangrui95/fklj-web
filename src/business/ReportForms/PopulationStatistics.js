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
    getControlPersonList,
    getControlPersonalListGroupByAddressType,
    getControlPersonalListGroupBySource,
    getControlPersonCountForX3
} from "../../actions/ReportForms"
import EchartsReact from 'echarts-for-react';
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
                startTimeSet: '',
                endTimeSet: ''
            },
            startTimeSet: '',
            endTimeSet: ''
        };
    }

    componentDidMount() {
        let myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            startTime: NowYEAR + '-01' + '-01',
            endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getControlPersonCountForX3(creds));
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
            store.dispatch(getControlPersonList(creds));
            store.dispatch(getControlPersonalListGroupByAddressType(creds));
            store.dispatch(getControlPersonalListGroupBySource(creds));
            store.dispatch(getControlPersonCountForX3(creds));
        }
    }
    render() {
        let dateSet = {
            startTimeSet: this.state.startTimeSet,
            endTimeSet: this.state.endTimeSet
        };
        let totalAttention = store.getState().ReportForms.data.PersonCount.result.count;
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

        return (

            <div className="sliderWrap" style={{borderBottom: "0", height: 'auto'}}>
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <p style={{fontSize: "18px", color: "#fff", float: "left", marginRight: "50px"}}>在呼管控人员数量：
                            <span
                                style={{
                                    width: "80px",
                                    display: "inline-block",
                                    _display: "inline",
                                    zoom: "1"
                                }}
                            >{totalAttention}</span>
                        </p>
                        <div style={{float: "left", marginLeft: "50px"}}>
                            <label htmlFor="" style={labelStyle2}>统计时间：</label>
                            { beginPicker }
                            <span className="font14" style={{marginRight: "10px"}}>至</span>
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
                            }}>管控情况</p>
                            {/*添加图表*/}
                            <div>
                                <ControlCharts  dateSet={dateSet}/>
                            </div>
                        </div>
                        <div style={{float: "left", borderBottom: '1px solid #0C5F93', width: "50%", height: "43%"}}>
                            <div style={{color:"#FFF"}}>
                                <p style={{fontSize: 30, color:"rgb(231, 231, 231)" , textAlign: 'center',marginTop:'25%'}}>{this.props.context !== undefined ? this.props.context: '功能开发中...'}</p>
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

//居住情况图表
class LiveCharts extends Component {
    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            startTime: NowYEAR + '-01' + '-01',
            endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getControlPersonalListGroupByAddressType(creds));
    }
    render() {
        const LiveTypeList = store.getState().ReportForms.data.LiveType.result.list;
        const liveChartsList = [];
        for(let i in LiveTypeList){
            if(i!=='remove'){
                liveChartsList.push({name:LiveTypeList[i].name == 0 ? '常住人员':(LiveTypeList[i].name === 1 ? '暂住人员' : '流动人员'),value:LiveTypeList[i].value})
            }
        }
        let isFetching = store.getState().ReportForms.data.ControlType.isFetching;
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
//拟来呼人员
class ComeInCharts extends Component {

    componentDidMount() {
        var myDate = new Date();
        let NowYEAR = myDate.getFullYear();
        let creds = {
            entityOrField: true,
            pd: {
                startTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
            },
        }
        // store.dispatch(postAgeChartsData(creds));
    }
    //组件props发生变化，更新state
    // componentWillReceiveProps(nextProps) {

    //     let isTrue = Compare(this.props.dateSet, nextProps.dateSet);
    //     if (isTrue === false) {
    //         let creds = {
    //             currentPage: 1,
    //             entityOrField: true,
    //             pd: {
    //                 startTime: nextProps.dateSet.startTimeSet,
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
            startTime: NowYEAR + '-01' + '-01',
            endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getControlPersonList(creds));
    }
    render() {
        const ControlTypeList = store.getState().ReportForms.data.ControlType.result.list;
        let sexChartsList = [];
        for(let i in ControlTypeList){
            if(i!=='remove'){
                sexChartsList.push({name:ControlTypeList[i].name == 0 ? '未管控':(ControlTypeList[i].name === 1 ? '已管控' : (ControlTypeList[i].name === 2 ?'离开责任区':'失控')),value:ControlTypeList[i].value})
            }
        }
        let isFetching = store.getState().ReportForms.data.ControlType.isFetching;
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
                startTime: NowYEAR + '-01' + '-01',
                endTime: NowYEAR + '-12' + '-31',
        }
        store.dispatch(getControlPersonalListGroupBySource(creds));
    }
    render() {
        const ListGroupBySource = store.getState().ReportForms.data.ListGroupBySource.result.list;
        const FormChartsList = [];
        for(let i in ListGroupBySource){
            if(i!=='remove'){
                FormChartsList.push({name:ListGroupBySource[i].name == '901006' ? '后台导入' : '前端新增',value: ListGroupBySource[i].value})
            }
        }
        let isFetching = store.getState().ReportForms.data.ControlType.isFetching;
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
                data: FormChartsList,
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
    overflow: "hidden"
}
const clear = {
    clear: "both"
}
export default connect(mainReducer)(PopulationStatistics);