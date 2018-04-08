import React, {Component} from "react";
require('../utils/Utils');

export const FileInput = React.createClass({

    getDefaultProps: function () {
        return {
            multiple: true,
            btnValue: 'Upload Image',
            className: 'upload-button'
        }
    },

    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        multiple: React.PropTypes.bool,
        btnValue: React.PropTypes.string,
        type: React.PropTypes.string,
        maxFileSize: React.PropTypes.number
    },

    _onChange: function (event) {
        event.preventDefault();
        var target = event.target;
        var files = target.files;
        var count = this.props.multiple ? files.length : 1;
        var i;
        var type = this.props.type; //上传类型

        for (i = 0; i < count; i++) {
            files[i].thumb = URL.createObjectURL(files[i]);
        }
        // convert to array
        files = Array.prototype.slice.call(files, 0);





        //限制上传文件大小
        for(var i =0;i <files.length;i++){
            var file = files[i];
            if(file.size > 1024 * 1024 * this.props.maxFileSize){
                alert(file.name+"附件，超出"+this.props.maxFileSize+"M上传失败");
                files.remove(file);
            }
        }

        var verify = 'all';
        if (type === 'image') {
            verify = /image/i;
        }
        if (verify !== "all") {
            files = files.filter(function (file) {
                return verify.test(file.type)
            })
        }





        this.props.onChange(files, event)
    },

    render: function () {
        var className = this.props.className
        return (
            <a href="javascript:;" className={className}>
                <input type="file" multiple={this.props.multiple} ref="fileInput" onChange={this._onChange}
                 style={{width:this.props.width,height:this.props.height,position:"absolute",top:this.props.top,left:this.props.left,bottom:this.props.bottom,right:this.props.right,opacity:"0",filter:"alpha(opacity=0)",cursor:"pointer"}}/>
            </a>
        )
    }

})