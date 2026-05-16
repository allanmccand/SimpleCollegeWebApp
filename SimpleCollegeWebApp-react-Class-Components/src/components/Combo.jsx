import React, {Component} from 'react'
import {validate} from "../Scripts/Validation";
import "../App.css";

class Combo extends Component {

  validate = (e) => {
    if(this.props.validation){
      var passedValidation=validate(this.props.validation,e.target.value);
      passedValidation?this.props.classNameHandler(this.props.className.replaceAll('error-field','')):this.props.classNameHandler(this.props.className+' error-field');
    }
  }
    
  render() { 
        return (
            <div className="flex">
                <label
                    id={this.props.identifier+"Label"}
                    key={this.props.identifier+"Label"}
                    className="half"
                >{this.props.label} </label>
                <select
                    id={this.props.identifier}
                    key={this.props.identifier}
                    value={this.props.selectedValue}
                    onChange={(e) => {this.props.handleUpdate(e.target.value); this.validate(e)}}
                    className={this.props.className}
                    >
                    <option id={this.props.identifier+"Opt0"} key={this.props.identifier+"Opt0"} value="">
                        Select One
                    </option>
                    {this.props.data?this.props.data.map((opt) => (
                        <option
                        id={this.props.identifier+"Opt"+opt.id}
                        key={this.props.identifier+"Opt"+opt.id}
                        value={opt.id}
                        >
                        {opt.value}
                        </option>
                    )):""}
                </select>
            </div>
        )
    }
}

export default Combo