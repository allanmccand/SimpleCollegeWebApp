package com.allanmcc9.courses.model;

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
public class Semester {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String value;
}
