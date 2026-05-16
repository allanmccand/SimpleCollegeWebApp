package com.allanmcc9.courses.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.allanmcc9.courses.model.Professor;
import com.allanmcc9.courses.model.Student;
import com.allanmcc9.courses.service.CollegeService;
import com.allanmcc9.courses.service.ValidationService;

import tools.jackson.databind.ObjectMapper;

@RestController
public class CollegeController {
	
	@Autowired
	CollegeService collegeService;
	
	@Autowired
	ValidationService validationService;
	
    private final ObjectMapper objectMapper = new ObjectMapper();
	
	@GetMapping("/validate")
	public List<Map<String, Boolean>> validate(@RequestParam String data){
		return validationService.validate(objectMapper.readValue(data, Map.class));
	}
	
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
	public List<Map<String, Object>> addCourse(@RequestParam String course_title, @RequestParam int course_level, @RequestParam int professor_id, @RequestParam int semester_id, @RequestParam int year  ) {
		return collegeService.addCourse(course_title, course_level, professor_id, semester_id, year  );
	}
	
	@PostMapping("/addprofessor")
	public List<Professor> addProfessor(@RequestParam String frst_name, @RequestParam String lst_name, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dob,
			@RequestParam int age, @RequestParam double salary) {
		return collegeService.addProfessor(frst_name, lst_name, dob, age, salary);
	}
	
	@PostMapping("/addstudent")
	public List<Student> addStudent(@RequestParam String frst_name, @RequestParam String lst_name, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dob,
			@RequestParam int age, @RequestParam double gpa) {
		return collegeService.addStudent(frst_name, lst_name, dob, age, gpa);
	}
	
	@PutMapping("/updatestudent")
	public void updateStudent(@RequestParam String frst_name, @RequestParam String lst_name, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dob,
			@RequestParam int age, @RequestParam double gpa, @RequestParam int student_id) {
		collegeService.updateStudent(frst_name, lst_name, dob, age, gpa, student_id);
	}
	
	@PutMapping("/updatecourse")
	public void updateCourse(@RequestParam String course_title, @RequestParam int course_level, @RequestParam int professor_id,
			@RequestParam int semester_id, @RequestParam int year, @RequestParam int course_id) {
		collegeService.updateCourse(course_title, course_level, professor_id, semester_id, year, course_id);
	}
	
	@PutMapping("/updateprofessor")
	public void updateProfessor(@RequestParam String frst_name, @RequestParam String lst_name, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dob,
			@RequestParam int age, @RequestParam double salary, @RequestParam int professor_id) {
		collegeService.updateProfessor(frst_name, lst_name, dob, age, salary, professor_id);
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
