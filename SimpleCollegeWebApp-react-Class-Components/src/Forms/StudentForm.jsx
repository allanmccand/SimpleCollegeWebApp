import React, { Component } from "react";
import TextField from "../components/TextField";
import DateField from "../components/DateField";
import NumberField from "../components/NumberField";
import DecimalField from "../components/DecimalField";
import ViewCourses from "../Views/ViewCourses";
import { withRouter } from "../components/withRouter";
import { useParams } from 'react-router-dom';
import {calculateAge} from "../Scripts/ExtraFunctions";
import axios from "axios";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class StudentForm extends Component {

  state = {
    signedupcourses: [],
    availablecourses: [],
    fields:{frst_name: {validation:"validateAlpha;required", value: "", className: "half"},
            lst_name: {validation:"validateAlpha;required", value: "", className: "half"},
            dob: {validation:"noFutureDate;required", value: "", className: "half"},
            age: {validation:"noNegativeNumber;required", value: "", className: "half"},
            gpa: {validation:"validateDecimal;lessThanOrEqual:4;required", value: "", className: "half"}}
  };

  validateStudent = async (type) => {
    let res = await api.get("/validate", {
      params: {
        data: JSON.stringify(this.state.fields)
      },
    }).then((res) => {
      if(res.data[0].frst_name&&res.data[0].lst_name&&res.data[0].dob&&res.data[0].age&&res.data[0].gpa){
        if(type==="create"){
          this.createStudent();
        }
        else if(type==="update"){
          this.updateStudent();
        }
      } else {
        window.alert("Validation failed.");
      }
    }).catch((error)=>{
      window.alert("There was an issue validating!")
    });
  };

  createStudent = async () => {
    let res = await api.post("/addstudent", null, {
    params: {
      frst_name: this.state.fields.frst_name.value,
      lst_name: this.state.fields.lst_name.value,
      dob: this.state.fields.dob.value,
      age: this.state.fields.age.value,
      gpa: this.state.fields.gpa.value
    },
    }).then((res) => {
      window.alert("Successfully created student!")
      this.props.handleUpdate({ students: res.data});
      this.setState(prevState => {
                                  let fields = Object.assign({}, prevState.fields); 
                                  fields.frst_name.value = "";
                                  fields.lst_name.value = "";
                                  fields.dob.value = "";
                                  fields.age.value = "";
                                  fields.gpa.value = "";
                                  return fields;
      })
    }).catch((error)=>{
      window.alert("There was an issue creating student!")
    });
  };

  updateStudent = async () => {
    let res = await api.put("/updatestudent", null, {
      params: {
        frst_name: this.state.fields.frst_name.value,
        lst_name: this.state.fields.lst_name.value,
        dob: this.state.fields.dob.value,
        age: this.state.fields.age.value,
        gpa: this.state.fields.gpa.value,
        student_id: this.props.router.params.id
      },
    }).then((res) => {
      window.alert("Successfully Updated!")
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  async componentDidMount() {
    if(this.props.router.params.id){
      api.get("/coursebystudentid", {
        params: {
          student_id: this.props.router.params.id
        }
        }).then((res) => {
            this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.frst_name.value = res.data[0].studentfrstname;
                            fields.lst_name.value = res.data[0].studentlstname;
                            fields.dob.value = new Intl.DateTimeFormat('en-CA', {year: 'numeric',month: '2-digit',day: '2-digit'}).format(new Date(res.data[0].dob));
                            fields.age.value = res.data[0].age;
                            fields.gpa.value = res.data[0].gpa;
                            return fields;
            })
            this.setState({ signedupcourses: res.data.filter(n => n.active) });
            this.setState({ availablecourses: res.data.filter(n => !n.active) });
      });
    }
  }
  handleSignedUpCoursesUpdate = (data) => {this.setState({signedupcourses: data.courses})};
  handleAvailableCoursesUpdate = (data) => {this.setState({availablecourses: data.courses})};
  handleClassNameFrstNameUpdate = (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.frst_name.className = data;
                                                    return fields;
                                            })};
  handleClassNameLstNameUpdate = (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.lst_name.className = data;
                                                    return fields;
                                            })};
  handleClassNameDobUpdate = (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.dob.className = data;
                                                    return fields;
                                            })};
  handleClassNameAgeUpdate = (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.age.className = data;
                                                    return fields;
                                            })};
  handleClassNameGpaUpdate = (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.gpa.className = data;
                                                    return fields;
                                            })};

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
                  classNameHandler={this.handleClassNameFrstNameUpdate}
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
                  classNameHandler={this.handleClassNameLstNameUpdate}
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
                  label="Student DOB"
                  className={this.state.fields.dob.className}
                  classNameHandler={this.handleClassNameDobUpdate}
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
                  classNameHandler={this.handleClassNameAgeUpdate}
                  readOnly={true}
                  validation={this.state.fields.age.validation}
                  value={this.state.fields.age.value}
                />
              </td>
            </tr>
            <tr>
              <td>
                <DecimalField
                  id="gpa"
                  label="GPA"
                  className={this.state.fields.gpa.className}
                  classNameHandler={this.handleClassNameGpaUpdate}                  
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.gpa.value = e.target.value;
                            return fields;
                    })
                  }
                  validation={this.state.fields.gpa.validation}
                  value={this.state.fields.gpa.value}
                />
              </td>  
              <td>
              </td>
            </tr>
          </tbody>
        </table>
        {location.pathname === "/CreateStudent" ?
        <button
          onClick={()=>{this.validateStudent("create")}}
          className="btn-center"
        >
          Create Student
        </button>: location.pathname.includes("/StudentForm/") ? <button
          onClick={()=>{this.validateStudent("update")}}
          className="btn-center"
        >
          Update Student
        </button> : ""}
        <hr />
        {location.pathname.includes("/StudentForm/") ?
        <>
          <ViewCourses courses={this.state.signedupcourses} handleSignedUpdate={this.handleSignedUpCoursesUpdate} handleUnsignedUpdate={this.handleAvailableCoursesUpdate} header="Current Courses" type="signed" />
          <hr />
          <ViewCourses courses={this.state.availablecourses} handleSignedUpdate={this.handleSignedUpCoursesUpdate} handleUnsignedUpdate={this.handleAvailableCoursesUpdate} header="Available Courses" type="unsigned"/>
        </>
        :""}
      </>
    );
  }
}

export default withRouter(StudentForm);
