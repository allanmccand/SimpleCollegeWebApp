import React, { useState,useEffect  } from "react";
import axios from "axios";
import "../App.css";
import CourseForm from "../Forms/CourseForm";
import ViewCourses from "../Views/ViewCourses";
import { useLocation } from 'react-router-dom';

const api = axios.create({
  baseURL: `http://localhost:8080`,
});

function CreateCourse ()  {

  const [courses, setCourses] = useState([]);

  const handleUpdate = (data) => {setCourses(data.courses)};

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        console.log(err.message);
      } 
    };

    fetchData();
  }, []);

  return (
    <>
        {location.pathname==="/CreateCourse" ? <CourseForm handleUpdate={handleUpdate} /> : ""}
        <ViewCourses courses={courses} handleUpdate={handleUpdate}/>
    </>
  );
  
}

export default CreateCourse