import React, { Component } from "react";
import TextField from "../components/TextField";
import DateField from "../components/DateField";
import NumberField from "../components/NumberField";
import DecimalField from "../components/DecimalField";
import { withRouter } from "../components/withRouter";
import { useParams } from 'react-router-dom';
import {calculateAge} from "../Scripts/ExtraFunctions";
import axios from "axios";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class ProfessorForm extends Component {

  state = {
    fields:{frstName: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.frstName.className = data;
                                                    return fields;
                                            })}},
        lstName: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.lstName.className = data;
                                                    return fields;
                                            })}},
        dob: {validation:"noFutureDate;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.dob.className = data;
                                                    return fields;
                                            })}},
        age: {validation:"noNegativeNumber;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.age.className = data;
                                                    return fields;
                                            })}},
        salary: {validation:"noNegativeNumber;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.salary.className = data;
                                                    return fields;
                                            })}}}
  };

  createProfessor = async () => {
    let res = await api.post("/addprofessor", {
        frstName: this.state.fields.frstName.value,
        lstName: this.state.fields.lstName.value,
        dob: this.state.fields.dob.value,
        age: this.state.fields.age.value,
        salary: this.state.fields.salary.value
      }).then((res) => {
      window.alert("Successfully Created!")
      this.props.handleUpdate({ professors: res.data});
      this.setState(prevState => {
                                  let fields = Object.assign({}, prevState.fields); 
                                  fields.frstName.value = "";
                                  fields.lstName.value = "";
                                  fields.dob.value = "";
                                  fields.age.value = "";
                                  fields.salary.value = "";
                                  return fields;
      })
    }).catch((error)=>{
      if (error.response && error.response.status === 400) {

        console.log(error);
        console.log("error");
        const errors = error.response.data.errors;

        for(const myError of errors){
          console.log(myError.field);
          var field = this.state.fields[myError.field];
          field.handleClassNameUpdate(field.className+' error-field');
        }
      }
      
      window.alert("There was an issue!")
    });
  };

  updateProfessor = async () => {
    let res = await api.put("/updateprofessor", {
        frstName: this.state.fields.frstName.value,
        lstName: this.state.fields.lstName.value,
        dob: this.state.fields.dob.value,
        age: this.state.fields.age.value,
        salary: this.state.fields.salary.value,
        professorId: this.props.router.params.id
      }).then((res) => {
      window.alert("Successfully Updated!")
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  async componentDidMount() {
    if(this.props.router.params.id){
      api.get("/professorbyid", {
          params: {
            professor_id: this.props.router.params.id
          }
        }).then((res) => {
            this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.frstName.value = res.data.frstName;
                            fields.lstName.value = res.data.lstName;
                            fields.dob.value = new Intl.DateTimeFormat('en-CA', {year: 'numeric',month: '2-digit',day: '2-digit'}).format(new Date(res.data.dob+"T00:00:00.000"));
                            fields.age.value = res.data.age;
                            fields.salary.value = res.data.salary;
                            return fields;
            })
        });
    }
  }

  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TextField
                  id="frstName"
                  label="First Name"
                  className={this.state.fields.frstName.className}
                  classNameHandler={this.state.fields.frstName.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.frstName.value = e.target.value;
                            return fields;
                    })
                  }
                  validation={this.state.fields.frstName.validation}
                  value={this.state.fields.frstName.value}
                />
              </td>
              <td>
                <TextField
                  id="lstName"
                  label="Last Name"
                  className={this.state.fields.lstName.className}
                  classNameHandler={this.state.fields.lstName.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.lstName.value = e.target.value;
                            return fields;
                    })
                  }
                  validation={this.state.fields.lstName.validation}
                  value={this.state.fields.lstName.value}
                />
              </td>
            </tr>
            <tr>
              <td>
                <DateField
                  id="dob"
                  label="Professor DOB"
                  className={this.state.fields.dob.className}
                  classNameHandler={this.state.fields.dob.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.dob.value = e.target.value;
                            if(e.target.value){
                              fields.age.value = calculateAge(new Date(e.target.value));
                            } else{
                              fields.age.value = 0
                            }
                            return fields;
                    })
                  }
                  validation={this.state.fields.dob.validation}
                  value={this.state.fields.dob.value}
                />
              </td>  
              <td>
                <NumberField
                  id="age"
                  label="Age"
                  className={this.state.fields.age.className}
                  classNameHandler={this.state.fields.age.handleClassNameUpdate}
                  readOnly={true}
                  validation={this.state.fields.age.validation}
                  value={this.state.fields.age.value}
                />
              </td>
            </tr>
            <tr>
              <td>
                <DecimalField
                  id="salary"
                  label="Salary"
                  className={this.state.fields.salary.className}
                  classNameHandler={this.state.fields.salary.handleClassNameUpdate}                  
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.salary.value = e.target.value;
                            return fields;
                    })
                  }
                  validation={this.state.fields.salary.validation}
                  value={this.state.fields.salary.value}
                />
              </td>  
              <td>
              </td>
            </tr>
          </tbody>
        </table>
        {location.pathname === "/CreateProfessor" ?
        <button
          onClick={()=>{this.createProfessor()}}
          className="btn-center"
        >
          Create Professor
        </button>: location.pathname.includes("/ProfessorForm/") ? <button
          onClick={()=>{this.updateProfessor()}}
          className="btn-center"
        >
          Update Professor
        </button> : ""}
        <hr />
      </>
    );
  }
}

export default withRouter(ProfessorForm);
