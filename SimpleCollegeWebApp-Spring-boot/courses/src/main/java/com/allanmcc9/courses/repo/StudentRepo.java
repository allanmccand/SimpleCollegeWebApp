package com.allanmcc9.courses.repo;

import org.springframework.stereotype.Repository;
import com.allanmcc9.courses.model.Student;

@Repository
public interface StudentRepo extends GenericRepo<Student, Integer> {
	Student findByStudentId(int studentId);
}
