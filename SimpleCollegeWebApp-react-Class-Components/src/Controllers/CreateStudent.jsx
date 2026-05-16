import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import StudentForm from "../Forms/StudentForm";
import ViewStudents from "../Views/ViewStudents";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class CreateStudent extends Component  {
  state = {
    students: []
  };

  handleUpdate = (data) => {this.setState({students: data.students})};

  async componentDidMount() {
    api.get("/students").then((res) => {
      this.setState({ students: res.data });
    });
  }

  render() {
    return (
      <>
          {location.pathname==="/CreateStudent" ? <StudentForm handleUpdate={this.handleUpdate} /> : "" }
          <ViewStudents students={this.state.students} handleUpdate={this.handleUpdate}/>
      </>
    );
  }
}

export default CreateStudent