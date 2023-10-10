export const subtractTimeFromDate =(objDate, intHours) => {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intHours * 60 * 60000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  return newDateObj;
}