/**
 * Created by iliulei on 2017/6/20.
 */
//报表
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
// import DynamicRightContent from "./DynamicRightContent";
import {fetchUsersData, changeMenu, initDynamicControlMenu, fetchLogin,initReportFormsMenu} from "../actions/actions";
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
//import { Line } from './';
import ReactHighcharts from 'react-highcharts';
import EchartsReact from 'echarts-for-react';
import ReportFormsRight from './ReportFormsRight';
require("echarts/map/js/province/heilongjiang.js");

// require("../resources/bundle");



class ReportForms extends Component {
    componentWillUnmount() { //销毁
        store.dispatch(initReportFormsMenu(this.props.ReportForms.uiData.menus))
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
                <Header />
                <div className="sileder_left">
                    <SliderMenuItem menus={this.props.ReportForms.uiData.menus} handleMenuClick={this.handleMenuClick}/>
                </div>
                <div className="sileder_right">
                    <ReportFormsRight />
                </div>
                <div className="clear"></div>
            </div>



        );
    }

}
export default connect(mainReducer)(ReportForms);
