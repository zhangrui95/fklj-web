/**
 * Created by iliulei on 2017/6/20.
 */
//报表
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
// import DynamicRightContent from "./DynamicRightContent";
import {fetchUsersData, changeMenu, initDynamicControlMenu, fetchLogin,initReportFormMenu} from "../actions/actions";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem
} from "./generalPurposeModule";
import {store} from '../index.js';
import {REPORTFORMS_MODULE} from "../utils/Constants";
import {Header} from "../components/Header";
import WebSocket from './WebSocket';
//import { Line } from './';
import ReactHighcharts from 'react-highcharts';
import EchartsReact from 'echarts-for-react';
import ReportFormRight from './ReportFormRight';
require("echarts/map/js/province/heilongjiang.js");

// require("../resources/bundle");



class ReportForm extends Component {
    componentWillUnmount() { //销毁
        store.dispatch(initReportFormMenu(this.props.ReportFormChart.uiData.menus))
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    //动态管控菜单点击-获取数据-开关事件
    handleMenuClick = (menu, type) => {
        store.dispatch(changeMenu(menu, type, REPORTFORMS_MODULE));
    }

    render() {

        return (
            <div style={{overflow: 'hidden', width: "100%"}}>
                <Header homeType="fklj_sys"/>
                <div className="sileder_left">
                    <SliderMenuItem menus={this.props.ReportFormChart.uiData.menus} handleMenuClick={this.handleMenuClick}/>
                </div>
                <div className="sileder_right">
                    <ReportFormRight />
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>



        );
    }

}
export default connect(mainReducer)(ReportForm);
