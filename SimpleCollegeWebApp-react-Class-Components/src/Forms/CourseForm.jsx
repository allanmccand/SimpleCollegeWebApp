import React, { Component } from "react";
import { withRouter } from "../components/withRouter";
import { useParams } from 'react-router-dom';
import TextField from "../components/TextField";
import Combo from "../components/Combo";
import axios from "axios";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class CourseForm extends Component {

   state = {
    professors:[],
    semesters:[],
    fields:{courseTitle: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.courseTitle.className = data;
                                                    return fields;
                                            })}},
        courseLevel: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.courseLevel.className = data;
                                                    return fields;
                                            })}},
        year: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.year.className = data;
                                                    return fields;
                                            })}},
        professorId: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.professorId.className = data;
                                                    return fields;
                                            })}},
        semesterId: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.semesterId.className = data;
                                                    return fields;
                                            })}}}
  };

  async componentDidMount() {
    if(this.props.router.params.id){
      api.get("/coursebyid", {
          params: {
            course_id: this.props.router.params.id
          }
      }).then((res) => {
          this.setState(prevState => {
                          let fields = Object.assign({}, prevState.fields); 
                          fields.courseTitle.value = res.data[0].coursetitle;
                          fields.courseLevel.value = res.data[0].courselevel;
                          fields.year.value = res.data[0].year;
                          fields.professorId.value = res.data[0].professor_id;
                          fields.semesterId.value = res.data[0].semester_id;
                          return fields;
          })
      });
    }
    api.get("/professorsByIdVal").then((res) => {
      this.setState({ professors: res.data });
    });
    api.get("/semestersByIdVal").then((res) => {
      this.setState({ semesters: res.data });
    });
  }

  updateCourse = async () => {
    let res = await api.put("/updatecourse", {
        courseTitle: this.state.fields.courseTitle.value,
        courseLevel: this.state.fields.courseLevel.value,
        professorId: this.state.fields.professorId.value,
        semesterId: this.state.fields.semesterId.value,
        year: this.state.fields.year.value,
        courseId: this.props.router.params.id
      }).then((res) => {
      window.alert("Successfully Updated!")
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  createCourse = async () => {
    console.log("add course1");
    let res = await api.post("/addcourse", {
        courseTitle: this.state.fields.courseTitle.value,
        courseLevel: this.state.fields.courseLevel.value,
        professorId: this.state.fields.professorId.value,
        semesterId: this.state.fields.semesterId.value,
        year: this.state.fields.year.value
      }).then((res) => {
      window.alert("Successfully Created!")
      this.props.handleUpdate({ courses: res.data});
      this.setState(prevState => {
                  let fields = Object.assign({}, prevState.fields); 
                  fields.courseTitle.value = "";
                  fields.courseLevel.value = "";
                  fields.year.value = "";
                  fields.professorId.value = "";
                  fields.semesterId.value = "";
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

  handleProfessorUpdate = (data) => {this.setState(prevState => {
                                                  let fields = Object.assign({}, prevState.fields); 
                                                  fields.professorId.value = data;
                                                  return fields;
                                          })};

  handleSemesterUpdate = (data) => {this.setState(prevState => {
                                                  let fields = Object.assign({}, prevState.fields); 
                                                  fields.semesterId.value = data;
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
                  id="courseTitle"
                  label="Course Title"
                  className={this.state.fields.courseTitle.className}
                  classNameHandler={this.state.fields.courseTitle.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.courseTitle.value = e.target.value;
                            return fields;
                    })
                  }
                  validation="validateAlpha;required"
                  value={this.state.fields.courseTitle.value}
                />
              </td>
              <td>
                <TextField
                  id="courseLevel"
                  label="Course Level"
                  className={this.state.fields.courseLevel.className}
                  classNameHandler={this.state.fields.courseLevel.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.courseLevel.value = e.target.value;
                            return fields;
                    })
                  }
                  validation="validateNumeric;required"
                  value={this.state.fields.courseLevel.value}
                />                
              </td>
            </tr>
            <tr>
              <td>
                <Combo data={this.state.professors} className={this.state.fields.professorId.className} classNameHandler={this.state.fields.professorId.handleClassNameUpdate} handleUpdate={this.handleProfessorUpdate} selectedValue={this.state.fields.professorId.value} identifier="professor" label="Professor" validation="required"/>
              </td>
              <td>
                <Combo data={this.state.semesters} className={this.state.fields.semesterId.className} classNameHandler={this.state.fields.semesterId.handleClassNameUpdate} handleUpdate={this.handleSemesterUpdate} selectedValue={this.state.fields.semesterId.value} identifier="semester" label="Semester" validation="required"/>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  id="year"
                  label="Year"
                  className={this.state.fields.year.className}
                  classNameHandler={this.state.fields.year.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.year.value = e.target.value;
                            return fields;
                    })
                  }
                  validation="validateNumeric;required"
                  value={this.state.fields.year.value}
                />   
              </td>
            </tr>
          </tbody>
        </table>
        {location.pathname === "/CreateCourse" ?
        <button
          onClick={()=>{this.createCourse()}}
          className="btn-center"
        >
          Create Course
        </button>: location.pathname.includes("/CourseForm/") ? <button
          onClick={()=>{this.updateCourse()}}
          className="btn-center"
        >
          Update Course
        </button> : ""}
        <hr />
      </>
    );
  }
}

export default withRouter(CourseForm);
