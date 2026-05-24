import React, {Component} from 'react'
import {validate as validateJS} from "../Scripts/Validation";
import "../App.css";

function Combo (props){

    const validate = (e) => {
        if(props.validation){
        var passedValidation=validateJS(props.validation,e.target.value);
        passedValidation?props.classNameHandler(props.className.replaceAll('error-field','')):props.classNameHandler(props.className+' error-field');
        }
    }

    return (
        <div className="flex">
            <label
                id={props.identifier+"Label"}
                key={props.identifier+"Label"}
                className="half"
            >{props.label} </label>
            <select
                id={props.identifier}
                key={props.identifier}
                value={props.selectedValue}
                onChange={(e) => {props.handleUpdate(e.target.value); validate(e)}}
                className={props.className}
                >
                <option id={props.identifier+"Opt0"} key={props.identifier+"Opt0"} value="">
                    Select One
                </option>
                {props.data?props.data.map((opt) => (
                    <option
                    id={props.identifier+"Opt"+opt.id}
                    key={props.identifier+"Opt"+opt.id}
                    value={opt.id}
                    >
                    {opt.value}
                    </option>
                )):""}
            </select>
        </div>
    )

}

export default Combo