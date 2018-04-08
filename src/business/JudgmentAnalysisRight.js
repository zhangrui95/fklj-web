import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
class JudgmentAnalysisRight extends Component{
    
    render(){
       
        return(
            <div style={{overflow:"hidden",width:"100%"}}>
               1111111
                
            </div>
        );
    }
}

export default connect(mainReducer)(JudgmentAnalysisRight);