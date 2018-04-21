/**
 * Created by zy on 2017/5/8.
 */
//动态管控主页面（展示）
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import DynamicRightContent from "./DynamicRightContent";
import {changeMenu,initDynamicControlMenu,fetchLogin} from "../actions/actions";
import {StylePage,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SliderMenuItem,Shade} from "./generalPurposeModule";
import {store} from '../index.js';
import {DYNAMICCONTROL_MODULE} from "../utils/Constants";
// import  * as constants from "../utils/Constants";
import {Header} from "../components/Header";
import WebSocket from './WebSocket';

class DynamicControl extends Component {
    // componentWillUnmount() { //销毁
    //     store.dispatch(initDynamicControlMenu(this.props.DynamicControl.uiData.menus))//销毁时初始化菜单
    // }
    componentWillReceiveProps(nextProps) {
        this.setState({
            login: nextProps.login
        });
    }

    //动态管控菜单点击-获取数据-开关事件
    handleMenuClick = (menu,type) => {
        store.dispatch(changeMenu(menu,type,DYNAMICCONTROL_MODULE));
    }
    render(){
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        let menus = [];
        console.log(' this.props.DynamicControl.uiData.menus', this.props.DynamicControl.uiData.menus)
        this.props.DynamicControl.uiData.menus.map((menu) =>  {
            if(menu.isShow){
                menus.push(menu);
            }
        })
        return (
            <div style={{overflow:'hidden',width:"100%"}}>
                <Shade isBlock={isBlock}/>
                <Header />
                <div  className="sileder_left">
                    <SliderMenuItem  menus={menus}
                                     handleMenuClick={this.handleMenuClick}   />
                </div>
                <div  className="sileder_right">
                    <DynamicRightContent />
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}

export default connect(mainReducer)(DynamicControl);
