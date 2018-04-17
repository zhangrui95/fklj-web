import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import './resources/index.css';
import {mainReducer} from "./reducers/reducers";
import {createDevToolsStore} from "./configStore";
import {
    Router,
    Route,
    browserHistory
} from "react-router";

import DynamicControl from "./business/DynamicControl";
import IntelligentRetrieval from "./business/IntelligentRetrieval";
import PersonalCenter from "./business/PersonalCenter";
import InterrogationRecord from "./business/InterrogationRecord";
import InterrogationDetails from "./business/InterrogationDetails";
import ElectronicArchives from "./business/ElectronicArchives";
import SystemManagement from "./business/SystemManagement";
import AreaManagement from "./business/AreaManagement";
import TaskManagement from "./business/TaskManagement";
import AuditReport from "./business/AuditReport";
import Preview from "./business/AuditReport/Preview";
import ReportForms from "./business/ReportForms";
import Home from "./business/Home";
import Login from "./business/Login";
import InventoryManagement from "./business/InventoryManagement";
import {connect} from "react-redux";
import {changeNavigation} from "./actions/actions";
import PhoneDetails from "./components/shared/PhoneDetails";

import {versionNumberQuote} from "./utils/Configuration";
import WebSocket from './business/WebSocket';


import moment from 'moment';
moment.locale('zh-cn');

export let store = createDevToolsStore(mainReducer);
const history = syncHistoryWithStore(browserHistory, store);

//const history = syncHistoryWithStore(browserHistory, store);

class Index extends Component{

    //判断当前用户是否有权限进行菜单访问，token是否存在
    requireAuth = (nextState, replace) => {
        console.info('--requireAuth--');
        let  isAuthenticated = store.getState().login.isAuthenticated;
        if(!isAuthenticated){
            replace({ pathname: '/' })
        }else{
            //选中的路由路径
            let pathname = nextState.location.pathname;
            if(pathname.indexOf("AuditReport") > 0
                || pathname.indexOf("InterrogationRecord") > 0
                || pathname.indexOf("InterrogationDetails") > 0
                || pathname.indexOf("PhoneDetails") > 0
                || pathname.indexOf("ElectronicArchives") > 0){//路由包含动态管控内路径 pathname更改为根导航路径
                pathname = "/DynamicControl";
            }
            store.dispatch(changeNavigation(pathname));
        }
    }

    render(){
        return (
            <div>
                <Provider store={store}>
                    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
                        <div>
                            <Route exact path="/" component={Login}></Route>
                            <Route exact path="/Home" component={Home} onEnter={this.requireAuth}></Route>
                            <Route exact path="/DynamicControl" component={DynamicControl} onEnter={this.requireAuth} />
                            <Route exact path="/IntelligentRetrieval" component={IntelligentRetrieval} onEnter={this.requireAuth} />
                            <Route exact path="/PersonalCenter" component={PersonalCenter} onEnter={this.requireAuth} />
                            <Route exact path="/SystemManagement" component={SystemManagement} onEnter={this.requireAuth} />
                            <Route exact path="/AreaManagement" component={AreaManagement} onEnter={this.requireAuth} />
                            <Route exact path="/TaskManagement" component={TaskManagement} onEnter={this.requireAuth} />
                            <Route exact path="/AuditReport/:idcard/:personId" component={AuditReport}  onEnter={this.requireAuth}/>
                            <Route exact path="/interrogationRecord/:idcard" component={InterrogationRecord} onEnter={this.requireAuth} />
                            <Route exact path="/InterrogationDetails/:recordId/:personId" component={InterrogationDetails}  onEnter={this.requireAuth} />
                            <Route exact path="/ElectronicArchives/:idcard" component={ElectronicArchives}  onEnter={this.requireAuth} />
                            <Route exact path="/Preview" component={Preview}  onEnter={this.requireAuth} />
                            <Route exact path="/ReportForms" component={ReportForms}  onEnter={this.requireAuth}  />
                            <Route exact path="/InventoryManagement" component={InventoryManagement}   onEnter={this.requireAuth}  />
                            <Route exact path="/PhoneDetails/:phoneId" component={PhoneDetails}   onEnter={this.requireAuth}  />
                        </div>
                    </Router>
                </Provider>
                <div style={{position:"fixed",bottom:5,left:30,color:"#fff",fontSize:12}}>版本号:&nbsp;&nbsp;{versionNumberQuote}</div>
                <WebSocket/>
            </div>
            
        );
    }
};

ReactDOM.render(
    <Index />,
  document.getElementById('root')
);

export default connect(mainReducer)(Index);