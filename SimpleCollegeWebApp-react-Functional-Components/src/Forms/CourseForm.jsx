import React, { useEffect, useState } from "react";
import { withRouter } from "../components/withRouter";
import { useParams } from 'react-router-dom';
import TextField from "../components/TextField";
import Combo from "../components/Combo";
import axios from "axios";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

function CourseForm (props) {

  const[professors,setProfessors] = useState([]);
  const[semesters,setSemesters] = useState([]);
  const[fields,setFields] = useState({courseTitle: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.courseTitle.className = data;
                                                  return fields;
                                          })}},
      courseLevel: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.courseLevel.className = data;
                                                  return fields;
                                          })}},
      year: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.year.className = data;
                                                  return fields;
                                          })}},
      professorId: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.professorId.className = data;
                                                  return fields;
                                          })}},
      semesterId: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.semesterId.className = data;
                                                  return fields;
                                          })}}});

          
                                          
  useEffect(()=>{
    const loadForm = async() => {
      try {

        if(props.router.params.id){
          const courseByIdRes = await api.get("/coursebyid", {
              params: {
                course_id: props.router.params.id
              }
          });

          console.log(courseByIdRes)
          setFields(prevState => {
                              let fields = Object.assign({}, prevState); 
                              fields.courseTitle.value = courseByIdRes.data[0].coursetitle;
                              fields.courseLevel.value = courseByIdRes.data[0].courselevel;
                              fields.year.value = courseByIdRes.data[0].year;
                              fields.professorId.value = courseByIdRes.data[0].professor_id;
                              fields.semesterId.value = courseByIdRes.data[0].semester_id;
                              return fields;
          });
        }

        const profByIdRes = await api.get("/professorsByIdVal", {});
        setProfessors(profByIdRes.data);

        const semesterByIdRes = await api.get("/semestersByIdVal", {});
        setSemesters(semesterByIdRes.data);

      } catch (err) {
        window.alert("There was an issue loading!");
      } 
    }
    loadForm();
  },[]);                                        
             
  const updateCourse = async () => {
    try{
      const res = await api.put("/updatecourse", {
            courseTitle: fields.courseTitle.value,
            courseLevel: fields.courseLevel.value,
            professorId: fields.professorId.value,
            semesterId: fields.semesterId.value,
            year: fields.year.value,
            courseId: props.router.params.id
          }).then((res) => {
        window.alert("Successfully updated course!")
      }).catch((error)=>{
        window.alert("There was an issue updating course!")
      });
    }catch(err){
      window.alert("There was an issue updating course!");
    }
  };

  const createCourse = async () => {
      const res = await api.post("/addcourse",{
          courseTitle: fields.courseTitle.value,
          courseLevel: fields.courseLevel.value,
          professorId: fields.professorId.value,
          semesterId: fields.semesterId.value,
          year: fields.year.value
        }).then((res) => {
        props.handleUpdate({ courses: res.data});
        setFields(prevState => {
                    let fields = Object.assign({}, prevState); 
                    fields.courseTitle.value = "";
                    fields.courseLevel.value = "";
                    fields.year.value = "";
                    fields.professorId.value = "";
                    fields.semesterId.value = "";
                    return fields;
        })
        window.alert("Successfully created course!")
      }).catch((error)=>{
        console.log(error)
        if (error.response && error.response.status === 400) {

          console.log(error);
          console.log("error");
          const errors = error.response.data.errors;

          for(const myError of errors){
            setFields(prevState => {
                    let fields = Object.assign({}, prevState); 
                    fields[myError.field].className = fields[myError.field].className+' error-field';
                    return fields;
            });
          }
        }
      
        window.alert("There was an issue!")
    });
  };

  const handleProfessorUpdate = (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.professorId.value = data;
                                                  return fields;
                                          })};

  const handleSemesterUpdate = (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.semesterId.value = data;
                                                  return fields;
                                          })};                                             

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
                className={fields.courseTitle.className}
                classNameHandler={fields.courseTitle.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.courseTitle.value = e.target.value;
                          return fields;
                  })
                }
                validation="validateAlpha;required"
                value={fields.courseTitle.value}
              />
            </td>
            <td>
              <TextField
                id="courseLevel"
                label="Course Level"
                className={fields.courseLevel.className}
                classNameHandler={fields.courseLevel.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.courseLevel.value = e.target.value;
                          return fields;
                  })
                }
                validation="validateNumeric;required"
                value={fields.courseLevel.value}
              />                
            </td>
          </tr>
          <tr>
            <td>
              <Combo data={professors} className={fields.professorId.className} classNameHandler={fields.professorId.handleClassNameUpdate} handleUpdate={handleProfessorUpdate} selectedValue={fields.professorId.value} identifier="professor" label="Professor" validation="required"/>
            </td>
            <td>
              <Combo data={semesters} className={fields.semesterId.className} classNameHandler={fields.semesterId.handleClassNameUpdate} handleUpdate={handleSemesterUpdate} selectedValue={fields.semesterId.value} identifier="semester" label="Semester" validation="required"/>
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                id="year"
                label="Year"
                className={fields.year.className}
                classNameHandler={fields.year.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.year.value = e.target.value;
                          return fields;
                  })
                }
                validation="validateNumeric;required"
                value={fields.year.value}
              />   
            </td>
          </tr>
        </tbody>
      </table>
      {location.pathname === "/CreateCourse" ?
      <button
        onClick={()=>{createCourse()}}
        className="btn-center"
      >
        Create Course
      </button>: location.pathname.includes("/CourseForm/") ? <button
        onClick={()=>{updateCourse()}}
        className="btn-center"
      >
        Update Course
      </button> : ""}
      <hr />
    </>
  );

}

export default withRouter(CourseForm);
