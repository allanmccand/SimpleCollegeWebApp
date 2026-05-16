package com.allanmcc9.courses.model;

import java.util.Date;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonFormat;
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
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int studentId;
	private String frstName;
	private String lstName;
	@JsonFormat(pattern = "MM/dd/yyyy")
	private Date dob;
	private double gpa = 0.00;
	private int age = 0;
}
