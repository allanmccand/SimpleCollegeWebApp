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
      salary: {validation:"noNegativeNumber;required", value: "", className: "half", handleClassNameUpdate: (data) => {setFields(prevState => {
                                                  let fields = Object.assign({}, prevState); 
                                                  fields.salary.className = data;
                                                  return fields;
                                          })}}});

  const validateProfessor = async (type) => {
    let res = await api.get("/validate", {
      params: {
        data: JSON.stringify(fields)
      },
    }).then((res) => {
      if(res.data[0].frst_name&&res.data[0].lst_name&&res.data[0].dob&&res.data[0].age&&res.data[0].salary){
        if(type==="create"){
          createProfessor();
        }
        else if(type==="update"){
          updateProfessor();
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

        res.data[0].salary?
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.salary.className = fields.salary.className.replaceAll('error-field','');return fields;}):
            setFields(prevState => {let fields = Object.assign({}, prevState);fields.salary.className = fields.salary.className+' error-field';return fields;});      

        window.alert("Validation failed.");
      }
    }).catch((error)=>{
      window.alert("There was an issue validating!");
    });
  };


  const createProfessor = async () => {
    try{
      const res = await api.post("/addprofessor",null, {
        params: {
          frst_name: fields.frst_name.value,
          lst_name: fields.lst_name.value,
          dob: fields.dob.value,
          age: fields.age.value,
          salary: fields.salary.value
        }
      }).then((res) => {
        props.handleUpdate({ professors: res.data});
        setFields(prevState => {
                          let fields = Object.assign({}, prevState); 
                          fields.frst_name.value = "";
                          fields.lst_name.value = "";
                          fields.dob.value = "";
                          fields.age.value = "";
                          fields.salary.value = "";
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

  const updateProfessor = async () => {
    let res = await api.put("/updateprofessor", null, {
      params: {
        frst_name: fields.frst_name.value,
        lst_name: fields.lst_name.value,
        dob: fields.dob.value,
        age: fields.age.value,
        salary: fields.salary.value,
        professor_id: props.router.params.id
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
          const professorByIdRes = await api.get("/professorbyid", {
              params: {
                professor_id: props.router.params.id
              }
          });

          setFields(prevState => {
                    let fields = Object.assign({}, prevState); 
                    fields.frst_name.value = professorByIdRes.data.frstName;
                    fields.lst_name.value = professorByIdRes.data.lstName;
                    fields.dob.value = new Intl.DateTimeFormat('en-CA', {year: 'numeric',month: '2-digit',day: '2-digit'}).format(new Date(professorByIdRes.data.dob));
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
        onClick={()=>{validateProfessor("create")}}
        className="btn-center"
      >
        Create Professor
      </button>: location.pathname.includes("/ProfessorForm/") ? <button
        onClick={()=>{validateProfessor("update")}}
        className="btn-center"
      >
        Update Professor
      </button> : ""}
      <hr />
    </>
  );
}

export default withRouter(ProfessorForm);
