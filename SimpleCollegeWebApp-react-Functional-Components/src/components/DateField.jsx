import React, { Component }  from 'react'
import {validate as validateJS} from "../Scripts/Validation";
import "../App.css";

function DateField (props) {

  const validate = (e) => {
    if(props.validation){
      var passedValidation=validateJS(props.validation,e.target.value);
      passedValidation?props.classNameHandler(props.className.replaceAll('error-field','')):props.classNameHandler(props.className+' error-field');
    }
  }

  return (
    <div className="flex">
        <label htmlFor={props.id} className="half">{props.label} </label>
        <input type="date" aria-label="Date Picker"id={props.id} className={props.className} onChange={(e)=>{props.onChange(e);validate(e)}} value={props.value} onKeyUp={validate} />
    </div>
  )
}

export default DateField