import jalali = require('jalali-moment');

export class ConvertDate {
  jalaliDate(date) {
    const jalaliDate = jalali(date).locale('fa');
    const month = jalaliDate.format('MMMM');
    const day = jalaliDate.format('DD');
    const year = jalaliDate.format('YYYY');
    return `${day}-${month}-${year}`;
  }
  jalaliDateWithTime(date) {
    const jalaliDate = jalali(date).locale('fa');
    const month = jalaliDate.format('MM');
    const day = jalaliDate.format('DD');
    const year = jalaliDate.format('YYYY');
    const hour = jalaliDate.format('HH');
    const minute = jalaliDate.format('mm');
    const second = jalaliDate.format('ss');
    return `${year}/${month}/${day} - ${hour}:${minute}:${second}`;
  }
  jalaliDateResume(date) {
    const jalaliDate = jalali(date).locale('fa');
    const month = jalaliDate.format('MM');
    const day = jalaliDate.format('DD');
    const year = jalaliDate.format('YYYY');
    return `${year}/${month}/${day}`;
  }
  jalaliDateMonth(date) {
    const jalaliDate = jalali(date).locale('fa');
    const month = jalaliDate.format('MMMM');
    return `${month}`;
  }
  jalaliDateDay(date) {
    const jalaliDate = jalali(date).locale('fa');
    const day = jalaliDate.format('DD');
    return `${day}`;
  }
  jalaliDateYear(date) {
    const jalaliDate = jalali(date).locale('fa');
    const year = jalaliDate.format('YYYY');
    return `${year}`;
  }
  jTime(date) {
    const jalaliDate = jalali(date).locale('fa');
    const hour = jalaliDate.format('HH');
    const minute = jalaliDate.format('mm');
    const second = jalaliDate.format('ss');
    return `${hour}:${minute}:${second}`;
  }
  georgianDate(date) {
    const georgianDate = jalali.from(date, 'fa', 'YYYY-MM-DD  HH:mm:ss');
    const month = georgianDate.format('MM');
    const day = georgianDate.format('DD');
    const year = georgianDate.format('YYYY');
    const hour = georgianDate.format('HH');
    const minute = georgianDate.format('mm');
    const second = georgianDate.format('ss');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  DateAndTimePublication(date) {
    let kabise = 1403;
    let kabiseStatus = false;
    const georgianDate = jalali(date).locale('fa');
    let month = parseInt(georgianDate.format('MM'));
    let day = parseInt(georgianDate.format('DD'));
    let year = parseInt(georgianDate.format('YYYY'));
    let hour = parseInt(georgianDate.format('HH'));
    let minute = parseInt(georgianDate.format('mm'));
    let second = parseInt(georgianDate.format('ss'));
    const month2 = georgianDate.format('MMMM');
    const day2 = georgianDate.format('DD');
    const year2 = georgianDate.format('YYYY');

    const now = new Date();
    const georgianDateNow = jalali(now).locale('fa');
    let monthNow = parseInt(georgianDateNow.format('MM'));
    let dayNow = parseInt(georgianDateNow.format('DD'));
    let yearNow = parseInt(georgianDateNow.format('YYYY'));
    let hourNow = parseInt(georgianDateNow.format('HH'));
    let minuteNow = parseInt(georgianDateNow.format('mm'));
    let secondNow = parseInt(georgianDateNow.format('ss'));

    if (secondNow < second) {
      minuteNow -= 1;
      secondNow += 60;
    }
    if (minuteNow < minute) {
      hourNow -= 1;
      minuteNow += 60;
    }
    if (hourNow < hour) {
      dayNow -= 1;
      hourNow += 24;
    }
    if (dayNow < day) {
      while (kabise < yearNow) {
        kabise += 4;
        if (kabise === yearNow) {
          kabiseStatus = true;
        }
      }
      if (monthNow < 7) {
        dayNow += 31;
      } else if (kabiseStatus === true && monthNow > 6) {
        dayNow += 30;
      } else if (monthNow === 12) {
        dayNow += 29;
      } else {
        dayNow += 30;
      }
      monthNow -= 1;
    }
    if (monthNow < month) {
      yearNow -= 1;
      monthNow += 12;
    }

    second = secondNow - second;
    minute = minuteNow - minute;
    hour = hourNow - hour;
    day = dayNow - day;
    month = monthNow - month;
    year = yearNow - year;

    if (year === 0) {
      if (month === 0) {
        if (day === 0) {
          if (hour === 0) {
            if (minute === 0) {
              if (second === 0) {
                return 'هم اکنون';
              }
              return `${second} ثانیه قبل`;
            }
            return `${minute} دقیقه قبل`;
          }
          return `${hour} ساعت قبل`;
        }
        if (day < 8) {
          return `${day} روز قبل`;
        }
        return `${day2} ${month2} ${year2}`;
      }
      return `${day2} ${month2} ${year2}`;
    }
    return `${day2} ${month2} ${year2}`;
  }
}
