/*
 RadioButtonList组件  刘磊
 */
import React from 'react';
var RadioButton =React.createClass({
    render: function(){
        return (
            <label htmlFor={this.props.id}>
                <input type="radio"
                       id={this.props.id}
                       name={this.props.name}
                       value={this.props.value}
                       checked={this.props.checked}
                       onChange={this.handleChange}
                       style={{width:"20px",height:"20px",color:"rgb(12, 95, 147)"}}
                />
                <span style={{color:"#fff",fontSize:"14px",marginRight:"50px"}}> {this.props.text}</span>
            </label>
        );
    },
    handleChange: function(event){
        this.setState({selectedValue: event.target.value});
        if(this.props.onSelectedValueChanged){
            this.props.onSelectedValueChanged(event);
        }
    }
});

export const RadioButtonList = React.createClass({
    render: function(){
        return (
            <span className="radioButtonList">{this.renderRadionButtons()}</span>
        );
    },
    renderRadionButtons: function(){
        return this.props.listItems.map(function(item, index){
            return (<RadioButton key={this.props.name + "_" + index}
                                 id={this.props.name + "_" + index}
                                 name={this.props.name}
                                 value={item.value||item}
                                 text={item.text||item}
                                 checked={this.state.selectedValue == (item.value||item)}
                                 onSelectedValueChanged={this.onSelectedValueChanged}/>
            );
        }.bind(this));
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({
            selectedValue: nextProps.selectedValue
        });
    },
    getInitialState: function(){
        return {selectedValue: this.props.selectedValue};
    },
    onSelectedValueChanged: function(event){
        this.setState({selectedValue: event.target.value});
        this.props.callbackParent(event.target.value); //回调函数
    }
});