/**
 * 呼市任务管理右侧
 */
import React, { Component } from 'react'
import { mainReducer } from "../reducers/reducers";
import { connect } from "react-redux";
import { store } from '../index.js';
import { PointTask } from "./TaskManagement/PointTask";
import { PatrolTask } from "./TaskManagement/PatrolTask";
import { DoneTask } from "./TaskManagement/DoneTask";
import { OverTask } from "./TaskManagement/OverTask";
import { PointwaitTask } from "./TaskManagement/PointwaitTask";
import { PointFinishTask } from "./TaskManagement/PointFinishTask";

// import {fetchTaskStatisticsData,fetchTaskHistoryData
// } from "../../actions/Luoyang/DefineWarehouse";
import * as constants from "../utils/Constants";

export class TaskManagementRight extends Component {
    componentDidMount() {

    }
    render() {
        let isSelectMenu, haveSonMenu;
        let content;
        //查找被选中菜单
        store.getState().TaskManagement.uiData.menus.forEach(function (menu) {
            if (menu.isSelect === true) { //判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            if (menu.haveSon === true) {
                haveSonMenu = menu;
                haveSonMenu.sonMenu.forEach(function (sonMenu) {
                    // if(sonMenu.isShow){
                    if (sonMenu.isSelect) {
                        isSelectMenu = sonMenu;
                        return
                    }
                    // }
                })
            }

        });
        switch (isSelectMenu.id) {
            case '101':
                content = <PointTask />
                break
            case '102':
                content = <PatrolTask />
                break
            case '103':
                content = <DoneTask />
                break
            case '104':
                content = <OverTask />
                break
            case '111':
                content = <PointwaitTask />
                break
            case '112':
                content = <PointFinishTask />
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
}


export default connect(mainReducer)(TaskManagementRight);
