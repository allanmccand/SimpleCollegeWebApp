import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import ProfessorForm from "../Forms/ProfessorForm";
import { useLocation } from 'react-router-dom';
import ViewProfessors from "../Views/ViewProfessors";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

class CreateProfessor extends Component  {
  state = {
    professors: []
  };

  handleUpdate = (data) => {this.setState({professors: data.professors})};

  async componentDidMount() {
    this.setState({loading:true});
    api.get("/professors").then((res) => {
      this.setState({ professors: res.data });
    });
  }

  render() {
    return (
      <>
          {location.pathname==="/CreateProfessor" ? <ProfessorForm handleUpdate={this.handleUpdate} /> : ""}
          <ViewProfessors professors={this.state.professors} handleUpdate={this.handleUpdate}/>
      </>
    );
  }
}

export default CreateProfessor