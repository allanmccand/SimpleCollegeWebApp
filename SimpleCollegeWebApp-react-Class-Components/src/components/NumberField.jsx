import React, { Component }  from 'react'
import {validate} from "../Scripts/Validation";
import "../App.css";

class NumberField extends Component{
  state = {
    className: "half"
  }

  validate = (e) => {
    if(this.props.validation){
      var passedValidation=validate(this.props.validation,e?e.target.value:this.props.value);
      passedValidation?this.props.classNameHandler(this.props.className.replaceAll('error-field','')):this.props.classNameHandler(this.props.className+' error-field');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.value!==this.props.value&&this.props.value!==""){
      this.validate();
    }
  }

  render(){
    return (
      <div className="flex">
          <label htmlFor={this.props.id} className="half">{this.props.label} </label>
          <input type="number" id={this.props.id} className={this.props.className} onChange={this.props.onChange} value={this.props.value} readOnly={this.props.readOnly} onKeyUp={this.validate}></input>
      </div>
    )
  }
}

export default NumberField