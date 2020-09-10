export default {
    englishToHebrew,
}

function englishToHebrew(word) {
 let convertedWord 
    switch (word) {
    case ('minutes'):
        convertedWord = 'דקות';
      break;
    case ('build'):
        convertedWord =  'בנייה';
      break;
    case ('filling'):
        convertedWord =  'מילוי';
      break;
    case ('medical-manicure'):
        convertedWord =  'מניקור רפואי';
      break;
    case ('gel'):
        convertedWord =  'לק ג׳ל';
      break;
    case ('medical-pedicure'):
        convertedWord =  'פדיקור';
      break;
    case ('medical-pedicure-gel'):
        convertedWord =  'פדיקור רפואי עם לק ג׳ל';
      break;
    case ('half-pedicure'):
        convertedWord =  'חצי פדיקור';
      break;
    case ('half-pedicure-gel'):
        convertedWord =  'חצי פדיקור עם ג׳ל';
      break;
    case ('eyebrows-mustache'):
        convertedWord =  'גבות ושפם';
      break;
    }
    
    return ' ' + convertedWord 
}