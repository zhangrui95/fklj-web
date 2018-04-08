/**
 * Created by zy on 2017/5/8.
 */
//智能检索右侧组件
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
    postIntelligentRetrievalData,
    initIntelligentRetrievalData
} from "../../actions/IntelligentRetrieval";
import {
    initIntelligentRetrievaMenu
} from "../../actions/actions";

import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag
} from "../generalPurposeModule";
import {
    store
} from '../../index.js'
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    notification,
    message,
    Spin,
    Input,
} from 'antd';

export class IntelligentRetrievalContent extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            keyword: '',
        }
        this.pageChange = this.pageChange.bind(this);
    }

    componentWillUnmount() { //销毁
        store.dispatch(initIntelligentRetrievaMenu(store.getState().IntelligentRetrievalType.uiData.menus)) //销毁时初始化菜单
        store.dispatch(initIntelligentRetrievalData()); //初始数据
        this.setState({
            keyword: ''
        });
    }
    componentDidMount() {
            // let creds = {
            //     currentPage: 1,
            //     entityOrField: true,
            //     pd: {
            //         //  code:this.props.type
            //         keyword: this.state.keyword,
            //     },
            //     showCount: constants.pageSize
            // }
            store.dispatch(postIntelligentRetrievalData());
        }
        //关键字改变方法
    keywordChange = (value) => {
        this.setState({
            keyword: value,
            nowPage: 1
        });
    }

    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        let creds = {
                currentPage: nowPage,
                entityOrField: true,
                pd: {
                    //  code:this.props.type
                    keyword: this.state.keyword,
                },
                showCount: constants.pageSize
            }
            //const creds = { keyword: this.state.keyword, nowPage: nowPage, pageSize: constants.pageSize, selectType: this.props.selectType }
        store.dispatch(postIntelligentRetrievalData(creds));
    }
    render() {
        let IntelligentRetrievalList = store.getState().IntelligentRetrievalType.data.IntelligentRetrievalList.result.list;
        let totalRecord = store.getState().IntelligentRetrievalType.data.IntelligentRetrievalList.result.total;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().IntelligentRetrievalType.isFetching;

        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                         <SearchArea   
                         dispatch={this.props.dispatch} 
                         selectType={this.props.selectType}  
                         keywordChange={this.keywordChange} 
                         isFetching={isFetching}
                         />
                        <div className="clear"></div>
                    </div>
                </div>
                {/*搜索出来的内容*/}
                <Result  IntelligentRetrievalList = {IntelligentRetrievalList} isFetching={isFetching}/>
                
                {/*分页*/}
                <Pag pageSize={constants.pageSize}  nowPage={this.state.nowPage}  totalRecord={totalRecord} pageChange={this.pageChange}  padding="0 15px 10px 15px"/>


            </div>
        );

    }
};

//结果集合组件
const Result = React.createClass({
        render() {
            let IntelligentRetrievalList = this.props.IntelligentRetrievalList;
            let isFetching = this.props.isFetching;
            let resultItems = [];
            if(IntelligentRetrievalList.length>0){
                for(let i=0;i< IntelligentRetrievalList.length;i++){
                    let IntellData = IntelligentRetrievalList[i];
                    resultItems.push(
                        <div dangerouslySetInnerHTML={{__html: IntelligentRetrievalList}} />
                    );
                }
            }else{
                resultItems.push(
                    <p style={{fontSize:"30px",color:"#e7e7e7",marginBottom:"10px",marginTop:"250px",textAlign:"center"}}>请输入要检索的关键字</p>
                );
            }
            return (
                <div>
                <div style={{padding:"15px",height:666,overflow:"auto"}}>
                        <div>
                            {isFetching ===  true?
                            <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                                <Spin size="large" />
                            </div>:
                            <div>
                                {resultItems}
                            <div style={{clear:"both"}}></div>
                            </div>
                            }
                        </div>
                    
                </div>

            </div>
            );
        }
    })
    //搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function() {
        return {
            keyword: ''
        };
    },
    onChildChanged: function(e) {
            this.setState({
                keyword: e.target.value
            });
    },
    handleClick: function() { //查询按钮点击事件
        // this.props.isFetching;
        let keyword = this.state.keyword;
        // const creds = { keyword: keyword, pageSize: constants.pageSize, selectType: this.props.selectType  }
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                keyword: keyword

            },
            showCount: constants.pageSize
        }
        store.dispatch(postIntelligentRetrievalData(creds));
        this.props.keywordChange(keyword);
    },
    clearHandleClick: function() {
        this.setState({
            keyword: '',
        });
    },
    render() {

        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">关键字：</label>
               {/* <Input width="272px" margin="0 10px 0 0"  type="text"  id='keyword' placeholder='关键字检索'  value={this.state.keyword}  callbackParent={this.onChildChanged} /> */}
                 <Input style={{width:"272px",margin:"0 10px 0 0",}} value={this.state.keyword} onChange={this.onChildChanged}/>
                <ShallowBlueBtn width="82" text="智能检索" margin="0 10px 0 0" onClick={this.handleClick}/>
                {/*<DeepRedBtn  width="82" text="清除" onClick={this.clearHandleClick} />*/}
            </div>
        );
    }
})



// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}


export default connect(mainReducer)(IntelligentRetrievalContent);