import HttpService from './HttpService'
import UtilsService from "../services/UtilsService";

export default {
    sendEmail
}

function sendEmail(name, date, email='', isConfirmation, phone='', duration='', time='', treatments='') {
    console.log ('name', name, 'date', date, 'phoone', phone, 'email', email, duration, time, treatments, isConfirmation)
    let treatmentsType = (treatments)? UtilsService.arrayToString(treatments) : ''
    let bodyText = ''
    if (isConfirmation) {
        bodyText = `שלום,
         ${name} שמחים שבחרת במספרת קובי!
        נקבע לך תור ל${treatmentsType}  
        בתאריך ${date}
        בשעה ${time}
        משך זמן הטיפול מוערך כ- ${duration} דקות
        הטלפון שהתקבל ליצירת קשר הוא - ${phone}`
    } else {
        bodyText = `
        שלום,
         ${name}
        התור שנקבע לתאריך ${date} בוטל 
        תודה על העדכון `
    }
    let emailObj = {
        email,
        bodyText
    }
    return HttpService.post('email',emailObj)
}