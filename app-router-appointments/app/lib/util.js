

export function getEndAtDate(date) {
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  return endDate;
}

export function getTimeString(date) {
  let timeRegEx = /\d\d:\d\d/
  let dateString = date.toString(); // dateString: Wed Aug 21 2024 13:00:00 GMT-0700 (Pacific Daylight Time)

  let timeString = timeRegEx.exec(dateString)[0]; // timeString: 11:30
  let timeArray = timeString.split(":") // timeArray: 11,30

  // if time has a leading zero 09:00, return 9:00
  if (timeString[0] === '0') {
    return timeString.slice(1).concat(' a.m.'); // timeString.slice(1): 9:00
  }
  // if time is greater than 12 '13:00' return 1:00
  else if (parseInt(timeArray[0]) > 12) {
    let val = parseInt(timeArray[0]) -12;
    timeArray.splice(0, 1, val.toString());
    return timeArray.join(":").concat(' p.m.');
  }
  // else, time doesnt need modification
  else {
    if (parseInt(timeString) < 12)
      return timeString.concat(' a.m.');
    
    return timeString.concat(' p.m.')
  }
}