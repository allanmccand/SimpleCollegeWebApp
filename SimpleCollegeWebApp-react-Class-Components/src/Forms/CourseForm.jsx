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
    fields:{course_title: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.course_title.className = data;
                                                    return fields;
                                            })}},
        course_level: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.course_level.className = data;
                                                    return fields;
                                            })}},
        year: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.year.className = data;
                                                    return fields;
                                            })}},
        professor: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.professor.className = data;
                                                    return fields;
                                            })}},
        semester: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {this.setState(prevState => {
                                                    let fields = Object.assign({}, prevState.fields); 
                                                    fields.semester.className = data;
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
                          fields.course_title.value = res.data[0].course_title;
                          fields.course_level.value = res.data[0].course_level;
                          fields.year.value = res.data[0].year;
                          fields.professor.value = res.data[0].professor_id;
                          fields.semester.value = res.data[0].semester_id;
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

  validateCourse = async (type) => {
    let res = await api.get("/validate", {
      params: {
        data: JSON.stringify(this.state.fields)
      },
    }).then((res) => {
      if(res.data[0].course_title&&res.data[0].course_level&&res.data[0].year&&res.data[0].professor&&res.data[0].semester){
        if(type==="create"){
          this.createCourse();
        }
        else if(type==="update"){
          this.updateCourse();
        }
      } else {
        res.data[0].course_title?this.state.fields.course_title.handleClassNameUpdate(this.state.fields.course_title.className.replaceAll('error-field','')):this.state.fields.course_title.handleClassNameUpdate(this.state.fields.course_title.className+' error-field');
        res.data[0].course_level?this.state.fields.course_level.handleClassNameUpdate(this.state.fields.course_level.className.replaceAll('error-field','')):this.state.fields.course_level.handleClassNameUpdate(this.state.fields.course_level.className+' error-field');
        res.data[0].year?this.state.fields.year.handleClassNameUpdate(this.state.fields.year.className.replaceAll('error-field','')):this.state.fields.year.handleClassNameUpdate(this.state.fields.year.className+' error-field');
        res.data[0].professor?this.state.fields.professor.handleClassNameUpdate(this.state.fields.professor.className.replaceAll('error-field','')):this.state.fields.professor.handleClassNameUpdate(this.state.fields.professor.className+' error-field');
        res.data[0].semester?this.state.fields.semester.handleClassNameUpdate(this.state.fields.semester.className.replaceAll('error-field','')):this.state.fields.semester.handleClassNameUpdate(this.state.fields.semester.className+' error-field');

        window.alert("Validation failed.");
      }
    }).catch((error)=>{
      window.alert("There was an issue validating!");
      console.log(error)
    });
  };

  updateCourse = async () => {
    let res = await api.put("/updatecourse", null, {
      params: {
        course_title: this.state.fields.course_title.value,
        course_level: this.state.fields.course_level.value,
        professor_id: this.state.fields.professor.value,
        semester_id: this.state.fields.semester.value,
        year: this.state.fields.year.value,
        course_id: this.props.router.params.id
      },
    }).then((res) => {
      window.alert("Successfully Updated!")
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  createCourse = async () => {
    let res = await api.post("/addcourse", null, {
      params: {
        course_title: this.state.fields.course_title.value,
        course_level: this.state.fields.course_level.value,
        professor_id: this.state.fields.professor.value,
        semester_id: this.state.fields.semester.value,
        year: this.state.fields.year.value
      },
    }).then((res) => {
      window.alert("Successfully Created!")
      this.props.handleUpdate({ courses: res.data});
      this.setState(prevState => {
                  let fields = Object.assign({}, prevState.fields); 
                  fields.course_title.value = "";
                  fields.course_level.value = "";
                  fields.year.value = "";
                  fields.professor.value = "";
                  fields.semester.value = "";
                  return fields;
      })
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  handleProfessorUpdate = (data) => {this.setState(prevState => {
                                                  let fields = Object.assign({}, prevState.fields); 
                                                  fields.professor.value = data;
                                                  return fields;
                                          })};

  handleSemesterUpdate = (data) => {this.setState(prevState => {
                                                  let fields = Object.assign({}, prevState.fields); 
                                                  fields.semester.value = data;
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
                  id="course_title"
                  label="Course Title"
                  className={this.state.fields.course_title.className}
                  classNameHandler={this.state.fields.course_title.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.course_title.value = e.target.value;
                            return fields;
                    })
                  }
                  validation="validateAlpha;required"
                  value={this.state.fields.course_title.value}
                />
              </td>
              <td>
                <TextField
                  id="course_level"
                  label="Course Level"
                  className={this.state.fields.course_level.className}
                  classNameHandler={this.state.fields.course_level.handleClassNameUpdate}
                  onChange={(e) =>
                    this.setState(prevState => {
                            let fields = Object.assign({}, prevState.fields); 
                            fields.course_level.value = e.target.value;
                            return fields;
                    })
                  }
                  validation="validateNumeric;required"
                  value={this.state.fields.course_level.value}
                />                
              </td>
            </tr>
            <tr>
              <td>
                <Combo data={this.state.professors} className={this.state.fields.professor.className} classNameHandler={this.state.fields.professor.handleClassNameUpdate} handleUpdate={this.handleProfessorUpdate} selectedValue={this.state.fields.professor.value} identifier="professor" label="Professor" validation="required"/>
              </td>
              <td>
                <Combo data={this.state.semesters} className={this.state.fields.semester.className} classNameHandler={this.state.fields.semester.handleClassNameUpdate} handleUpdate={this.handleSemesterUpdate} selectedValue={this.state.fields.semester.value} identifier="semester" label="Semester" validation="required"/>
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
          onClick={()=>{this.validateCourse("create")}}
          className="btn-center"
        >
          Create Course
        </button>: location.pathname.includes("/CourseForm/") ? <button
          onClick={()=>{this.validateCourse("update")}}
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
