import React, { Component }  from 'react'
import {validate} from "../Scripts/Validation";
import "../App.css";

class DateField extends Component{
  state = {
    className: "half"
  }

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
          <input type="date" aria-label="Date Picker"id={this.props.id} className={this.props.className} onChange={(e)=>{this.props.onChange(e);this.validate(e)}} value={this.props.value} onKeyUp={this.validate} />
      </div>
    )
  }
}

export default DateField