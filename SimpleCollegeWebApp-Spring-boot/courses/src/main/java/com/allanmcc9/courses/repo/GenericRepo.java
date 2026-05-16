package com.allanmcc9.courses.repo;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;


@NoRepositoryBean
public interface GenericRepo<T, ID> extends JpaRepository<T, ID> {

	@Query(
	        value = "select professor_id id, frst_name || ' ' || lst_name \"value\" from professor", 
	        nativeQuery = true
	)
	List<Map<String, String>> findAllProfessorsByIdValue();
	
	@Query(
	        value = "select id, value from semester", 
	        nativeQuery = true
	)
	List<Map<String, String>> findAllSemestersByIdValue();
	
	@Query(
	        value = "select student_id id, frst_name || ' ' || lst_name \"value\" from student", 
	        nativeQuery = true
	)
	List<Map<String, String>> findAllStudentsByIdValue();
}
