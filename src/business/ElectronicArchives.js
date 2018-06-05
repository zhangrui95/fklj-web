// 电子档案页面
/**
 * Created by zy on 2017/5/15.
 */
//盘查详情页面
import React, { Component } from 'react'
import { mainReducer } from "../reducers/reducers";
import { fetchUsersData, changeTab } from "../actions/actions";
import { connect } from "react-redux";
import {
    initElectroTab,
    postElectronicArchivesData
} from "../actions/ElectronicArchives";
import DynamicRightContent from "./DynamicRightContent";
import { StylePage, ShallowBlueBtn, DeepRedBtn, Input, DeepBlueBtn, PhotoItem, Pag, InterrogationDetailsItem, Tabs } from "./generalPurposeModule";
import { store } from '../index.js';
import * as constants from "../utils/Constants";
import { BasicInformation } from "./InterrogationDetails/BasicInformation";
import { BgInformation } from "./InterrogationDetails/BgInformation";
import { SwordData } from "./InterrogationDetails/SwordData";
import { ActiveTrajectory } from "./InterrogationDetails/ActiveTrajectory";
import { AttentionDegree } from "./InterrogationDetails/AttentionDegree";
import { Header } from "../components/Header";
import {
    EmptyData
} from "../components/EmptyData";

class ElectronicArchives extends Component {

    componentWillUnmount() { //销毁
        // store.dispatch(initElectroTab());
        // store.getState().ElectronicArchivesUsers.data.ElectronicArchives.personnelInformation = {
        //      reason: {
        //                 "code": "",
        //                 "text": ""
        //                 },
        //                 result: {

        //                     list: [],
        //             }
        // }
        store.getState().ElectronicArchivesUsers.uiData = {
            tabs: [
                {
                    id: '101',
                    tabName: '基础信息',
                    isSelect: true
                },
                {
                    id: '102',
                    tabName: '背景信息',
                    isSelect: false
                },
                {
                    id: '103',
                    tabName: '活动轨迹',
                    isSelect: false
                },
                // {
                //     id: '104',
                //     tabName: '最新盘查数据',
                //     isSelect: false
                // },
                {
                    id: '104',
                    tabName: '利剑数据',
                    isSelect: false
                },
                {
                    id: '105',
                    tabName: '关注度积分',
                    isSelect: false
                }
            ]
        }
    }
    //设置管理菜单点击-获取数据-开关事件
    handleTabClick = (tab, type) => {

        store.dispatch(changeTab(tab, type, constants.ELETRO_MODULE));

        switch (tab.tabName) {
            case constants.INTERROGATIONDETAILS_TAB_BASIC:
                //     this.props.dispatch(fetchHorrorSoftwareData('/getHorrorSoftware'));
                break;
            case constants.INTERROGATIONDETAILS_TAB_CONTEXT:
                //    this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                break;
            case constants.INTERROGATIONDETAILS_TAB_ACTIVE_TRAJECTORY:
                //   this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                break;
            case constants.INTERROGATIONDETAILS_TAB_NEW_LJ_DATA:
                //   this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                break;
            case constants.INTERROGATIONDETAILS_TAB_NEW_GUZHU_DATA:

                break
            default:
                break
        }
    }

    componentDidMount() {
        let search = "idNumber=" + this.props.params.personId;
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                //    personId: this.props.params.personId,
                //    recordId: this.props.params.recordId,
                idcard: this.props.params.idcard,
            },
            showCount: constants.pageSize
        }
        this.props.dispatch(postElectronicArchivesData(creds));
    }
    render() {
        // let ElectronicArchivesList =store.getState().ElectronicArchivesUsers.data.ElectronicArchives.personnelInformation.result.list;
        let ElectronicArchivesList = [{
            zpurl: '/images/IMG_00000001.jpg',
            check_exception: 1,
            collectNumber: 19,
            name: '测试用户',
            idcard: '232326200002020608',
            birth: '1985-05-23',
            nation: '汉',
            sex: '男',
            address: '黑龙江省哈尔滨市松北区科技创新城',
            tags: "违法犯罪-111001,在逃人员-111001,涉毒人员-111001"
        }];
        let interrogation = []
        var ElectronicArchives = null;
        for (var i = 0; i < ElectronicArchivesList.length; i++) {
            ElectronicArchives = ElectronicArchivesList[i];
            interrogation.push(
                <InterrogationDetailsItem interrogationDetailsUser={ElectronicArchives} />
            );
        }

        //标签
        let tabs = store.getState().ElectronicArchivesUsers.uiData.tabs;
        console.log('tabs**', tabs);
        let isSelectTab, content;
        //查找被选中的标签
        tabs.forEach(function (tab) {
            if (tab.isSelect === true) {
                isSelectTab = tab;
            }
        });

        let recordId = (ElectronicArchives === null ? 0 : ElectronicArchives.recordId);
        let personId = (ElectronicArchives === null ? 0 : ElectronicArchives.personId);
        let user = JSON.parse(sessionStorage.getItem('user'));
        let jyxm = user.user.name;
        let idcard = this.props.params.idcard;
        if (ElectronicArchives !== null) {
            switch (isSelectTab.tabName) {
                case constants.INTERROGATIONDETAILS_TAB_BASIC:
                    content =
                        <div>
                            <div style={{ marginTop: "20px" }}>
                                <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                                <div style={{ clear: "both" }}></div>
                            </div>
                            <BasicInformation idcard={idcard} />
                        </div>
                    break
                case constants.INTERROGATIONDETAILS_TAB_CONTEXT:
                    content = <div>
                        <div style={{ marginTop: "20px" }}>
                            <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                            <div style={{ clear: "both" }}></div>
                        </div>
                        <BgInformation idcard={idcard} recordId={recordId} personId={personId} />
                    </div>
                    break

                case constants.INTERROGATIONDETAILS_TAB_ACTIVE_TRAJECTORY:
                    content = <div>
                        <div style={{ marginTop: "20px" }}>
                            <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                            <div style={{ clear: "both" }}></div>
                        </div>
                        <ActiveTrajectory idcard={idcard} jyxm={jyxm} />
                    </div>
                    break
                case constants.INTERROGATIONDETAILS_TAB_NEW_LJ_DATA:
                    content = <div>
                        <div style={{ marginTop: "20px" }}>
                            <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                            <div style={{ clear: "both" }}></div>
                        </div>
                        <SwordData recordId={recordId} personId={personId} />
                    </div>
                    break
                case constants.INTERROGATIONDETAILS_TAB_NEW_GUZHU_DATA:
                    content = <div>
                        <div style={{ marginTop: "20px" }}>
                            <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                            <div style={{ clear: "both" }}></div>
                        </div>
                        <AttentionDegree recordId={recordId} personId={personId} />
                    </div>
                    break

                default:
                    break
            }
        } else {
            content = <EmptyData />
        }

        return (

            <div>
                <Header homeType="hs_fklj_sys" />
                {/* <div>
                    <p style={{ fontSize: "16px", color: "#fff", marginTop: "20px", paddingLeft: "18px" }}>电子档案</p>
                </div> */}
                <div style={{ padding: "18px" }}>
                    {/*{interrogationDetailsUserItems}*/}
                    {interrogation}
                    {/*标签页*/}
                    <div>

                        {content}
                    </div>
                </div>

            </div>
        );
    }
}


export default connect(mainReducer)(ElectronicArchives);
