import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class ViewStudents extends Component {
  
  deleteStudent = async (student_id) => {
    let res = await api.delete("/deletestudent", {
      params: { student_id: student_id },
    }).then((res) => {
      window.alert("Successfully Deleted!")
      this.props.handleUpdate({ students: res.data});
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
              <th>GPA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.students.map((student) => (
              <tr
                id={"studentrow" + student.studentId}
                key={"studentrow" + student.studentId}
              >
                <td>
                  <h2
                    id={"student" + student.studentId}
                    key={"student" + student.studentId}
                  >
                    <Link to={`/StudentForm/${student.studentId}`}>{student.frstName + ' ' + student.lstName}</Link>
                  </h2>
                </td>
                <td>
                  <h2
                    id={"studentDob" + student.studentId}
                    key={"studentDob" + student.studentId}
                  >
                    {student.dob}
                  </h2>
                </td>
                <td>
                  <h2
                    id={"studentAge" + student.studentId}
                    key={"studentAge" + student.studentId}
                  >
                    {student.age}
                  </h2>
                </td>
                <td>
                  <h2
                    id={"studentGpa" + student.studentId}
                    key={"studentGpa" + student.studentId}
                  >
                    {student.gpa}
                  </h2>
                </td>
                <td>
                  <button onClick={() => this.deleteStudent(student.studentId)} >
                    Delete Student
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

export default ViewStudents