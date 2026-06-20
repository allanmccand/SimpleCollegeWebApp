package com.allanmcc9.courses.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.stereotype.Component;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Component
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer courseId;
	@NotNull(message = "Course Title cannot be null")
	@Pattern(regexp = "^[a-zA-Z]+$", message = "Must contain only letters")
	private String courseTitle;
	@NotNull(message = "Course Level cannot be null")
	private Integer courseLevel;
	@NotNull(message = "Professor cannot be null")
	private Integer professorId;
	@NotNull(message = "Semester cannot be null")
	private Integer semesterId;
	@NotNull(message = "Year cannot be null")
	private Integer year;
}
