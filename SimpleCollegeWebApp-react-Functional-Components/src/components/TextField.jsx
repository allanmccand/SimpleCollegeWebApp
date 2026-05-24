import React from 'react';
import {validate as validateJS} from "../Scripts/Validation";
import "../App.css";

function TextField (props) {

  const validate = (e) => {
    if(props.validation){
      var passedValidation=validateJS(props.validation,e.target.value);
      passedValidation?props.classNameHandler(props.className.replaceAll('error-field','')):props.classNameHandler(props.className+' error-field');
    }
  }
  return (
    <div className="flex">
      <label htmlFor={props.id} className="half">{props.label} </label>
      <input type="text" id={props.id} className={props.className} onChange={props.onChange} value={props.value} onKeyUp={validate}></input>
    </div>
  )
}

export default TextField