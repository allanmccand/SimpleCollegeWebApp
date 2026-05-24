import React, { useState,useEffect  } from "react";
import axios from "axios";
import "../App.css";
import StudentForm from "../Forms/StudentForm";
import ViewStudents from "../Views/ViewStudents";

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

function CreateStudent () {
  const [students, setStudents] = useState([]);

  const handleUpdate = (data) => {setStudents(data.students)};

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data);
      } catch (err) {
        console.log(err.message);
      } 
    };

    fetchData();
  }, []);


  return (
    <>
        {location.pathname==="/CreateStudent" ? <StudentForm handleUpdate={handleUpdate} /> : "" }
        <ViewStudents students={students} handleUpdate={handleUpdate}/>
    </>
  );
}

export default CreateStudent