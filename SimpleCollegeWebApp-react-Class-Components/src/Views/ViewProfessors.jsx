import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProfessorForm from "../Forms/ProfessorForm";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class ViewProfessors extends Component {
  
  deleteProfessor = async (professor_id) => {
    let res = await api.delete("/deleteprofessor", {
      params: { professor_id: professor_id },
    }).then((res) => {
      window.alert("Successfully Deleted!")
      this.props.handleUpdate({ professors: res.data});
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };
  
  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.professors.map((professor) => (
              <tr
                id={"professorrow" + professor.professorId}
                key={"professorrow" + professor.professorId}
              >
                <td>
                  <h2
                    id={"professor" + professor.professorId}
                    key={"professor" + professor.professorId}
                  >
                    <Link to={`/ProfessorForm/${professor.professorId}`}>{professor.frstName + ' ' + professor.lstName}</Link>
                  </h2>
                </td>
                <td>
                  <h2
                    id={"professorDob" + professor.professorId}
                    key={"professorDob" + professor.professorId}
                  >
                    {professor.dob}
                  </h2>
                </td>
                <td>
                  <h2
                    id={"professorAge" + professor.professorId}
                    key={"professorAge" + professor.professorId}
                  >
                    {professor.age}
                  </h2>
                </td>
                <td>
                  <h2
                    id={"professorSalary" + professor.professorId}
                    key={"professorSalary" + professor.professorId}
                  >
                    {professor.salary}
                  </h2>
                </td>
                <td>
                  <button onClick={() => this.deleteProfessor(professor.professorId)} >
                    Delete Professor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ViewProfessors