package com.allanmcc9.courses.repo;

import org.springframework.stereotype.Repository;
import com.allanmcc9.courses.model.Semester;

@Repository
public interface SemesterRepo  extends GenericRepo<Semester, Integer> {

}
