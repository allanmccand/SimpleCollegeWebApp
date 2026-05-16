package com.allanmcc9.courses.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {
	public List<Map<String, Boolean>> validate(Map<String, Map<String, String>> data) {
		
		Map<String, Boolean> validationMap = new HashMap<String, Boolean>();
		
		for (Map.Entry<String, Map<String, String>> field : data.entrySet())
		{
		    if(field.getValue().get("validation")!=null&&!("").equals(field.getValue().get("validation"))) {
		    	validationMap.put(field.getKey(),validate(String.valueOf(field.getValue().get("value")), field.getValue().get("validation")));
		    }
		}

		List<Map<String, Boolean>> validationList = new ArrayList<>();
		validationList.add(validationMap);
		
		return validationList;
	}
	
	public boolean validate(String value, String validation) {
		
		String[] validationArr = validation.split(";");
		boolean passed = true;
		String validationStr = "";
		
		for (int i = 0; i < validationArr.length && passed; i++) {
			
			validationStr = validationArr[i];
			
			validationStr = validationStr.contains("lessThanOrEqual")?"lessThanOrEqual":validationStr;
			
			switch(validationStr){
				case "validateAlpha": passed = validateAlpha(value); break;
				case "required": passed = validateRequired(value); break;
				case "noFutureDate": passed = validateNoFutureDate(value); break;
				case "noNegativeNumber": passed = validateNoNegativeNumber(value); break;
				case "validateDecimal": passed = validateDecimal(value); break;
				case "lessThanOrEqual": passed = validateLessThanOrEqual(value,validationArr[i]); break;
				case "validateNumeric": passed = validateNumeric(value); break;
			}
			
		}
		
		return passed;
	}
	
	public boolean validateAlpha(String value) {
		return (validateRequired(value) && value.chars().allMatch(Character::isLetter)) || !validateRequired(value);
	}
	
	public boolean validateRequired(String value) {
		return value != null && !value.isEmpty();
	}
	
	public boolean validateNoFutureDate(String value) {
		if(validateRequired(value)) {
	        LocalDate inputDate = LocalDate.parse(value); 
	        LocalDate today = LocalDate.now();
	
	        if (inputDate.isAfter(today)) {
	            return false;
	        } else {
	            return true;
	        }
		}
		return true;
	}
	
	public boolean validateNoNegativeNumber(String value) {
		return (validateRequired(value) && Double.parseDouble(value) >= 0) || !validateRequired(value);
	}
	
	public boolean validateDecimal(String value) {
		try {
			if(validateRequired(value)) {
				Double.parseDouble(value);
			}
			Double.parseDouble(value);
			return true;
		}catch(NumberFormatException e) {
			return false;
		}
	}
	
	public boolean validateLessThanOrEqual(String value,String validation) {
		if(validateRequired(value)) {
			try {
				String maxValue = validation.split(":")[1];
				return Double.parseDouble(value)<=Double.parseDouble(maxValue);
			}catch(NumberFormatException e) {
				return false;
			}
		}
		
		return true;
	}
	
	public boolean validateNumeric(String value) {
		try {
			if(validateRequired(value)) {
				Integer.parseInt(value);
			}
			Integer.parseInt(value);
			return true;
		}catch(NumberFormatException e) {
			return false;
		}
	}
}

