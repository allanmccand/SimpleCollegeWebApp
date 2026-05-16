package com.allanmcc9.courses.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.allanmcc9.courses.model.Course;
import com.allanmcc9.courses.model.Professor;
import com.allanmcc9.courses.model.Student;
import com.allanmcc9.courses.repo.CourseRepo;
import com.allanmcc9.courses.repo.ProfessorRepo;
import com.allanmcc9.courses.repo.SemesterRepo;
import com.allanmcc9.courses.repo.StudentRepo;

@Service
public class CollegeService {
	@Autowired
	private CourseRepo repo;
	
	@Autowired
	private ProfessorRepo professorRepo;
	
	@Autowired
	private StudentRepo studentRepo;
	
	@Autowired
	private SemesterRepo semesterRepo;

	public List<Map<String, Object>> getCourses() {
		return repo.findAllCoursesCustom().stream()
				.sorted(Comparator.comparing((Map<String, Object> m) -> (String) m.get("course_title"))
			              .thenComparing(m -> (Integer) m.get("course_level")))
			    .collect(Collectors.toList());
	}
	
	public List<Map<String, Object>> getCoursesById(int course_id) {
		return repo.findAllCoursesByIdCustom(course_id).stream()
				.sorted(Comparator.comparing((Map<String, Object> m) -> (String) m.get("course_title"))
			              .thenComparing(m -> (Integer) m.get("course_level")))
			    .collect(Collectors.toList());
	}
	
	public List<Map<String, Object>> getSignUpCoursesByStudentIdCustom(int student_id) {
		return repo.findAllSignUpCoursesByStudentIdCustom(student_id).stream()
				.sorted(Comparator.comparing((Map<String, Object> m) -> (String) m.get("course_title"))
			              .thenComparing(m -> (Integer) m.get("course_level")))
			    .collect(Collectors.toList());
	}

	public List<Map<String, String>> getProfessorsByIdVal() {
		return professorRepo.findAllProfessorsByIdValue();
	}
	
	public List<Map<String, String>> getStudentsByIdVal() {
		return studentRepo.findAllStudentsByIdValue();
	}
	
	public List<Professor> getProfessors() {
		return professorRepo.findAll().stream()
				.sorted(Comparator.comparing((Professor p) -> p.getFrstName())
			              .thenComparing(p -> p.getLstName()))
			    .collect(Collectors.toList());
	}
	
	public List<Student> getStudents() {
		return studentRepo.findAll().stream()
				.sorted(Comparator.comparing((Student p) -> p.getFrstName())
			              .thenComparing(p -> p.getLstName()))
			    .collect(Collectors.toList());
	}
	
	public Student getStudentById(int student_id) {
		return studentRepo.findByStudentId(student_id);
	}
	
	public Professor getProfessorById(int professor_id) {
		return professorRepo.findByProfessorId(professor_id);
	}
	
	public List<Map<String, String>> getSemestersByIdVal() {
		return semesterRepo.findAllSemestersByIdValue();
	}
	
	public List<Map<String, Object>> addCourse(String course_title, int course_level, int professor_id, int semester_id, int year  ) {
		Course course = new Course();
		course.setCourseTitle(course_title);
		course.setCourseLevel(course_level);
		course.setProfessorId(professor_id);
		course.setSemesterId(semester_id);
		course.setYear(year);
		
		repo.save(course);
		
		return getCourses();
	}
	
	public List<Professor> addProfessor(String frst_name, String lst_name, Date dob, int age, double salary) {
		Professor professor = new Professor();
		professor.setFrstName(frst_name);
		professor.setLstName(lst_name);
		professor.setDob(dob);
		professor.setAge(age);
		professor.setSalary(salary);
		
		professorRepo.save(professor);
		
		return getProfessors();
	}
	
	public List<Student> addStudent(String frst_name, String lst_name, Date dob, int age, double gpa) {
		Student student = new Student();
		student.setFrstName(frst_name);
		student.setLstName(lst_name);
		student.setDob(dob);
		student.setAge(age);
		student.setGpa(gpa);
		
		studentRepo.save(student);
		
		return getStudents();
	}
	
	public void updateStudent(String frst_name, String lst_name, Date dob,
			int age, double gpa, int student_id) {
		Student student = studentRepo.findByStudentId(student_id);
		
		student.setFrstName(frst_name);
		student.setLstName(lst_name);
		student.setDob(dob);
		student.setAge(age);
		student.setGpa(gpa);
		
		studentRepo.save(student);
	}
	
	public void updateCourse(String course_title, int course_level, int professor_id, int semester_id, int year, int course_id) {
		Course course = repo.findByCourseId(course_id);
		
		course.setCourseTitle(course_title);
		course.setCourseLevel(course_level);
		course.setProfessorId(professor_id);
		course.setSemesterId(semester_id);
		course.setYear(year);
		
		repo.save(course);
	}
	
	public void updateProfessor(String frst_name, String lst_name, Date dob,
			int age, double salary, int professor_id) {
		Professor professor = professorRepo.findByProfessorId(professor_id);
		
		professor.setFrstName(frst_name);
		professor.setLstName(lst_name);
		professor.setDob(dob);
		professor.setAge(age);
		professor.setSalary(salary);
		
		professorRepo.save(professor);
	}
	
	
	public List<Map<String, Object>> mergeSignup(int student_id, int course_id, int active) {
		repo.mergeSignup(student_id, course_id, active);
		return getSignUpCoursesByStudentIdCustom(student_id);
	}
	
	public List<Map<String, Object>> deleteCourse(int courseId) {
		Course course = repo.findByCourseId(courseId);
		repo.delete(course);
		return getCourses();
	}
	
	public List<Professor> deleteProfessor(int professorId) {
		Professor professor = professorRepo.findByProfessorId(professorId);
		professorRepo.delete(professor);
		return getProfessors();
	}
	
	public List<Student> deleteStudent(int studentId) {
		Student student = studentRepo.findByStudentId(studentId);
		studentRepo.delete(student);
		return getStudents();
	}
}
