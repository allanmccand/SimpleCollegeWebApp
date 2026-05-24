import React, {  useState,useEffect  } from "react";
import axios from "axios";
import "../App.css";
import ProfessorForm from "../Forms/ProfessorForm";
import { useLocation } from 'react-router-dom';
import ViewProfessors from "../Views/ViewProfessors";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

function CreateProfessor () {

  const [professors, setProfessors] = useState([]);

  const handleUpdate = (data) => {setProfessors(data.professors)};

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await api.get('/professors');
        setProfessors(response.data);
      } catch (err) {
        console.log(err.message);
      } 
    };

    fetchData().then(()=>{console.log('got data professors')});
  }, []);

  return (
    <>
        {location.pathname==="/CreateProfessor" ? <ProfessorForm handleUpdate={handleUpdate} /> : ""}
        <ViewProfessors professors={professors} handleUpdate={handleUpdate}/>
    </>
  );
  
}

export default CreateProfessor