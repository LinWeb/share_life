export let getDetailDate = (time) => {
  if (!time) return time;
  let date = new Date(time),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  return year + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + ' ' + (hour < 10 ? '0' : '') + hour + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
export let timeToDateType = (time) => {
  if (!time) return time;

}