import React, { Component } from 'react';
import {validate} from "../Scripts/Validation";
import "../App.css";

class TextField extends Component{

  validate = (e) => {
    if(this.props.validation){
      var passedValidation=validate(this.props.validation,e.target.value);
      passedValidation?this.props.classNameHandler(this.props.className.replaceAll('error-field','')):this.props.classNameHandler(this.props.className+' error-field');
    }
  }
  
  render(){
    return (
      <div className="flex">
        <label htmlFor={this.props.id} className="half">{this.props.label} </label>
        <input type="text" id={this.props.id} className={this.props.className} onChange={this.props.onChange} value={this.props.value} onKeyUp={this.validate}></input>
      </div>
    )
  }
}

export default TextField