import CreateCourse from './Controllers/CreateCourse';
import CreateProfessor from './Controllers/CreateProfessor';
import CreateStudent from './Controllers/CreateStudent';
import ProfessorForm from "./Forms/ProfessorForm";
import StudentForm from "./Forms/StudentForm";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CourseForm from './Forms/CourseForm';

function App() {
    return (
      <>
        <h1>College Campus Simple Web App</h1>
        <BrowserRouter>
          {/* Navigation */}
          <nav style={{
            display: "inline-block",
            marginBottom: "50px",
          }}>
            <Link to="/CreateCourse">Courses</Link>{" "}|{" "}
            <Link to="/CreateProfessor">Professors</Link>{" "}|{" "}
            <Link to="/CreateStudent">Students</Link>
          </nav>
          {/* Routes */}
          <Routes>
            <Route path="/CreateCourse" element={<CreateCourse />} />
            <Route path="/CreateProfessor" element={<CreateProfessor />} />
            <Route path="/CreateStudent" element={<CreateStudent />} />
            <Route path="/StudentForm/:id" element={<StudentForm />} />
            <Route path="/ProfessorForm/:id" element={<ProfessorForm />} />
            <Route path="/CourseForm/:id" element={<CourseForm />} />
          </Routes>
        </BrowserRouter>
      </>
    )
}

export default App