import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import CourseForm from "../Forms/CourseForm";
import ViewCourses from "../Views/ViewCourses";
import { useLocation } from 'react-router-dom';

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class CreateCourse extends Component  {
  state = {
    courses: [],
    professors: [],
    semesters: []
  };

  handleUpdate = (data) => {this.setState({courses: data.courses})};

  async componentDidMount() {
    this.setState({loading:true});
    api.get("/courses").then((res) => {
      this.setState({ courses: res.data });
    });
  }

  render() {
    return (
      <>
          {location.pathname==="/CreateCourse" ? <CourseForm handleUpdate={this.handleUpdate} /> : ""}
          <ViewCourses courses={this.state.courses} handleUpdate={this.handleUpdate}/>
      </>
    );
  }
}

export default CreateCourse