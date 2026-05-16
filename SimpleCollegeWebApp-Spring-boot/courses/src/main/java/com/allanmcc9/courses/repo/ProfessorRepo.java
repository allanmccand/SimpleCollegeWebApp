package com.allanmcc9.courses.repo;

import org.springframework.stereotype.Repository;
import com.allanmcc9.courses.model.Professor;

@Repository
public interface ProfessorRepo extends GenericRepo<Professor, Integer> {
	Professor findByProfessorId(int professorId);
}
