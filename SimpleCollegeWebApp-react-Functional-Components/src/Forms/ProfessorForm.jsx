import React, { useEffect, useState } from "react";
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

function ProfessorForm (props) {

  const[fields,setFields] = useState({frstName: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.frstName.className = data;
                                                  return fields;
                                          })}},
      lstName: {validation:"validateAlpha;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.lstName.className = data;
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
      salary: {validation:"noNegativeNumber;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.salary.className = data;
                                                  return fields;
                                          })}}});

  const createProfessor = async () => {
      const res = await api.post("/addprofessor",{
          frstName: fields.frstName.value,
          lstName: fields.lstName.value,
          dob: fields.dob.value,
          age: fields.age.value,
          salary: fields.salary.value
        }).then((res) => {
        props.handleUpdate({ professors: res.data});
        setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.frstName.value = "";
                          fields.lstName.value = "";
                          fields.dob.value = "";
                          fields.age.value = "";
                          fields.salary.value = "";
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

  const updateProfessor = async () => {
    let res = await api.put("/updateprofessor",{
        frstName: fields.frstName.value,
        lstName: fields.lstName.value,
        dob: fields.dob.value,
        age: fields.age.value,
        salary: fields.salary.value,
        professorId: props.router.params.id
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
          const professorByIdRes = await api.get("/professorbyid", {
              params: {
                professor_id: props.router.params.id
              }
          });

          setFields(prevState => {
                    let fields = Object.assign({}, prevState); 
                    fields.frstName.value = professorByIdRes.data.frstName;
                    fields.lstName.value = professorByIdRes.data.lstName;
                    fields.dob.value = new Intl.DateTimeFormat('en-CA', {year: 'numeric',month: '2-digit',day: '2-digit'}).format(new Date(professorByIdRes.data.dob+"T00:00:00.000"));
                    fields.age.value = professorByIdRes.data.age;
                    fields.salary.value = professorByIdRes.data.salary;
                    return fields;
          });
        }
      } catch (err) {
        window.alert("There was an issue loading!");
      } 
    }
    loadForm();
  },[]); 

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
                className={fields.frstName.className}
                classNameHandler={fields.frstName.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.frstName.value = e.target.value;
                          return fields;
                  })
                }
                validation={fields.frstName.validation}
                value={fields.frstName.value}
              />
            </td>
            <td>
              <TextField
                id="lstName"
                label="Last Name"
                className={fields.lstName.className}
                classNameHandler={fields.lstName.handleClassNameUpdate}
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.lstName.value = e.target.value;
                          return fields;
                  })
                }
                validation={fields.lstName.validation}
                value={fields.lstName.value}
              />
            </td>
          </tr>
          <tr>
            <td>
              <DateField
                id="dob"
                label="Professor DOB"
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
                id="salary"
                label="Salary"
                className={fields.salary.className}
                classNameHandler={fields.salary.handleClassNameUpdate}                  
                onChange={(e) =>
                  setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.salary.value = e.target.value;
                          return fields;
                  })
                }
                validation={fields.salary.validation}
                value={fields.salary.value}
              />
            </td>  
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      {location.pathname === "/CreateProfessor" ?
      <button
        onClick={()=>{createProfessor()}}
        className="btn-center"
      >
        Create Professor
      </button>: location.pathname.includes("/ProfessorForm/") ? <button
        onClick={()=>{updateProfessor()}}
        className="btn-center"
      >
        Update Professor
      </button> : ""}
      <hr />
    </>
  );
}

export default withRouter(ProfessorForm);
