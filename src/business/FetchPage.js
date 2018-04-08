/**
 * Created by ycj on 2017/4/6.
 */
import React , {Component} from 'react';
import {connect} from "react-redux";
import {mainReducer} from "../reducers/reducers";
import {fetchData} from "../actions/actions";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SliderMenuItem,Table,Tr,Td} from "./generalPurposeModule";


class FetchPage extends Component{
    render(){
        let items=[];
        this.props.fetch.data.forEach(function(x){
            items.push(
                <tr key={x.unit}>
                    <td>{x.name}</td><td>{x.unit}</td>
                </tr>
            );
        });

        return (
            <div>
                <button onClick={()=>this.props.dispatch(fetchData())}>GET</button>
                <p>{this.props.fetch.length}</p>
                <div>
                    <table style={{border: 1}}>
                        <tbody>{items}</tbody>
                    </table>
                    
                </div>
                <Table width="1000px">
                    <Tr>
                        <Td height="50px" text="序号" />
                    </Tr>
                </Table>
            </div>
            
        );
    }
}

export default connect(mainReducer)(FetchPage);