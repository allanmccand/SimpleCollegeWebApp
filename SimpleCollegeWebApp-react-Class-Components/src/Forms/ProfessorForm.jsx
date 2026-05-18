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
    fields:{frst_name: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.frst_name.className = data;
                                                    return fields;
                                            })}},
        lst_name: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.lst_name.className = data;
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

  validateProfessor = async (type) => {
    let res = await api.get("/validate", {
      params: {
        data: JSON.stringify(this.state.fields)
      },
    }).then((res) => {
      if(res.data[0].frst_name&&res.data[0].lst_name&&res.data[0].dob&&res.data[0].age&&res.data[0].salary){
        if(type==="create"){
          this.createProfessor();
        }
        else if(type==="update"){
          this.updateProfessor();
        }
      } else {
        window.alert("Validation failed.");
      }
    }).catch((error)=>{
      window.alert("There was an issue validating!");
    });
  };

  createProfessor = async () => {
    let res = await api.post("/addprofessor", null, {
      params: {
        frst_name: this.state.fields.frst_name.value,
        lst_name: this.state.fields.lst_name.value,
        dob: this.state.fields.dob.value,
        age: this.state.fields.age.value,
        salary: this.state.fields.salary.value
      },
    }).then((res) => {
      window.alert("Successfully Created!")
      this.props.handleUpdate({ professors: res.data});
      this.setState(prevState => {
                                  let fields = Object.assign({}, prevState.fields); 
                                  fields.frst_name.value = "";
                                  fields.lst_name.value = "";
                                  fields.dob.value = "";
                                  fields.age.value = "";
                                  fields.salary.value = "";
                                  return fields;
      })
    }).catch((error)=>{
      window.alert("There was an issue creating professor!")
    });
  };

  updateProfessor = async () => {
    let res = await api.put("/updateprofessor", null, {
      params: {
        frst_name: this.state.fields.frst_name.value,
        lst_name: this.state.fields.lst_name.value,
        dob: this.state.fields.dob.value,
        age: this.state.fields.age.value,
        salary: this.state.fields.salary.value,
        professor_id: this.props.router.params.id
      },
    }).then((res) => {
      window.alert("Successfully Updated!")
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  async componentDidMount() {
    if(this.props.router.params.id){
      this.setState({loading:true});
      api.get("/professorbyid", {
          params: {
            professor_id: this.props.router.params.id
          }
        }).then((res) => {
            this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.frst_name.value = res.data.frstName;
                            fields.lst_name.value = res.data.lstName;
                            fields.dob.value = new Intl.DateTimeFormat('en-CA', {year: 'numeric',month: '2-digit',day: '2-digit'}).format(new Date(res.data.dob));
                            fields.age.value = res.data.age;
                            fields.salary.value = res.data.salary;
                            return fields;
            })
        });
      this.setState({loading:false})
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
                  id="frst_name"
                  label="First Name"
                  className={this.state.fields.frst_name.className}
                  classNameHandler={this.state.fields.frst_name.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.frst_name.value = e.target.value;
                            return fields;
                    })
                  }
                  validation={this.state.fields.frst_name.validation}
                  value={this.state.fields.frst_name.value}
                />
              </td>
              <td>
                <TextField
                  id="lst_name"
                  label="Last Name"
                  className={this.state.fields.lst_name.className}
                  classNameHandler={this.state.fields.lst_name.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.lst_name.value = e.target.value;
                            return fields;
                    })
                  }
                  validation={this.state.fields.lst_name.validation}
                  value={this.state.fields.lst_name.value}
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
          onClick={()=>{this.validateProfessor("create")}}
          className="btn-center"
        >
          Create Professor
        </button>: location.pathname.includes("/ProfessorForm/") ? <button
          onClick={()=>{this.validateProfessor("update")}}
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
