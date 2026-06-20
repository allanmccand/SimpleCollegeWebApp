package com.allanmcc9.courses.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.allanmcc9.courses.model.Course;
import com.allanmcc9.courses.model.Professor;
import com.allanmcc9.courses.model.Student;
import com.allanmcc9.courses.service.CollegeService;
import jakarta.validation.Valid;
import tools.jackson.databind.ObjectMapper;

@RestController
public class CollegeController {
	
	@Autowired
	CollegeService collegeService;
	
    private final ObjectMapper objectMapper = new ObjectMapper();
	
	@GetMapping("/courses")
	public List<Map<String, Object>> getCourses(){
		return collegeService.getCourses();
	}
	
	@GetMapping("/coursebyid")
	public List<Map<String, Object>> getCoursesById(@RequestParam int course_id){
		return collegeService.getCoursesById(course_id);
	}
	
	@GetMapping("/coursebystudentid")
	public List<Map<String, Object>> getSignUpCoursesByStudentIdCustom(@RequestParam int student_id){
		return collegeService.getSignUpCoursesByStudentIdCustom(student_id);
	}
	
	@GetMapping("/professors")
	public List<Professor> getProfessors(){
		return collegeService.getProfessors();
	}
	
	@GetMapping("/students")
	public List<Student> getStudents(){
		return collegeService.getStudents();
	}
	
	@GetMapping("/professorsByIdVal")
	public List<Map<String, String>> getProfessorsByIdVal(){
		return collegeService.getProfessorsByIdVal();
	}
	
	@GetMapping("/studentsByIdVal")
	public List<Map<String, String>> getStudentsByIdVal(){
		return collegeService.getStudentsByIdVal();
	}
	
	@GetMapping("/semestersByIdVal")
	public List<Map<String, String>> getSemestersbyIdVal(){
		return collegeService.getSemestersByIdVal();
	}
	
	@GetMapping("/studentbyid")
	public Student getStudentById(@RequestParam int student_id) {
		return collegeService.getStudentById(student_id);
	}
	
	@GetMapping("/professorbyid")
	public Professor getProfessorById(@RequestParam int professor_id) {
		return collegeService.getProfessorById(professor_id);
	}
	
	@PostMapping("/addcourse")
	public List<Map<String, Object>> addCourse(@Valid @RequestBody Course course) {
		return collegeService.addCourse(course);
	}
	
	@PostMapping("/addprofessor")
	public List<Professor> addProfessor(@Valid @RequestBody Professor prof) {
		return collegeService.addProfessor(prof);
	}
	
	@PostMapping("/addstudent")
	public List<Student> addStudent(@Valid @RequestBody Student student) {
		return collegeService.addStudent(student);
	}
	
	@PutMapping("/updatestudent")
	public void updateStudent(@Valid @RequestBody Student student) {
		collegeService.updateStudent(student);
	}
	
	@PutMapping("/updatecourse")
	public void updateCourse(@Valid @RequestBody Course course) {
		collegeService.updateCourse(course);
	}
	
	@PutMapping("/updateprofessor")
	public void updateProfessor(@Valid @RequestBody Professor prof) {
		collegeService.updateProfessor(prof);
	}
	
	@PatchMapping("/mergesignup")
	public List<Map<String, Object>> mergeSignup(@RequestParam int student_id, @RequestParam int course_id, @RequestParam int active) {
		return collegeService.mergeSignup(student_id,course_id,active);
	}
	
	@DeleteMapping("/deletecourse")
	public List<Map<String, Object>> deleteCourse(@RequestParam int course_id) {
		return collegeService.deleteCourse(course_id);
	}
	
	@DeleteMapping("/deleteprofessor")
	public List<Professor> deleteProfessor(@RequestParam int professor_id) {
		return collegeService.deleteProfessor(professor_id);
	}
	
	@DeleteMapping("/deletestudent")
	public List<Student> deleteStudent(@RequestParam int student_id) {
		return collegeService.deleteStudent(student_id);
	}
}
