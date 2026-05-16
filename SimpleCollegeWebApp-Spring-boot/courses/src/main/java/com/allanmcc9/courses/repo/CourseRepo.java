package com.allanmcc9.courses.repo;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.allanmcc9.courses.model.Course;
import jakarta.transaction.Transactional;

@Repository
public interface CourseRepo  extends JpaRepository<Course, Integer> {
	Course findByCourseId(int courseId);
	
	public final String COURSES_CUSTOM_SQL = "select course.course_id,course_title,course_level,professor.frst_name professorFrstName,professor.lst_name professorLstName,semester.value semesterval,"
    		+ "course.professor_id,course.semester_id,course.year "
    		+ "from course\r\n"
            		+ "left join professor on professor.professor_id = course.professor_id \r\n"
            		+ "left join semester on semester.id = course.semester_id";
	
	public final String COURSES_SIGNUP_CUSTOM_SQL = "select course.course_id,course_title,course_level,professor.frst_name professorFrstName,professor.lst_name professorLstName,semester.value semesterval,"
    		+ "course.professor_id,course.semester_id,course.year,signup.active,student.student_id,student.frst_name studentFrstName,student.lst_name studentLstName, student.dob,"
			+ "student.gpa, student.age\r\n"
    		+ "from course\r\n"
            		+ "left join professor on professor.professor_id = course.professor_id \r\n"
            		+ "left join semester on semester.id = course.semester_id";
	
	@Query(
	        value = COURSES_CUSTOM_SQL, 
	        nativeQuery = true
	)
	List<Map<String, Object>> findAllCoursesCustom();
	
	@Query(
	        value = COURSES_CUSTOM_SQL + " WHERE COURSE_ID = :course_id", 
	        nativeQuery = true
	)
	List<Map<String, Object>> findAllCoursesByIdCustom(@Param("course_id") int course_id);
	
	@Query(
	        value = COURSES_SIGNUP_CUSTOM_SQL + " left join student on student.student_id = :student_id "
			       +"\r\n left join signup on signup.course_id = course.course_id and signup.student_id = student.student_id ", 
	        nativeQuery = true
	)
	List<Map<String, Object>> findAllSignUpCoursesByStudentIdCustom(@Param("student_id") int student_id);
	
	
	@Modifying
	@Transactional
	@Query(
	        value = "merge into signup using(\r\n"
	        		+ "select :student_id student_id, :course_id course_id, :active active\r\n"
	        		+ ") rslt on rslt.student_id = signup.student_id\r\n"
	        		+ "and rslt.course_id = signup.course_id\r\n"
	        		+ "when matched then update set active = rslt.active\r\n"
	        		+ "when not matched then insert (student_id,course_id,active) \r\n"
	        		+ "VALUES (rslt.student_id,rslt.course_id,rslt.active)", 
	        nativeQuery = true
	)
	void mergeSignup(@Param("student_id") int student_id,@Param("course_id") int course_id,@Param("active") int active);
	
}
