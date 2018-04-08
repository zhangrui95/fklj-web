/**
 * 研判报告左侧的常用资源
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {fetchCommonResourcesData} from "../../actions/AuditReport";

export class CommonResources extends Component{
        constructor(props){
            super(props);
        }
        componentDidMount() {
            this.props.dispatch(fetchCommonResourcesData('/getCommonResources'));
        }
        render(){
            let commonResourcesList = this.props.AuditReport.data.commonResources.list;
            let p_s=[];
            for(var i=0;i<commonResourcesList.length;i++){
                let commonResources = commonResourcesList[i];
                p_s.push(
                    <Item commonResources={commonResources}/>
                );
               

            }
             p_s.splice(0,commonResourcesList.length-6);
            return(
                <div>
                    <div style={wrap}>
                        <div style={titlediv}>常用资源</div>
                        <div style={{padding:"15px"}}>
                            {p_s}
                            {/*<p>*/}
                                {/*<img src="/images/air.png" alt="" width="40px" height="40px" style={{float:"left"}}/>*/}
                                {/*<a href="" style={{fontSize:"16px",color:this.state.color,float:"left",marginTop:"10px",marginLeft:"10px"}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseout}>南岗区警务系统</a>*/}
                                {/*<div style={clear}></div>*/}
                            {/*</p>*/}


                        </div>
                    </div>
                </div>
            );
        }
};

//常用资源项
class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            color:"#fff"
        }
    }
    handleMouseOver = () =>{
        this.setState({
            color:"#C1665E"
        });
    }
    handleMouseout = () =>{
        this.setState({
            color:"#fff"
        });
    }
    render(){
        let commonResources = this.props.commonResources;
        return(
            <p style={{marginBottom:"10px"}}>
                <img src={commonResources.imgPath} alt="" width="40px" height="40px" style={{float:"left"}}/>
                <a href={commonResources.url} target="_blank" style={{fontSize:"16px",color:this.state.color,float:"left",marginTop:"10px",marginLeft:"10px"}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseout}>{commonResources.name}</a>
                <div style={clear}></div>
            </p>

        );
    }
};

const wrap = {
    width:"98%",
    border: "1px solid #0C5F93",
    background: "rgba(25,41,85,0.5)",
    marginBottom:"20px",
}
const titlediv = {
    background: "rgba(2, 24, 85, 0.5)",
    height:"40px",
    lineHeight:"40px",
    color:"#fff",
    padding:"0 15px",
}
const clear = {
    clear:"both"
}

export default connect(mainReducer)(CommonResources);