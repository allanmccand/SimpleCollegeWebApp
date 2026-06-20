package com.allanmcc9.courses.model;

import java.time.LocalDate;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer studentId;
	@NotNull(message = "First name cannot be null")
	@Pattern(regexp = "^[a-zA-Z]+$", message = "Must contain only letters")
	private String frstName;
	@NotNull(message = "Last name cannot be null")
	@Pattern(regexp = "^[a-zA-Z]+$", message = "Must contain only letters")
	private String lstName;
	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotNull(message = "DOB cannot be null")
	private LocalDate dob;
	@DecimalMin(value = "0.0", message = "GPA must be at least 0.0")
    @DecimalMax(value = "4.0", message = "GPA cannot exceed 4.0")
	@NotNull(message = "GPA cannot be null")
	private Double gpa = 0.00;
	@NotNull(message = "Age cannot be null")
	private Integer age = 0;
}
