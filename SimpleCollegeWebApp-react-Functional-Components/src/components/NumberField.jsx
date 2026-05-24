import React, { useEffect,useState  } from 'react'
import {validate as validateJS} from "../Scripts/Validation";
import "../App.css";

function NumberField (props) {

  const [value, setValue] = useState(props.value);

  const validate = (e) => {
    if(props.validation){
      var passedValidation=validateJS(props.validation,e?e.target.value:props.value);
      passedValidation?props.classNameHandler(props.className.replaceAll('error-field','')):props.classNameHandler(props.className+' error-field');
    }
  }

  useEffect(() =>{
    if(value!==props.value&&props.value!==""){
      validate();
    }
  }, [props.value]);

  return (
    <div className="flex">
        <label htmlFor={props.id} className="half">{props.label} </label>
        <input type="number" id={props.id} className={props.className} onChange={props.onChange} value={props.value} readOnly={props.readOnly} onKeyUp={validate}></input>
    </div>
  )
}

export default NumberField