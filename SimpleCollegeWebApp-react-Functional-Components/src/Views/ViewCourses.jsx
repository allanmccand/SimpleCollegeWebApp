import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import "../App.css";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

function ViewCourses (props) {
  
  const deleteCourse = async (course_id) => {
    let res = await api.delete("/deletecourse", {
      params: { course_id: course_id },
    }).then((res) => {
      window.alert("Successfully Deleted!")
      props.handleUpdate({ courses: res.data});
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };
  
  const mergeCourse = async (student_id,course_id,active) => {
    let res = await api.patch("/mergesignup",{}, {
      params: { student_id: student_id, course_id: course_id, active: active }
    }).then((res) => {
      props.handleSignedUpdate({ courses: res.data.filter(n => n.active)});
      props.handleUnsignedUpdate({ courses: res.data.filter(n => !n.active)});
    }).catch((error)=>{
      window.alert("There was an issue!")
    });
  };

  return (
    <>
      {props.header ? <h1>{props.header}</h1>:""}
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Professor</th>
            <th>Semester</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course) => (
            <tr
              id={"courserow" + course.course_id}
              key={"courserow" + course.course_id}
            >
              <td>
                <h2
                  id={"course" + course.course_id}
                  key={"course" + course.course_id}
                >
                  <Link to={`/CourseForm/${course.course_id}`} state={{ professors: props.professors, semesters: props.semesters }}>{course.course_title + " " + course.course_level}</Link>
                </h2>
              </td>
              <td>
                {course.professorfrstname && course.professorlstname ? (
                  <h2
                    id={"professor" + course.course_id}
                    key={"professor" + course.course_id}
                  >
                    {course.professorfrstname + " " + course.professorlstname}
                  </h2>
                ) : (
                  <h2>Unassigned</h2>
                )}
              </td>
              <td>
                {course.semesterval ? (
                  <h2
                    id={"semester" + course.course_id}
                    key={"semester" + course.course_id}
                  >
                    {course.semesterval}
                  </h2>
                ) : (
                  <h2>-</h2>
                )}
              </td>
              <td>
                {course.year ? (
                  <h2
                    id={"year" + course.course_id}
                    key={"year" + course.course_id}
                  >
                    {course.year}
                  </h2>
                ) : (
                  <h2>-</h2>
                )}
              </td>
              <td>
                {props.type=="signed"?
                <button onClick={() => mergeCourse(course.student_id,course.course_id,0)} >
                  Unassign
                </button>:props.type=="unsigned"?
                <button onClick={() => mergeCourse(course.student_id,course.course_id,1)} >
                  Assign
                </button>:<button onClick={() => deleteCourse(course.course_id)} >
                  Delete Course
                </button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewCourses