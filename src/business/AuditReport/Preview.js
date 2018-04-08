/**
 * 预览页面
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {FileInput
} from "../../components/fileInput";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade,
    TextArea,
    FileBtn
} from "../generalPurposeModule";
import {changeShade
} from "../../actions/actions";
import {store} from '../../index.js';
import {}from "../../actions/AuditReport"

import  * as constants from "../../utils/Constants";
import {changeMenu} from "../../actions/actions";
import {uuid} from "../../utils/Uuid";
require('../../utils/Utils');

export class Preview extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    //加载
    componentDidMount(){


    }
    //组件props发生变化，更新state
    componentWillReceiveProps(nextProps){


    }


        render(){


            let user = JSON.parse(sessionStorage.getItem('user'));

            let data = store.getState().AuditReport.data;

            return(
                <div style={{fontSize:"14px",color:"#fff",width:"80%",margin:"0 auto",marginTop:"20px",}}>
                    {/*研判报告标题*/}
                    <p style={{fontSize:"18px",textAlign:"center",marginBottom:"20px"}}>关于()的研判报告</p>
                    <div>
                        <div style={{float:"left",fontSize:"14px",color:"#fff",marginRight:"300px"}}>
                            <p style={pStyle}><span>编号：</span><span>{data.head.number}</span></p>
                            <p style={pStyle}><span>涉恐类别：</span><span>工作对象</span></p>
                            <p style={pStyle}><span>研判人员：</span><span>admin</span></p>
                        </div> 
                        <div style={{float:"right",fontSize:"14px",color:"#fff"}}>
                            <p style={pStyle}><span>研判级别：</span><span>201703241636150789</span></p>
                            <p style={pStyle}><span>研判时间：</span><span>2017-03-24 16:36:15</span></p>
                        </div> 
                        <div style={{clear:"both"}}></div> 
                    </div>
                     
                     <div>
                         <p style={pStyle}>一、身份信息</p>
                         <div>
                            <img src="/images/add_head.png" alt="" style={{float:"left",marginRight:"200px",marginBottom:"10px"}}/>
                            <div style={{float:"left"}}>
                                <p style={pStyle}>1、姓名：</p>
                                <p style={pStyle}>2、性别：</p>
                                <p style={pStyle}>3、民族：</p>
                                <p style={pStyle}>4、身份证号：</p>
                            </div>
                            <div style={{clear:"both"}}></div>
                            <div>
                                <p style={pStyle}>5、户籍详细地址：</p>
                                <p style={pStyle}>6、现住地：</p>
                                <p style={pStyle}>7、邮箱：</p>
                                <p style={pStyle}>8、护照号：</p>
                                <p style={pStyle}>9、车牌号：</p>
                                <p style={pStyle}>10、从哪里来：</p>
                                <p style={pStyle}>11、来我省的目的：</p>
                                <p style={pStyle}>12、投奔人：</p>
                                <p style={pStyle}>13、联系电话：</p>
                            </div>
                         </div>
                         <p style={pStyle}>二、背景信息</p>
                         {/*内容*/}
                         <div>
                             <div>
                                 <p style={pStyle}>1、同户人员信息：</p>
                                <Table />
                                <p style={pStyle}>2、户籍核查地情况：</p>
                                <p style={pStyle}>3、是否有违法犯罪前科：</p>
                                <div style={{paddingLeft:"20px"}}>
                                    <p style={pStyle}>(1)系统编号:R2301022721582016011720     来源：</p>
                                    <p style={pStyle}>(2)系统编号:R2301020910202016014857     来源：</p>
                                    <p style={pStyle}>(3)系统编号:R2301022721582016011720     来源：</p>
                                    <p style={pStyle}>(4)姓名:买买提江•巴力     身份证号:652101199201010412     学校:哈尔滨师范大学     登记时间:NULL     来源：</p>
                                    <p style={pStyle}>(5)登记人:     登记时间:     来源：</p>
                                    <p style={pStyle}>(6)登记人:     登记时间:     来源：</p>
                                    <p style={pStyle}>(7)登记人:     登记时间:12.36     来源：</p>
                                </div>
                                <p style={pStyle}>4、是否为逃犯或潜逃人员：</p>
                                <div style={{paddingLeft:"20px"}}>
                                    <p style={pStyle}>(1)案件类别:     来源：</p>
                                    <p style={pStyle}>(2)案件类别:     来源：</p>
                                </div>
                                <p style={pStyle}>5、是否为涉恐人员或其他关系人：</p>
                                <div style={{paddingLeft:"20px"}}>
                                    <p style={pStyle}>(1)此人是涉恐人员！罪名：涉稳高危人员历史库数据</p>
                                    <p style={pStyle}>(2)关系人：伊力亚尔•吾甫尔,  身份证号:653130200210050019,  户号653130501003529,  与此人关系:孙子,非涉恐人员 ;</p>
                                    <p style={pStyle}>(3)系统编号:R2301022721582016011720     来源：</p>
                                    <p style={pStyle}>(4)姓名:买买提江•巴力     身份证号:652101199201010412     学校:哈尔滨师范大学     登记时间:NULL     来源：</p>
                                    <p style={pStyle}>(5)登记人:     登记时间:     来源：</p>
                                    <p style={pStyle}>(6)登记人:     登记时间:     来源：</p>
                                    <p style={pStyle}>(7)登记人:     登记时间:12.36     来源：</p>
                                </div>
                             </div>
                         </div>
                         <p style={pStyle}>三、网上通联信息</p>
                         <Table />
                         <p style={pStyle}>四、银行信息</p>
                         <Table />
                         <p style={pStyle}>五、轨迹信息</p>
                         <div>
                             <p style={pStyle}>1、交通轨迹（火车、飞机）信息:</p>
                             <div style={{paddingLeft:"20px"}}>
                                 <p style={pStyle}>2015-12-09 00:00:00 乘车Z126 从南昌到西安    5车6号</p>
                             </div>
                             <p style={pStyle}>2、上网轨迹信息:</p>
                             <div style={{paddingLeft:"20px"}}>
                                 <p style={pStyle}>2016-02-02 21:33:40 到0001-01-01 00:00:00在哈尔滨市道外区南七道街与太古街交界处3号楼13、14号门市 七号网咖 暂无数据支持 号机器上网</p>
                             </div>
                             <p style={pStyle}>3、住宿轨迹信息:</p>
                             <div style={{paddingLeft:"20px"}}>
                                 <p style={pStyle}>2015-08-07 17:41:00 到 0001-01-01 00:00:00在 二道街 通北镇驻北安办事处  号房间入住</p>
                             </div>
                         </div>
                        <p style={pStyle}>六、关联人</p>
                        <Table />
                        <p style={pStyle}>七、研判结论</p>
                        <div>
                            <p></p>
                        </div>
                     </div>
                </div>
                
            );
        }
};
class  Tr extends Component{
    
    
    render(){
        
        return(
            <tr>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
                <td style={tdStyle}></td>
            </tr>
        );
    }
}
//表格
class Table extends Component{
   
    
    render(){
 
        return(
            <table style={tableStyle}>
                <tr style={thStyle}>
                    {/*<th>序号</th>*/}
                    <td  style={tdStyle}>银行卡号</td>
                    <td  style={tdStyle}>开户行</td>
                    <td  style={tdStyle}>交易记录</td>
                    <td  style={tdStyle}>操作</td>
                </tr>
                <Tr />
            </table>
        )
    }
}

//表格样式
const tableStyle = {
    width:"98%",
    margin:"0 auto",
    border:"1px solid rgb(12, 95, 147)",
    // background:"rgba(12, 95, 147,0.4)"
    textAlign: "center",
    borderCollapse: "collapse",
    fontSize:"14px",
    color:"#fff"
}
const tdStyle = {
    border:"1px solid rgb(12, 95, 147)",
    height:"40px",
}
const thStyle = {
    border:"1px solid rgb(12, 95, 147)",
    height:"40px",
    background:"#021855",
}
const pStyle= {
    marginBottom:"10px"
}
export default connect(mainReducer)(Preview);