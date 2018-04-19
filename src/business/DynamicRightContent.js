/**
 * Created by zy on 2017/5/8.
 */
//动态管控右侧组件
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    mainReducer
} from "../reducers/reducers";
import {
    PostUsersData,
    saveDynamicPhotoItem
} from "../actions/actions";
import {
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    PhotoItem,
    Pag
} from "./generalPurposeModule";
import {
    changeShade
} from "../actions/actions";
import {
    store
} from '../index.js'
import * as constants from "../utils/Constants";
import {
    DatePicker,
    notification,
    message,
    Spin
} from 'antd';
import {
    DynamicContent
} from "./DynamicControl/DynamicContent";
import {
    DynamicContentAbnormal
} from "./DynamicControl/DynamicContentAbnormal";
import {
    DynamicContentMissing
} from "./DynamicControl/DynamicContentMissing";
import {
    DynamicContentInflow
} from "./DynamicControl/DynamicContentInflow";
import {
    DynamicContentNotLande
} from "./DynamicControl/DynamicContentNotLande";
import {
    DynamicContentOutflow
} from "./DynamicControl/DynamicContentOutflow";

import {
    monthFormat,
    dateFormat
} from '../utils/';

import moment from 'moment';
moment.locale('zh-cn');
import { goBack, push, replace } from 'react-router-redux';
import { browserHistory } from 'react-router';

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}

export class DynamicRightContent extends Component {

    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
      //  browserHistory.replace('/DynamicControl');

    }
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('nextProps',nextProps);
    //     console.log('nextState',nextState);
        
    //     return true
        
    // }

    render() {


        let isSelectMenu, haveSonMenu;
        let content;
        //查找被选中菜单
        this.props.DynamicControl.uiData.menus.forEach(function(menu) {
            if (menu.isSelect === true) { //判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            if (menu.haveSon === true) {
                haveSonMenu = menu;
                haveSonMenu.sonMenu.forEach(function(sonMenu) {
                    if (sonMenu.isSelect) {
                        isSelectMenu = sonMenu;
                        return
                    }
                })
            }

        });
        switch (isSelectMenu.id) { //赋值显示页面
            
            case '101': //全部
                content = <DynamicContent   type={constants.dybamicControlCode.all}  />
                break
            case '1021': //盘查异常
                content = <DynamicContentAbnormal type={constants.dybamicControlCode.abnormal}/>
                break
            case '1022': //重点人员
                content = <DynamicContent   type={constants.dybamicControlCode.keyPerson}  />
                break
            case '1023': //临控对象
                content = <DynamicContent  type={constants.dybamicControlCode.clinicalControl}   />
                break
            case '1024': //在侦在控
                content = <DynamicContent  type={constants.dybamicControlCode.reconnaissance}   />
                break
            case '1031': //未落地人员
                content = <DynamicContentNotLande type={constants.dybamicControlCode.notLanded}/>
                break
            case '1032': //流入人员
                content = <DynamicContentInflow type={constants.dybamicControlCode.inflow}/>
                break
            case '1033': //流出人员
                content = <DynamicContentOutflow type={constants.dybamicControlCode.outflow}/>
                break
            case '1034': //失踪人员
                content = <DynamicContentMissing type={constants.dybamicControlCode.beMissing}/>
                break
            default:
                break
        }
        return (
            <div>
                {content}
            </div>
        );
    }


};



export default connect(mainReducer)(DynamicRightContent);