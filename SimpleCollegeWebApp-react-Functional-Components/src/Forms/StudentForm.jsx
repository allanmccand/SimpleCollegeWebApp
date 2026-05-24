import React, { useEffect, useState } from "react";
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

function StudentForm (props) {

  const[fields,setFields] = useState({frst_name: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                    let fields = Object.assign({}, prevState); 
                                                    fields.frst_name.className = data;
                                                    return fields;
                                            })}},
            lst_name: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                    let fields = Object.assign({}, prevState); 
                                                    fields.lst_name.className = data;
                                                    return fields;
                                            })}},
            dob: {validation:"noFutureDate;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                    let fields = Object.assign({}, prevState); 
                                                    fields.dob.className = data;
                                                    return fields;
                                            })}},
            age: {validation:"noNegativeNumber;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                    let fields = Object.assign({}, prevState); 
                                                    fields.age.className = data;
                                                    return fields;
                                            })}},
            gpa: {validation:"validateDecimal;lessThanOrEqual:4;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                    let fields = Object.assign({}, prevState); 
                                                    fields.gpa.className = data;
                                                    return fields;
                                            })}}});

  const[signedUpCourses,setSignedUpCourses] = useState([]); 
  const[availableCourses,setAvailableCourses] = useState([]);                                    

  const validateStudent = async (type) => {
    let res = await api.get("/validate", {
      params: {
        data: JSON.stringify(fields)
      },
    }).then((res) => {
      if(res.data[0].frst_name&&res.data[0].lst_name&&res.data[0].dob&&res.data[0].age&&res.data[0].gpa){
        if(type==="create"){
          createStudent();
        }
        else if(type==="update"){
          updateStudent();
        }
      } else {
        res.data[0].frst_name?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.frst_name.className = fields.frst_name.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.frst_name.className = fields.frst_name.className+' error-field';return fields;});

        res.data[0].lst_name?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.lst_name.className = fields.lst_name.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.lst_name.className = fields.lst_name.className+' error-field';return fields;});

        res.data[0].dob?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.dob.className = fields.dob.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.dob.className = fields.dob.className+' error-field';return fields;});

        res.data[0].age?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.age.className = fields.age.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.age.className = fields.age.className+' error-field';return fields;});            

        res.data[0].gpa?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.gpa.className = fields.gpa.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.gpa.className = fields.gpa.className+' error-field';return fields;});      

        window.alert("Validation failed.");
      }
    }).catch((error)=>{
      window.alert("There was an issue validating!")
    });
  };

  const createStudent = async () => {
    let res = await api.post("/addstudent", null, {
    params: {
      frst_name: fields.frst_name.value,
      lst_name: fields.lst_name.value,
      dob: fields.dob.value,
      age: fields.age.value,
      gpa: fields.gpa.value
    },
    }).then((res) => {
      props.handleUpdate({ students: res.data});
      setFields(prevState => {
                                  let fields = Object.assign({}, prevState); 
                                  fields.frst_name.value = "";
                                  fields.lst_name.value = "";
                                  fields.dob.value = "";
                                  fields.age.value = "";
                                  fields.gpa.value = "";
                                  return fields;
      })
      window.alert("Successfully created student!");
    }).catch((error)=>{
      window.alert("There was an issue creating student!")
    });
  };

  const updateStudent = async () => {
    let res = await api.put("/updatestudent", null, {
      params: {
        frst_name: fields.frst_name.value,
        lst_name: fields.lst_name.value,
        dob: fields.dob.value,
        age: fields.age.value,
        gpa: fields.gpa.value,
        student_id: props.router.params.id
      },
    }).then((res) => {
      window.alert("Successfully Updated!")
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  useEffect(()=>{
    const loadForm = async() => {
      try {
        if(props.router.params.id){
          
          const studentByIdRes = await api.get("/coursebystudentid", {
              params: {
                student_id: props.router.params.id
              }
          });

          setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.frst_name.value = studentByIdRes.data[0].studentfrstname;
                          fields.lst_name.value = studentByIdRes.data[0].studentlstname;
                          fields.dob.value = studentByIdRes.data[0].dob;
                          fields.age.value = studentByIdRes.data[0].age;
                          fields.gpa.value = studentByIdRes.data[0].gpa;
                          return fields;
          });

          setSignedUpCourses(studentByIdRes.data.filter(n => n.active));
          setAvailableCourses(studentByIdRes.data.filter(n => !n.active));
          
        }
      } catch (err) {
        window.alert("There was an issue loading!");
      } 
    }
    loadForm();
  },[]); 

  const handleSignedUpCoursesUpdate = (data) => {setSignedUpCourses(data.courses)};
  const handleAvailableCoursesUpdate = (data) => {setAvailableCourses(data.courses)};


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
                className={fields.frst_name.className}
                classNameHandler={fields.frst_name.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.frst_name.value = e.target.value;
                          return fields;
                  })
                }
                validation={fields.frst_name.validation}
                value={fields.frst_name.value}
              />
            </td>
            <td>
              <TextField
                id="lst_name"
                label="Last Name"
                className={fields.lst_name.className}
                classNameHandler={fields.lst_name.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.lst_name.value = e.target.value;
                          return fields;
                  })
                }
                validation={fields.lst_name.validation}
                value={fields.lst_name.value}
              />
            </td>
          </tr>
          <tr>
            <td>
              <DateField
                id="dob"
                label="Student DOB"
                className={fields.dob.className}
                classNameHandler={fields.dob.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.dob.value = e.target.value;
                          if(e.target.value){
                            fields.age.value = calculateAge(new Date(e.target.value));
                          } else{
                            fields.age.value = 0
                          }
                          return fields;
                  })
                }
                validation={fields.dob.validation}
                value={fields.dob.value}
              />
            </td>  
            <td>
              <NumberField
                id="age"
                label="Age"
                className={fields.age.className}
                classNameHandler={fields.age.handleClassNameUpdate}
                readOnly={true}
                validation={fields.age.validation}
                value={fields.age.value}
              />
            </td>
          </tr>
          <tr>
            <td>
              <DecimalField
                id="gpa"
                label="GPA"
                className={fields.gpa.className}
                classNameHandler={fields.gpa.handleClassNameUpdate}                  
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.gpa.value = e.target.value;
                          return fields;
                  })
                }
                validation={fields.gpa.validation}
                value={fields.gpa.value}
              />
            </td>  
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      {location.pathname === "/CreateStudent" ?
      <button
        onClick={()=>{validateStudent("create")}}
        className="btn-center"
      >
        Create Student
      </button>: location.pathname.includes("/StudentForm/") ? <button
        onClick={()=>{validateStudent("update")}}
        className="btn-center"
      >
        Update Student
      </button> : ""}
      <hr />
      {location.pathname.includes("/StudentForm/") ?
      <>
        <ViewCourses courses={signedUpCourses} handleSignedUpdate={handleSignedUpCoursesUpdate} handleUnsignedUpdate={handleAvailableCoursesUpdate} header="Current Courses" type="signed" />
        <hr />
        <ViewCourses courses={availableCourses} handleSignedUpdate={handleSignedUpCoursesUpdate} handleUnsignedUpdate={handleAvailableCoursesUpdate} header="Available Courses" type="unsigned"/>
      </>
      :""}
    </>
  );
}

export default withRouter(StudentForm);
