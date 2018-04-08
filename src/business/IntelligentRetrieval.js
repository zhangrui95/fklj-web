/**
 * Created by zy on 2017/5/8.
 */
//智能检索页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {changeMenu,initIntelligentRetrievalMenu,fetchLogin} from "../actions/actions";
import {StylePage,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SliderMenuItem} from "./generalPurposeModule";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";
import {Spare} from './Spare.js';


import {Header} from "../components/Header";
class IntelligentRetrieval extends Component {
    constructor(props){  //初始化
        super(props);
        this.state = {
            selectType: 'all'
        };
    }
    componentWillUnmount() { //销毁
        store.dispatch(initIntelligentRetrievalMenu(this.props.IntelligentRetrievalType.uiData.menus))//销毁时初始化菜单
    }
    componentDidMount() {
       /* this.props.dispatch(fetchLogin());*/
    }
    componentWillReceiveProps(nextProps) {
    }

    //智能检索菜单点击-获取数据-开关事件
    handleMenuClick = (menu,type) => {
        store.dispatch(changeMenu(menu,type,constants.INTELLIGENTRETRIEVAL_MODULE));

        switch (menu.menuName) {
            case constants.INTELLIGENTRETRIEVAL_ALL:
                this.setState({
                    selectType: 'all'
                });
                break
            case constants.INTELLIGENTRETRIEVAL_LJ_DATA:
                this.setState({
                    selectType: 'lj_data'
                });
                break
            case constants.INTELLIGENTRETRIEVAL_AUDIT_REPORT:
                this.setState({
                    selectType: 'audit_report'
                });
                break
            default:
                break
        }

    }
    render(){
        return (
            <div style={{overflow:'hidden',width:"100%"}}>
                {/*<Header />
                <div  className="sileder_left">
                    <SliderMenuItem  menus={this.props.IntelligentRetrievalType.uiData.menus}  handleMenuClick={this.handleMenuClick}   />
                </div>
                <div  className="sileder_right">
                    <IntelligentRetrievalRight  selectType={this.state.selectType}/>
                </div>*/}
                <Spare header='true'/>
                <div className="clear"></div>
            </div>

        );
    }
}

export default connect(mainReducer)(IntelligentRetrieval);
