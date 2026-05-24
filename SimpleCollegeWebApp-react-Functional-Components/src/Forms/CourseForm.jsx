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
  const[fields,setFields] = useState({course_title: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.course_title.className = data;
                                                  return fields;
                                          })}},
      course_level: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.course_level.className = data;
                                                  return fields;
                                          })}},
      year: {validation:"validateNumeric;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.year.className = data;
                                                  return fields;
                                          })}},
      professor: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.professor.className = data;
                                                  return fields;
                                          })}},
      semester: {validation:"required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.semester.className = data;
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

          setFields(prevState => {
                              let fields = Object.assign({}, prevState); 
                              fields.course_title.value = courseByIdRes.data[0].course_title;
                              fields.course_level.value = courseByIdRes.data[0].course_level;
                              fields.year.value = courseByIdRes.data[0].year;
                              fields.professor.value = courseByIdRes.data[0].professor_id;
                              fields.semester.value = courseByIdRes.data[0].semester_id;
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
             
  const validateCourse = async (type) => {
    try{
      const res = await api.get("/validate", {
          params: {
            data: JSON.stringify(fields)
          }
      });

      if(res.data[0].course_title&&res.data[0].course_level&&res.data[0].year&&res.data[0].professor&&res.data[0].semester){
        if(type==="create"){
          createCourse();
        }
        else if(type==="update"){
          updateCourse();
        }
      } else {
        res.data[0].course_title?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.course_title.className = fields.course_title.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.course_title.className = fields.course_title.className+' error-field';return fields;});

        res.data[0].course_level?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.course_level.className = fields.course_level.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.course_level.className = fields.course_level.className+' error-field';return fields;});

        res.data[0].year?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.year.className = fields.year.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.year.className = fields.year.className+' error-field';return fields;});

        res.data[0].professor?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.professor.className = fields.professor.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.professor.className = fields.professor.className+' error-field';return fields;});            

        res.data[0].semester?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.semester.className = fields.semester.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.semester.className = fields.semester.className+' error-field';return fields;});      

        window.alert("Validation failed.");
      }
    
    } catch (err) {
        window.alert("There was an issue validating!");
    } 
  };

  const updateCourse = async () => {
    try{
      const res = await api.put("/updatecourse",null, {
          params: {
            course_title: fields.course_title.value,
            course_level: fields.course_level.value,
            professor_id: fields.professor.value,
            semester_id: fields.semester.value,
            year: fields.year.value,
            course_id: props.router.params.id
          }
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
    try{
      const res = await api.post("/addcourse",null, {
        params: {
          course_title: fields.course_title.value,
          course_level: fields.course_level.value,
          professor_id: fields.professor.value,
          semester_id: fields.semester.value,
          year: fields.year.value
        }
      }).then((res) => {
        props.handleUpdate({ courses: res.data});
        setFields(prevState => {
                    let fields = Object.assign({}, prevState); 
                    fields.course_title.value = "";
                    fields.course_level.value = "";
                    fields.year.value = "";
                    fields.professor.value = "";
                    fields.semester.value = "";
                    return fields;
        })
        window.alert("Successfully created course!")
      }).catch((error)=>{
        window.alert("There was an issue creating a course!")
      });
    }catch(err){
      window.alert("There was an issue creating a course!");
    }
  };

  const handleProfessorUpdate = (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.professor.value = data;
                                                  return fields;
                                          })};

  const handleSemesterUpdate = (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.semester.value = data;
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
                id="course_title"
                label="Course Title"
                className={fields.course_title.className}
                classNameHandler={fields.course_title.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.course_title.value = e.target.value;
                          return fields;
                  })
                }
                validation="validateAlpha;required"
                value={fields.course_title.value}
              />
            </td>
            <td>
              <TextField
                id="course_level"
                label="Course Level"
                className={fields.course_level.className}
                classNameHandler={fields.course_level.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.course_level.value = e.target.value;
                          return fields;
                  })
                }
                validation="validateNumeric;required"
                value={fields.course_level.value}
              />                
            </td>
          </tr>
          <tr>
            <td>
              <Combo data={professors} className={fields.professor.className} classNameHandler={fields.professor.handleClassNameUpdate} handleUpdate={handleProfessorUpdate} selectedValue={fields.professor.value} identifier="professor" label="Professor" validation="required"/>
            </td>
            <td>
              <Combo data={semesters} className={fields.semester.className} classNameHandler={fields.semester.handleClassNameUpdate} handleUpdate={handleSemesterUpdate} selectedValue={fields.semester.value} identifier="semester" label="Semester" validation="required"/>
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
        onClick={()=>{validateCourse("create")}}
        className="btn-center"
      >
        Create Course
      </button>: location.pathname.includes("/CourseForm/") ? <button
        onClick={()=>{validateCourse("update")}}
        className="btn-center"
      >
        Update Course
      </button> : ""}
      <hr />
    </>
  );

}

export default withRouter(CourseForm);
