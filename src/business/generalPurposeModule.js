//通用组件集合
import React, {
    Component
} from "react";
import {
    mainReducer
} from "../reducers/reducers";
import {
    connect
} from "react-redux";
import * as constants from "../utils/Constants";
import {
    store
} from '../index.js'
import {
    dtgkChangeMenu,
    saveDynamicPhotoItem,
    saveMessAttention,
    DelMessAttention
} from "../actions/actions";
import {
    editPersonAuditReportData, editRefreshAuditReportData
} from "../actions/AuditReport";
import sc from "styled-components";
import {
    Link
} from "react-router";
import {
    Tag,
    message, Button
} from 'antd';

function Title(props) {
    const style = {
        color: 'white',
        backgroundColor: 'red',
        fontSize: 48
    };

    return <h1 style={{ color: props.color }}>{props.text}</h1>;
}

const Title2 = sc.h1`
    font-size: 48px;
    color: white;
    background-color: green;
`;

class StylePage extends Component {
    render() {
        return (
            <div>
                <Title text="CSS into JS" color="#000" />
                <Title2>Styled Component</Title2>
            </div>
        );
    }
}
//浅蓝色按钮
export class ShallowBlueBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "#2B6CC5"
        }

    }
    onClick = () => {
        console.log(this.props);
        this.props.onClick();
    }
    handleshallblueMouseOver = () => {
        this.setState({
            background: "#0c50ac"
        });
    }
    handleshallblueMouseOut = () => {
        this.setState({
            background: "#2B6CC5"
        });
    }
    render() {
        let background = this.state.background;
        return (<button onClick={
            this.onClick
        }
            style={
                {
                    background: background,
                    color: "#fff",
                    border: "none",
                    borderBottom: "2px solid #0C1CD8",
                    fontSize: "14px",
                    height: "32px",
                    cursor: "pointer",
                    width: this.props.width,
                    margin: this.props.margin,
                    float: this.props.float
                }
            }
            onMouseOver={
                this.handleshallblueMouseOver
            }
            onMouseOut={
                this.handleshallblueMouseOut
            } > {
                this.props.text
            } </button>
        )
    }
}
//深蓝色按钮
export class DeepBlueBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "#01175F"
        }

    }
    onClick = () => {
        this.props.onClick();
    }
    handleshallblueMouseOver = () => {
        this.setState({
            background: "#0a216c"
        });
    }
    handleshallblueMouseOut = () => {
        this.setState({
            background: "#01175F"
        });
    }
    render() {
        let background = this.state.background;
        return (
            <button disabled={this.props.disabled} onClick={this.onClick}
                style={{ background: background, color: "#fff", border: "none", borderBottom: "2px solid #0C1CD8", fontSize: "0.7rem", height: "31px", cursor: "pointer", width: this.props.width, margin: this.props.margin, float: this.props.float }}
                onMouseOver={this.handleshallblueMouseOver} onMouseOut={this.handleshallblueMouseOut}>
                {this.props.text}
            </button>
        )
    }

}
//竖着的深蓝色按钮
export class DeepBlueBtnY extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "#01175F"
        }

    }
    onClick = () => {
        this.props.onClick();
    }
    handleshallblueMouseOver = () => {
        this.setState({
            background: "#0a216c"
        });
    }
    handleshallblueMouseOut = () => {
        this.setState({
            background: "#01175F"
        });
    }
    render() {
        let background = this.state.background;
        return (<button onClick={
            this.onClick
        }
            style={
                {
                    background: background,
                    color: "#fff",
                    border: "none",
                    borderRight: this.props.borderRight,
                    borderLeft: this.props.borderLeft,
                    borderTop: this.props.borderTop,
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    width: this.props.width,
                    height: this.props.height,
                    margin: this.props.margin,
                    float: this.props.float,
                    display: this.props.display
                }
            }
            onMouseOver={
                this.handleshallblueMouseOver
            }
            onMouseOut={
                this.handleshallblueMouseOut
            } > {
                this.props.text
            } </button>
        )
    }

}
//仿下拉列表的按钮
export class FangSelectBlueBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailShow: "none",
            detailShow2: "none",
            detailImg: this.props.fangselectIconUl1,
            backgroundHover: "#2B6CC5",
            backgroundLiHover: "#031955"
        }

    }
    //鼠标悬停和移开时候实现下拉和收回
    handleMouseOver = () => {
        this.setState({
            detailShow: "block",
            detailImg: this.props.fangselectIconUl2,
            backgroundHover: "#031955"
        });
    }

    handleMouseOut = () => {
        this.setState({
            detailShow: "none",
            detailImg: this.props.fangselectIconUl1,
            backgroundHover: "#2B6CC5"
        });
    }
    //鼠标经过二级li
    handleLiMouseOver = () => {
        this.setState({
            backgroundLiHover: "rgba(36,51,99,0.5)"
        });
    }
    handleLiMouseOut = () => {
        this.setState({
            backgroundLiHover: "#031955"
        });
    }
    render() {
        let detailShow = this.state.detailShow;
        let detailImg = this.state.detailImg;
        let backgroundHover = this.state.backgroundHover;
        let backgroundLiHover = this.state.backgroundLiHover;
        return (<ul style={
            {
                float: this.props.float,
                margin: this.props.margin,
                background: backgroundHover,
                borderBottom: "2px solid #0012FF",
                color: "#fff",
                fontSize: "14px",
            }
        }
            onMouseOver={
                this.handleMouseOver
            }
            onMouseOut={
                this.handleMouseOut
            } >
            <li style={{ padding: this.props.padding }}>
                <span>{this.props.text}</span>
                <img src={detailImg} alt="海邻科反恐利剑图标" style={{ float: "right", margin: this.props.imgMargin }} />
            </li> <ul style={
                {
                    display: detailShow,
                    padding: this.props.padding
                }
            } >
                <li style={{ background: backgroundLiHover }} onMouseOver={this.handleLiMouseOver} onMouseOut={this.handleLiMouseOut}></li> </ul> </ul>
        )
    }
}
//红色按钮
export class DeepRedBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "#8c3535"
        }
    }
    onClick = () => {
        this.props.onClick();
    }
    handleshallredMouseOver = () => {
        this.setState({
            background: "#681d1d"
        });
    }
    handleshallredMouseOut = () => {
        this.setState({
            background: "#8c3535"
        });
    }
    render() {
        let background = this.state.background;
        return (
            <button onClick={this.onClick}
                style={{ background: background, color: "#fff", border: "none", borderBottom: "2px solid #ee3c3c", fontSize: "14px", height: "32px", cursor: "pointer", width: this.props.width, margin: this.props.margin }}
                onMouseOver={this.handleshallredMouseOver} onMouseOut={this.handleshallredMouseOut} >
                {this.props.text}
            </button>
        )
    }
}
//input 框
export class Input extends Component {
    handleChange = (event) => {
        let id = this.props.id;
        this.props.callbackParent(id, event.target.value);
    }
    render() {
        return (< input readOnly={
            this.props.readOnly
        }
            type={
                this.props.type
            }
            // placeholder={
            //     this.props.placeholder
            // }
            style={
                {
                    width: this.props.width,
                    margin: this.props.margin,
                    height: 31,
                    background: "rgba(37, 51, 100,0.8)",
                    opacity: 0.8,
                    border: "1px solid #0C5F93",
                    color: "#fff",
                    padding: "0 5px"
                }
            }
            onChange={
                this.handleChange
            }
            value={
                this.props.value || ''
            }
            placeholder={
                this.props.placeholder || ''
            }
        />
        )
    }
}

//textarea 文本域
export class TextArea extends Component {
    handleChange = (event) => {
        let id = this.props.id;
        this.props.callbackParent(id, event.target.value);
    }
    render() {
        return (<textarea type={
            this.props.type
        }
            readOnly={
                this.props.readOnly
            }
            style={
                {
                    width: this.props.width,
                    margin: this.props.margin,
                    height: this.props.height,

                    background: "rgba(37, 51, 100,0.8)",
                    opacity: 0.8,
                    border: "1px solid #0C5F93",
                    color: "#fff",
                    resize: "none"
                }
            }
            onChange={
                this.handleChange
            }
            value={
                this.props.value || ''
            }
            placeholder={
                this.props.placeholder || ''
            } > </textarea>
        )
    }
}
//单选框
export class Radio extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

//人员照片项
export class PhotoItem extends Component {
    constructor() {
        super();
        this.state = {
            displayShow: "none",

        }
    }
    handlerOnMouseOver = () => {
        this.setState({
            displayShow: "block"
        });
    }
    handlerOnMouseOut = () => {
        this.setState({
            displayShow: "none"
        });
    }
    onClick = () => {
        let user = this.props.user;
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        if (user.gzzt === 0) {
            let creds = {
                idcard: user.idcard, //被关注人身份证号
                personid: user.personId, //被关注人的ID
                followerUserid: '' + userItem.user.idcard, //登录人身份证号
                userName: userItem.user.name, //当前登录人姓名
                followerName: userItem.user.name, //登录人姓名
                followerUnitname: userItem.user.gundercn, //登录人单位名称
                followerUnitcode: userItem.user.gunder //登录人单位编码
            }
            store.dispatch(saveMessAttention(creds, this.props.queryCreds, this.props.pageType));
        } else {
            let creds = {
                idcard: user.idcard, //被关注人身份证号
                personid: user.personId, //被关注人的ID
                followerUserid: '' + userItem.user.idcard, //登录人ID
                userName: userItem.user.name, //当前登录人姓名
                followerName: userItem.user.name, //登录人姓名
                followerUnitname: userItem.user.gundercn, //登录人单位名称
                followerUnitcode: userItem.user.gunder //登录人单位编码
            }
            store.dispatch(DelMessAttention(creds, this.props.queryCreds, this.props.pageType));
        }

        //this.props.onClick();
    }
    editJson = () => {
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                judge_record_id: this.props.user.judge_record_id
            },
        }
        store.dispatch(editPersonAuditReportData(creds));
    }
    //清除从动态管控页面再次研判的状态树内容
    refresh = () => {
        let creds = {
            commonResources: {//常用资源
                list: [],
                count: 0
            },
            judgeHistory: {//研判历史
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    list: [],
                    total: 0,
                }
            },
            head: {//头部信息
                name: null,//姓名
                judgmentLevel: null,//研判级别
                terrorType: null,//涉恐类别
                judgePeople: null,//研判人
                judgmentTime: null,//研判时间
                source: null,//线索来源,
            },
            basicInformation: null,//基础信息

            bgInformation: {//背景信息
                householdInformationList: [],//同户信息
                domicilePlaceList: null,//户籍地核查
                illegalCrimeList: [],//违法犯罪前科
                drugList: [],//吸毒
                trafviolateList: [],//交通违法
                criminalList: [],//刑事  
            },
            onlineInformationList: [],//网上通联信息
            bankInformationList: [],//银行信息
            relatedPersonList: [],//关联人
            trajectoryInformationList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    list: [],
                    total: 0,
                }
            },//轨迹信息
            judgmentAnalysis: {//研判分析
                judgmentLevel: null,//研判级别
                terrorType: null,//涉恐类别
                dispositionl: null,//处置措施
                conclusion: null,//结论
                source: null,//线索来源
                uploadurl: null,
                uploadname: null,
            },
            judgeCode: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: '',
            },
            toConfigure: '',
            saveDisable: true,
            username: '',
            bgTrigger: false,
            trajectoryTrigger: false,
        }
        store.dispatch(editRefreshAuditReportData(creds));
    }
    render() {
        let displayShow = this.state.displayShow;

        //盘查记录页面路由地址
        let toInterrogationRecordURL = '/InterrogationRecord/' + this.props.user.idcard;
        //研判报告路由地址 从动态管控口进入
        let toAuditReportURL = '/AuditReport/' + this.props.user.idcard + '/' + this.props.user.personId;
        //电子档案路由地址
        let toElectronicArchivesUrl = '/ElectronicArchives/' + this.props.user.idcard;
        let toConfigure = this.props.toConfigure;
        return (
            <div style={{ width: "11.3%", height: "294px", float: "left", marginLeft: "1.12%", marginBottom: "10px", boxShadow: "4px 5px 10px rgba(4, 4,4, 0.2)", WebkitBoxShadow: "4px 5px 10px rgba(4, 4,4, 0.2)", MozBoxShadow: "4px 5px 10px rgba(4, 4,4, 0.2)" }}>
                <div style={{ background: "rgba(2,24,85,0.5)", padding: "6px", position: "relative" }}>
                    {/*头部*/}
                    {this.props.pageType === "我的研判" ? '' :
                        <img onClick={this.onClick} src={this.props.user.gzzt === 1 ? "../images/guanzhu_1.png" : "../images/guanzhu_2.png"} title={this.props.user.gzzt === 1 ? "已收藏" : "未收藏"} style={{ float: "left", cursor: "pointer" }} />
                    }
                    {/*推送div*/}
                    <div style={{ position: "absolute", top: "3px", right: "6px", zIndex: "99", width: "50px" }} onMouseOver={this.handlerOnMouseOver} onMouseOut={this.handlerOnMouseOut} >
                        <ul>
                            {/*<li style={{width:"50px"}}><span style={{fontSize:"14px",color:"#fff"}}>推送 &nbsp;</span><img src="../images/down.png" alt=""/></li>*/}
                            {/*<span className="font14">推送 &nbsp;</span>
                                <img src="../images/down.png" alt=""/>*/}
                            {/*<li>
                                    <ul style={{background:"#162960"}}>
                                        <li style={{float:"12px",color:"#fff"}}>1111111</li>
                                    </ul>
                                </li>*/}
                        </ul>
                        {/*<ul style={{display:displayShow,color:"#fff",padding:4,background: "rgba(2,24,85)",position:"absolute",right:"-10px", top:"33px", zIndex:10}}>
                                    <li>研判工具</li>
                            </ul>*/}
                    </div>
                    <div style={{ clear: "both" }}></div>
                </div>
                <div style={{ padding: "15px 0", background: "rgba(37,51,100,0.5)" }}>
                    <div style={{ width: "80%", margin: "0 auto", height: "236px" }}>
                        <div style={{ position: "relative" }}>
                            {this.props.pageType === "我的研判" ?
                                <Link to={toElectronicArchivesUrl}>
                                    {this.props.user.photo_url !== '' ? <img src={this.props.user.photo_url} alt="" style={{ width: "100%", height: "190px" }} /> :
                                        <img src="/images/zanwu.png" alt="" style={{ width: "100%", height: "190px" }} />
                                    }
                                </Link> :
                                <Link to={toElectronicArchivesUrl}>
                                    {this.props.user.zpurl !== '' ? <img src={this.props.user.zpurl} alt="" style={{ width: "100%", height: "190px" }} /> :
                                        <img src="/images/zanwu.png" alt="" style={{ width: "100%", height: "190px" }} />
                                    }
                                </Link>
                            }
                            {this.props.user.check_exception === 1 ? <img src="../images/yichang.png" title="异常" style={{ position: "absolute", top: 0, left: 0 }} /> : ''}
                            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "5px 0", textAlign: "center", background: "rgba(0,0,0,0.7)" }}>
                                <p title={this.props.user.name} style={{ width: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center", margin: "0 auto", fontSize: "0.7rem", color: "#fff", cursor: "pointer" }}>
                                    {this.props.user.name !== '' ? this.props.user.name : '暂无姓名'}
                                </p>
                            </div>
                        </div>
                        <div style={{ marginTop: "15px" }}>
                            <Link to={toInterrogationRecordURL}>
                                <DeepBlueBtn width="47%" float="left" text="盘查记录" />
                            </Link>  {/* <Link to={toAuditReportURL}>  </Link>*/}
                            {this.props.pageType === "个人中心" ?
                                <Link to={toAuditReportURL}>
                                    <DeepBlueBtn width="47%" float="right" text="研判预览" />
                                </Link>
                                :
                                this.props.pageType === "我的研判" ?
                                    <Link to={toAuditReportURL}>
                                        <DeepBlueBtn onClick={this.editJson} width="47%" float="right" text="研判报告" />
                                    </Link> :
                                    <Link to={toAuditReportURL}>
                                        <DeepBlueBtn onClick={this.refresh} width="47%" float="right" text="研判报告" />
                                    </Link>
                                // <Link>
                                // <DeepBlueBtn onClick={()=>message.warn('提示：功能开发中!')} width="47%" float="right" text="研判报告"/>
                                // </Link>
                            }
                            <div style={{ clear: "both" }}></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
//小分页组件
export class PagSmall extends Component {
    constructor(props, propTypes) {
        super(props);
        propTypes = {
            totalRecord: React.PropTypes.number.isRequired,
            pageSize: React.PropTypes.number.isRequired,
            nowPage: React.PropTypes.number.isRequired,
        }
    }
    handleClick = () => {
        let nowPage = parseInt(this.refs.nowPageText.value);
        let totalRecord = this.props.totalRecor;
        this.props.pageChange(nowPage, totalRecord);
    }

    render() {
        //当前页
        let nowPage = this.props.nowPage;
        //总条数
        let totalRecord = this.props.totalRecord;

        if (totalRecord === 0) { //当总条数为0，返回分页样式为隐藏
            return <div style={{ padding: this.props.padding, position: "absolute", bottom: "0", left: "0", width: "98%" }}>
                <div className="clear"></div>
            </div>
        }
        //每页显示数量
        let pageSize = this.props.pageSize;
        //页面数量
        let totalPageNum = parseInt((totalRecord + pageSize - 1) / pageSize);

        //分页计算公式
        let pages = [],
            begin, end;
        //如果总页数不足10页，那么把所有的页数都显示出来
        if (totalPageNum <= 10) {
            begin = 1;
            end = totalPageNum;
        } else { //当总页数>10时，通过公式计算出begin和end
            begin = nowPage - 5;
            end = nowPage + 4;
            //头溢出
            if (begin < 1) {
                begin = 1;
                end = 10;
            }
            //尾溢出
            if (end > totalPageNum) {
                begin = totalPageNum - 9;
                end = totalPageNum;
            }
        }
        if (nowPage > 1) {
            pages.push(
                <PageCellSmall pageText='上一页' nextPage={nowPage - 1} nowPage={this.props.nowPage} onChange={this.props.pageChange} width="60px" />
            );
        }
        if (nowPage < totalPageNum) {
            pages.push(
                <PageCellSmall pageText='下一页' nextPage={nowPage + 1} nowPage={this.props.nowPage} onChange={this.props.pageChange} width="60px" />
            );
        }
        return (
            <div>
                {pages}
                <span style={{ fontSize: "14px", color: "#fff", float: "right" }}>第{nowPage}页/共{totalPageNum}页</span>
                <div style={{ clear: "both" }}></div>
            </div>
        )
    }

}
//小分页单元组件
class PageCellSmall extends Component {
    constructor(props, propTypes) {
        super(props);
        this.state = {
            color: "#fff"
        }
    }
    handleClick = () => {
        let nextPage = parseInt(this.props.nextPage);
        this.props.onChange(nextPage);
    }
    handleMouseOver = () => {
        this.setState({
            color: "#e77255"
        });
    }
    handleMouseOut = () => {
        this.setState({
            color: "#fff"
        });
    }
    // padding:"4px 10px",
    render() {
        let color = this.state.color;
        return (
            <span onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={{ fontSize: "14px", color: color, float: "left", marginRight: "20px", cursor: "pointer" }}>{this.props.pageText}</span>
        );


    }

};


//分页组件
export class Pag extends Component {
    constructor(props, propTypes) {
        super(props);
        propTypes = {
            totalRecord: React.PropTypes.number.isRequired,
            pageSize: React.PropTypes.number.isRequired,
            nowPage: React.PropTypes.number.isRequired,
        }
    }

    handleClick = () => {
        let nowPage = parseInt(this.refs.nowPageText.value);
        let totalRecord = this.props.totalRecord;

        let hiddenTotalPageNum = parseInt(this.refs.hiddenTotalPageNum.value);
        if (isNaN(nowPage)) {
            message.error('提示：请输入有效数字!', 3);
            this.refs.nowPageText.value = '';
        } else if (nowPage > hiddenTotalPageNum) {
            message.error('提示：跳转页数不可大于' + hiddenTotalPageNum + '页!', 3);
            this.refs.nowPageText.value = '';
        } else if (nowPage < 1) {
            message.error('提示：跳转页数不可小于1页!', 3);
            this.refs.nowPageText.value = '';
        } else {
            this.props.pageChange(nowPage);
        }
    }


    render() {
        //当前页
        let nowPage = this.props.nowPage;
        //总条数
        let totalRecord = this.props.totalRecord;

        if (totalRecord === 0) { //当总条数为0，返回分页样式为隐藏
            return <div style={{ padding: this.props.padding, position: "absolute", bottom: "0", left: "0", width: "98%" }}>
                <div className="clear"></div>
            </div>
        }


        //每页显示数量
        let pageSize = this.props.pageSize;
        //页面数量
        let totalPageNum = parseInt((totalRecord + pageSize - 1) / pageSize);

        //分页计算公式
        let pages = [],
            begin, end;
        //如果总页数不足10页，那么把所有的页数都显示出来
        if (totalPageNum <= 10) {
            begin = 1;
            end = totalPageNum;
        } else { //当总页数>10时，通过公式计算出begin和end 
            begin = nowPage - 5;
            end = nowPage + 4;
            //头溢出
            if (begin < 1) {
                begin = 1;
                end = 10;
            }
            //尾溢出
            if (end > totalPageNum) {
                begin = totalPageNum - 9;
                end = totalPageNum;
            }
        }
        if (nowPage > 1) {
            pages.push(
                <PageCell pageText='上一页' nextPage={nowPage - 1} nowPage={this.props.nowPage} onChange={this.props.pageChange} width={60} />
            );
        }
        for (var i = begin; i <= end; i++) {
            pages.push(
                <PageCell pageText={i} nextPage={i} nowPage={this.props.nowPage} onChange={this.props.pageChange} width="30px" key={i} />
            );
        }
        if (nowPage < totalPageNum) {
            pages.push(
                <PageCell pageText='下一页' nextPage={nowPage + 1} nowPage={this.props.nowPage} onChange={this.props.pageChange} width={60} key={i} />
            );
        }
        return (
            <div style={{ padding: this.props.padding, position: "absolute", bottom: "0", left: "0", width: "98%" }}>
                {/*分页显示的提示文字*/}
                <div style={{ float: "left", marginTop: "10px" }}>
                    <p style={{ fontSize: 14, color: "#fff", paddingLeft: "10px" }}>合计：共<span>{totalRecord}</span>条记录&nbsp;&nbsp;每页<span>{pageSize}</span>条&nbsp;&nbsp;当前第<span>{nowPage}</span>页&nbsp;&nbsp;共<span>{totalPageNum}</span>页</p>
                </div>
                {/*分页*/}
                <div style={{ fontSize: 14, color: "#fff", float: "right" }}>
                    {pages}
                    到第<input type="text" ref="nowPageText" style={{ width: 40, height: 26, margin: "0 5px", color: "#FFFFFF", background: "rgb(45, 58, 100)", border: "1px solid rgb(12, 95, 147)" }} />页&nbsp;
                    <input type="hidden" value={totalPageNum} ref="hiddenTotalPageNum" />
                    <ShallowBlueBtn width={60} onClick={this.handleClick} text="确定" />
                </div>
                <div className="clear"></div>
            </div>
        )
    }

}
//分页单元组件
const PageCell = React.createClass({
    handleClick: function () {
        let nextPage = parseInt(this.props.nextPage);
        this.props.onChange(nextPage);
    },
    // padding:"4px 10px",
    render() {
        if (this.props.nextPage === this.props.nowPage) { //如分页页码和当前页相同，增加样式
            return (
                <span onClick={this.handleClick} style={{ fontSize: 14, color: "#fff", width: this.props.width, display: "inline-block", _display: "block", zoom: "1", height: 30, lineHeight: "30px", textAlign: "center", border: "1px solid #0C5F93", marginRight: "10px", background: '#2B6CC5', cursor: "pointer" }} >{this.props.pageText}</span>
            );
        } else {
            return (
                <span onClick={this.handleClick} style={{ fontSize: 14, color: "#fff", width: this.props.width, display: "inline-block", _display: "block", zoom: "1", height: 30, lineHeight: "30px", textAlign: "center", border: "1px solid #0C5F93", marginRight: "10px", background: "#2D3A64", opacity: 0.8, cursor: "pointer" }}>{this.props.pageText}</span>
            );
        }
    }

});

//标签组件
export const Tabs = React.createClass({
    handleClick: function (tab) {
        this.props.handleTabClick(tab, 'getData');
    },
    render() {
        let tabs = [];
        for (var i = 0; i < this.props.tabs.length; i++) {
            let tab = this.props.tabs[i];
            let tabCss;
            if (tab.isSelect === true) {
                tabCss = tabDiv2;
            } else {
                tabCss = tabDiv;
            }
            tabs.push(<div style={tabCss} key={i} onClick={this.handleClick.bind(this, tab)}>{tab.tabName}</div>)
        }
        return (
            <div>
                {tabs}
            </div>
        );

    }
})
//tab标签项样式
const tabDiv = {
    float: "left",
    width: "150px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    height: "40px",
    lineHeight: "40px",
    background: "rgba(14,33,86,0.8)",
    border: "1px solid rgb(12, 95, 147)",
    marginLeft: "20px",
    marginBottom: "-1px",
    cursor: "pointer"

}
const tabDiv2 = {
    float: "left",
    width: "150px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    height: "40px",
    lineHeight: "40px",
    background: "rgba(40, 51, 99, 0.9)",
    border: "1px solid rgb(12, 95, 147)",
    marginLeft: "20px",
    marginBottom: "-1px",
    cursor: "pointer"
    // borderBottom:"none"

}

//侧边栏菜单
export const SliderMenuItem = React.createClass({
    render() {
        let menus = [];
        let handleMenuClick = this.props.handleMenuClick;
        this.props.menus.forEach(function (menu, i) {
            menus.push(
                <MenuBox menu={menu} key={i} handleMenuClick={handleMenuClick} />
            );
        });
        return (
            <div>
                {menus}
            </div>
        );

    }
})
//菜单项
const MenuBox = React.createClass({

    handleChange: function () {
        console.log('this.props.menu',this.props.menu);
        this.props.handleMenuClick(this.props.menu, 'openAndClose');
    },
    handleClick: function () {
        if (this.props.menu.haveSon === true) { //如果当前菜单有子菜单，那么点击，展开子菜单
            this.props.handleMenuClick(this.props.menu, 'openAndClose');
        } else {
            this.props.handleMenuClick(this.props.menu, 'getData');
        }
    },
    render() {
        let menu = this.props.menu;
        let search = this.props.menu.search;
        let isOpen = this.props.menu.isOpen;
        let haveSon = this.props.menu.haveSon;
        let isSelect = this.props.menu.isSelect;
        let handleMenuClick = this.props.handleMenuClick;
        console.log('this.props.menu.sonMenu',this.props.menu.sonMenu);
        console.log('haveSon',haveSon);
        if (haveSon == true) {
            return (
                <div style={sliderWrap}>
                    <div className="sliderItemDiv">
                        <ul style={sliderUl}>
                            <li style={isSelect === true ? OneLevelMenuActive : OneLevelMenu} onClick={this.handleClick} ref='refMenuName'>{this.props.menu.menuName}</li>
                            {isOpen === true ? <a onClick={this.handleChange} style={{ position: "absolute", top: "27px", right: "20px", width: 20, height: 20, cursor: "pointer" }}><img src="../images/menu_down.png" /></a> : <a onClick={this.handleChange} style={{ position: "absolute", top: "27px", right: "20px", width: 20, height: 20, cursor: "pointer" }}><img src="../images/menu_up.png" /></a>}
                            {isOpen === true ? <SonMenuBox sonMenu={this.props.menu.sonMenu} handleMenuClick={this.props.handleMenuClick} /> : ''}
                            <div className="clear"></div>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={sliderWrap}>
                    <div className="sliderItemDiv">
                        <ul style={sliderUl}>
                            <li style={isSelect === true ? OneLevelMenuActive : OneLevelMenu} onClick={this.handleClick} ref='refMenuName'>{this.props.menu.menuName}</li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
})
//子菜单项
const SonMenuBox = React.createClass({
    handleClick: function (sonmenu) {
        this.props.handleMenuClick(sonmenu, 'getData');
    },
    render() {
        let sonMenu = this.props.sonMenu;
        console.log('sonMenu',sonMenu);
        let sonMenus = [];
        for (var i = 0; i < sonMenu.length; i++) {
            let liCss;
            var sonMenuDb = sonMenu[i];
            if (sonMenuDb.isSelect === true) {
                liCss = secondLevelMenuActive;
            } else {
                liCss = secondLevelMenu;
            }
            if(sonMenuDb.isShow){
                sonMenus.push(<li style={liCss} key={i} onClick={this.handleClick.bind(this, sonMenuDb)}>{sonMenuDb.menuName}</li>)
            }
        }
        console.log(';sonMenus',sonMenus);
        return (
            <ul>
                {sonMenus}
            </ul>
        );
    }
})

const sliderWrap = {
    //float:"left",
    // width:"13%",
    border: "1px solid #0C5F93",
    borderLeft: "none",
    marginTop: "20px"
}
//一级菜单样式
const OneLevelMenu = {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    margin: "0",
    height: "60px",
    lineHeight: "60px",
    cursor: "pointer"
    // background: "rgba(2,24,85,0.5)"
}
const OneLevelMenuActive = {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    margin: "0",
    height: "60px",
    lineHeight: "60px",
    background: "#253364",
    borderLeft: "4px solid #FF5E36",
    borderRight: "4px solid transparent",
    cursor: "pointer"
}
const sliderUl = {
    background: "rgba(2,24,85,0.5)",
    position: "relative",
    marginBottom: "0"
}
//二级菜单样式
const secondLevelMenu = {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    margin: "0",
    height: "60px",
    lineHeight: "60px",
    background: "rgba(24,42,93,0.5)",
    cursor: "pointer"
}
const secondLevelMenuActive = {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    margin: "0",
    height: "60px",
    lineHeight: "60px",
    background: "#253364",
    borderLeft: "4px solid #FF5E36",
    borderRight: "4px solid transparent",
    cursor: "pointer"
}

//表格组件
export class Table extends Component {
    render() {
        return (
            <table cellSpacing="1" style={{ width: this.props.width, background: "#0C5F93", color: "#fff", fontSize: "14px", textAlign: "center" }}></table>
        );
    }
}
export class Tr extends Component {
    render() {
        return (
            <tr></tr>
        );
    }
}
export class Td extends Component {
    render() {
        return (
            <td style={{ background: "rgba(37, 51, 100,0.8)", height: this.props.height }}>{this.props.text}</td>
        );
    }
}

//盘查记录项
export class Interrogation extends Component {
    render() {
        // let interrogationRecordProps = this.props.interrogationRecordProps;
        let toInterrogationDetailsURl = "/InterrogationDetails/" + this.props.interrogationRecordProps.recordId + "/" + this.props.interrogationRecordProps.personId;
        return (
            <div className="panchajilu" style={{ width: this.props.width, minWidth: this.props.minWidth, float: this.props.float, border: "1px solid rgb(12, 95, 147)", background: "rgba(25,41,85,0.5)", margin: this.props.margin }}>
                <div style={{ height: "40px", lineHeight: "40px", background: "rgba(2, 24, 85, 0.498039)", textAlign: "left", color: "#fff", paddingLeft: "30px", position: "relative" }}>
                    <span>人员状态：{this.props.interrogationRecordProps.check_exception === 0 ? "正常" : "异常"}</span>
                    {this.props.interrogationRecordProps.isSee === true ? <img src="/images/new.png" alt="" style={{ position: "absolute", top: "0", left: "0" }} /> : ''}
                </div>
                <div style={{ padding: "10px" }}>
                    <div style={{ float: "left", margin: "0 20px 0 0", position: "relative" }}>
                        {this.props.interrogationRecordProps.zpurl !== '' ?
                            <img src={this.props.interrogationRecordProps.zpurl} alt="" width="117px" height="140px" /> :
                            <img src='/images/zanwu.png' alt="" width="117px" height="140px" />
                        }
                        {this.props.interrogationRecordProps.check_exception === 1 ? <img src="../images/yichang.png" title="异常" style={{ position: "absolute", top: 0, left: 0 }} /> : ''}
                    </div>

                    <div style={{ float: "left" }}>
                        <div style={{ height: "68px" }}>
                            <div style={{ float: "left", textAlign: "left", marginRight: "20px" }}>
                                <p style={font}><span>姓&nbsp;&nbsp;名：</span>{this.props.interrogationRecordProps.name}</p>
                                <p style={font}><span>采录人：</span>{this.props.interrogationRecordProps.police_name}</p>
                            </div>
                            <div style={{ float: "left", textAlign: "left", marginRight: "20px" }}>
                                <p style={font}><span>证件号码：</span>{this.props.interrogationRecordProps.idcard}</p>
                                <p style={font}><span>采录时间：</span>{this.props.interrogationRecordProps.checktime}</p>

                            </div>
                            <div style={{ float: "left", textAlign: "left" }}>
                                {/*<p style={font}><span>涉恐积分：</span>{this.props.interrogationRecordProps.score}</p>
                                <p style={font}><span>采录地点：</span>{this.props.interrogationRecordProps.address}</p>*/}
                            </div>
                            <div style={{ clear: "both" }}></div>
                        </div>
                        {/*颜色框*/}
                        {/*<div style={{height:"31px"}}>
                            {this.props.interrogationRecordProps.isTibetStudents}
                            {this.props.interrogationRecordProps.isTibetStudents === true?<ColorBgTag key="test_1" width="88px" height="30px" lineHeight="30px" color="#C50C1E" float="left" margin="0 20px 0 0" background="url(/images/mark_r.png)" text="涉藏学生"/>:''}
                            {this.props.interrogationRecordProps.isFugitives === true ? <ColorBgTag key="test_2" width="88px" height="30px" lineHeight="30px" color="#E57314" float="left" margin="0 20px 0 0" background="url(/images/mark_o.png)" text="在逃人员"/> : ''}
                            {this.props.interrogationRecordProps.isTakeCare === true ? <ColorBgTag key="test_3" width="88px" height="30px" lineHeight="30px" color="#F9E503" float="left" margin="0 20px 0 0" background="url(/images/mark_y.png)" text="重点关注"/> : ''}
                            {this.props.interrogationRecordProps.isDrugRelatedPersonnel === true ? <ColorBgTag width="88px" height="30px" lineHeight="30px" color="#107DBE" float="left" background="url(/images/mark_b.png)" text="涉毒人员"/> : ''}
                            <div style={{clear:"both"}}></div>
                        </div>*/}
                        <div style={{ textAlign: "left", marginTop: "15px", height: "31px" }}>
                            <Link to={toInterrogationDetailsURl}>
                                <DeepBlueBtn text="盘查详情" width="80px" />
                            </Link>
                        </div>
                    </div>
                    <div style={{ clear: "both" }}></div>
                </div>
            </div>
        );
    }
}
const font = {
    fontSize: 14,
    color: "#fff",
    margin: '0 0 15px 0'
}

// 四个颜色的图标
export class ColorBgTag extends Component {
    render() {
        return (
            <div style={{ textAlign: "center", background: this.props.background, width: this.props.width, height: this.props.height, lineHeight: this.props.lineHeight, fontSize: 14, color: this.props.color, float: this.props.float, margin: this.props.margin }}>{this.props.text}</div>
        );
    }

}
//盘查详情
export class InterrogationDetailsItem extends Component {
    render() {
        let tags = this.props.interrogationDetailsUser.tags;
        // console.info(tags);
        let greenTag = [];
        let redTag = [];
        if (tags !== undefined) {
            let tagsArr = tags.split(',');

            for (var i = 0; i < tagsArr.length; i++) {
                var tagsList = tagsArr[i];
                var judgeTag = tagsList.split('-')[1];
                var textTag = tagsList.split('-')[0];
                if (judgeTag === "111001") {
                    redTag.push(
                        <Tag color="red" style={{ marginTop: "10px" }}>{textTag}</Tag>
                    );
                } else if (judgeTag === "111002") {
                    greenTag.push(
                        <Tag color="green" style={{ marginTop: "10px" }}>{textTag}</Tag>
                    );
                }
            }
        } else {

        }


        return (
            <div style={{ width: this.props.width, border: "1px solid rgb(12, 95, 147)", background: "rgba(25,41,85,0.5)" }}>
                <div style={{ padding: "20px" }}>
                    <div style={{ float: "left", margin: "0 20px 0 0", position: "relative" }}>
                        {this.props.interrogationDetailsUser.zpurl !== '' ?
                            <img src={this.props.interrogationDetailsUser.zpurl} alt="" width="182px" height="217px" /> :
                            <img src='/images/zanwu.png' alt="" width="182px" height="217px" />
                        }
                        {this.props.interrogationDetailsUser.check_exception === 1 ? <img src="/images/yichang.png" title="异常" style={{ position: "absolute", top: 0, left: 0 }} /> : ''}
                    </div>

                    <div style={{ float: "left" }}>
                        <div style={{ textAlign: "left" }}>
                            <div>

                                <button style={{ height: "44px", width: "142px", background: "rgba(14,33,86,0.8)", border: "1px solid rgb(12, 95, 147)", color: "#fff", margin: " 0 50px 25px 0" }}>
                                    {this.props.interrogationDetailsUser.check_exception === 0 ? <span style={{ color: "#fff" }}>盘查正常</span> : <span style={{ color: "#fff" }}>盘查异常</span>}
                                </button>
                                <button style={{ height: "44px", width: "142px", background: "rgba(14,33,86,0.8)", border: "1px solid rgb(12, 95, 147)", color: "#fff", margin: " 0 0 25px 0" }}>收藏数量：<span style={{ color: "red" }}>{this.props.interrogationDetailsUser.collectNumber}</span></button>
                            </div>
                            <p style={font}><span>姓名：</span><span style={marginr}>{this.props.interrogationDetailsUser.name}</span>
                                <span>身份证号：</span><span>{this.props.interrogationDetailsUser.idcard}</span>
                            </p>
                            <p style={font}>
                                <span>出生日期：</span><span style={marginr}>{this.props.interrogationDetailsUser.birth}</span>
                                <span>民族：</span><span style={marginr}>{this.props.interrogationDetailsUser.nation}</span>
                                <span>性别：</span><span>{this.props.interrogationDetailsUser.sex}</span>
                            </p>
                            <p style={font}><span>户籍地址：</span><span>{this.props.interrogationDetailsUser.address}</span></p>
                            <div style={{ clear: "both" }}></div>
                        </div>
                        {/*颜色框*/}
                        <div style={{ margin: "0px 0 0 0" }}>
                            {redTag}
                            {greenTag}
                            <div style={{ clear: "both" }}></div>
                        </div>

                    </div>
                    <div style={{ clear: "both" }}></div>
                </div>
            </div>
        );
    }
}
const marginr = {
    marginRight: "50px"
}
//盘查手机详情项
export class PhoneDetailsItem extends Component {
    render() {
        let dataList = this.props.dataList;
        return (
            <div style={{ width: this.props.width, border: "1px solid rgb(12, 95, 147)", background: "rgba(25,41,85,0.5)" }}>
                <div style={{ padding: "20px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <p style={{ fontSize: '16px', color: "#fff" }}>手机号：{dataList.phoneNumber}</p>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <span style={{ fontSize: '14px', color: "#fff", marginRight: "100px" }}>IMEI：{dataList.imei}</span>

                        <span style={{ fontSize: '14px', color: "#fff" }}>型号：{dataList.product}</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '14px', color: "#fff" }}>系统：{dataList.os}</span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }
}
//下拉框组件select
export class SelectModel extends Component {
    handleChange = (e) => {
        this.props.onChange(e.target.value);
    }
    render() {
        let list = this.props.list;
        let defaultValue = this.props.defaultValue;
        let options = [];
        options.push(
            <option value="">请选择</option>
        );
        for (var i = 0; i < list.length; i++) {
            var option = list[i];
            let isSelect = false;
            if (option.value === defaultValue) {
                isSelect = true;
            }
            options.push(
                <Option value={option.value} text={option.text} isSelect={isSelect} />
            );
        }
        return (<select style={
            {
                width: this.props.width,
                margin: this.props.margin,
                height: 31,
                background: "rgba(37, 51, 100,0.8)",
                opacity: 0.8,
                border: "1px solid #0C5F93",
                color: "#fff"
            }
        }
            value={
                defaultValue
            }
            onChange={
                this.handleChange
            } >

            {
                options
            } </select>
        );
    }
}
//下拉框组件Option
const Option = React.createClass({
    render() {
        let optionList = this.props.optionList;
        let isSelect = this.props.isSelect;
        return (
            <option value={this.props.value} selected={isSelect === true ? 'selected' : ''}  >{this.props.text}</option>
        );
    }
});

//模太框遮罩背景组件
export class Shade extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let isBlock = this.props.isBlock;
        return (
            <div style={{ width: "100%", height: "100%", position: "fixed", left: "0", top: '0', background: "rgba(0,0,0,0.7)", zIndex: "999", display: isBlock, }}>
                <div></div>
            </div>
        );
    }
}


export default connect(mainReducer)(StylePage);