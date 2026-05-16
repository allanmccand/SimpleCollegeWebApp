const validateAlpha = (input) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(input); 
}

const validateDecimal = (input) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(input); 
}

const lessThanOrEqual = (input,maxVal) => {
    return input<=maxVal; 
}

const noFutureDate = (input) => {
    return new Date(new Date().toDateString())>=new Date(input);
}

const noNegativeNumber = (input) => {
    return input >= 0;
}

const required = (input) => {
    return input!=null&&input!=="";
}

const validateNumeric = (input) => {
    const regex = /^\d+$/;
    return regex.test(input); 
}

export const validate = (type,value) => {
    var allTypes = type.split(';')
    var passedValidation=true;
    if(allTypes.includes('validateAlpha'))
        passedValidation=passedValidation&&validateAlpha(value);
    if(allTypes.includes('validateDecimal')){
        passedValidation=passedValidation&&validateDecimal(value);
    }
    if(allTypes.findIndex(val => val.includes('lessThanOrEqual'))>-1){
        var maxVal = allTypes[allTypes.findIndex(val => val.includes('lessThanOrEqual'))].split(':')[1];
        passedValidation=passedValidation&&lessThanOrEqual(+value,+maxVal);
    }
    if(allTypes.includes('noFutureDate')){
        passedValidation=passedValidation&&noFutureDate(value);
    }
    if(allTypes.includes('noNegativeNumber')){
        passedValidation=passedValidation&&noNegativeNumber(+value);}   
    if(allTypes.includes('required')){
        passedValidation=passedValidation&&required(value);}      
    if(allTypes.includes('validateNumeric')){
        passedValidation=passedValidation&&validateNumeric(value);}             
    return passedValidation;
}