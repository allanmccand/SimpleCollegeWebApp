package com.allanmcc9.courses.service;

import java.util.Comparator;
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
				.sorted(Comparator.comparing((Map<String, Object> m) -> (String) m.get("courseTitle"))
			              .thenComparing(m -> (Integer) m.get("courseLevel")))
			    .collect(Collectors.toList());
	}
	
	public List<Map<String, Object>> getCoursesById(int course_id) {
		return repo.findAllCoursesByIdCustom(course_id).stream()
				.sorted(Comparator.comparing((Map<String, Object> m) -> (String) m.get("courseTitle"))
			              .thenComparing(m -> (Integer) m.get("courseLevel")))
			    .collect(Collectors.toList());
	}
	
	public List<Map<String, Object>> getSignUpCoursesByStudentIdCustom(int student_id) {
		return repo.findAllSignUpCoursesByStudentIdCustom(student_id).stream()
				.sorted(Comparator.comparing((Map<String, Object> m) -> (String) m.get("courseTitle"))
			              .thenComparing(m -> (Integer) m.get("courseLevel")))
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
	
	public List<Map<String, Object>> addCourse(Course course) {
		repo.save(course);
		return getCourses();
	}
	
	public List<Professor> addProfessor(Professor prof) {
		professorRepo.save(prof);
		return getProfessors();
	}
	
	public List<Student> addStudent(Student student) {
		studentRepo.save(student);
		return getStudents();
	}
	
	public void updateStudent(Student updStudent) {
		Student student = studentRepo.findByStudentId(updStudent.getStudentId());
		
		student.setFrstName(updStudent.getFrstName());
		student.setLstName(updStudent.getLstName());
		student.setDob(updStudent.getDob());
		student.setAge(updStudent.getAge());
		student.setGpa(updStudent.getGpa());
		
		studentRepo.save(student);
	}
	
	public void updateCourse(Course updCourse) {
		Course course = repo.findByCourseId(updCourse.getCourseId());
		
		course.setCourseTitle(updCourse.getCourseTitle());
		course.setCourseLevel(updCourse.getCourseLevel());
		course.setProfessorId(updCourse.getProfessorId());
		course.setSemesterId(updCourse.getSemesterId());
		course.setYear(updCourse.getYear());
		
		repo.save(course);
	}
	
	public void updateProfessor(Professor prof) {
		Professor professor = professorRepo.findByProfessorId(prof.getProfessorId());
		
		professor.setFrstName(prof.getFrstName());
		professor.setLstName(prof.getLstName());
		professor.setDob(prof.getDob());
		professor.setAge(prof.getAge());
		professor.setSalary(prof.getSalary());
		
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
