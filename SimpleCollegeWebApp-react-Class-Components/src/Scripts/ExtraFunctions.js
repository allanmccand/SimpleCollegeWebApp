export const calculateAge = (birthday) => { // birthday is a date
    const today = new Date();
    const birth = new Date(birthday);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Check if the birthday has happened this year yet
    if (monthDiff < 0 || (monthDiff === 0 && today < birth)) {
        age--;
    }
    
    return age;
 }