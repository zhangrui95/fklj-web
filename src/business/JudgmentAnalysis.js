/**
 * Created by zy on 2017/5/8.
 */
//研判分析
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import JudgmentAnalysisRight from "./JudgmentAnalysisRight";
import {fetchUsersData,changeMenu,initDynamicControlMenu,fetchLogin} from "../actions/actions";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SliderMenuItem} from "./generalPurposeModule";
import {store} from '../index.js';
import {DYNAMICCONTROL_MODULE} from "../utils/Constants";
import {Header} from "../components/Header";

class JudgmentAnalysis extends Component {

    render(){
        return (
            <div style={{overflow:'hidden',width:"100%"}}>
                <Header />
                <div  className="sileder_left">
                    <SliderMenuItem  menus={this.props.users.uiData.menus}  handleMenuClick={this.handleMenuClick}   />
                </div>
                <div  className="sileder_right">
                    <JudgmentAnalysisRight />
                </div>
                <div className="clear"></div>
            </div>

        );
    }
}

export default connect(mainReducer)(JudgmentAnalysis);